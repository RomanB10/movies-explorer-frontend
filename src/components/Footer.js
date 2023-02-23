import './Footer.css'

function Footer() {
    return (
      <footer className="footer conteiner-padding">
       <p className="footer__text footer__text_black">Учебный проект Яндекс.Практикум х BeatFilm.</p>
       <section className = "footer__nav">
          <p className="footer__text">&copy;2020</p>
          <ul className='navigation'>
             <a className='navigation__link footer__text' href="https://practicum.yandex.ru/" target='_blank' rel="noopener noreferrer">Яндекс.Практикум</a>
             <a className='navigation__link footer__text' href="https://github.com/RomanB10?tab=repositories" target='_blank' rel="noopener noreferrer">Github</a>
          </ul>
      </section>
      </footer>
    );
  }
  
  export default Footer;