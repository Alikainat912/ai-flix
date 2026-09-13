import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const styles = `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    background: #ffffff;
    color: #123b73;
  }

  button, input {
    font-family: inherit;
  }

  .app {
    min-height: 100vh;
    background: #ffffff;
    display: flex;
    flex-direction: column;
  }

  .header {
    height: 76px;
    border-bottom: 1px solid #edf0f4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 7%;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo {
    width: 48px;
    height: 48px;
    border-radius: 13px;
    background: #123b73;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 800;
    box-shadow: 0 5px 15px rgba(18, 59, 115, 0.15);
  }

  .brand-text {
    line-height: 1.05;
  }

  .brand-name {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -1px;
  }

  .brand-name span {
    color: #ff7935;
  }

  .brand-subtitle {
    font-size: 12px;
    font-weight: 600;
    color: #123b73;
    letter-spacing: .5px;
  }

  .security {
    font-size: 13px;
    color: #68717d;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .security-icon {
    color: #16834b;
    font-size: 18px;
  }

  .main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 55px 20px;
  }

  .login-card {
    width: 100%;
    max-width: 455px;
  }

  .welcome {
    font-size: 38px;
    font-weight: 750;
    color: #20252b;
    margin: 0 0 8px;
    letter-spacing: -1px;
  }

  .welcome-text {
    color: #737a83;
    font-size: 15px;
    margin: 0 0 35px;
  }

  .field {
    margin-bottom: 21px;
  }

  .label {
    display: block;
    color: #4f5862;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .input-wrapper {
    height: 59px;
    border: 1px solid #dfe4e9;
    border-radius: 11px;
    display: flex;
    align-items: center;
    background: white;
    transition: .2s ease;
  }

  .input-wrapper:focus-within {
    border-color: #ff7935;
    box-shadow: 0 0 0 3px rgba(255, 121, 53, .10);
  }

  .input-icon {
    width: 54px;
    text-align: center;
    color: #ff7935;
    font-size: 19px;
  }

  .input-wrapper input {
    border: none;
    outline: none;
    flex: 1;
    height: 100%;
    font-size: 16px;
    color: #20252b;
    background: transparent;
  }

  .input-wrapper input::placeholder {
    color: #a1a7ae;
  }

  .password-button {
    border: none;
    background: transparent;
    color: #ff7935;
    cursor: pointer;
    font-size: 19px;
    padding: 15px;
  }

  .forgot {
    display: flex;
    justify-content: flex-end;
    margin-top: -5px;
    margin-bottom: 24px;
  }

  .forgot button {
    border: none;
    background: none;
    color: #123b73;
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
  }

  .signin {
    width: 100%;
    height: 59px;
    border: none;
    border-radius: 11px;
    background: #ff7935;
    color: white;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 7px 18px rgba(255, 121, 53, .20);
    transition: .2s ease;
  }

  .signin:hover {
    background: #f36c28;
    transform: translateY(-1px);
  }

  .signin:active {
    transform: translateY(0);
  }

  .register {
    width: 100%;
    height: 59px;
    margin-top: 13px;
    border: 1.5px solid #123b73;
    border-radius: 11px;
    background: white;
    color: #123b73;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: .2s ease;
  }

  .register:hover {
    background: #f5f8fc;
  }

  .message {
    margin-top: 18px;
    padding: 13px 15px;
    border-radius: 9px;
    background: #fff5ef;
    color: #c4531c;
    font-size: 14px;
    text-align: center;
  }

  .features {
    margin-top: 50px;
    padding-top: 30px;
    border-top: 1px solid #edf0f4;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .feature {
    text-align: center;
    color: #68717d;
    font-size: 13px;
  }

  .feature-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 10px;
    border-radius: 50%;
    background: #fff5ef;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff7935;
    font-size: 20px;
  }

  .feature strong {
    display: block;
    color: #123b73;
    font-size: 13px;
    margin-bottom: 3px;
  }

  .footer {
    text-align: center;
    padding: 22px;
    border-top: 1px solid #edf0f4;
    color: #9299a1;
    font-size: 12px;
  }

  @media (max-width: 600px) {
    .header {
      height: 68px;
      padding: 0 22px;
    }

    .brand-name {
      font-size: 24px;
    }

    .brand-subtitle {
      font-size: 10px;
    }

    .logo {
      width: 43px;
      height: 43px;
      font-size: 22px;
    }

    .security {
      display: none;
    }

    .main {
      align-items: flex-start;
      padding: 48px 22px 35px;
    }

    .welcome {
      font-size: 34px;
    }

    .features {
      margin-top: 42px;
    }
  }
`;

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please enter your username and password.");
      return;
    }

    setMessage("Login system is ready to be connected to your backend.");
  };

  return (
    <>
      <style>{styles}</style>

      <div className="app">

        {/* HEADER */}
        <header className="header">
          <div className="brand">
            <div className="logo">A</div>

            <div className="brand-text">
              <div className="brand-name">
                ABL<span>.</span>
              </div>

              <div className="brand-subtitle">
                DIGITAL BANKING
              </div>
            </div>
          </div>

          <div className="security">
            <span className="security-icon">✓</span>
            Secure Banking
          </div>
        </header>

        {/* LOGIN */}
        <main className="main">
          <section className="login-card">

            <h1 className="welcome">
              Welcome!
            </h1>

            <p className="welcome-text">
              Sign in to access your ABL Digital Banking account.
            </p>

            <form onSubmit={handleLogin}>

              {/* USERNAME */}
              <div className="field">
                <label className="label">
                  Username
                </label>

                <div className="input-wrapper">
                  <div className="input-icon">
                    👤
                  </div>

                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="field">
                <label className="label">
                  Password
                </label>

                <div className="input-wrapper">
                  <div className="input-icon">
                    🔒
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "◉" : "◌"}
                  </button>
                </div>
              </div>

              {/* FORGOT PASSWORD */}
              <div className="forgot">
                <button
                  type="button"
                  onClick={() =>
                    setMessage("Password recovery will be available here.")
                  }
                >
                  Forgot your password?
                </button>
              </div>

              {/* SIGN IN */}
              <button className="signin" type="submit">
                Sign In
              </button>

              {/* REGISTER */}
              <button
                className="register"
                type="button"
                onClick={() =>
                  setMessage("Registration page will open here.")
                }
              >
                Register Now
              </button>

              {message && (
                <div className="message">
                  {message}
                </div>
              )}

            </form>

            {/* FEATURES */}
            <div className="features">

              <div className="feature">
                <div className="feature-icon">
                  💳
                </div>
                <strong>Features</strong>
                Easy banking
              </div>

              <div className="feature">
                <div className="feature-icon">
                  ?
                </div>
                <strong>FAQs</strong>
                Need help?
              </div>

              <div className="feature">
                <div className="feature-icon">
                  🛡
                </div>
                <strong>Security</strong>
                Protected
              </div>

            </div>

          </section>
        </main>

        {/* FOOTER */}
        <footer className="footer">
          © 2026 ABL Digital Banking · All rights reserved
        </footer>

      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
