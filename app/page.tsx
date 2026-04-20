"use client";

import { useEffect, useMemo, useState } from "react";

const WA = "593995849214";
const HERO_IMG = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
const LOGO = "/1000786698.png";

export default function QuitoFresh() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  /* =========================
     📊 META PIXEL SAFE TRACK
  ========================== */
  const track = (event, data = {}) => {
    try {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", event, data);
      }
    } catch (err) {
      // evita romper producción
    }
  };

  useEffect(() => {
    track("PageView");
  }, []);

  /* =========================
     🧠 PRODUCTS
  ========================== */
  const products = [
    { id: 1, name: "Maracumora", price: 1, desc: "Energía tropical natural", available: true },
    { id: 2, name: "Green Boost", price: 1.2, desc: "Detox + energía limpia", available: true },
    { id: 3, name: "Berry Bliss", price: 1.3, desc: "Antioxidantes premium", available: false },
  ];

  /* =========================
     🛒 CART LOGIC
  ========================== */
  const add = (p) => {
    if (!p.available) return;

    track("AddToCart", {
      content_name: p.name,
      value: p.price,
      currency: "USD",
    });

    setCart((prev) => {
      const exists = prev.find((i) => i.id === p.id);
      if (exists) {
        return prev.map((i) =>
          i.id === p.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...p, qty: 1 }];
    });

    setOpen(true);
  };

  const total = useMemo(
    () => cart.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2),
    [cart]
  );

  /* =========================
     📲 WHATSAPP SAFE
  ========================== */
  const checkout = () => {
    track("InitiateCheckout", {
      value: total,
      currency: "USD",
    });

    const items = cart
      ?.map((i) => `🥤 ${i.name} x${i.qty}`)
      .join("\n");

    const msg = encodeURIComponent(
`🌿 QUITO FRESH — PEDIDO PREMIUM

${items}

💰 Total: $${total}

🚚 Entrega en Quito en 24h`
    );

    if (typeof window !== "undefined") {
      window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    }
  };

  return (
    <div className="page">

      {/* =========================
          🧠 HERO
      ========================== */}
      <section className="hero">
        <div className="overlay" />

        <div className="heroContent">
          <p className="kicker">QUITO · FRESH · COLD PRESSED</p>

          <h1>
            Energía natural
            <span>en su forma más pura</span>
          </h1>

          <p className="sub">
            Jugos prensados en frío · ingredientes locales · entrega en 24h
          </p>

          <button
            className="cta"
            onClick={() => {
              setOpen(true);
              track("ViewContent");
            }}
          >
            Ordenar ahora
          </button>
        </div>

        <img src={HERO_IMG} className="heroImg" alt="Quito Fresh" />
      </section>

      {/* =========================
          🧠 TRUST
      ========================== */}
      <section className="trust">
        <div>🚚 24h entrega</div>
        <div>🌱 Natural</div>
        <div>❄️ Cold pressed</div>
      </section>

      {/* =========================
          💰 PRODUCTS
      ========================== */}
      <section className="products">
        <h2>Más pedidos hoy</h2>

        <div className="grid">
          {products?.map((p) => (
            <div key={p.id} className="card">
              <h3>{p.name}</h3>
              <p>{p.desc}</p>

              <strong>${p.price}</strong>

              <button
                disabled={!p.available}
                onClick={() => add(p)}
              >
                {p.available ? "Añadir" : "Agotado"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          ⚡ SCARCITY
      ========================== */}
      <section className="scarcity">
        ⚡ Producción limitada diaria en Quito — calidad artesanal
      </section>

      {/* =========================
          🛒 CART
      ========================== */}
      {open && (
        <aside className="cart">
          <h3>Tu pedido</h3>

          {cart?.map((i) => (
            <div key={i.id}>
              {i.name} x{i.qty}
            </div>
          ))}

          <div className="total">Total: ${total}</div>

          <button className="wa" onClick={checkout}>
            Confirmar por WhatsApp
          </button>
        </aside>
      )}

      {/* =========================
          🎨 STYLES
      ========================== */}
      <style jsx>{`
        .page {
          font-family: Inter, sans-serif;
          background: #fff;
          color: #111;
        }

        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          padding: 0 20px;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, #fff 40%, #f5f5f5);
        }

        .heroContent {
          position: relative;
          z-index: 2;
          max-width: 720px;
        }

        .kicker {
          font-size: 12px;
          font-weight: 700;
          color: #2d5a27;
          letter-spacing: 1px;
        }

        .hero h1 {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -2px;
        }

        .hero h1 span {
          display: block;
          color: #2d5a27;
        }

        .sub {
          opacity: 0.7;
          margin-top: 10px;
        }

        .cta {
          margin-top: 25px;
          padding: 16px 28px;
          border-radius: 999px;
          background: #2d5a27;
          color: white;
          border: none;
          font-weight: 700;
          cursor: pointer;
        }

        .heroImg {
          position: absolute;
          bottom: -40px;
          width: 420px;
          opacity: 0.9;
          filter: drop-shadow(0 40px 60px rgba(0,0,0,.15));
        }

        .trust {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          text-align: center;
          padding: 40px 20px;
          font-weight: 600;
        }

        .products {
          padding: 80px 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .card {
          border: 1px solid #eee;
          padding: 20px;
          border-radius: 18px;
        }

        .card button {
          margin-top: 10px;
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: none;
          background: #2d5a27;
          color: white;
          cursor: pointer;
        }

        .card button:disabled {
          background: #ccc;
        }

        .scarcity {
          text-align: center;
          padding: 40px 20px;
          background: #f6f6f6;
          font-weight: 600;
        }

        .cart {
          position: fixed;
          right: 0;
          top: 0;
          width: 320px;
          height: 100%;
          background: white;
          padding: 20px;
          border-left: 1px solid #eee;
        }

        .wa {
          width: 100%;
          background: #25d366;
          color: white;
          border: none;
          padding: 14px;
          border-radius: 12px;
          margin-top: 20px;
          font-weight: 700;
        }

        .total {
          margin-top: 20px;
          font-weight: 900;
        }
      `}</style>
    </div>
  );
}
