import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

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
