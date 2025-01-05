import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link className="logo" to="/">FlixMania</Link>
        <nav>
          <Link className="nav-link" to="/favoritos">Meus filmes</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
