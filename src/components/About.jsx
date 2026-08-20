import { Music2, MessageCircle, Clock3 } from "lucide-react";
import "./About.css";

const features = [
  {
    icon: Music2,
    title: "Chai & Chill",
    description:
      "A carefully selected soundtrack to bring the warmth, calm, and familiar vibe of an Indian chai tapri to your screen.",
  },
  {
    icon: MessageCircle,
    title: "Tapri Talks",
    description:
      "From college gossip to big life plans, every tapri has conversations that make you forget the time.",
  },
  {
    icon: Clock3,
    title: "Always Open",
    description:
      "No sign-up, no app, no rush. Just open the website, press play, and enjoy the tapri vibes anytime.",
  },
];

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        {/* Heading */}
        <div className="about-header">
          <span className="about-label">WELCOME TO</span>

          <h2>
            Chai Ki Tapri — A Little
            <br />
            Break From Everything
          </h2>

          <p>
            Chai Ki Tapri is a digital space inspired by one of India's
            simplest and most familiar experiences — sitting at a roadside
            chai tapri with a hot cup of chai, good music, and conversations
            that somehow last longer than planned. Press play, take a break,
            and enjoy the familiar atmosphere of your favourite tapri.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div className="feature-card" key={feature.title}>
                <div className="feature-icon">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Inspiration */}
        <p className="inspiration-note">
          Inspired by the idea behind{" "}
          <a
            href="https://deluxsalon.in/"
            target="_blank"
            rel="noreferrer"
          >
            Deluxe Saloon
          </a>
          , reimagined with our own love for India's chai tapri culture.
        </p>

      </div>
    </section>
  );
}

export default About;