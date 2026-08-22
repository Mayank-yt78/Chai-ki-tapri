import { useEffect, useState } from "react";
import { Coffee, MapPin, ArrowDown, Clock } from "lucide-react";
import socket from "../socket";

import morningChai from "../assets/morning-chai.png";
import afternoonChai from "../assets/image.png";
import nightChai from "../assets/night-chai.png";

function Hero() {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // ================= LIVE AUDIENCE =================

  useEffect(() => {
    socket.on("audienceCount", (count) => {
      setOnlineUsers(count);
    });

    return () => {
      socket.off("audienceCount");
    };
  }, []);

  // ================= LIVE INDIA TIME =================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get current hour in India
  const indiaHour = Number(
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    }).format(currentTime)
  );

  // ================= TIME BASED CONTENT =================

  let backgroundImage = afternoonChai;
  let chaiTime = "दोपहर वाली चाय";
  let tagline = "दोपहर की थकान मिटाए, एक गरमा गरम चाय हो जाए ☕";

  if (indiaHour >= 5 && indiaHour < 12) {
    backgroundImage = morningChai;
    chaiTime = "सुबह वाली चाय";
    tagline = "सुबह की पहली चुस्की, दिन की सबसे अच्छी शुरुआत ☕";
  } else if (indiaHour >= 12 && indiaHour < 18) {
    backgroundImage = afternoonChai;
    chaiTime = "दोपहर वाली चाय";
    tagline = "दोपहर की थकान मिटाए, एक गरमा गरम चाय हो जाए ☕";
  } else {
    backgroundImage = nightChai;
    chaiTime = "रात वाली चाय";
    tagline = "रात की बातें और हाथों में गरमा गरम चाय ☕";
  }

  // Format India time
  const formattedTime = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(currentTime);

  return (
    <section
      className="hero"
      id="top"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">

        {/* Open + Live Audience */}

        <div className="open-badge">
          <span className="pulse"></span>

          <span>Tapri Open</span>

          <span className="online-count">
            · {onlineUsers} online
          </span>
        </div>


        {/* Time Based Chai */}

        <p className="hero-subtitle">
          {chaiTime}
        </p>


        {/* Main Heading */}

        <h1>
          चाय की <span>टपरी</span>
        </h1>


        {/* Dynamic Description */}

        <p className="hero-description">
          {tagline}
        </p>


        {/* India Current Time */}

        <div className="india-time">
          <Clock size={16} />

          <span>India Time · {formattedTime}</span>
        </div>


        {/* Buttons */}

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


      {/* Scroll Down */}

      <div className="scroll-down">
        <span>Scroll to explore</span>
        <ArrowDown size={20} />
      </div>
    </section>
  );
}

export default Hero;