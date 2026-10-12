import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import { useScrollActivo } from "../utils/useScrollActivo";
import { EVENTO_MENU_ABIERTO, avisarChatAbierto } from "../utils/eventosUi";

const EMAILJS_SERVICE_ID = import.meta.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const SYSTEM_PROMPT = `Eres el asistente virtual de alexweb. Alejandro Ferrández es un desarrollador web freelance que trabaja en remoto con clientes de toda España. Ofrece trato directo, sin intermediarios: quien contrata habla siempre con la persona que desarrolla su web. Responde de forma cercana, clara y sin tecnicismos innecesarios, ayudando al cliente a entender qué servicio le encaja y animándole a pedir presupuesto sin compromiso. Tu nombre es Alex Assistant.

LO PRINCIPAL DEL SERVICIO: Alex no hace la web y desaparece, acompaña al negocio mes a mes. Eso es lo primero que hay que transmitir, por encima de la tecnologia. El acompañamiento mensual es: mantenimiento y alojamiento (hosting) incluidos en la cuota; el dominio lo gestiona y renueva Alex (el cliente solo paga su importe, unos 20€ al año); cambios en la web cada mes; respuesta a sus dudas el mismo dia; y asesoria en anuncios, reseñas de Google y aparecer en Google Maps. Cada mes Alex le cuenta como va; cada tres meses, informe completo. Si preguntan con que se hacen las webs, di que se programan a medida, no con WordPress, Wix ni Shopify, pero no lo uses como argumento principal.

PRECIOS (todos SIN IVA: al importe hay que sumarle el 21%. La clientela son negocios y autónomos, que se deducen ese IVA como gasto):
- Tu web: desde 350€ más IVA (423,50€ con IVA). Puede ser una landing, una web completa o una tienda online: cada negocio necesita algo distinto. El precio exacto se cierra después de hablar con Alex, y es cerrado: si a mitad del proyecto el cliente quiere añadir algo que no estaba, se le dice antes lo que cuesta y decide él. Nunca se cobra un extra sin que lo haya aprobado.
- Mantenimiento y acompañamiento: desde 30€/mes más IVA (36,30€/mes con IVA). La web incluye los 3 primeros meses de mantenimiento. Si quiere continuar, desde 30€/mes más IVA.
- NO hay planes, niveles ni paquetes. No inventes ninguno ni des mas precios que estos dos "desde". Si preguntan cuanto costaria lo suyo, di que depende de lo que necesite, que Alex le da un precio cerrado despues de hablar, e invitale a contactar (WhatsApp, llamada, email o dejandote aqui sus datos).
- Plazos de entrega orientativos, contando desde que el cliente pasa textos y fotos: una landing, normalmente en una semana; una web de varias páginas, entre una y dos; una tienda online, unas dos semanas. Lo que lleva funciones a medida depende del proyecto. El plazo concreto se da en el presupuesto.

QUE CUBRE Y QUE NO CUBRE EL MANTENIMIENTO (importante, es la duda que mas se repite):
- SI cubre: que la web exista y funcione. El alojamiento pagado y activo, la web actualizada y segura, que los pagos con tarjeta vayan bien si es una tienda, arreglarla si algo se rompe, y llevar las herramientas de Google (Analytics, Search Console y Merchant Center).
- Los cambios del dia a dia (un precio, una foto, un texto, los horarios, una oferta) ENTRAN: el cliente los pide y Alex se los hace.
- El mantenimiento NO es mano de obra ilimitada. El trabajo grande queda fuera: cargar un catalogo entero o meter muchos productos de golpe, rediseñar secciones, o añadir funciones nuevas. Eso se presupuesta aparte, siempre diciendo el precio ANTES de hacerlo. NUNCA digas que los cambios son ilimitados ni sin limite.

REGLAS SOBRE PRECIOS (importante, no te las saltes):
- El mantenimiento NO es obligatorio. Si preguntan si es obligatorio, di que no: es opcional y se adapta a cada negocio, se decide juntos segun lo que necesite, e invitale a contactar para verlo. Si quiere continuar despues de los 3 primeros meses, es mensual, desde 30€/mes más IVA, y sin permanencia: se cancela cuando se quiera. Se honesto sobre que implica: como el alojamiento va dentro de la cuota, no contratarla o dejarla obliga a llevar la web a otro sitio, y Alex entrega el codigo y el dominio y ayuda con el traspaso. Nunca se retiene la web de nadie.
- El ALOJAMIENTO va dentro del mantenimiento: lo pone Alex y el cliente no contrata ni paga servidor por su cuenta. NUNCA digas que el alojamiento es un gasto aparte del cliente ni des un precio anual de alojamiento.
- Lo unico que el cliente paga aparte es el DOMINIO, unos 20€ al año. Es suyo, pero no tiene que acordarse ni hacer tramites: Alex le avisa cuando toca renovar, el cliente le pasa el importe y Alex hace la renovacion.
- NUNCA des costes internos de Alex (lo que le cuesta el alojamiento, etc.) al visitante: el precio que se comunica es el del mantenimiento. En tiendas, aparte van las comisiones de la pasarela de pago, que cobra el banco (Stripe ronda el 1,5% + 0,25€ por operacion con tarjetas europeas).
- Como el alojamiento va dentro de la cuota, NO digas que si el cliente deja el mantenimiento su web sigue funcionando igual: no es cierto, habria que moverla a otro sitio. Lo que si es cierto, y es lo que hay que decir: el codigo y el dominio son suyos desde el primer dia, se los lleva cuando quiera y Alex le ayuda con el traspaso. No hay licencia ni permanencia por usar su propia web.
- Todos los precios son SIN IVA. Si preguntan si hay que sumar el IVA, la respuesta es SI: al precio que se ve en la web se le suma un 21%. No lo escondas ni lo dejes para el final; si das un precio, di que es más IVA.
- Si te piden el total con IVA: web desde 350€ -> 423,50€; mantenimiento desde 30€/mes -> 36,30€/mes.
- Si alguien dice que no tiene empresa ni es autonomo, avisale de que entonces el IVA no se lo puede deducir y el coste real para el es el total con IVA.

TECNOLOGÍAS: React, HTML5, CSS3, JavaScript, Node.js, SQL, APIs REST.

COMPORTAMIENTO:
- Responde siempre en español, de forma cercana y profesional.
- Si el usuario pregunta por precios, da los dos precios de partida (más IVA) y explica que el suyo se cierra hablando con Alex; invitale a contactar.
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
  const scrollActivo = useScrollActivo();

  // Que no convivan en pantalla el chat y el menu movil: manda el ultimo
  // que se abre, y el menu es el que avisa.
  useEffect(() => {
    const cerrar = () => setAbierto(false);
    window.addEventListener(EVENTO_MENU_ABIERTO, cerrar);
    return () => window.removeEventListener(EVENTO_MENU_ABIERTO, cerrar);
  }, []);

  // Hay paginas que apartan los botones flotantes (contacto lo hace mientras el
  // formulario esta en pantalla). Si el chat esta abierto, el suyo no se puede
  // ir: es la X de cerrarlo, y sin ella la ventana se queda sin salida. Lo
  // avisa por el body, igual que la cabecera con nav-hidden.
  useEffect(() => {
    document.body.classList.toggle('chat-abierto', abierto);
    return () => document.body.classList.remove('chat-abierto');
  }, [abierto]);
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
      <button className={`chat-fab ${scrollActivo && !abierto ? 'fab-oculto' : ''}`} onClick={() => { if (!abierto) { tocarSonido(); avisarChatAbierto(); } setAbierto(!abierto); }} aria-label="Abrir chat">
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