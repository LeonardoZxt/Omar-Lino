import React from 'react';
import { 
  MessageCircle, 
  ShieldCheck, 
  Home, 
  Heart, 
  Brain, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Calendar,
  Music,
  Palette,
  Move,
  Users,
  Star,
  AlertCircle,
  Instagram,
  Facebook
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from './components/Logo';
import { CalendarScheduler } from './components/CalendarScheduler';

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-stone-100 shadow-sm">
            <Logo className="w-full h-full p-0.5" />
          </div>
          <span className="font-serif text-xl font-semibold text-stone-800">Terapia y Sanación</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#metodo" className="hover:text-emerald-800 transition-colors">Mi Método</a>
          <a href="#beneficios" className="hover:text-emerald-800 transition-colors">Beneficios</a>
          <a href="#sesion" className="hover:text-emerald-800 transition-colors">La Sesión</a>
          <a href="#contacto" className="bg-emerald-800 text-white px-5 py-2 rounded-full hover:bg-emerald-900 transition-all shadow-sm flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.503 4.869 1.503 5.4 0 9.794-4.393 9.796-9.794.001-2.585-1.002-5.011-2.825-6.837-1.821-1.822-4.24-2.824-6.832-2.824-5.399 0-9.786 4.386-9.789 9.795a9.718 9.718 0 001.483 5.12L1.93 19.982l3.968-.94a9.743 9.743 0 00.749-.188zm11.366-5.06c-.312-.156-1.848-.91-2.134-1.014-.286-.105-.494-.156-.701.156-.208.312-.806 1.014-.988 1.221-.182.208-.364.234-.676.078a8.531 8.531 0 01-2.512-1.549 9.4 9.4 0 01-1.737-2.164c-.182-.312-.019-.481.137-.636.14-.14.312-.364.468-.546.156-.182.208-.312.312-.52.104-.208.052-.39-.026-.546-.078-.156-.701-1.689-.961-2.314-.253-.611-.512-.53-.701-.54-.182-.01-.39-.01-.598-.01-.208 0-.546.078-.832.39-.286.312-1.092 1.066-1.092 2.6 0 1.534 1.118 3.016 1.274 3.224.156.208 2.19 3.35 5.306 4.693.742.32 1.32.51 1.771.654.746.237 1.425.204 1.961.124.598-.09 1.847-.754 2.107-1.443.26-.69.26-1.274.182-1.391-.078-.117-.286-.208-.598-.364z" />
            </svg>
            Agendar Sesión
          </a>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-20 px-4 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-stone-50/50 backdrop-blur-md rounded-[2.5rem] p-12 md:p-20 lg:p-24 shadow-[0_48px_96px_-16px_rgba(0,0,0,0.08),0_0_40px_rgba(0,0,0,0.02)] border border-stone-200/40 overflow-hidden relative"
      >
        {/* Contenido con z-index alto */}
        <div className="relative z-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -4, 0],
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.2 },
              scale: { duration: 0.5, delay: 0.2 },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(167, 243, 208, 0.6)" }}
            className="inline-block px-6 py-2 mb-6 text-sm font-bold tracking-[0.2em] text-emerald-950 uppercase bg-emerald-100/60 backdrop-blur-sm rounded-full border border-emerald-200/60 cursor-default shadow-sm"
          >
            Clínica Terapéutica Online
          </motion.span>

          {/* Imagen colocada en el medio del label y del título */}
          <div className="flex justify-center mb-6 mt-3">
            <motion.img 
              initial={{ opacity: 0, scale: 0.95, y: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -8, 0]
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ 
                opacity: { delay: 0.3, duration: 0.6 },
                scale: { delay: 0.3, duration: 0.6 },
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              src="https://base44.app/api/apps/6997b61ecb91087991c86b9c/files/mp/public/6997b61ecb91087991c86b9c/ab54e3dac_de_fondo_ponle_un_color_202606182129.jpeg" 
              alt="Logo Clínica" 
              className="h-28 md:h-36 lg:h-40 object-contain rounded-3xl border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.8),0_0_40px_rgba(217,119,6,0.5)]"
              referrerPolicy="no-referrer"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-[1.15] mb-8 tracking-tight">
            ¿Y si una conversación <br />
            <span className="italic text-emerald-800 font-light relative">
              lo cambia todo?
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-200/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-700 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Llevas meses sintiéndote agotado o cargando un peso que no es tuyo. <span className="text-emerald-800 font-medium">No tienes que estar "roto" para ir a terapia</span>: descubre el origen de tu ansiedad o estrés y comienza un verdadero proceso de transformación.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a 
              href="https://wa.me/5215635706932"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-800 text-white px-10 py-5 rounded-2xl font-bold hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-900/20 group text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Agendar sesión por WhatsApp
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255,255,255,1)" }}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-stone-700 border-2 border-stone-200 hover:border-emerald-800 transition-all text-lg animate-pulse"
            >
              Conocer mi método
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const ValueProps = () => (
  <section className="py-24 bg-white relative">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          {
            icon: Heart,
            title: "Atención Empática",
            desc: "Un espacio seguro donde serás escuchado sin juicios, con total comprensión y calidez humana.",
            color: "bg-emerald-50"
          },
          {
            icon: ShieldCheck,
            title: "100% Confidencial",
            desc: "Tu privacidad es mi prioridad absoluta. Sesiones seguras bajo estricto secreto profesional.",
            color: "bg-stone-50"
          },
          {
            icon: Home,
            title: "Desde Casa",
            desc: "Terapia online que se adapta a tu ritmo de vida, eliminando barreras de tiempo y traslados.",
            color: "bg-orange-50"
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center p-10 rounded-[3rem] bg-white border border-stone-100 hover:shadow-2xl hover:shadow-stone-200/50 transition-all group"
          >
            <div className={`w-20 h-20 ${item.color} rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
              <item.icon className="w-10 h-10 text-emerald-800" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4">{item.title}</h3>
            <p className="text-stone-600 leading-relaxed text-lg">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);


const EmpathySection = () => (
  <section className="py-24 bg-gradient-to-br from-emerald-900 via-stone-900 to-emerald-950 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
    
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif mb-8 leading-tight"
          >
            Llevas años cargando <br />
            <motion.span 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-emerald-400 italic font-light drop-shadow-sm inline-block"
            >
              algo que no es tuyo.
            </motion.span>
          </motion.h2>
          <p className="text-stone-400 text-lg mb-10 max-w-lg leading-relaxed">
            Muchas veces cargamos con expectativas ajenas, culpas del pasado o la presión diaria de ser perfectos. <span className="text-emerald-400 font-medium">El problema no eres tú</span>, sino lo que te enseñaron a creer de ti. Es momento de soltar esa carga y comenzar tu transformación.
          </p>
          <div className="grid gap-4">
            {[
              { q: "Estrés constante o ansiedad por desempeño laboral", icon: Brain },
              { q: "Insomnio y noches enteras de sobrepensar sin descansar", icon: Clock },
              { q: "Baja autoestima y dudar constantemente de tu propio valor", icon: ShieldCheck },
              { q: "Sentimiento de soledad, vacío o rupturas emocionales difíciles", icon: Heart },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-lg text-stone-200">{item.q}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <a 
            href="#contacto"
            className="block rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 relative group aspect-square select-none max-w-lg mx-auto bg-stone-900"
          >
            <img 
              src="https://base44.app/api/apps/6997b61ecb91087991c86b9c/files/mp/public/6997b61ecb91087991c86b9c/61f22b0d4_DAMELO_EN_ESPAOL_2K_202606171927.jpeg" 
              alt="RECUPERA TU CONTROL MENTAL - Protocolo estratégico contra la ansiedad" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </a>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ y: [0, -10, 0] }}
            viewport={{ once: true }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.8, delay: 0.5 }
            }}
            className="mt-10 bg-emerald-500 p-8 rounded-[2.5rem] shadow-2xl max-w-md mx-auto border-4 border-stone-900"
          >
            <p className="text-stone-900 font-serif text-xl leading-snug font-medium text-center">
              "Sanar no es lineal, pero es posible. Estamos aquí para caminar contigo."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);


const Transformation = () => (
  <section id="beneficios" className="py-24 bg-white relative overflow-hidden">
    <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-50 blur-[120px] rounded-full -translate-x-1/2"></div>
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">No tienes que tocar fondo para empezar a soltar lo que cargas</h2>
        <p className="text-stone-600 font-serif italic font-light text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed tracking-wide">El agotamiento emocional y el estrés de sostenerlo todo no se curan simplemente descansando el fin de semana. Si vives cansado de cumplir con expectativas ajenas mientras descuidas tu propia salud mental, es momento de intervenir <br /> antes de que tu cuerpo te obligue a parar.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { from: "Ansiedad constante", to: "Calma interior", icon: Sparkles, color: "bg-emerald-50" },
          { from: "Confusión mental", to: "Claridad de pensamiento", icon: Brain, color: "bg-blue-50" },
          { from: "Bloqueo emocional", to: "Libertad emocional", icon: Heart, color: "bg-rose-50" },
          { from: "Miedo paralizante", to: "Seguridad en ti mismo/a", icon: ShieldCheck, color: "bg-stone-50" },
          { from: "Agotamiento mental", to: "Paz y energía vital", icon: Clock, color: "bg-orange-50" },
          { from: "Baja autoestima", to: "Amor propio genuino", icon: Star, color: "bg-yellow-50" },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`p-6 md:p-8 rounded-[2rem] ${item.color} border border-transparent hover:border-emerald-200 transition-all group shadow-sm hover:shadow-xl hover:shadow-stone-200/50`}
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:rotate-12 transition-transform">
              <item.icon className="w-6 h-6 text-emerald-800" />
            </div>
            <div className="space-y-4">
              <div className="text-stone-400 line-through text-xs font-medium uppercase tracking-wider">{item.from}</div>
              <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-lg leading-tight">
                <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
                {item.to}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ForWhom = () => (
  <section id="para-quien" className="py-24 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-emerald-800 font-bold tracking-widest uppercase text-sm mb-4 block">¿Es esto para ti?</span>
          <h2 className="text-4xl md:text-6xl font-serif text-stone-800 mb-8 leading-tight">
            Un espacio diseñado para <span className="text-emerald-600 italic font-light">quienes buscan sanar</span>
          </h2>
          <p className="text-stone-600 text-lg mb-10 leading-relaxed">
            La terapia no es solo para momentos de crisis extrema; es un acto de amor propio para cualquier persona que desee vivir con mayor plenitud, claridad y paz.
          </p>
          <div className="space-y-4">
            {[
              { title: "Individual", desc: "Para adultos que buscan sanar heridas, gestionar ansiedad o redescubrir su propósito." },
              { title: "Parejas", desc: "Para quienes desean transformar el conflicto en conexión y comunicación consciente." },
              { title: "Crecimiento", desc: "Para aquellos en procesos de cambio, duelo o búsqueda de autoconocimiento profundo." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-emerald-50 transition-colors cursor-default"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2.5"></div>
                <div>
                  <h4 className="font-bold text-stone-800">{item.title}</h4>
                  <p className="text-stone-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-[4rem] overflow-hidden shadow-2xl relative z-10">
            <img 
              src="https://base44.app/api/apps/6997b61ecb91087991c86b9c/files/mp/public/6997b61ecb91087991c86b9c/f61ee38bb_damelo_en_espaol_2K_202606171906.jpeg" 
              alt="Espacio de calma" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-emerald-900/10"></div>
          </div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-100 rounded-full -z-10 blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-100 rounded-full -z-10 blur-3xl"></div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mt-10 bg-white p-6 rounded-3xl shadow-xl z-20 max-w-xs border border-emerald-50 mx-auto md:ml-auto md:mr-0"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="font-bold text-stone-800 text-sm">Empatía</span>
            </div>
            <p className="text-xs text-stone-500">Un acompañamiento humano y sin juicios.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Methodology = () => (
  <section id="metodo" className="py-24 bg-stone-50 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          className="order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Brain, label: "Terapia Analítica", color: "bg-emerald-100", text: "Profundidad mental" },
              { icon: Palette, label: "Arteterapia", color: "bg-orange-100", text: "Expresión visual" },
              { icon: Music, label: "Musicoterapia", color: "bg-blue-100", text: "Armonía sonora" },
              { icon: Move, label: "Movimiento Consciente", color: "bg-purple-100", text: "Sabiduría corporal" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                className={`${item.color} p-10 rounded-[2.5rem] flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-xl transition-all cursor-default`}
              >
                <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mb-2">
                  <item.icon className="w-8 h-8 text-stone-800" />
                </div>
                <span className="font-bold text-stone-800 text-lg leading-tight">{item.label}</span>
                <span className="text-xs text-stone-600 uppercase tracking-widest">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{ 
              x: [0, 5, 0],
            }}
            transition={{ 
              x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              opacity: { duration: 0.8 }
            }}
            // Overriding the transition for the initial slide vs the loop
            className="text-emerald-800 font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Mi Enfoque
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-serif text-stone-800 mb-8 leading-tight">
            Un método integral <br />
            <span className="italic font-light text-emerald-800">diseñado para tu alma.</span>
          </h2>
          <p className="text-xl text-stone-600 leading-relaxed mb-10 font-light">
            No somos solo mente, somos un ecosistema de cuerpo y emoción. Nuestro Enfoque combina la profundidad del análisis psicológico con herramientas creativas para una <span className="text-emerald-800 font-medium">sanación real y duradera.</span>
          </p>
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4"
          >
            {[
              "Identificamos la raíz profunda de tus conflictos",
              "Expresamos lo que las palabras no alcanzan a decir",
              "Reconectamos con tu sabiduría y ritmo corporal",
              "Creamos herramientas prácticas para tu bienestar diario"
            ].map((text, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: { opacity: 1, x: 0 }
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-5 p-5 rounded-2xl bg-stone-50/50 border border-stone-100 text-stone-700 text-lg group cursor-pointer hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
              >
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:rotate-12 transition-all duration-500"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                </motion.div>
                <span className="font-medium group-hover:text-emerald-900 transition-colors leading-tight">{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const SessionDetails = () => (
  <section id="sesion" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#f4f7f2] rounded-[4rem] p-12 md:p-24 relative overflow-hidden border border-emerald-100 shadow-xl"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-200/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-10 leading-tight">Así será tu espacio <br /><span className="text-emerald-700 italic font-light">de transformación</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {[
                { icon: Home, title: "100% Online", desc: "Desde tu espacio más seguro." },
                { icon: Clock, title: "50 Minutos", desc: "Tiempo exclusivo para ti." },
                { icon: ShieldCheck, title: "Privacidad Total", desc: "Confidencialidad absoluta." },
                { icon: Users, title: "Personalizado", desc: "Un plan único para ti." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-200">
                    <item.icon className="w-7 h-7 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-lg mb-2">{item.title}</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Política de Cancelación */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 p-6 bg-stone-100/60 rounded-[2rem] border border-stone-200/50 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200/50">
                <AlertCircle className="w-5 h-5 text-orange-700" />
              </div>
              <div>
                <h5 className="font-bold text-stone-800 text-sm mb-1">Importante: Política de cancelación</h5>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light">
                  Las cancelaciones deberán realizarse con al menos <strong className="font-semibold text-stone-800">24 horas de anticipación</strong>. De lo contrario, se aplicará un cargo del <strong className="font-semibold text-stone-800">50% del valor de la sesión</strong>.
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 60, rotateX: 10, rotateY: -3 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.8 }}
            whileHover={{ 
              y: -8, 
              rotateY: 1, 
              rotateX: -1, 
              scale: 1.015,
              boxShadow: "0 40px 80px -20px rgba(6, 95, 70, 0.15)"
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="bg-[#FAFAF7] p-10 md:p-14 rounded-[3rem] shadow-2xl relative border border-stone-200/60 transition-shadow duration-300"
          >
            {/* Horizontal Notebook Spiral Rings */}
            <div className="absolute top-0 left-8 right-8 -translate-y-4 flex justify-between px-2 z-20 pointer-events-none select-none">
              {Array.from({ length: 12 }).map((_, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex flex-col items-center"
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3,
                    delay: idx * 0.15,
                    ease: "easeInOut"
                  }}
                >
                  {/* Metal spiral ring looping over the edge */}
                  <div className="w-2.5 h-8 bg-gradient-to-b from-stone-400 via-stone-100 to-stone-500 rounded-full shadow-md border-x border-stone-300"></div>
                  {/* Punched circle hole in the paper sheat */}
                  <div className="w-2.5 h-2.5 bg-stone-900/10 rounded-full -mt-1.5 shadow-inner border border-stone-900/5"></div>
                </motion.div>
              ))}
            </div>

            {/* Notebook Red Margin Line */}
            <div className="absolute left-8 md:left-10 top-0 bottom-0 w-[1.5px] bg-[#FF7F7F]/30 pointer-events-none z-10"></div>

            <motion.div 
              className="absolute -top-12 -right-4 select-none z-30 cursor-pointer origin-center"
              animate={{
                y: [0, -5, 0],
                rotate: [-12, -9, -15, -12]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 4,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.15, 
                rotate: -5,
                filter: "drop-shadow(0 15px 25px rgba(255, 0, 60, 0.35))"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                className="w-32 md:w-36 h-auto drop-shadow-2xl filter transform transition-all duration-300 origin-center" 
                viewBox="0 0 325 185" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <mask id="hot-sale-tag-mask">
                    <rect width="325" height="185" fill="white" />
                    <circle cx="55" cy="102" r="10" fill="black" />
                  </mask>
                </defs>
                {/* Main physical red tag with fire flame exactly as shared */}
                <path
                  d="M 25 82 
                     L 65 35 
                     L 210 35 
                     C 225 35, 230 25, 232 15 
                     C 234 5, 225 2, 236 0 
                     C 248 -2, 250 10, 256 20 
                     C 262 30, 268 -2, 277 -17 
                     C 285 -30, 294 -17, 290 4 
                     C 286 20, 302 8, 306 14 
                     C 310 20, 305 34, 296 43 
                     C 288 51, 293 64, 287 74 
                     C 282 84, 270 90, 260 95 
                     C 245 102, 242 148, 235 158 
                     C 228 168, 215 169, 205 169 
                     L 65 169 
                     L 25 122 Z"
                  fill="#FF003C"
                  mask="url(#hot-sale-tag-mask)"
                />
                
                {/* Authentic MR Trademark symbol */}
                <g transform="translate(294, -13)">
                  <circle r="7" fill="#FF003C" />
                  <circle r="5.8" fill="white" />
                  <text y="2.5" textAnchor="middle" fontSize="7" fontWeight="950" fill="#FF003C" fontFamily="sans-serif">MR</text>
                </g>

                {/* White bold dynamic uppercase fonts inside with slight tilt */}
                <text 
                  x="152" 
                  y="92" 
                  fill="white" 
                  fontSize="28" 
                  fontWeight="900" 
                  fontStyle="italic"
                  fontFamily="system-ui, -apple-system, sans-serif" 
                  textAnchor="middle" 
                  transform="rotate(-4, 152, 92)" 
                  letterSpacing="-0.02em"
                >
                  CUPOS
                </text>
                <text 
                  x="152" 
                  y="128" 
                  fill="white" 
                  fontSize="25" 
                  fontWeight="900" 
                  fontStyle="italic"
                  fontFamily="system-ui, -apple-system, sans-serif" 
                  textAnchor="middle" 
                  transform="rotate(-4, 152, 128)" 
                  letterSpacing="-0.02em"
                >
                  LIMITADOS
                </text>
              </svg>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100 mb-6 cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-emerald-800 text-xs font-bold uppercase tracking-widest">Sesión Individual y en Pareja</span>
            </motion.div>
            <h3 className="text-3xl font-serif text-stone-800 mb-8">Invertir en ti es la mejor decisión</h3>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 180, delay: 0.2 }}
              className="mb-10 flex items-baseline gap-2"
            >
              <span className="text-6xl font-black text-emerald-800 tracking-tight">$600</span>
              <span className="text-stone-500 text-xl font-light">MXN / Sesión</span>
            </motion.div>
            <ul className="space-y-5 mb-10">
              {[
                "Sesión de 50 minutos",
                "Atención 100% personalizada",
                "Espacio seguro y privado",
                "Seguimiento vía WhatsApp",
                "Material de apoyo y ejercicios",
                "Flexibilidad de horarios"
              ].map((text, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 120 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 text-stone-700 font-medium cursor-default group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-all shadow-sm"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </motion.div>
                  <span className="group-hover:text-emerald-900 transition-colors duration-150">{text}</span>
                </motion.li>
              ))}
            </ul>
            <motion.a 
              animate={{ 
                scale: [1, 1.025, 1],
                boxShadow: [
                  "0 15px 30px -5px rgba(6, 95, 70, 0.3)",
                  "0 20px 40px -5px rgba(6, 95, 70, 0.55)",
                  "0 15px 30px -5px rgba(6, 95, 70, 0.3)"
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#047857",
                boxShadow: "0 25px 45px -5px rgba(6, 95, 70, 0.6)"
              }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/5215635706932"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center bg-emerald-800 hover:bg-emerald-900 text-white py-5 rounded-[2rem] font-sans font-black text-xl transition-all shadow-2xl active:scale-95"
            >
              Agendar mi primera sesión
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);


const Availability = () => (
  <section className="py-24 bg-white relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-50/30 blur-[120px] rounded-full"></div>
    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-emerald-100 text-emerald-900 rounded-full text-sm font-bold mb-10 shadow-sm border border-emerald-200">
          <Calendar className="w-5 h-5" />
          Disponibilidad de horarios
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6 leading-tight">Estoy disponible para acompañarte <br /><span className="italic font-light text-emerald-800">cuando más lo necesites</span></h2>
        <p className="text-stone-500 text-base md:text-lg mb-16 max-w-xl mx-auto font-medium leading-relaxed">
          ¿Tu cuerpo ya te está avisando que algo está mal? <br className="hidden sm:inline" /> No ignores las señales, comenzar hoy es de valientes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/40 group"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-emerald-800" />
            </div>
            <h4 className="font-bold text-stone-500 uppercase tracking-widest text-[10px] mb-3">Lunes a Viernes</h4>
            <p className="text-2xl md:text-3xl font-serif text-stone-800">8:00 am <span className="text-emerald-500 font-sans text-lg mx-1">—</span> 9:00 pm</p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/40 group"
          >
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-orange-800" />
            </div>
            <h4 className="font-bold text-stone-500 uppercase tracking-widest text-[10px] mb-3">Sábados</h4>
            <p className="text-2xl md:text-3xl font-serif text-stone-800">8:00 am <span className="text-orange-500 font-sans text-lg mx-1">—</span> 2:00 pm</p>
          </motion.div>
        </div>

        {/* Formulario para conectar calendar con zoom */}
        <CalendarScheduler />
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contacto" className="bg-[#faf9f6] text-stone-800 pt-16 pb-16 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-orange-300 to-emerald-500"></div>
    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-[3rem] shadow-2xl relative p-8 sm:p-16 md:p-20 overflow-hidden bg-white border border-stone-200/40"
      >
        {/* Content with high z-index to overlay background */}
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 max-w-5xl mx-auto mb-12">
            {/* Left Column: Image & Agenda Button */}
            <div className="flex flex-col items-stretch w-full lg:w-[27rem] shrink-0">
              <img 
                src="https://base44.app/api/apps/6997b61ecb91087991c86b9c/files/mp/public/6997b61ecb91087991c86b9c/8cd7db0d3_Gemini_Generated_Image_vavnhcvavnhcvavn.png"
                alt="Conversación"
                className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover rounded-[2.5rem] shadow-xl border border-stone-150 lg:relative lg:top-20"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Right Column: Text & Desktop Buttons */}
            <div className="flex-1 text-left flex flex-col justify-between py-2 w-full">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-stone-900 font-extrabold mb-6">
                  ¿Y si una conversación <br />
                  <span className="text-emerald-800 italic font-light">lo cambia todo?</span>
                </h2>
                <p className="text-stone-700 text-lg md:text-xl mb-8 font-light leading-relaxed lg:max-w-[25rem]">
                  Llevas meses sintiéndote agotado o cargando un peso que no es tuyo. No tienes que estar "roto" para ir a terapia: descubre el origen de tu ansiedad o estrés y comienza un verdadero proceso de transformación.
                </p>

                {/* Botones para móviles y tablets (se ocultan en escritorio, justo debajo del párrafo) */}
                <div className="flex flex-col lg:hidden items-stretch gap-6 mt-2 mb-10">
                  <motion.a 
                    href="https://wa.me/5215635706932"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 bg-emerald-600 text-white px-16 sm:px-20 py-4.5 sm:py-5.5 rounded-[2.25rem] font-black hover:bg-emerald-700 transition-all text-lg sm:text-xl lg:text-2xl shadow-xl shadow-emerald-600/15 w-full text-center whitespace-nowrap relative top-8 left-0 lg:left-8"
                  >
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
                    <span className="whitespace-nowrap">AGENDA HOY MISMO</span>
                  </motion.a>

                  {/* Nos Vemos en Zoom */}
                  <div className="w-full max-w-xs mx-auto relative top-4 left-0 lg:left-8">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        boxShadow: "0 10px 20px -8px rgba(37, 99, 235, 0.18)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 bg-blue-50/95 hover:bg-blue-100/95 border-2 border-blue-600 text-stone-950 px-4 sm:px-6 py-3 sm:py-3.5 rounded-[1.5rem] font-serif font-black text-xs sm:text-sm md:text-base shadow-sm transition-all duration-200 cursor-pointer select-none w-full text-center"
                    >
                      <div className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                      </div>
                      <span className="text-stone-950 font-black font-serif tracking-wide text-xs sm:text-sm md:text-base">
                        Nos Vemos en Zoom
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Botones para escritorio (se muestran únicamente en lg:flex) */}
                <div className="hidden lg:flex flex-col items-stretch gap-6 mt-10 w-full max-w-[27rem] relative lg:-left-4">
                  <motion.a 
                    href="https://wa.me/5215635706932"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 bg-emerald-600 text-white px-16 sm:px-20 py-4.5 sm:py-5.5 rounded-[2.25rem] font-black hover:bg-emerald-700 transition-all text-lg sm:text-xl lg:text-2xl shadow-xl shadow-emerald-600/15 w-full text-center whitespace-nowrap relative lg:-left-3"
                  >
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
                    <span className="whitespace-nowrap">AGENDA HOY MISMO</span>
                  </motion.a>

                  {/* Nos Vemos en Zoom */}
                  <div className="w-full max-w-xs mx-auto lg:mx-0 relative lg:left-14">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        boxShadow: "0 10px 20px -8px rgba(37, 99, 235, 0.18)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 bg-blue-50/95 hover:bg-blue-100/95 border-2 border-blue-600 text-stone-950 px-4 sm:px-6 py-3 sm:py-3.5 rounded-[1.5rem] font-serif font-black text-xs sm:text-sm md:text-base shadow-sm transition-all duration-200 cursor-pointer select-none w-full text-center"
                    >
                      <div className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                      </div>
                      <span className="text-stone-950 font-black font-serif tracking-wide text-xs sm:text-sm md:text-base">
                        Nos Vemos en Zoom
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

        <div className="border-t border-stone-200/60 pt-12 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <a 
              href="https://www.facebook.com/people/Omar-Garcia/pfbid02qasD6XjHX6m1KeKqUnK6Jb2FhoKWgomAYXSebwtaDVY1RLhJHSHuzAkkurA1MJW9l/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-3 text-stone-500 hover:text-stone-800 transition-colors normal-case tracking-normal font-sans"
              title="Facebook Omar García"
            >
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md bg-[#1877F2]"
              >
                <Facebook className="w-5 h-5 text-white fill-white" strokeWidth={1} />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="font-bold text-stone-700 text-sm group-hover:text-emerald-800 transition-colors">Omar García</span>
                <span className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase">Facebook</span>
              </div>
            </a>

            <div className="hidden sm:block w-px h-8 bg-stone-200" />

            <a 
              href="https://www.instagram.com/omarlino_terapeuta" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-3 text-stone-500 hover:text-stone-800 transition-colors normal-case tracking-normal font-sans"
              title="Instagram @omarlino_terapeuta"
            >
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
                style={{
                  background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"
                }}
              >
                <Instagram className="w-5 h-5 text-white" strokeWidth={2.25} />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="font-bold text-stone-700 text-sm group-hover:text-emerald-800 transition-colors">@omarlino_terapeuta</span>
                <span className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase">Instagram</span>
              </div>
            </a>

            <div className="hidden sm:block w-px h-8 bg-stone-200" />

            <a 
              href="https://www.tiktok.com/@omargarcia63617" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-3 text-stone-500 hover:text-stone-800 transition-colors normal-case tracking-normal font-sans"
              title="TikTok @omargarcia63617"
            >
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md bg-stone-900"
              >
                <svg 
                  className="w-5 h-5 text-white fill-white" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.04-1.54-.15-.12-.29-.26-.43-.39v6.1c.02 4.14-2.82 8.01-6.89 8.78-4.26.96-8.77-1.5-9.87-5.63-1.28-4.13 1.15-8.82 5.27-9.92.93-.27 1.93-.34 2.89-.2V11c-1.74-.47-3.76.15-4.73 1.78-.96 1.48-1.02 3.53-.16 5.1 1 1.9 3.23 2.95 5.34 2.5 1.95-.34 3.49-2 3.61-3.98.05-1.42.02-2.85.02-4.28V.02z" />
                </svg>
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="font-bold text-stone-700 text-sm group-hover:text-emerald-800 transition-colors">@omargarcia63617</span>
                <span className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase">TikTok</span>
              </div>
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-stone-400 font-semibold">
            <span>© {new Date().getFullYear()} • Sanar es de Valientes</span>
          </div>
        </div>
      </div>
    </footer>
  );


export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-stone-800 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <EmpathySection />
        <Transformation />
        <ForWhom />
        <Methodology />
        <SessionDetails />
        <Availability />
      </main>
      <Footer />
    </div>
  );
}

