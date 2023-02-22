import './Footer.css'

function Footer() {
    return (
      <footer className="footer conteiner-padding">
       <p className="footer__text footer__text_black">Учебный проект Яндекс.Практикум х BeatFilm.</p>
       <section className = "footer__nav">
          <p className="footer__text">&copy;2020</p>
          <ul className='navigation'>
             <li><p className='navigation__link footer__text'>Яндекс.Практикум</p></li>
             <li><p className='navigation__link footer__text'>Github</p></li>
          </ul>
      </section>
      </footer>
    );
  }
  
  export default Footer;