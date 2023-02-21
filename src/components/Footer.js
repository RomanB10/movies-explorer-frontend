import './Footer.css'

function Footer() {
    return (
      <footer className="footer root__section">
       <p className="footer__text-black">Учебный проект Яндекс.Практикум х BeatFilm.</p>
       <section className = "footer__nav">
          <p className="footer__author">&copy;2023</p>
          <ul className='navigation'>
             <li><p className='navigation__link'>Яндекс.Практикум</p></li>
             <li><p className='navigation__link'>Github</p></li>
          </ul>
      </section>
      </footer>
    );
  }
  
  export default Footer;