import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Kütüphane</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/authors">Yazarlar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/publishers">Yayımcılar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Kategoriler</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">Kitaplar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/borrows">Kitap Alma</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
