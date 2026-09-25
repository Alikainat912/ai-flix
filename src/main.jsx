import React from "react";

export default function App() {
  return (
    <div
      style={{
        margin: 0,
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "#f7f3eb",
        color: "#102a43",
      }}
    >
      <header
        style={{
          background: "#ffffff",
          padding: "20px 7%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          JAPAN
          <span style={{ color: "#c62828" }}>JOURNEYS</span>
        </div>

        <nav style={{ display: "flex", gap: "25px" }}>
          <a href="#home">Home</a>
          <a href="#tours">Tours</a>
          <a href="#destinations">Destinations</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section
          id="home"
          style={{
            minHeight: "600px",
            padding: "80px 8%",
            display: "flex",
            alignItems: "center",
            color: "#ffffff",
            backgroundImage:
              "linear-gradient(rgba(5,20,34,.65),rgba(5,20,34,.65)), url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div style={{ maxWidth: "700px" }}>
            <p
              style={{
                color: "#f5caca",
                letterSpacing: "3px",
                fontWeight: "bold",
              }}
            >
              DISCOVER JAPAN
            </p>

            <h1
              style={{
                fontSize: "64px",
                lineHeight: "1.05",
                margin: "15px 0",
              }}
            >
              Your journey.
              <br />
              Your Japan.
            </h1>

            <p
              style={{
                fontSize: "19px",
                lineHeight: "1.7",
              }}
            >
              Discover Tokyo, Kyoto, Osaka, Mount Fuji and
              unforgettable experiences across Japan.
            </p>

            <a
              href="#tours"
              style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "14px 25px",
                background: "#c62828",
                color: "#ffffff",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Explore Tours
            </a>
          </div>
        </section>

        <section
          id="tours"
          style={{
            padding: "80px 7%",
            background: "#ffffff",
          }}
        >
          <p
            style={{
              color: "#c62828",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            OUR TOURS
          </p>

          <h2
            style={{
              fontSize: "42px",
              marginTop: "10px",
            }}
          >
            Explore Japan
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "25px",
              marginTop: "35px",
            }}
          >
            <TourCard
              title="Tokyo Discovery"
              days="5 Days / 4 Nights"
              price="$899"
              image="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80"
            />

            <TourCard
              title="Kyoto & Osaka"
              days="7 Days / 6 Nights"
              price="$1,299"
              image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80"
            />

            <TourCard
              title="Tokyo & Mount Fuji"
              days="6 Days / 5 Nights"
              price="$1,099"
              image="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=900&q=80"
            />
          </div>
        </section>

        <section
          id="destinations"
          style={{
            padding: "80px 7%",
            background: "#f7f3eb",
          }}
        >
          <p
            style={{
              color: "#c62828",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            DESTINATIONS
          </p>

          <h2 style={{ fontSize: "42px" }}>
            Places worth discovering
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "25px",
              marginTop: "35px",
            }}
          >
            <Destination
              name="Tokyo"
              image="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=900&q=80"
            />

            <Destination
              name="Kyoto"
              image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80"
            />

            <Destination
              name="Mount Fuji"
              image="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=900&q=80"
            />
          </div>
        </section>

        <section
          id="about"
          style={{
            padding: "80px 7%",
            background: "#ffffff",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#c62828",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            WHY US
          </p>

          <h2 style={{ fontSize: "42px" }}>
            Travel with confidence
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            <Feature icon="🗾" title="Japan Specialists" />
            <Feature icon="🏨" title="Hotel Options" />
            <Feature icon="🚆" title="Transport Assistance" />
            <Feature icon="🤝" title="Personal Support" />
          </div>
        </section>

        <section
          id="contact"
          style={{
            padding: "90px 7%",
            background: "#0b1f33",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "45px" }}>
            Ready to discover Japan?
          </h2>

          <p
            style={{
              color: "#ccd6df",
              fontSize: "17px",
              margin: "20px auto",
              maxWidth: "600px",
            }}
          >
            Tell us about your travel plans and let us help
            you create your Japan journey.
          </p>

          <button
            style={{
              background: "#c62828",
              color: "#ffffff",
              border: "none",
              padding: "15px 30px",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Start Your Trip
          </button>
        </section>
      </main>

      <footer
        style={{
          background: "#071522",
          color: "#ffffff",
          padding: "40px 7%",
          textAlign: "center",
        }}
      >
        <strong>JAPAN JOURNEYS</strong>

        <p
          style={{
            color: "#9ca8b4",
            marginTop: "10px",
          }}
        >
          Japan travel experiences designed around you.
        </p>
      </footer>
    </div>
  );
}

function TourCard({ title, days, price, image }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 25px rgba(0,0,0,.08)",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "22px" }}>
        <h3 style={{ fontSize: "24px" }}>{title}</h3>

        <p style={{ color: "#667085" }}>{days}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <strong style={{ fontSize: "19px" }}>
            From {price}
          </strong>

          <button
            style={{
              background: "#c62828",
              color: "#ffffff",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
            }}
          >
            View Tour
          </button>
        </div>
      </div>
    </div>
  );
}

function Destination({ name, image }) {
  return (
    <div
      style={{
        height: "300px",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "25px",
          color: "#ffffff",
          background: "linear-gradient(transparent, rgba(0,0,0,.8))",
        }}
      >
        <h3 style={{ fontSize: "30px", margin: 0 }}>
          {name}
        </h3>
      </div>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div
      style={{
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#ffffff",
      }}
    >
      <div style={{ fontSize: "32px" }}>{icon}</div>

      <h3 style={{ color: "#0b1f33" }}>
        {title}
      </h3>

      <p style={{ color: "#667085", fontSize: "14px" }}>
        Professional assistance for your Japan journey.
      </p>
    </div>
  );
}




function App() {
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage('Reserve form submitted successfully.');
  };

  return (
    <div className="app">

      <header className="JTT-header">
        <div className="JTT-brand">
          <div className="JTT-crest">JTT</div>

          <div>
            <div className="JTT-name">
              JAPAN TRAVEL TOURS
            </div>

            <div className="motto">
              PAYMENT PORTAL
            </div>
          </div>
        </div>
      </header>

      <main className="payment-page">

        <div className="payment-card">

          <div className="portal-heading">
            <span className="portal-line"></span>

            <h1>Payment Portal</h1>

            <span className="portal-line"></span>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="name">Name</label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">
                Card number
              </label>

              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                inputMode="numeric"
                value={form.cardNumber}
                onChange={handleChange}
                autoComplete="cc-number"
                placeholder="•••• •••• •••• ••••"
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="expiry">
                  Expiry date
                </label>

                <input
                  id="expiry"
                  name="expiry"
                  type="text"
                  value={form.expiry}
                  onChange={handleChange}
                  autoComplete="cc-exp"
                  placeholder="MM / YY"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">
                  CVV
                </label>

                <input
                  id="cvv"
                  name="cvv"
                  type="password"
                  inputMode="numeric"
                  value={form.cvv}
                  onChange={handleChange}
                  autoComplete="cc-csc"
                  placeholder="•••"
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">
                Address
              </label>

              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                autoComplete="street-address"
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">
                  Country
                </label>

                <select
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  autoComplete="country-name"
                  required
                >
                  <option value="">
                    Select country
                  </option>
                  <option value="Pakistan">
                    Pakistan
                  </option>
                  <option value="United Kingdom">
                    United Kingdom
                  </option>
                  <option value="United States">
                    United States
                  </option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="Saudi Arabia">
                    Saudi Arabia
                  </option>
                  <option value="Canada">
                    Canada
                  </option>
                  <option value="Australia">
                    Australia
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              className="pay-button"
            >
              RESERVE
            </button>

            {message && (
              <div className="test-message">
                {message}
              </div>
            )}

          </form>

        </div>

      </main>

      <footer className="uol-footer">
        <div className="footer-name">
          JAPAN TRAVEL TOURS
        </div>

        <div>
          Payment Portal
        </div>
      </footer>

    </div>
  );
}

createRoot(
  document.getElementById('root')
).render(<App />);
