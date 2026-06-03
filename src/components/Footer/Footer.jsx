import "./Footer.css";

function Footer() {
  return(
    <footer className="footer">
      <p className="footer__copyright">
          Developed by
          <a
            href="https://github.com/n817"
            className="footer__author"
            target="_blank"
          >
            n817
          </a>
      </p>
      <p className="footer__year">2026</p>
    </footer>
  )
}

export default Footer;