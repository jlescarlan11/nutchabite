import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQData {
  question: string;
  answer: string;
}

const faqData: FAQData[] = [
  {
    question: "What are Nutcha Bites?",
    answer:
      "Nutcha Bites are our unique, artisanal treats that blend premium matcha with the traditional flavors of Iloilo’s bandi. They offer a modern twist on a beloved local delicacy.",
  },
  {
    question: "Why did you combine matcha with bandi?",
    answer:
      "We wanted to celebrate both the health benefits and vibrant taste of matcha along with the rich, storied flavor of Iloilo’s bandi. This fusion creates a one-of-a-kind snacking experience that honors tradition while embracing innovation.",
  },
  {
    question: "What ingredients do you use?",
    answer:
      "Our Nutcha Bites are crafted using high-quality matcha powder, time-honored bandi recipes, natural sweeteners, and locally sourced ingredients. (Check our Ingredients Page for full details and allergen information.)",
  },
  {
    question: "Are Nutcha Bites suitable for dietary restrictions?",
    answer:
      "We strive to accommodate various dietary needs. Currently, our Nutcha Bites are [gluten-free/vegan/etc.]. If you have any concerns, please refer to our ingredient list or contact our support team.",
  },
  {
    question: "How should I store my Nutcha Bites?",
    answer:
      "For optimal freshness, store Nutcha Bites in a cool, dry place. Once opened, keep them in an airtight container. Refrigeration can help extend shelf life if needed.",
  },
  {
    question: "What are your shipping policies?",
    answer:
      "Orders are processed within 2-3 business days, with standard shipping taking an additional 3-5 business days. We provide tracking information once your order is on its way. For international orders or expedited shipping, please see our Shipping Information.",
  },
  {
    question: "Do you offer bulk or wholesale orders?",
    answer:
      "Yes! We’re happy to provide special pricing for bulk or wholesale orders. Please get in touch with our customer service team for more details.",
  },
  {
    question: "What if I’m not satisfied with my purchase?",
    answer:
      "Your satisfaction is our priority. If you’re not happy with your Nutcha Bites, contact us within 30 days of purchase, and we’ll work with you to resolve any issues.",
  },
];

/* -------------------------------------------------------------------------- */
/*                           Helper Functions                                 */
/* -------------------------------------------------------------------------- */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
}

function highlightText(text: string, searchTerm: string): React.ReactNode {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-[var(--color-accent-20)] px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

/* -------------------------------------------------------------------------- */
/*                            FAQItem Component                               */
/* -------------------------------------------------------------------------- */
interface FAQItemProps {
  faq: FAQData;
  index: number;
  isActive: boolean;
  onToggle: (index: number) => void;
  searchTerm: string;
}

const FAQItem: React.FC<FAQItemProps> = ({
  faq,
  index,
  isActive,
  onToggle,
  searchTerm,
}) => {
  return (
    <article className="bg-[var(--color-primary)] rounded-xl shadow-lg overflow-hidden">
      <header>
        <h3>
          <button
            id={`faq-question-${index}`}
            onClick={() => onToggle(index)}
            aria-expanded={isActive}
            aria-controls={`faq-panel-${index}`}
            className="
              w-full flex justify-between items-center p-6 text-left
              text-lg font-medium
              text-[var(--color-secondary-80)]
              hover:bg-[var(--color-primary-90)]
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--color-accent)]
              transition-colors duration-300
            "
          >
            <span>{highlightText(faq.question, searchTerm)}</span>
            <svg
              className={`
                w-6 h-6 transform transition-transform duration-300
                ${isActive ? "rotate-180" : ""}
              `}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </h3>
      </header>
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden border-t border-[var(--color-secondary-10)]"
          >
            <div className="p-6 pt-4 text-[var(--color-secondary-70)]">
              <p>{highlightText(faq.answer, searchTerm)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

/* -------------------------------------------------------------------------- */
/*                           Main FAQ Component                               */
/* -------------------------------------------------------------------------- */
const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleFAQ = (index: number): void => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Filter FAQ data based on search term matching question OR answer text
  const filteredFaqData = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      className="
        max-w-3xl mx-auto p-6
        bg-[var(--color-primary-80)]
        text-[var(--color-secondary-80)]
      "
      aria-labelledby="faq-title"
    >
      <h2
        id="faq-title"
        className="
          text-4xl font-extrabold text-center mb-8
          text-[var(--color-tertiary)]
        "
      >
        Frequently Asked Questions
      </h2>

      <div className="mb-8">
        <label htmlFor="faq-search" className="sr-only">
          Search FAQs
        </label>
        <input
          id="faq-search"
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search FAQs"
          className="
            w-full p-3
            border border-[var(--color-secondary-20)]
            rounded-xl shadow-sm
            focus:outline-none focus:ring-2
            focus:ring-[var(--color-accent)]
          "
        />
      </div>

      <div className="space-y-6">
        {filteredFaqData.length > 0 ? (
          filteredFaqData.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isActive={activeIndex === index}
              onToggle={toggleFAQ}
              searchTerm={searchTerm}
            />
          ))
        ) : (
          <p className="text-center text-[var(--color-secondary-60)]">
            No FAQs found.
          </p>
        )}
      </div>
    </section>
  );
};

export default FAQ;
