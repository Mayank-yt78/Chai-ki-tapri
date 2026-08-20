import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import "./FAQ.css";

const faqs = [
  {
    question: "What is Chai Ki Tapri?",
    answer:
      "Chai Ki Tapri is a digital space inspired by the familiar experience of sitting at an Indian roadside chai stall — with music, chai vibes, and conversations.",
  },
  {
    question: "Is Chai Ki Tapri free to use?",
    answer:
      "Yes. Chai Ki Tapri is completely free to enjoy. Just open the website, press play, and relax.",
  },
  {
    question: "Where does the music come from?",
    answer:
      "The music is played through our integrated player, bringing the sound and atmosphere of a real chai tapri into your browser.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account, sign-up, or app is required. Simply visit Chai Ki Tapri and enjoy the experience.",
  },
  {
    question: "What inspired Chai Ki Tapri?",
    answer:
      "The experience is inspired by India's chai tapri culture and the creative idea behind Deluxe Saloon, reimagined with our own chai, music, and tapri atmosphere.",
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">

        {/* Header */}
        <div className="faq-header">
          <span className="faq-label">FAQ</span>

          <h2>
            Got Questions?
            <br />
            We Have Chai & Answers.
          </h2>

          <p>
            Everything you need to know about the Chai Ki Tapri experience.
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                className={`faq-item ${isActive ? "active" : ""}`}
                key={index}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>

                  <div className="faq-icon">
                    {isActive ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </div>
                </button>

                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="faq-footer">
          Still curious? Grab a cup of chai and explore the tapri.
        </p>

      </div>
    </section>
  );
}

export default FAQ;