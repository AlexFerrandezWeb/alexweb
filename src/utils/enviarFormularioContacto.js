const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const AUTOREPLY_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const TIPOS_PROYECTO = {
  landing: 'Landing Page',
  sitioweb: 'Sitio Web',
  mantenimiento: 'Mantenimiento',
  chatbot: 'ChatBot',
  otro: 'Otro',
};

export const enviarFormularioContacto = async ({ nombre, email, prefijo, telefono, tipoProyecto, mensaje }) => {
  const { default: emailjs } = await import("@emailjs/browser");

  const tipoLabel = TIPOS_PROYECTO[tipoProyecto] || tipoProyecto || 'No especificado';
  const telefonoTexto = telefono?.trim() ? `${prefijo || '+34'} ${telefono}` : 'No facilitado';
  const mensajeCompleto =
    `Tipo de proyecto: ${tipoLabel}\n` +
    `Teléfono: ${telefonoTexto}\n\n` +
    `Mensaje:\n${mensaje}`;

  // 1. Aviso a Alex con los datos del formulario
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: nombre,
      from_email: email,
      message: mensajeCompleto,
      to_name: "Alex",
    },
    PUBLIC_KEY
  );

  // 2. Auto-reply al cliente confirmando la recepción
  // No se propaga el error: si esto falla, el formulario sigue contando como enviado
  // (Alex ya tiene el aviso).
  if (AUTOREPLY_TEMPLATE_ID) {
    try {
      await emailjs.send(
        SERVICE_ID,
        AUTOREPLY_TEMPLATE_ID,
        {
          to_name: nombre,
          to_email: email,
        },
        PUBLIC_KEY
      );
    } catch (error) {
      console.error('Auto-reply al cliente falló:', error);
    }
  }
};
