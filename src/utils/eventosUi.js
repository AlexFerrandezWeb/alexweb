// El menu movil y el ChatBot son componentes hermanos, sin estado compartido, y
// se pisan: el chat vive en z-index 1099 y el menu en 999, asi que abrir la
// hamburguesa con el chat abierto deja el menu por detras. En vez de subir
// z-index (que solo mueve el problema al siguiente flotante) o de levantar el
// estado hasta root, cada uno avisa al abrirse y el otro se cierra solo.
//
// El aviso va en los dos sentidos porque con el menu abierto el boton del chat
// sigue por encima del overlay y es pulsable: sin la vuelta se llega al mismo
// estado por el otro lado. Manda siempre el ultimo que se abre.
export const EVENTO_MENU_ABIERTO = 'alexweb:menu-abierto'
export const EVENTO_CHAT_ABIERTO = 'alexweb:chat-abierto'

export const avisarMenuAbierto = () => {
  window.dispatchEvent(new CustomEvent(EVENTO_MENU_ABIERTO))
}

export const avisarChatAbierto = () => {
  window.dispatchEvent(new CustomEvent(EVENTO_CHAT_ABIERTO))
}
