"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshPremium3D() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Catálogo completo de 8 sabores (solo Maracumora disponible con precio y resaltado)
  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "GREEN BOOST", desc: "Manzana, Apio, Espinaca y Jengibre", price: null, accent: "#8CC63F", tag: "100% NATURAL", available: false },
    { id: 3, name: "BERRY BLISS", desc: "Frutos Rojos y Mora Silvestre", price: null, accent: "#E91E63", tag: "ANTIOXIDANTE", available: false },
    { id: 4, name: "GOLD CITRUS", desc: "Maracuyá & Cítricos", price: null, accent: "#FFB300", tag: "FULL ENERGÍA", available: false },
    { id: 5, name: "VITAL ROOTS", desc: "Remolacha, Zanahoria y Naranja", price: null, accent: "#D32F2F", tag: "MUY PRONTO", available: false },
    { id: 6, name: "PURE ALOE", desc: "Aloe Vera, Pepino y Menta", price: null, accent: "#4CAF50", tag: "MUY PRONTO", available: false },
    { id: 7, name: "AMAZON VIBE", desc: "Guayusa, Limón y Panela Natural", price: null, accent: "#1B5E20", tag: "MUY PRONTO", available: false },
    { id: 8, name: "TROPIC GLOW", desc: "Piña, Coco y Cúrcuma", price: null, accent: "#FFD600", tag: "MUY PRONTO", available: false },
  ];

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(i => i.qty > 0));
  };

  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);

  const addToCart = (p) => {
    if (!p.available) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const generateWhatsAppMessage = () => {
    let message = "Hola Quito Fresh, me gustaría pedir este pack:\n";
    let total = 0;
    cart.forEach(item => {
      message += `- ${item.name} (${item.qty} unid.)\n`;
      total += item.price * item.qty;
    });
    message += `\n*TOTAL:* $${total.toFixed(2)}`;
    return encodeURIComponent(message);
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FDFDFD', color: '#1A1A1A', fontFamily: 'Inter, system-ui, sans-serif', margin: 0, position: 'relative', overflowX: 'hidden' }}>
      
      {/* CAPA VISUAL: SPLASHES 3D Y NATURALEZA EN MOVIMIENTO */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        
        {/* Splashes 3D simulados con Gradientes Complejos */}
        <div style={{ position: 'absolute', top: '5%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle at 70% 30%, rgba(233, 30, 99, 0.12) 0%, rgba(233, 30, 99, 0.05) 50%, transparent 80%)', borderRadius: '50%', filter: 'blur(5px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-15%', width: '700px', height: '700px', background: 'radial-gradient(circle at 30% 70%, rgba(140, 198, 63, 0.15) 0%, rgba(140, 198, 63, 0.08) 50%, transparent 85%)', borderRadius: '50%', filter: 'blur(5px)' }} />
        
        {/* Naturaleza 3D simulada con SVG y Movimiento Asimétrico */}
        <svg className="decor leaf-3d-1" style={{ top: '15%', left: '3%' }} viewBox="0 0 100 150">
          <defs>
            <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8CC63F', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#2E7D32', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path d="M50 0 C60 30, 90 70, 50 150 C10 70, 40 30, 50 0 Z" fill="url(#leafGrad1)" opacity="0.2"/>
        </svg>

        <svg className="decor leaf-3d-2" style={{ top: '65%', right: '3%' }} viewBox="0 0 100 150">
          <path d="M50 0 C60 30, 90 70, 50 150 C10 70, 40 30, 50 0 Z" fill="url(#leafGrad1)" opacity="0.15" transform="rotate(20)"/>
        </svg>

        <div className="decor flower-3d" style={{ top: '35%', right: '10%' }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wind-sway { 0%, 100% { transform: rotate(-4deg) translateY(0); } 50% { transform: rotate(4deg) translateY(-12px); } }
        @keyframes wind-sway-slow { 0%, 100% { transform: rotate(-2deg) translateY(0); } 50% { transform: rotate(2deg) translateY(-6px); } }
        .decor { position: absolute; pointer-events: none; z-index: 0; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.02)); }
        .leaf-3d-1 { width: 100px; height: 150px; animation: wind-sway 7s infinite ease-in-out; }
        .leaf-3d-2 { width: 80px; height: 130px; animation: wind-sway-slow 9s infinite ease-in-out; animation-delay: 1s; }
        .flower-3d { width: 50px; height: 50px; border: 3px solid #E91E63; border-radius: 50%; opacity: 0.1; background: radial-gradient(circle at 30% 30%, rgba(233,30,99,0.1) 0%, transparent 70%); animation: wind-sway 8s infinite linear; }
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1.2px; }
        .glass-box { background: rgba(255,255,255,0.7); backdrop-filter: blur(25px); border: 1px solid rgba(0,0,0,0.05); border-radius: 40px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
        .product-card { background: white; border: 1.5px solid #F0F0F0; border-radius: 40px; padding: 50px 30px; transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-align: center; position: relative; display: flex; flex-direction: column; justify-content: space-between; min-height: 480px; }
        .product-card:hover { transform: translateY(-12px) scale(1.02); }
        .featured { border: 4px solid; border-image: linear-gradient(to bottom right, #E91E63, #FFB300) 1; box-shadow: 0 20px 50px rgba(233,30,99,0.15); }
        .side-cart { position: fixed; right: 0; top: 0; width: 380px; height: 100dvh; background: #FFF; z-index: 2000; transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; box-shadow: -15px 0 60px rgba(0,0,0,0.08); }
        .btn-wa-carrito { background: #25D366; color: white; border: none; padding: 18px; border-radius: 50px; font-weight: 900; width: 100%; cursor: pointer; font-size: 15px; box-shadow: 0 10px 20px rgba(37,211,102,0.2); transition: 0.3s; }
        .btn-wa-carrito:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(37,211,102,0.3); }
        @media (max-width: 600px) { .side-cart { width: 100%; } h1 { font-size: 2.8rem !important; } .product-card { min-height: 420px; } }
      ` }} />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '15px 35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(253,253,253,0.9)', backdropFilter: 'blur(15px)', borderBottom: '1px solid #F0F0F0' }}>
        <img src="1000786698.png" alt="Logo Quito Fresh" style={{ height: '45px' }} />
        <button onClick={() => setIsCartOpen(true)} style={{ background: '#8CC63F', color: 'white', border: 'none', borderRadius: '50px', padding: '11px 24px', fontWeight: '900', fontSize: '13px', cursor: 'pointer', transition: '0.3s' }}>
          PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO SECTION */}
      <header style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '70px 20px' }}>
        <div style={{ border: '2.5px solid #8CC63F', color: '#8CC63F', display: 'inline-block', padding: '6px 22px', borderRadius: '50px', fontWeight: '900', fontSize: '12px', marginBottom: '25px' }}>EST. 2026</div>
        <h1 className="text-bold" style={{ fontSize: '4.2rem', lineHeight: 0.8, margin: 0 }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="1000786698.png" alt="Logo Central" style={{ maxWidth: '280px', margin: '45px auto', display: 'block' }} />
      </header>

      {/* CORPORATE INFO */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto 80px' }}>
        <div className="glass-box">
          <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.2rem', marginBottom: '15px' }}>Nuestra Misión</h3>
          <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: '#555', margin: 0 }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital.</p>
        </div>
        <div className="glass-box" style={{ background: '#8CC63F', color: 'white' }}>
          <h3 className="text-bold" style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Desde 2026</h3>
          <p style={{ fontSize: '14.5px', lineHeight: '1.7', margin: 0 }}>Quito Fresh nace para llevar la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
        </div>
        <div className="glass-box">
          <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.2rem', marginBottom: '15px' }}>Nuestra Visión</h3>
          <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: '#555', margin: 0 }}>Ser líderes en bienestar premium en Ecuador, reconocidos por la calidad inigualable de nuestros jugos Cold Pressed.</p>
        </div>
      </section>

      {/* CATALOGUE CON JERARQUÍA ESTRICTA */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 20px 100px', maxWidth: '1250px', margin: '0 auto' }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '60px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              <div>
                <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: '900', fontSize: '11px', marginBottom: '18px' }}>{p.tag}</div>
                <h3 className="text-bold" style={{ fontSize: '2.2rem', margin: 0 }}>{p.name}</h3>
                <p style={{ fontSize: '14px', color: '#888', margin: '12px 0' }}>{p.desc}</p>
              </div>
              
              <div style={{ margin: '20px 0' }}>
                {p.price ? (
                  <div style={{ fontSize: '4.2rem', fontWeight: '900' }}>${p.price.toFixed(2)}</div>
                ) : (
                  <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#DDD', letterSpacing: '2px' }}>MUY PRONTO</div>
                )}
              </div>

              {p.available ? (
                <button onClick={() => addToCart(p)} style={{ width: '100%', background: p.accent, color: 'white', border: 'none', borderRadius: '50px', padding: '18px', fontWeight: '900', cursor: 'pointer', fontSize: '15px' }}>AÑADIR AL PACK</button>
              ) : (
                <div style={{ background: '#F9F9F9', color: '#BBB', borderRadius: '50px', padding: '18px', fontWeight: '900', fontSize: '13px' }}>PRÓXIMAMENTE</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VALORES TÉCNICOS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '60px 20px', textAlign: 'center', background: '#FAFAFA', borderTop: '1px solid #F0F0F0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px', maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>⚙️</div>
            <h4 className="text-heavy" style={{ fontSize: '16px', margin: '0 0 8px 0', textTransform: 'uppercase', fontWeight: 900 }}>100% PRENSADO EN FRÍO</h4>
            <p style={{ fontSize: '14px', color: '#666' }}>Conserva Máxima Nutrición y Sabor Real.</p>
          </div>
          <div>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🏔️</div>
            <h4 className="text-heavy" style={{ fontSize: '16px', margin: '0 0 8px 0', textTransform: 'uppercase', fontWeight: 900 }}>ORIGEN ANDINO</h4>
            <p style={{ fontSize: '14px', color: '#666' }}>Valles Locales de Quito y Pichincha.</p>
          </div>
          <div>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>⚡</div>
            <h4 className="text-heavy" style={{ fontSize: '16px', margin: '0 0 8px 0', textTransform: 'uppercase', fontWeight: 900 }}>ENERGÍA NATURAL</h4>
            <p style={{ fontSize: '14px', color: '#666' }}>Sin Azúcar Añadida, Solo Fruta Real.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: 'white', padding: '90px 40px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '45px', marginBottom: '25px', filter: 'brightness(1.5)' }} />
        <div className="text-bold" style={{ fontSize: '15px', letterSpacing: '3px' }}>QUITO FRESH © 2026 — PUREZA REAL</div>
      </footer>

      {/* CARRITO SIDEBAR */}
      <div className="side-cart">
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F5F5F5' }}>
          <h2 className="text-bold" style={{ fontSize: '1.2rem', margin: 0 }}>TU PACK</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '35px', cursor: 'pointer', color: '#DDD' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 30px' }}>
          {cart.map(i => (
            <div key={i.id} style={{ padding: '20px 0', borderBottom: '1px solid #FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="text-bold" style={{ fontSize: '1rem' }}>{i.name}</div>
                  <div style={{ fontSize: '1rem', fontWeight: '900', marginTop: '5px' }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <button onClick={() => removeItem(i.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>❌</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '15px' }}>
                <button onClick={() => updateQty(i.id, -1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', fontWeight: 'bold' }}>-</button>
                <span style={{ fontWeight: '900', fontSize: '15px' }}>{i.qty}</span>
                <button onClick={() => updateQty(i.id, 1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', fontWeight: 'bold' }}>+</button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '100px', color: '#CCC', fontWeight: '900', fontSize: '14px', letterSpacing: '1px' }}>PACK VACÍO</div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '30px', borderTop: '1px solid #F5F5F5', background: '#FFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: '900', marginBottom: '25px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={clearCart} style={{ width: '100%', background: 'none', border: '2px solid #E91E63', color: '#E91E63', padding: '12px', borderRadius: '50px', fontWeight: '900', marginBottom: '15px', cursor: 'pointer' }}>VACIAR PACK</button>
            <button 
              className="btn-wa-carrito"
              onClick={() => {
                const message = generateWhatsAppMessage();
                const phone = "593995849214"; // Necesitas reemplazar esto con tu número real
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
              }}
            >
              PEDIR POR WHATSAPP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
