import { Menu, X, Coffee } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "हमारी टपरी", href: "#top" },
    // { label: "Menu", href: "#Menu" },
    // { label: "Gallery", href: "#Gallery" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">

        <a href="#top" className="logo">
          <Coffee size={28} />
          <span>चाय की टपरी</span>
        </a>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
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
              href={item.href}
              key={item.label}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;