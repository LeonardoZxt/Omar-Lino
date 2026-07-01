import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Video, Check, Copy, ExternalLink, Sparkles, Loader2, RefreshCw } from 'lucide-react';

export const CalendarScheduler = () => {
  const [formData, setFormData] = useState({
    name:  '',
    email: '',
    phone: '',
    date:  '',
    time:  '10:00',
    type:  'ansiedad',
  });

  const [isLoading, setIsLoading]       = useState(false);
  const [successData, setSuccessData]   = useState<any>(null);
  const [copied, setCopied]             = useState(false);
  const [bookedTimes, setBookedTimes]   = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const allTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  ];

  // ── Obtener horarios ocupados del backend cuando cambia la fecha ────────────
  useEffect(() => {
    if (!formData.date) return;

    const fetchBookedSlots = async () => {
      setLoadingSlots(true);
      try {
        const res = await fetch(`/api/booked-slots?date=${formData.date}`);
        if (res.ok) {
          const data = await res.json() as { bookedTimes: string[] };
          setBookedTimes(data.bookedTimes || []);

          // Auto-avanzar al siguiente horario libre si el seleccionado está ocupado
          if (data.bookedTimes.includes(formData.time)) {
            const nextFree = allTimes.find(t => !data.bookedTimes.includes(t));
            if (nextFree) setFormData(prev => ({ ...prev, time: nextFree }));
          }
        }
      } catch (e) {
        console.warn('No se pudo consultar disponibilidad:', e);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [formData.date]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ── Enviar reserva al backend ───────────────────────────────────────────────
  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Por favor completa todos los campos requeridos (Nombre, Celular y Fecha).');
      return;
    }

    if (bookedTimes.includes(formData.time)) {
      alert('El horario seleccionado ya no está disponible. Por favor elige otro.');
      return;
    }

    setIsLoading(true);

    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Mexico_City';

      const res = await fetch('/api/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: formData.name,
          phone:       formData.phone,
          date:        formData.date,
          time:        formData.time,
          motivo:      formData.type,
          timeZone:    userTimeZone,
        }),
      });

      if (!res.ok) {
        const errData = await res.json() as any;
        throw new Error(errData.error || 'Error al realizar la reserva.');
      }

      const data = await res.json() as any;

      // Actualizar la lista de horarios bloqueados en el frontend
      setBookedTimes(prev => [...prev, formData.time]);

      setSuccessData({
        zoomLink:      data.zoomLink,
        gcalUrl:       data.gcalUrl,
        meetingId:     data.meetingId,
        password:      data.password,
        dateFormatted: new Date(formData.date + 'T00:00:00').toLocaleDateString('es-MX', {
          weekday: 'long',
          year:    'numeric',
          month:   'long',
          day:     'numeric',
        }),
        time: formData.time,
      });
    } catch (error: any) {
      console.error('Error al reservar sesión:', error);
      alert(`Ocurrió un error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!successData) return;
    const textToCopy =
      `--- SESIÓN DE TERAPIA CONFIRMADA ---\n` +
      `Paciente: ${formData.name}\n` +
      `Celular: ${formData.phone}\n` +
      `Fecha: ${successData.dateFormatted}\n` +
      `Hora: ${successData.time} (Duración: 50 min)\n` +
      `Plataforma: Zoom Video\n` +
      `Enlace de Zoom: ${successData.zoomLink}\n` +
      `ID de Reunión: ${successData.meetingId}\n` +
      `Contraseña: ${successData.password}\n` +
      `--------------------------------------`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="scheduler-widget" className="mt-16 max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {!successData ? (
          <motion.div
            key="scheduler-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-stone-50 border border-stone-200/60 p-6 sm:p-10 rounded-[3rem] shadow-stone-200/80 shadow-2xl relative overflow-hidden"
          >
            {/* Background Accent Gradients */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100/40 blur-3xl rounded-full"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2.5 mb-4 text-emerald-800">
                <Video className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest font-sans">Integración Premium Zoom</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider font-sans">Active</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-stone-800 mb-3 font-bold text-center">
                Sincroniza tu sesión de Zoom
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mb-8 text-center max-w-lg mx-auto leading-relaxed">
                Selecciona una fecha libre y tu horario preferido. Nuestro sistema generará inmediatamente una sala de videoconferencia en Zoom y creará el evento directo para tu Google Calendar.
              </p>

              <form onSubmit={handleScheduleSubmit} className="space-y-5 text-left">
                {/* Fila 1: Nombre y Celular */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2" htmlFor="scheduler-name">
                      Nombre Completo *
                    </label>
                    <input
                      id="scheduler-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ej. Sofía Rodríguez"
                      className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2" htmlFor="scheduler-phone">
                      Número Celular *
                    </label>
                    <input
                      id="scheduler-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ej. +52 55 1234 5678"
                      className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Fila 2: Motivo + Fecha y Hora */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2" htmlFor="scheduler-type">
                      Motivo de consulta *
                    </label>
                    <select
                      id="scheduler-type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-sm transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2344403c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        backgroundSize: '16px',
                      }}
                    >
                      <option value="ansiedad">Ansiedad general y miedos profundos</option>
                      <option value="estres">Estrés constante, cansancio y desgaste</option>
                      <option value="relacion">Conflictos de relaciones o pareja</option>
                      <option value="general">Otro motivo personal (Crecimiento)</option>
                    </select>
                  </div>

                  {/* Fecha y Hora en subgrid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2" htmlFor="scheduler-date">
                        Fecha *
                      </label>
                      <input
                        id="scheduler-date"
                        type="date"
                        name="date"
                        required
                        min={(() => {
                          const today = new Date();
                          const year = today.getFullYear();
                          const month = String(today.getMonth() + 1).padStart(2, '0');
                          const day = String(today.getDate()).padStart(2, '0');
                          return `${year}-${month}-${day}`;
                        })()}
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2" htmlFor="scheduler-time">
                        Hora *{loadingSlots && <span className="ml-2 text-emerald-600">↻</span>}
                      </label>
                      <select
                        id="scheduler-time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        disabled={loadingSlots}
                        className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-sm transition-all appearance-none cursor-pointer disabled:opacity-60"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2344403c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 16px center',
                          backgroundSize: '16px',
                        }}
                      >
                        {allTimes.map((time) => {
                          const isBooked = bookedTimes.includes(time);
                          return (
                            <option
                              key={time}
                              value={time}
                              disabled={isBooked}
                              style={isBooked ? { color: '#d1d5db' } : {}}
                            >
                              {time} {parseInt(time.split(':')[0]) >= 12 ? 'PM' : 'AM'}
                              {isBooked ? ' — No disponible' : ''}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading || loadingSlots}
                    className="w-full py-4 text-white font-black uppercase text-xs sm:text-sm tracking-wider bg-emerald-800 hover:bg-emerald-900 rounded-2xl transition-all shadow-xl shadow-emerald-800/20 flex items-center justify-center gap-2 cursor-pointer h-[52px] disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Reservando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Reservar Sesión Zoom
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="text-center text-[10px] text-stone-400 font-medium">
                  🔒 Cumple con HIPAA y confidencialidad de datos personales.
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="scheduler-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-emerald-50/80 border border-emerald-200 p-6 sm:p-10 rounded-[3rem] shadow-emerald-100 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 blur-2xl rounded-full"></div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-emerald-800 stroke-[3]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-stone-800 font-bold mb-2">
                ¡Sesión Enlazada Exitosamente!
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mb-8 font-serif">
                Hemos generado tu sala privada de Zoom y programado el recordatorio automático en Google Calendar.
              </p>

              <div className="bg-white rounded-2xl p-5 border border-emerald-100 text-left space-y-4 shadow-sm mb-8">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-0.5">Paciente asignado</span>
                  <span className="text-sm font-bold text-stone-800">{formData.name}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1 border-t border-stone-100">
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-0.5">Fecha confirmada</span>
                    <span className="text-xs font-semibold text-stone-700 capitalize">{successData.dateFormatted}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-0.5">Hora reservada</span>
                    <span className="text-xs font-semibold text-stone-700">{successData.time} {parseInt(successData.time.split(':')[0]) >= 12 ? 'PM' : 'AM'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Enlace Privado de Zoom</span>
                  <div className="flex items-center gap-2 bg-stone-50 p-3 rounded-xl border border-stone-150 overflow-hidden">
                    <Video className="w-4 h-4 text-emerald-700 shrink-0" />
                    <a
                      href={successData.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-700 truncate font-mono select-all flex-1 hover:underline"
                    >
                      {successData.zoomLink}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] text-stone-500 font-mono">
                  <div><strong>ID de Reunión:</strong> {successData.meetingId}</div>
                  <div><strong>Contraseña:</strong> {successData.password}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={successData.gcalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-800/10 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Ver en Google Calendar
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="flex-1 py-3.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      ¡Copiado de forma exitosa!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-400" />
                      Copiar datos de zoom
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSuccessData(null)}
                className="mt-6 text-xs text-emerald-800 hover:underline font-bold flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Agendar otra cita
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
