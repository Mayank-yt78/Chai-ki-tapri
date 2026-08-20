import { Coffee, MapPin, ArrowDown } from "lucide-react";
import chaiTapri from "../assets/image.png";

function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${chaiTapri})`,
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">

        <div className="open-badge">
          <span className="pulse"></span>
          Tapri Open
        </div>

        <p className="hero-subtitle">
          एक कप चाय, सारी थकान दूर
        </p>

        <h1>
          चाय की <span>टपरी</span>
        </h1>

        <p className="hero-description">
          जहाँ हर कप में स्वाद है, हर बातचीत में अपनापन है,
          और हर शाम यादगार बन जाती है।
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            <Coffee size={20} />
            एक चाय देना
          </button>

          <button className="secondary-btn">
            <MapPin size={20} />
            हमारी टपरी
          </button>

        </div>

      </div>

      <div className="scroll-down">
        <span>Scroll to explore</span>
        <ArrowDown size={20} />
      </div>
    </section>
  );
}

export default Hero;