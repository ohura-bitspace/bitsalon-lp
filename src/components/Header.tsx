import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner container">
        <Link className="header__logo" to="/" aria-label="bitSalon トップページ">
          bitSalon
        </Link>
        <nav className="header__nav" aria-label="主要ナビゲーション">
          <Link className="header__nav-link" to="/#features">
            機能
          </Link>
          <Link className="header__nav-link" to="/#pricing">
            料金
          </Link>
        </nav>
        <Link className="header__cta btn btn--primary" to="/#contact">
          話を聞いてみる
        </Link>
      </div>
    </header>
  );
}
