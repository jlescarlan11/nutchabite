import React, { useState } from "react";
import styles from "./styles/ContactNewsletter.module.css";
import { HiMail, HiUser } from "react-icons/hi";

type TabType = "newsletter" | "contact";

const ContactNewsletter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("newsletter");
  const [newsletterResponse, setNewsletterResponse] = useState<string>("");
  const [contactResponse, setContactResponse] = useState<string>("");

  const handleTabChange = (tab: TabType) => setActiveTab(tab);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your newsletter signup logic here.
    setNewsletterResponse("Thank you for subscribing to our newsletter!");
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your contact form submission logic here.
    setContactResponse(
      "Thank you for contacting us! We'll get back to you soon."
    );
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.headline}>Stay Connected with Nutcha Bites</h2>
        <p className={styles.subheadline}>
          Experience the vibrant fusion of matcha and Iloilo’s finest
          bandi—subscribe for exclusive updates, special offers, and more!
        </p>

        <div className={styles.tabs}>
          <button
            onClick={() => handleTabChange("newsletter")}
            className={`${styles.tabButton} ${
              activeTab === "newsletter" ? styles.activeTab : ""
            }`}
          >
            Newsletter
          </button>
          <button
            onClick={() => handleTabChange("contact")}
            className={`${styles.tabButton} ${
              activeTab === "contact" ? styles.activeTab : ""
            }`}
          >
            Contact Us
          </button>
        </div>

        <div className={styles.formContainer}>
          {activeTab === "newsletter" ? (
            newsletterResponse ? (
              <div className={styles.responseMessage}>{newsletterResponse}</div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="newsletter-email" className={styles.label}>
                    Email Address
                  </label>
                  <div className={styles.inputWrapper}>
                    <HiMail className={styles.icon} aria-hidden="true" />
                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="Enter your email"
                      className={styles.input}
                      aria-required="true"
                    />
                  </div>
                </div>
                <button type="submit" className={styles.submitButton}>
                  Subscribe Now
                </button>
              </form>
            )
          ) : contactResponse ? (
            <div className={styles.responseMessage}>{contactResponse}</div>
          ) : (
            <form onSubmit={handleContactSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="contact-name" className={styles.label}>
                  Your Name
                </label>
                <div className={styles.inputWrapper}>
                  <HiUser className={styles.icon} aria-hidden="true" />
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your Name"
                    className={styles.input}
                    aria-required="true"
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="contact-email" className={styles.label}>
                  Email Address
                </label>
                <div className={styles.inputWrapper}>
                  <HiMail className={styles.icon} aria-hidden="true" />
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Your Email Address"
                    className={styles.input}
                    aria-required="true"
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="contact-message" className={styles.label}>
                  How can we help?
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Your Message"
                  rows={4}
                  className={styles.textarea}
                  aria-required="true"
                ></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className={styles.socialMedia}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className={styles.iconSVG}
            >
              <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-2.9h2v-2.1c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.6h2.2l-.3 2.9h-1.9v7A10 10 0 0022 12z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className={styles.iconSVG}
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className={styles.iconSVG}
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5A4.25 4.25 0 0020.5 16.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactNewsletter;
