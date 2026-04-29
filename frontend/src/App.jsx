import { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";

function App() {
  const [skills, setSkills] = useState("");
  const [interest, setInterest] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("https://careerpath-ai-production-faa4.up.railway.app/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, interest, level }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setResult("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    alert("Roadmap copied!");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">
          {/* kosongin brand */}
        </div>
        <span className="badge">AI Strategy Engine v1.0</span>
      </nav>

      <section className="hero">
        <h1 className="hero-title">
          <span>CareerPath AI</span>
          <img src={logo} alt="logo" className="hero-logo-img" />
        </h1>
        <p>
          Meet your AI career strategist that analyzes your skills and guides your next move.
        </p>

        <div className="stats">
          <div><strong>AI</strong><span>Career Mentor</span></div>
          <div><strong>3</strong><span>User Inputs</span></div>
          <div><strong>Live</strong><span>Roadmap Output</span></div>
        </div>
      </section>

      <main className="container">
        <div className="card input-card">
          <h2>Tell us about yourself</h2>
          <p className="small-text">The AI will analyze your profile and create a personalized strategy.</p>

          <label>Current Skills</label>
          <textarea
            placeholder="Example: HTML, CSS, JavaScript, React"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <label>Career Interest</label>
          <input
            placeholder="Example: Full Stack Developer"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />

          <label>Experience Level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button onClick={generateRoadmap} disabled={loading}>
            {loading ? (
              <span className="loading-btn">
                Generating Strategy <span className="spinner"></span>
              </span>
            ) : (
              "Generate AI Strategy"
            )}
          </button>
        </div>

        <div className="card result-card">
          <div className="result-header">
            <div>
              <h2>Your Personalized AI Career Strategy</h2>
              <p className="small-text">Powered by OpenRouter AI</p>
            </div>

            {result && (
              <button className="copy-btn" onClick={copyResult}>
                Copy
              </button>
            )}
          </div>

          {!result && !loading && (
            <div className="empty-state">
              <div className="empty-icon">✨</div>
              <p>Your personalized roadmap will appear here.</p>
            </div>
          )}

          {loading && (
            <div className="empty-state">
              <div className="empty-icon pulse">🧠</div>
              <p>Analyzing your profile and generating strategy...</p>
            </div>
          )}

          {result && <pre>{result}</pre>}
        </div>
      </main>
      <footer className="footer">
        <p className="footer-sub">
          Built with React & OpenRouter AI
        </p>

        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/michaelsh-dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            michaelsh-dev
          </a>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;