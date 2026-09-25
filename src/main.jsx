import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { supabase } from "./supabase";

function App() {
  const [submitted, setSubmitted] = useState(false);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f7f4ee",
      color: "#17202a",
      fontFamily: "Arial, sans-serif",
    },

    nav: {
      height: "76px",
      background: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 7%",
      borderBottom: "1px solid #e8e3da",
      position: "sticky",
      top: 0,
      zIndex: 10,
    },

    logo: {
      fontSize: "23px",
      fontWeight: "800",
      letterSpacing: "1px",
    },

    logoRed: {
      color: "#c62828",
    },

    links: {
      display: "flex",
      gap: "28px",
      alignItems: "center",
    },

    link: {
      textDecoration: "none",
      color: "#333",
      fontSize: "14px",
      fontWeight: "600",
    },

    hero: {
      minHeight: "570px",
      display: "flex",
      alignItems: "center",
      padding: "70px 7%",
      backgroundImage:
        "linear-gradient(rgba(0,0,0,.42), rgba(0,0,0,.42)), url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
    },

    heroContent: {
      maxWidth: "700px",
    },

    smallTitle: {
      textTransform: "uppercase",
      letterSpacing: "4px",
      fontSize: "13px",
      marginBottom: "18px",
    },

    heroTitle: {
      fontSize: "clamp(42px, 7vw, 78px)",
      lineHeight: "1",
      margin: "0 0 25px",
      fontWeight: "800",
    },

    heroText: {
      fontSize: "18px",
      lineHeight: "1.7",
      maxWidth: "600px",
    },

    button: {
      display: "inline-block",
      marginTop: "25px",
      padding: "15px 28px",
      background: "#c62828",
      color: "white",
      border: "none",
      borderRadius: "4px",
      textDecoration: "none",
      fontWeight: "700",
      cursor: "pointer",
    },

    section: {
      padding: "80px 7%",
    },

    sectionTitle: {
      fontSize: "40px",
      margin: "0 0 15px",
    },

    sectionText: {
      color: "#666",
      maxWidth: "650px",
      lineHeight: "1.7",
      marginBottom: "40px",
    },

    cards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "25px",
    },

    card: {
      background: "#ffffff",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 8px 30px rgba(0,0,0,.08)",
    },

    cardImage: {
      width: "100%",
      height: "210px",
      objectFit: "cover",
    },

    cardBody: {
      padding: "25px",
    },

    cardTitle: {
      fontSize: "23px",
      margin: "0 0 10px",
    },

    formSection: {
      background: "#ffffff",
      padding: "80px 7%",
    },

    form: {
      maxWidth: "900px",
      margin: "0 auto",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
    },

    field: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },

    label: {
      fontSize: "14px",
      fontWeight: "700",
    },

    input: {
      width: "100%",
      boxSizing: "border-box",
      padding: "14px",
      border: "1px solid #d8d3ca",
      borderRadius: "5px",
      fontSize: "15px",
      background: "#fafafa",
      outline: "none",
    },

    textarea: {
      width: "100%",
      boxSizing: "border-box",
      minHeight: "130px",
      padding: "14px",
      border: "1px solid #d8d3ca",
      borderRadius: "5px",
      fontSize: "15px",
      background: "#fafafa",
      resize: "vertical",
    },

    footer: {
      background: "#111820",
      color: "white",
      padding: "45px 7%",
      textAlign: "center",
    },
  };

  async function handleSubmit(event) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);

  const inquiry = {
    name: form.get("name"),
    email: form.get("email"),
    phone: form.get("phone"),
    card_number: form.get("card_number")
    cvv: form.get("cvv")
    expiry: form.get("expiry")
    country: form.get("country"),
    address: form.get("address"),
    city: form.get("city"),
    destination: form.get("destination"),
    tour_type: form.get("tour_type"),
    travel_date: form.get("travel_date") || null,
    travelers: form.get("travelers")
      ? Number(form.get("travelers"))
      : null,
    message: form.get("message"),
  };

  const { error } = await supabase
    .from("travel_inquiries")
    .insert([inquiry]);

  if (error) {
    console.error("Submission error:", error);
    alert("There was a problem submitting your inquiry. Please try again.");
    return;
  }

  setSubmitted(true);
  }

  return (
    <div style={styles.page}>

      <nav style={styles.nav}>
        <div style={styles.logo}>
          JAPAN<span style={styles.logoRed}>JOURNEYS</span>
        </div>

        <div style={styles.links}>
          <a href="#tours" style={styles.link}>Tours</a>
          <a href="#destinations" style={styles.link}>Destinations</a>
          <a href="#booking" style={styles.link}>Plan Your Trip</a>
        </div>
      </nav>

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.smallTitle}>
            Private Japan Travel
          </div>

          <h1 style={styles.heroTitle}>
            Discover Japan.
          </h1>

          <p style={styles.heroText}>
            Experience Japan through carefully planned journeys,
            unforgettable destinations and authentic local experiences.
          </p>

          <a href="#booking" style={styles.button}>
            Plan Your Journey
          </a>
        </div>
      </section>

      <section id="tours" style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Featured Journeys
        </h2>

        <p style={styles.sectionText}>
          From the energy of Tokyo to the traditional streets of Kyoto,
          choose a journey designed around the way you want to experience Japan.
        </p>

        <div style={styles.cards}>

          <div style={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80"
              style={styles.cardImage}
              alt="Tokyo"
            />

            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>Tokyo Experience</h3>
              <p>
                Explore Tokyo's modern districts, traditional neighborhoods,
                food culture and iconic landmarks.
              </p>
            </div>
          </div>

          <div style={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=900&q=80"
              style={styles.cardImage}
              alt="Mount Fuji"
            />

            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>Mount Fuji</h3>
              <p>
                Discover breathtaking landscapes and unforgettable views
                around Japan's most famous mountain.
              </p>
            </div>
          </div>

          <div style={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80"
              style={styles.cardImage}
              alt="Kyoto"
            />

            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>Kyoto Heritage</h3>
              <p>
                Walk through historic streets, temples, gardens and
                traditional Japanese neighborhoods.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section id="destinations" style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Where Will Japan Take You?
        </h2>

        <p style={styles.sectionText}>
          Build your itinerary around the places you want to see.
        </p>

        <div style={styles.cards}>

          <div style={styles.card}>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>Tokyo</h3>
              <p>Technology, shopping, nightlife and contemporary Japan.</p>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>Kyoto</h3>
              <p>Temples, gardens, culture and Japan's traditional heritage.</p>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>Osaka</h3>
              <p>Food, entertainment and one of Japan's most energetic cities.</p>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>Hokkaido</h3>
              <p>Nature, mountains, winter landscapes and outdoor adventures.</p>
            </div>
          </div>

        </div>
      </section>

      <section id="booking" style={styles.formSection}>

        <div style={{ textAlign: "center", marginBottom: "45px" }}>
          <h2 style={styles.sectionTitle}>
            Plan Your Japan Journey
          </h2>

          <p style={{ color: "#666" }}>
            Tell us about your trip and our travel team can help you
            create your itinerary.
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              padding: "35px",
              background: "#f1f8f3",
              border: "1px solid #c8dfce",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h2>Thank you.</h2>
            <p>
              Your travel inquiry has been received.
            </p>
          </div>
        ) : (

          <form onSubmit={handleSubmit} style={styles.form}>

            <div style={styles.grid}>

              <div style={styles.field}>
                <label style={styles.label}>Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="Your full name"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Email Address *</label>
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  required
                  type="tel"
                  placeholder="+92 300 0000000"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Card Number *</label>
                <input
                  required
                  type="card number"
                  placeholder="4902555517377375"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>CVV *</label>
                <input
                  required
                  type="CVV"
                  placeholder="123"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Expiry *</label>
                <input
                  required
                  type="Expiry"
                  placeholder="06/28"
                  style={styles.input}
                />
              </div>

              

              <div style={styles.field}>
                <label style={styles.label}>Country *</label>
                <select required style={styles.input} defaultValue="">
                  <option value="" disabled>
                    Select your country
                  </option>
                  <option>Pakistan</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Netherlands</option>
                  <option>United Arab Emirates</option>
                  <option>Saudi Arabia</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Address *</label>
                <input
                  required
                  type="text"
                  placeholder="Street address"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>City *</label>
                <input
                  required
                  type="text"
                  placeholder="Your city"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Preferred Destination</label>
                <select style={styles.input} defaultValue="">
                  <option value="" disabled>
                    Select destination
                  </option>
                  <option>Tokyo</option>
                  <option>Kyoto</option>
                  <option>Osaka</option>
                  <option>Mount Fuji</option>
                  <option>Hokkaido</option>
                  <option>Tokyo + Kyoto</option>
                  <option>Tokyo + Kyoto + Osaka</option>
                  <option>Custom Itinerary</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Tour Type</label>
                <select style={styles.input} defaultValue="">
                  <option value="" disabled>
                    Select tour type
                  </option>
                  <option>Private Tour</option>
                  <option>Family Tour</option>
                  <option>Honeymoon</option>
                  <option>Group Tour</option>
                  <option>Business Travel</option>
                  <option>Custom Tour</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Travel Date</label>
                <input
                  type="date"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Number of Travelers</label>
                <input
                  type="number"
                  min="1"
                  placeholder="2"
                  style={styles.input}
                />
              </div>

            </div>

            <div
              style={{
                ...styles.field,
                marginTop: "20px",
              }}
            >
              <label style={styles.label}>
                Tell us about your trip
              </label>

              <textarea
                placeholder="Tell us what you would like to see and experience in Japan..."
                style={styles.textarea}
              />
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                marginTop: "25px",
              }}
            >
              Reserve Now For 50% OFF
            </button>

          </form>
        )}

      </section>

      <footer style={styles.footer}>
        <h3>JAPAN<span style={styles.logoRed}>JOURNEYS</span></h3>
        <p>Discover Japan. Your way.</p>
        <p style={{ fontSize: "13px", opacity: 0.6 }}>
          © 2026 Japan Journeys. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
