import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const SYSTEM_PROMPT = `Eres el asistente virtual de AlexWeb, una empresa de desarrollo web freelance en Alicante, España. Tu nombre es Alex Assistant.

SERVICIOS Y PRECIOS:
- Landing Page Starter (2 semanas): desde 350€ — 1 sección larga, 3 secciones pequeñas, SEO, diseño responsive, formulario de contacto, enlaces a redes sociales.
- Sitio Web (1 mes): desde 750€ — hasta 5 páginas, SEO básico, blog autogestionable, mapa de ubicación. Es el más elegido.
- Mantenimiento y SEO básico: desde 40€/mes — actualizaciones, seguridad, pequeños ajustes.
- Mantenimiento y SEO premium: desde 65€/mes — soporte prioritario, disponibilidad 24h, actualizaciones constantes.
- Proyectos a medida con IA y tiendas online: precio a consultar.

TECNOLOGÍAS: React, HTML5, CSS3, JavaScript, Node.js, SQL, APIs REST.

COMPORTAMIENTO:
- Responde siempre en español, de forma cercana y profesional.
- Si el usuario pregunta por precios, explica los servicios con sus precios.
- Si el usuario muestra interés en contratar o pedir presupuesto, recoge su nombre, email y descripción del proyecto de forma natural en la conversación — uno a uno, no todos a la vez.
- Cuando tengas nombre, email y descripción del proyecto, confirma al usuario que le enviarás la consulta y termina con el mensaje exacto: "ENVIAR_CONSULTA|nombre|email|descripcion" (sin comillas, sin saltos de línea, al final del mensaje).
- Sé breve y directo. Máximo 3-4 frases por respuesta.
- No inventes servicios ni precios que no estén en la lista.`;

let sonidoAutoplayReproducido = false;

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

const reproducirSonidoApertura = () => {
  if (sonidoAutoplayReproducido) return;
  sonidoAutoplayReproducido = true;
  tocarSonido();
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
    const timer = setTimeout(() => {
      setAbierto(true);
      reproducirSonidoApertura();
    }, 2000);

    // Los navegadores bloquean AudioContext sin interacción previa del usuario.
    // Este listener reproduce el sonido en el primer toque si aún no ha sonado.
    const onPrimeraInteraccion = () => {
      reproducirSonidoApertura();
      document.removeEventListener("pointerdown", onPrimeraInteraccion);
    };
    document.addEventListener("pointerdown", onPrimeraInteraccion);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("pointerdown", onPrimeraInteraccion);
    };
  }, []);

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