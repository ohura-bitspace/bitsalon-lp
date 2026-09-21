import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__info">
          <p className="footer__brand">bitSalon</p>
          <p>サロン向け予約・顧客管理システム</p>
          <p className="footer__operator">運営: bitSpace</p>
        </div>
        <div className="footer__meta">
          <Link className="footer__link" to="/tokushoho#contact-email">
            メールでのお問い合わせ
          </Link>
          <Link className="footer__link" to="/privacy">
            プライバシーポリシー
          </Link>
          <Link className="footer__link" to="/tokushoho">
            特定商取引法に基づく表記
          </Link>
          <p className="footer__copyright">© 2026 bitSpace</p>
        </div>
      </div>
    </footer>
  );
}
