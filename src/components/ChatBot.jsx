import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

const EMAILJS_SERVICE_ID = import.meta.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const SYSTEM_PROMPT = `Eres el asistente virtual de alexweb. Alejandro Ferrández es un desarrollador web freelance que trabaja en remoto con clientes de toda España. Ofrece trato directo, sin intermediarios: quien contrata habla siempre con la persona que desarrolla su web. Responde de forma cercana, clara y sin tecnicismos innecesarios, ayudando al cliente a entender qué servicio le encaja y animándole a pedir presupuesto sin compromiso. Tu nombre es Alex Assistant.

SERVICIOS Y PRECIOS:

LANDING PAGE (una sola página, para captar contactos):
- Landing Starter: 350€ — 1 sección larga y 3 pequeñas, SEO y posicionamiento básico, diseño responsive, formulario de contacto. Entrega en 2 semanas.
- Landing Premium: 500€ — 8 secciones personalizadas, SEO avanzado, animaciones, Google Analytics, galería o vídeo de fondo, chat de WhatsApp, 2 rondas de revisiones. Entrega en 2-3 semanas.

SITIO WEB (tres tipos distintos, no son tallas del mismo producto):
- Sitio Web Básico: 699€, precio cerrado — 3-5 páginas, diseño responsive, SEO básico, formulario de contacto, Google Analytics. Entrega en 3-4 semanas. NO incluye tienda online ni blog.
- E-commerce / Tienda Online: desde 999€, el precio depende del número de productos del catálogo — todo lo del Básico y además carrito de compras, catálogo de productos, pasarela de pago segura, panel de gestión de productos, blog integrado y SEO avanzado. Entrega en 6-8 semanas.
- Sitio Web a Medida: desde 1.499€, a negociar según alcance — todo lo anterior y además páginas y funciones sin límite, proyecto 100% a medida, ChatBot con IA, panel de administración personalizado, integraciones a medida (APIs, pasarelas), animaciones avanzadas y soporte prioritario el primer mes. Entrega según proyecto. Es el más elegido.

MANTENIMIENTO Y SEO (mensual, sin permanencia, se cancela cuando se quiera):
- Mantenimiento Básico: 50€/mes — actualizaciones de seguridad, copias de seguridad, pequeños ajustes, Google Analytics e informe mensual de rendimiento en PDF.
- Mantenimiento Premium: 70€/mes — todo lo del Básico y además soporte prioritario con respuesta en menos de 24h, actualizaciones constantes, optimización SEO mensual, pequeñas mejoras de diseño y revisión mensual de velocidad.

REGLAS SOBRE PRECIOS (importante, no te las saltes):
- Si preguntan por tienda online, e-commerce, vender online, carrito, catálogo o pasarela de pago, el precio que debes dar es el de E-commerce (desde 999€). NUNCA des el precio del Básico para una tienda: el Básico no lleva tienda.
- Si preguntan por blog, está incluido desde el nivel E-commerce en adelante, no en el Básico.
- Solo el Sitio Web Básico y las dos landings tienen precio cerrado. E-commerce y A Medida son "desde", porque dependen del catálogo o del alcance.

TECNOLOGÍAS: React, HTML5, CSS3, JavaScript, Node.js, SQL, APIs REST.

COMPORTAMIENTO:
- Responde siempre en español, de forma cercana y profesional.
- Si el usuario pregunta por precios, explica los servicios con sus precios.
- Si el usuario muestra interés en contratar o pedir presupuesto, recoge su nombre, email y descripción del proyecto de forma natural en la conversación — uno a uno, no todos a la vez.
- Cuando tengas nombre, email y descripción del proyecto, confirma al usuario que le enviarás la consulta y termina con el mensaje exacto: "ENVIAR_CONSULTA|nombre|email|descripcion" (sin comillas, sin saltos de línea, al final del mensaje).
- Sé breve y directo. Máximo 3-4 frases por respuesta.
- No inventes servicios ni precios que no estén en la lista.`;

const tocarSonido = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.15);
    osc.frequency.linearRampToValueAtTime(210, ctx.currentTime + 0.55);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {}
};

const BurbujaMensaje = ({ texto, animar, onAnimacionFin }) => {
  const [visible, setVisible] = useState(animar ? "" : texto);

  useEffect(() => {
    if (!animar) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisible(texto.slice(0, i));
      if (i >= texto.length) {
        clearInterval(id);
        onAnimacionFin?.();
      }
    }, 5);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {visible.split("\n").map((line, j, arr) => (
        <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
      ))}
    </>
  );
};

export default function ChatBot() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    {
      rol: "assistant",
      texto: "¡Hola! Soy el asistente de AlexWeb 👋 ¿En qué puedo ayudarte? Puedo contarte sobre servicios, precios o ayudarte a pedir un presupuesto.",
      animar: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, cargando]);

  const enviarEmailJS = async (nombre, email, descripcion) => {
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: nombre,
          from_email: email,
          message: descripcion,
          to_name: "Alex",
        },
        EMAILJS_PUBLIC_KEY
      );
      setEnviado(true);
    } catch (error) {
      console.error("Error enviando email:", error);
    }
  };

  const procesarRespuesta = (texto, nombre, email) => {
    const match = texto.match(/ENVIAR_CONSULTA\|(.+?)\|(.+?)\|(.+)/);
    if (match) {
      const [, n, e, d] = match;
      enviarEmailJS(n || nombre, e || email, d);
      return texto.replace(/ENVIAR_CONSULTA\|.+/, "").trim() +
        "\n\n✅ ¡Consulta enviada! Alex se pondrá en contacto contigo pronto.";
    }
    return texto;
  };

  const enviarMensaje = async () => {
    if (!input.trim() || cargando) return;

    const nuevoMensaje = { rol: "user", texto: input };
    const historialActualizado = [...mensajes, nuevoMensaje];
    setMensajes(historialActualizado);
    setInput("");
    setCargando(true);

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: historialActualizado.map((m) => ({
            role: m.rol,
            content: m.texto,
          })),
        }),
      });

      const data = await response.json();
      const textoRespuesta = data.content?.[0]?.text || "Lo siento, ha habido un error. Inténtalo de nuevo.";
      const textoFinal = procesarRespuesta(textoRespuesta);

      setMensajes((prev) => [...prev, { rol: "assistant", texto: textoFinal, animar: true }]);
    } catch (error) {
      setMensajes((prev) => [
        ...prev,
        { rol: "assistant", texto: "Ha habido un error de conexión. Por favor, inténtalo de nuevo.", animar: true },
      ]);
    } finally {
      setCargando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  return (
    <>
      <button className="chat-fab" onClick={() => { if (!abierto) tocarSonido(); setAbierto(!abierto); }} aria-label="Abrir chat">
        {abierto ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M5 5h2v2H5zm4 4H7V7h2zm2 2H9V9h2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm2-2v2h-2V9zm2-2v2h-2V7zm0 0V5h2v2z" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 2H2v20h2V4h16v12H6v2H4v2h2v-2h16V2z" />
          </svg>
        )}
      </button>

      {abierto && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">AW</div>
            <div>
              <div className="chat-header-name">AlexWeb Asistente</div>
              <div className="chat-header-status">
                <span className="chat-status-dot"></span> En línea
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {mensajes.map((m, i) => (
              <div key={i} className={`chat-bubble-wrapper ${m.rol === "user" ? "user" : "assistant"}`}>
                <div className={`chat-bubble ${m.rol === "user" ? "bubble-user" : "bubble-assistant"}`}>
                  <BurbujaMensaje
                    texto={m.texto}
                    animar={m.animar ?? false}
                    onAnimacionFin={i > 0 ? () => setMensajes(prev => prev.map((msg, idx) => idx === i ? { ...msg, animar: false } : msg)) : undefined}
                  />
                </div>
              </div>
            ))}
            {cargando && (
              <div className="chat-bubble-wrapper assistant">
                <div className="chat-bubble bubble-assistant">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={cargando || enviado}
            />
            <button
              className="chat-send-btn"
              onClick={enviarMensaje}
              disabled={cargando || !input.trim() || enviado}
              aria-label="Enviar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}