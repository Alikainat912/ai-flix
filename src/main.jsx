import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { supabase } from "./lib/supabaseClient";
import "./index.css";

const NAVY = "#063b78";
const ORANGE = "#ff7433";

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="fieldIcon">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="fieldIcon">
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15" r="1" />
    </svg>
  );
}

function EyeIcon({ hidden }) {
  return (
    <svg viewBox="0 0 24 24" className="eyeIcon">
      {hidden ? (
        <>
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 5.2A11.4 11.4 0 0 1 12 5c5 0 8.7 3.4 10 7-0.5 1.4-1.4 2.7-2.6 3.8" />
          <path d="M6.2 6.2C4.6 7.2 3.4 8.5 2 12c1.3 3.6 5 7 10 7 1.3 0 2.5-.2 3.6-.7" />
        </>
      ) : (
        <>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

function FeatureIcon() {
  return (
    <svg viewBox="0 0 48 48" className="bottomIcon">
      <rect x="8" y="12" width="32" height="23" rx="3" />
      <path d="M8 18h32" />
      <path d="M28 29h7" />
    </svg>
  );
}

function FAQIcon() {
  return (
    <svg viewBox="0 0 48 48" className="bottomIcon">
      <circle cx="21" cy="21" r="12" />
      <path d="M30 30l9 9" />
      <path d="M17.5 18a4 4 0 0 1 7.5 1.8c0 3-3.8 3-3.8 5.5" />
      <circle cx="21.2" cy="29" r="1" fill="currentColor" />
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg viewBox="0 0 48 48" className="bottomIcon">
      <path d="M24 5l15 6v10c0 10-6.3 17.8-15 22-8.7-4.2-15-12-15-22V11l15-6Z" />
      <path d="m17 24 5 5 10-11" />
    </svg>
  );
}

function ABLLogo() {
  return (
    <div className="logo">
      <div className="logoMark">
        <div className="myTop">my</div>

        <div className="aShape">
          A
          <span className="orangeCurve"></span>
        </div>
      </div>

      <div className="logoText">
        <div className="axlName">AXL</div>
        <div className="digital">Digital Banking</div>
      </div>
    </div>
  );
}

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(e) {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signed in successfully.");
    }

    setLoading(false);
  }

  async function register() {
    if (!email || !password) {
      setMessage("Enter your email and password to register.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Registration successful. Check your email if confirmation is enabled."
      );
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setMessage("");
  }

  if (user) {
    return (
      <div className="app">
        <main className="dashboard">
          <ABLLogo />

          <div className="dashboardCard">
            <h1>Welcome to ABL</h1>
            <p>You are securely signed in.</p>

            <div className="accountBox">
              <span>Account</span>
              <strong>{user.email}</strong>
            </div>

            <button className="orangeButton" onClick={logout}>
              Sign Out
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="loginPage">
        <div className="content">
          <AXLLogo />

          <h1 className="welcome">Welcome!</h1>

          <form onSubmit={signIn}>
            <label>Email Address</label>

            <div className="inputBox">
              <UserIcon />
              <span className="divider"></span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <label className="passwordLabel">Password</label>

            <div className="inputBox">
              <LockIcon />
              <span className="divider"></span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="eyeButton"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Show password"
              >
                <EyeIcon hidden={showPassword} />
              </button>
            </div>

            <button
              type="button"
              className="trouble"
              onClick={() =>
                setMessage("Password recovery will be connected here.")
              }
            >
              Having Trouble Logging In ?
            </button>

            <button
              type="submit"
              className="orangeButton"
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Sign In"}
            </button>
          </form>

          <button
            type="button"
            className="registerButton"
            onClick={register}
            disabled={loading}
          >
            Register Now
          </button>

          {message && <div className="message">{message}</div>}

          <div className="help">
            <div className="phoneCircle">☎</div>

            <div>
              <div>Need Any Help ?</div>
              <div>
                Contact Us at{" "}
                <a href="tel:111259225">111-AXL-225</a>
              </div>
            </div>
          </div>

          <div className="bottomLinks">
            <button>
              <div className="iconCircle">
                <FeatureIcon />
              </div>
              <span>Features</span>
            </button>

            <button>
              <div className="iconCircle">
                <FAQIcon />
              </div>
              <span>FAQ's</span>
            </button>

            <button>
              <div className="iconCircle">
                <SecurityIcon />
              </div>
              <span>Security</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
