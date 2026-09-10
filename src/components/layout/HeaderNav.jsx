import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './HeaderNav.css'
import { enlaceWhatsApp, registrarClicWhatsApp } from '../../utils/whatsapp'
import { avisarMenuAbierto, EVENTO_CHAT_ABIERTO } from '../../utils/eventosUi'
import { sonarTecla } from '../../utils/sonidoTecla'

export const HeaderNav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pulsacionesLogo, setPulsacionesLogo] = useState(0)
  const [anchoLetras, setAnchoLetras] = useState(null)
  const [logoAmaga, setLogoAmaga] = useState(false)
  const refLogo = useRef(null)
  const refHueco = useRef(null)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      // Un salto de mas de 300px de golpe no lo hace una rueda ni un dedo: es
      // la pagina moviendose sola (un ancla, una vuelta atras, el navegador
      // recuperando la posicion guardada). Si se cuenta como "el usuario esta
      // bajando", la cabecera se esconde sin que nadie la haya mandado
      // esconder y se queda fuera de pantalla hasta el siguiente scroll hacia
      // arriba: desde fuera parece que la cabecera se ha quedado pillada.
      if (Math.abs(currentY - lastScrollY.current) > 300) {
        // Ante un salto siempre se muestra: si la pagina se ha movido sola, lo
        // seguro es que la cabecera este a la vista, no escondida.
        setHidden(false)
        document.body.classList.remove('nav-hidden')
        lastScrollY.current = currentY
        return
      }
      const isHidden = currentY > lastScrollY.current && currentY > 80
      setHidden(isHidden)
      document.body.classList.toggle('nav-hidden', isHidden)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Al cambiar de pagina la cabecera vuelve siempre a la vista. Si se llega a
  // otra pagina con la cabecera escondida, no hay forma de volver a sacarla mas
  // que haciendo scroll hacia arriba, y en una pagina que empieza arriba del
  // todo no hay hacia donde subir: la navegacion se queda sin cabecera.
  useEffect(() => {
    lastScrollY.current = window.scrollY
    setHidden(false)
    document.body.classList.remove('nav-hidden')
  }, [pathname])

  // Para que la caja se pueda cerrar hay que saber cuanto miden las letras: de
  // "auto" a 0 no se puede animar, hace falta un numero. Se mide una sola vez,
  // con las fuentes ya cargadas, porque medir antes da el ancho de la fuente de
  // repuesto. El logo mide igual en movil que en escritorio, asi que no hay que
  // volver a medir al girar el telefono.
  useEffect(() => {
    const medir = () => {
      if (!refHueco.current || !refLogo.current) return
      setAnchoLetras(`${refHueco.current.getBoundingClientRect().width}px`)
      // Y se le reserva al logo el sitio que ocupa entero: al encogerse la caja,
      // sin esto se moveria el menu de al lado cada vez que alguien lo pulsa.
      refLogo.current.style.minWidth = `${refLogo.current.getBoundingClientRect().width}px`
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir)
    else medir()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  // Estando ya en la home, pulsar el logo no navega a ninguna parte, asi que no
  // haria nada: ahi lo que se espera es volver arriba del todo.
  const irAlInicio = () => {
    closeMenu()
    // Estando ya en el inicio el logo no lleva a ninguna parte, asi que en vez
    // de meterse del todo hace el amago: las letras tiran hacia dentro, la
    // barra no las deja y vuelven. Es la manera de contestar "ya estas aqui"
    // sin decir nada.
    const yaEstaEnInicio = pathname === '/'
    setLogoAmaga(yaEstaEnInicio)
    // El contador es lo que hace que la animacion se pueda repetir: cambia la
    // key de las letras, React las vuelve a montar y la animacion arranca de
    // cero. Volviendo a poner la misma clase no se reiniciaria.
    setPulsacionesLogo(n => n + 1)
    if (yaEstaEnInicio) window.scrollTo(0, 0)
  }

  useEffect(() => {
    const cerrar = () => setMenuOpen(false)
    window.addEventListener(EVENTO_CHAT_ABIERTO, cerrar)
    return () => window.removeEventListener(EVENTO_CHAT_ABIERTO, cerrar)
  }, [])

  // Al abrir el menu avisamos para que el ChatBot se cierre: si no, se queda
  // flotando por encima y el menu aparece detras.
  const toggleMenu = () => setMenuOpen(prev => {
    if (!prev) avisarMenuAbierto()
    return !prev
  })

  // Ojo con la clase site-header: no es decorativa, los estilos de esta
  // cabecera cuelgan de ella. Antes iban sobre la etiqueta `header` a secas, así
  // que cualquier otro <header> de la web (el de un artículo del blog, por
  // ejemplo) se volvía sticky, de 70px de alto y con su contenido en fila.
  return (
    <header className={`site-header${hidden ? ' header-hidden' : ''}`}>
      {/* El logo lleva al inicio, que es lo que todo el mundo espera de un logo
          en una cabecera. Sus estilos ya venian preparados para ser un enlace
          (cursor de mano y sin subrayado), asi que solo cambia la etiqueta.
          El aria-label es porque el texto del logo, leido en voz alta, seria
          "barra alexweb guion bajo": a un lector de pantalla hay que decirle a
          donde lleva. */}
      <Link
        to="/"
        className="logo"
        ref={refLogo}
        onClick={irAlInicio}
        draggable={false}
        aria-label="Ir al inicio"
      >
        <div className="logo-canvas">
          {/* La barra se queda quieta y las letras se meten por detras de ella.
              Van dentro de un hueco que las recorta, y lo que se anima es el
              grupo entero: asi la caja del logo mide siempre lo mismo y la
              cabecera no pega ningun salto. */}
          <span className="logo-wm">
            /
            <span
              key={pulsacionesLogo}
              ref={refHueco}
              className={`logo-hueco${pulsacionesLogo ? (logoAmaga ? ' logo-hueco-amaga' : ' logo-hueco-animando') : ''}`}
              style={anchoLetras ? { '--ancho-letras': anchoLetras } : undefined}
            >
              <span className={`logo-letras${pulsacionesLogo ? (logoAmaga ? ' logo-letras-amagan' : ' logo-letras-animando') : ''}`}>
                <span className="logo-v">a</span>lex<span className="logo-v">w</span>eb<span className="logo-cursor">_</span>
              </span>
            </span>
          </span>
        </div>
      </Link>

      <button
        className={`hamburger${menuOpen ? ' open' : ''}`}
        onClick={toggleMenu}
        aria-label="Abrir menú"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={menuOpen ? 'open' : ''}>
        <ul>
          {/* draggable={false} en todos: sin esto, arrastrar un enlace es una
              funcion del navegador (soltarlo en marcadores u otra pestania) y al
              ir rapido de uno a otro con el boton pulsado se queda en modo
              arrastre, con el cursor en manita y sin aceptar clicks. El CSS ya
              lo corta en Chrome y Safari; esto es para Firefox. */}
          <li><NavLink to="/" onClick={closeMenu} draggable={false}>Inicio</NavLink></li>
          <li><NavLink to="/servicios" onClick={closeMenu} draggable={false}>Servicios</NavLink></li>
          <li><NavLink to="/sobreMi" onClick={closeMenu} draggable={false}>Sobre Mi</NavLink></li>
          <li><NavLink to="/blog" onClick={closeMenu} draggable={false}>Blog</NavLink></li>
          <li>
            {/* El clac va en el pointerdown y no en el click: la tecla suena
                cuando baja, igual que una de verdad, no cuando se suelta. */}
            <NavLink
              to="/contacto"
              onPointerDown={sonarTecla}
              onClick={closeMenu}
              draggable={false}
              className={({ isActive }) => isActive ? 'nav-contacto active' : 'nav-contacto'}
            >
              Contacto
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
                <title>forward</title>
                <path fill="currentColor" d="M14 5h-2v4H6v2H4v6h2v-2h6v4h2v-2h2v-2h2v-2h2v-2h-2V9h-2V7h-2z"/>
              </svg>
            </NavLink>
          </li>
        </ul>

        <div className="nav-social">
          <a
            href={enlaceWhatsApp()}
            target="_blank"
            rel="noreferrer"
            draggable={false}
            aria-label="Escribir por WhatsApp"
            onClick={() => registrarClicWhatsApp('menu_cabecera')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/alejandro-ferr%C3%A1ndez-ju%C3%A1rez-a457a53b4" target="_blank" rel="noreferrer"
            draggable={false} aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://github.com/AlexFerrandezWeb" target="_blank" rel="noreferrer"
            draggable={false} aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
        </div>
      </nav>

      {menuOpen && <div className="nav-overlay" onClick={closeMenu} />}
    </header>
  )
}
