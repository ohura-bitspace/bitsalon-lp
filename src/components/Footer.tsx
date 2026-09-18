import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__info">
          <p className="footer__brand">bitSpace</p>
          <p>サービス名 bitSalon</p>
          <p>
            連絡先{' '}
            <a className="footer__link" href="mailto:bitsalon@bitspace.jp">
              bitsalon@bitspace.jp
            </a>
          </p>
        </div>
        <div className="footer__meta">
          <Link className="footer__link" to="/tokushoho">
            特定商取引法に基づく表記
          </Link>
          <p className="footer__copyright">© 2026 bitSpace</p>
        </div>
      </div>
    </footer>
  );
}
