import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Cargar variables de entorno desde .env.local
dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json());

const PORT = 3001;
const BOOKINGS_FILE = path.join(process.cwd(), 'bookings.json');

// ── Tipos ─────────────────────────────────────────────────────────────────────
type Bookings = Record<string, string[]>; // { "2026-06-29": ["10:00", "15:00"] }

// ── Helpers de bookings.json ──────────────────────────────────────────────────
function readBookings(): Bookings {
  try {
    if (!fs.existsSync(BOOKINGS_FILE)) return {};
    const content = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(content) as Bookings;
  } catch {
    return {};
  }
}

function writeBookings(data: Bookings): void {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error al guardar en bookings.json (podría ser de solo lectura en Vercel):', err);
  }
}

// ── Google OAuth helpers ──────────────────────────────────────────────────────
const GOOGLE_CLIENT_ID     = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI         = 'https://omar-lino.vercel.app/api/auth/callback'; // Usar la URL de Vercel en prod
const GOOGLE_SCOPES        = 'https://www.googleapis.com/auth/calendar.events';

async function getGoogleAccessToken(): Promise<string> {
  // Recargar el .env.local para obtener el token más actualizado (solo local)
  if (!process.env.VERCEL) {
    dotenv.config({ path: '.env.local', override: true });
  }
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!refreshToken) {
    throw new Error(
      'Google Calendar no está vinculado. Por favor, configura GOOGLE_REFRESH_TOKEN en las variables de entorno de Vercel.'
    );
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id:     GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type:    'refresh_token',
    }).toString(),
  });

  if (!response.ok) {
    const err = await response.json() as any;
    throw new Error(`Error al renovar el token de Google: ${err.error_description || err.error}`);
  }

  const data = await response.json() as any;
  return data.access_token;
}

// ── Zoom helpers ──────────────────────────────────────────────────────────────
async function getZoomAccessToken(): Promise<string> {
  const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;
  if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
    throw new Error('Faltan credenciales de Zoom en las variables de entorno.');
  }

  const credentials = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  if (!response.ok) {
    const err = await response.json() as any;
    throw new Error(`Error autenticando con Zoom: ${err.reason || response.statusText}`);
  }

  const data = await response.json() as any;
  return data.access_token;
}

// ═══════════════════════════════════════════════════════════════════════════════
// RUTAS DE AUTENTICACIÓN DEL DUEÑO (solo lo hace una vez)
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/auth → redirige al dueño a Google para autorizar el calendario
app.get('/api/auth', (_req, res) => {
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id',     GOOGLE_CLIENT_ID);
  // Si estamos en Vercel, redirigimos a la callback de producción, de lo contrario a la local
  const redirectUri = process.env.VERCEL ? REDIRECT_URI : 'http://localhost:3001/api/auth/callback';
  authUrl.searchParams.set('redirect_uri',  redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope',         GOOGLE_SCOPES);
  authUrl.searchParams.set('access_type',   'offline');
  authUrl.searchParams.set('prompt',        'consent');
  res.redirect(authUrl.toString());
});

// GET /api/auth/callback → recibe el código, obtiene tokens y guarda el refresh_token
app.get('/api/auth/callback', async (req, res) => {
  const code = req.query.code as string;
  if (!code) {
    res.status(400).send('No se recibió el código de autorización de Google.');
    return;
  }

  try {
    const redirectUri = process.env.VERCEL ? REDIRECT_URI : 'http://localhost:3001/api/auth/callback';
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id:     GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri:  redirectUri,
        grant_type:    'authorization_code',
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const err = await tokenResponse.json() as any;
      throw new Error(JSON.stringify(err));
    }

    const tokens = await tokenResponse.json() as any;
    const refreshToken = tokens.refresh_token;

    if (!refreshToken) {
      res.status(500).send(
        'No se obtuvo el refresh_token. Asegúrate de haber configurado access_type=offline y prompt=consent.'
      );
      return;
    }

    // Intentar guardar el refresh_token en .env.local (solo funciona localmente)
    if (!process.env.VERCEL) {
      const envPath = path.join(process.cwd(), '.env.local');
      let envContent = fs.readFileSync(envPath, 'utf-8');

      if (envContent.includes('GOOGLE_REFRESH_TOKEN=')) {
        envContent = envContent.replace(/GOOGLE_REFRESH_TOKEN=.*/, `GOOGLE_REFRESH_TOKEN=${refreshToken}`);
      } else {
        envContent += `\nGOOGLE_REFRESH_TOKEN=${refreshToken}`;
      }

      fs.writeFileSync(envPath, envContent, 'utf-8');
      process.env.GOOGLE_REFRESH_TOKEN = refreshToken;
    }

    res.send(`
      <html>
        <body style="font-family: 'Segoe UI', sans-serif; text-align: center; padding: 80px; background: #f0fdf4; color: #1a1a1a;">
          <div style="max-width: 480px; margin: auto; background: white; padding: 48px; border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.08);">
            <div style="font-size: 64px; margin-bottom: 16px;">✅</div>
            <h1 style="color: #166534; font-size: 24px; margin-bottom: 12px;">¡Google Calendar vinculado!</h1>
            ${
              process.env.VERCEL
                ? `<p style="color: #555; margin-bottom: 8px;">Por favor, copia este Refresh Token y configúralo como variable de entorno <strong>GOOGLE_REFRESH_TOKEN</strong> en Vercel:</p>
                   <textarea readonly style="width: 100%; height: 80px; padding: 8px; font-family: monospace; font-size: 12px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 8px;">${refreshToken}</textarea>`
                : `<p style="color: #555; margin-bottom: 8px;">El Refresh Token fue guardado en <strong>.env.local</strong>.</p>`
            }
            <p style="color: #555;">Ya puedes cerrar esta ventana. Los pacientes pueden empezar a reservar citas sin necesidad de iniciar sesión con Google.</p>
          </div>
        </body>
      </html>
    `);
  } catch (error: any) {
    res.status(500).send(`Error durante la autenticación: ${error.message}`);
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// RUTAS DE LA APLICACIÓN
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/booked-slots?date=YYYY-MM-DD → devuelve horarios ocupados de una fecha
app.get('/api/booked-slots', (req, res) => {
  const date = req.query.date as string;
  if (!date) {
    res.status(400).json({ error: 'Se requiere el parámetro date (YYYY-MM-DD).' });
    return;
  }
  const bookings = readBookings();
  res.json({ date, bookedTimes: bookings[date] || [] });
});

// POST /api/create-booking → crea Zoom + Google Calendar y registra la cita
app.post('/api/create-booking', async (req, res) => {
  try {
    const { patientName, phone, date, time, motivo, timeZone } = req.body as {
      patientName: string;
      phone:       string;
      date:        string;
      time:        string;
      motivo:      string;
      timeZone?:   string;
    };

    if (!patientName || !date || !time) {
      res.status(400).json({ error: 'Se requieren patientName, date y time.' });
      return;
    }

    // Verificar disponibilidad antes de proceder
    const bookings = readBookings();
    if ((bookings[date] || []).includes(time)) {
      res.status(409).json({ error: 'Este horario ya está reservado. Por favor elige otro.' });
      return;
    }

    // Calcular hora de término (50 minutos)
    const [startHourStr, startMinStr] = time.split(':');
    let endHour = parseInt(startHourStr, 10);
    let endMin  = parseInt(startMinStr, 10) + 50;
    if (endMin >= 60) { endHour += 1; endMin -= 60; }
    const startDateTime   = `${date}T${time}:00`;
    const endDateTime     = `${date}T${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}:00`;
    const calendarTimeZone = timeZone || 'America/Mexico_City';

    // ── PASO 1: Crear reunión en Zoom ─────────────────────────────────────
    const zoomToken = await getZoomAccessToken();
    const zoomRes   = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${zoomToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic:      `Sesión de Terapia - Omar García`,
        type:       2,
        start_time: startDateTime,
        duration:   50,
        timezone:   calendarTimeZone,
        agenda:     `Sesión de terapia psicológica con ${patientName}`,
        settings: {
          host_video:        true,
          participant_video: true,
          join_before_host:  false,
          mute_upon_entry:   false,
          waiting_room:      true,
          use_pmi:           false,
          approval_type:     0,
          audio:             'voip',
          auto_recording:    'none',
        },
      }),
    });

    if (!zoomRes.ok) {
      const errData = await zoomRes.json() as any;
      throw new Error(errData.message || 'Error creando la reunión en Zoom');
    }

    const meeting      = await zoomRes.json() as any;
    const zoomLink     = meeting.join_url as string;
    const zoomMeetingId = String(meeting.id);
    const zoomPassword = (meeting.password as string) || '';

    // ── PASO 2: Crear evento en Google Calendar del dueño ─────────────────
    const googleToken = await getGoogleAccessToken();
    const gcalRes     = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${googleToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary:     `Sesión de Terapia - ${patientName}`,
        location:    `Reunión Virtual de Zoom: ${zoomLink}`,
        description:
          `Paciente: ${patientName}\n` +
          `Celular: ${phone || 'N/A'}\n` +
          `Motivo: ${motivo || 'General'}\n\n` +
          `📹 Enlace de Zoom: ${zoomLink}\n` +
          `🆔 ID de Reunión: ${zoomMeetingId}\n` +
          `🔑 Contraseña: ${zoomPassword}\n\n` +
          `⏰ Duración: 50 minutos\n` +
          `👨‍💼 Terapeuta: Omar García`,
        start: { dateTime: startDateTime, timeZone: calendarTimeZone },
        end:   { dateTime: endDateTime,   timeZone: calendarTimeZone },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email',  minutes: 24 * 60 },
            { method: 'popup',  minutes: 30 },
          ],
        },
      }),
    });

    if (!gcalRes.ok) {
      const errData = await gcalRes.ok ? await gcalRes.json() as any : { error: { message: 'HTTP ' + gcalRes.status } };
      throw new Error(errData.error?.message || 'Error al guardar el evento en Google Calendar');
    }

    const eventData = await gcalRes.json() as any;

    // ── PASO 3: Guardar el slot en bookings.json ───────────────────────────
    if (!bookings[date]) bookings[date] = [];
    bookings[date].push(time);
    writeBookings(bookings);

    console.log(`✅ Reserva registrada: ${patientName} — ${date} ${time}`);

    res.json({
      success:    true,
      zoomLink,
      meetingId:  zoomMeetingId,
      password:   zoomPassword,
      gcalUrl:    eventData.htmlLink || 'https://calendar.google.com/calendar/r',
    });
  } catch (error: any) {
    console.error('❌ Error en /api/create-booking:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/cancel-booking → libera un slot en bookings.json
app.post('/api/cancel-booking', (req, res) => {
  const { date, time } = req.body as { date: string; time: string };
  if (!date || !time) {
    res.status(400).json({ error: 'Se requieren date y time.' });
    return;
  }
  const bookings = readBookings();
  if (bookings[date]) {
    bookings[date] = bookings[date].filter(t => t !== time);
    if (bookings[date].length === 0) delete bookings[date];
    writeBookings(bookings);
  }
  res.json({ success: true, message: `Slot ${date} ${time} liberado correctamente.` });
});

// GET /api/health → verificación rápida del estado del servidor
app.get('/api/health', (_req, res) => {
  const hasRefreshToken = !!process.env.GOOGLE_REFRESH_TOKEN;
  res.json({
    status:           'ok',
    googleCalendar:   hasRefreshToken ? 'vinculado' : 'no vinculado — visita /api/auth',
    zoomConfigured:   !!process.env.ZOOM_ACCOUNT_ID,
  });
});

// ── Arrancar el servidor ──────────────────────────────────────────────────────
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Backend Express corriendo en http://localhost:${PORT}`);
    const hasRefreshToken = !!process.env.GOOGLE_REFRESH_TOKEN;
    if (!hasRefreshToken) {
      console.log('\n⚠️  Google Calendar no está vinculado.');
      console.log('   El dueño debe abrir este enlace en su navegador:');
      console.log(`   👉 http://localhost:${PORT}/api/auth\n`);
    } else {
      console.log('✅ Google Calendar vinculado correctamente.\n');
    }
  });
}

export default app;
