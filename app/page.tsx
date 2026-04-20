"use client";

import { useEffect, useMemo, useState } from "react";

// Esto corrige el error de TypeScript: define fbq en el objeto window
declare global {
  interface Window {
    fbq: any;
  }
}

const WA = "593995849214";
const HERO_IMG = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
const LOGO = "/1000786698.png";

export default function QuitoFresh() {
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* =========================
     📊 META PIXEL SAFE TRACK
  ========================== */
  const track = (event: string, data = {}) => {
    try {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", event, data);
      }
    } catch (err) {
      // evita romper producción
    }
  };

  useEffect(() => {
    setMounted(true);
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
  const add = (p: any) => {
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

  if (!mounted) return null;

  return (
    <div className="page">
      {/* Estilos inyectados de forma segura para evitar errores de compilación */}
      <style dangerouslySetInnerHTML={{ __html: `
        .page { font-family: Inter, sans-serif; background: #fff; color: #111; }
        .hero { height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; padding: 0 20px; }
        .overlay { position: absolute; inset: 0; background: radial-gradient(circle at top, #fff 40%, #f5f5f5); }
        .heroContent { position: relative; z-index: 2; max-width: 720px; }
        .kicker { font-size: 12px; font-weight: 700; color: #2d5a27; letter-spacing: 1px; }
        .hero h1 { font-size: 4rem; font-weight: 900; letter-spacing: -2px; line-height: 1.1; }
        .hero h1 span { display: block; color: #2d5a27; }
        .sub { opacity: 0.7; margin-top: 10px; }
        .cta { margin-top: 25px; padding: 16px 28px; border-radius: 999px; background: #2d5a27; color: white; border: none; font-weight: 700; cursor: pointer; }
        .heroImg { position: absolute; bottom: -40px; width: 420px; opacity: 0.9; filter: drop-shadow(0 40px 60px rgba(0,0,0,.15)); }
        .trust { display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; padding: 40px 20px; font-weight: 600; }
        .products { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .card { border: 1px solid #eee; padding: 25px; border-radius: 20px; text-align: left; }
        .card button { margin-top: 15px; width: 100%; padding: 12px; border-radius: 12px; border: none; background: #2d5a27; color: white; cursor: pointer; font-weight: 700; }
        .card button:disabled { background: #ccc; cursor: not-allowed; }
        .scarcity { text-align: center; padding: 40px 20px; background: #f6f6f6; font-weight: 600; }
        .cart-modal { position: fixed; right: 0; top: 0; width: 350px; height: 100%; background: white; padding: 30px; border-left: 1px solid #eee; z-index: 1000; box-shadow: -10px 0 30px rgba(0,0,0,0.05); }
        .wa { width: 100%; background: #25d366; color: white; border: none; padding: 16px; border-radius: 14px; margin-top: 20px; font-weight: 700; cursor: pointer; }
        .total-box { margin-top: 30px; padding-top: 20px; border-top: 2px solid #f5f5f5; font-size: 1.5rem; font-weight: 900; }
      ` }} />

      <section className="hero">
        <div className="overlay" />
        <div className="heroContent">
          <p className="kicker">QUITO · FRESH · COLD PRESSED</p>
          <h1>Energía natural <span>en su forma más pura</span></h1>
          <p className="sub">Jugos prensados en frío · ingredientes locales · entrega en 24h</p>
          <button className="cta" onClick={() => { setOpen(true); track("ViewContent"); }}>
            Ordenar ahora
          </button>
        </div>
        <img src={HERO_IMG} className="heroImg" alt="Quito Fresh" />
      </section>

      <section className="trust">
        <div>🚚 24h entrega</div>
        <div>🌱 Natural</div>
        <div>❄️ Cold pressed</div>
      </section>

      <section className="products">
        <h2 style={{ marginBottom: '30px' }}>Más pedidos hoy</h2>
        <div className="grid">
          {products?.map((p) => (
            <div key={p.id} className="card">
              <h3 style={{ fontSize: '1.4rem' }}>{p.name}</h3>
              <p style={{ opacity: 0.6, fontSize: '14px', margin: '8px 0' }}>{p.desc}</p>
              <strong style={{ fontSize: '1.2rem' }}>${p.price.toFixed(2)}</strong>
              <button disabled={!p.available} onClick={() => add(p)}>
                {p.available ? "Añadir al pedido" : "Agotado"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="scarcity">
        ⚡ Producción limitada diaria en Quito — calidad artesanal garantizada
      </section>

      {open && (
        <aside className="cart-modal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h3 style={{ margin: 0 }}>Tu pedido</h3>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>

          <div style={{ minHeight: '100px' }}>
            {cart.length === 0 ? (
              <p style={{ opacity: 0.5 }}>Tu carrito está vacío</p>
            ) : (
              cart.map((i) => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 600 }}>
                  <span>{i.name} x{i.qty}</span>
                  <span>${(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>

          <div className="total-box">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total:</span>
              <span style={{ color: '#2d5a27' }}>${total}</span>
            </div>
          </div>

          <button className="wa" onClick={checkout}>
            Confirmar por WhatsApp
          </button>
        </aside>
      )}
    </div>
  );
}
