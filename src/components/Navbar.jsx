import { useState } from "react";

const navItems = [
  "Weekly edition",
  "The world in brief",
  "World Ahead 2026",
  "War in Ukraine",
  "United States",
  "Middle East",
  "The world economy",
  "Business",
  "Artificial intelligence",
];

export default function Navbar() {
  const [active, setActive] = useState(0);

  return (
    <header style={{ borderBottom: "1px solid #ddd", position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 16px" }}>
        
        {/* Logo */}
        <h1 style={{ fontSize: 24, fontWeight: "bold" }}>The Economist</h1>

        {/* Menu */}
        <nav style={{ overflowX: "auto" }}>
          <ul style={{ display: "flex", gap: 20, listStyle: "none", padding: 0, marginTop: 10 }}>
            {navItems.map((item, index) => (
              <li
                key={index}
                onClick={() => setActive(index)}
                style={{
                  cursor: "pointer",
                  paddingBottom: 6,
                  borderBottom: active === index ? "2px solid red" : "none",
                  fontSize: 12,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </header>
  );
}
