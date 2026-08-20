import { Menu, X, Coffee } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Home", "हमारी टपरी", "Menu", "Gallery", "Contact"];

  return (
    <nav className="navbar">
      <div className="nav-container">

        <a href="/" className="logo">
          <Coffee size={28} />
          <span>चाय की टपरी</span>
        </a>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <a href={`#${item}`} key={item}>
              {item}
            </a>
          ))}
        </div>

        <button
          className="nav-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <a
              href={`#${item}`}
              key={item}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;