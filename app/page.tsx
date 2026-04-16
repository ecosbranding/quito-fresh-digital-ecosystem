"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshEmpresarialFinal() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Solo Maracumora tiene precio y está disponible. 
  // Los otros 7 sabores están bloqueados.
  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "GREEN BOOST", desc: "Manzana, Apio, Espinaca y Jengibre", price: null, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "BERRY BLISS", desc: "Frutos Rojos y Mora Silvestre", price: null, accent: "#E91E63", tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "GOLD CITRUS", desc: "Maracuyá & Cítricos", price: null, accent: "#FFB300", tag: "PRÓXIMAMENTE", available: false },
    { id: 5, name: "VITAL ROOTS", desc: "Remolacha, Zanahoria y Naranja", price: null, accent: "#D32F2F", tag: "PRÓXIMAMENTE", available: false },
    { id: 6, name: "PURE ALOE", desc: "Aloe Vera, Pepino y Menta", price: null, accent: "#4CAF50", tag: "PRÓXIMAMENTE", available: false },
    { id: 7, name: "AMAZON VIBE", desc: "Guayusa, Limón y Panela Natural", price: null, accent: "#1B5E20", tag: "PRÓXIMAMENTE", available: false },
    { id: 8, name: "TROPIC GLOW", desc: "Piña, Coco y Cúrcuma", price: null, accent: "#FFD600", tag: "PRÓXIMAMENTE", available: false },
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

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', margin: 0, position: 'relative', overflowX: 'hidden' }}>
      
      {/* CAPA VISUAL: SPLASHES Y NATURALEZA EN MOVIMIENTO */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '5%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(233, 30, 99, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(140, 198, 63, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
        
        {/* Hojas y Flores dinámicas */}
        <div className="leaf leaf-1" style={{ top: '15%', left: '4%' }} />
        <div className="leaf leaf-2" style={{ top: '45%', right: '2%' }} />
        <div className="flower flower-1" style={{ top: '30%', left: '8%' }} />
        <div className="flower flower-2" style={{ top: '75%', right: '10%' }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wind-sway { 0%, 100% { transform: rotate(-5deg) translateY(0); } 50% { transform: rotate(5deg) translateY(-10px); } }
        .leaf { position: absolute; width: 80px; height: 120px; background: #8CC63F; opacity: 0.12; animation: wind-sway 6s infinite ease-in-out; }
        .leaf-1 { border-radius: 5% 95%; transform: rotate(-20deg); }
        .leaf-2 { border-radius: 95% 5%; transform: rotate(15deg); background: #2E7D32; width: 60px; height: 100px; animation-delay: 1s; }
        .flower { position: absolute; width: 40px; height: 40px; border: 2.5px solid #E91E63; border-radius: 50%; opacity: 0.1; animation: wind-sway 8s infinite linear; }
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        .glass-box { background: rgba(255,255,255,0.7); backdrop-filter: blur(15px); border-radius: 35px; border: 1px solid rgba(0,0,0,0.05); padding: 35px; }
        .product-card { background: white; border: 1px solid #F0F0F0; border-radius: 40px; padding: 40px 25px; transition: 0.4s ease; text-align: center; display: flex; flex-direction: column; justify-content: space-between; min-height: 400px; }
        .featured { border: 4px solid #E91E63; box-shadow: 0 15px 40px rgba(233,30,99,0.1); }
        .sidebar-cart { position: fixed; right: 0; top: 0; width: 360px; height: 100vh; background: #FFF; z-index: 2000; transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; box-shadow: -10px 0 50px rgba(0,0,0,0.05); }
        .btn-green { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; }
        @media (max-width: 600px) { .sidebar-cart { width: 100%; } h1 { font-size: 2.5rem !important; } }
      ` }} />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #F0F0F0' }}>
        <img src="1000786698.png" alt="Logo Quito Fresh" style={{ height: '45px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-green" style={{ width: 'auto', padding: '10px 25px', fontSize: '13px' }}>
          PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO */}
      <header style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ border: '2.5px solid #8CC63F', color: '#8CC63F', display: 'inline-block', padding: '6px 22px', borderRadius: '50px', fontWeight: '900', fontSize: '12px', marginBottom: '25px' }}>EST. 2026</div>
        <h1 className="text-bold" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: 0.82, margin: 0 }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="1000786698.png" alt="Logo Central" style={{ maxWidth: '250px', margin: '40px auto', display: 'block' }} />
      </header>

      {/* INFORMACIÓN CORPORATIVA */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto 80px' }}>
        <div className="glass-box">
          <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.2rem', marginBottom: '12px' }}>Nuestra Misión</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#555' }}>Nutrir con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital.</p>
        </div>
        <div className="glass-box" style={{ background: '#8CC63F', color: 'white' }}>
          <h3 className="text-bold" style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Felicidad Campestre</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7' }}>Llevamos la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura y real.</p>
        </div>
        <div className="glass-box">
          <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.2rem', marginBottom: '12px' }}>Nuestra Visión</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#555' }}>Ser líderes en bienestar premium en Ecuador, reconocidos por la calidad inigualable de nuestros jugos Cold Pressed.</p>
        </div>
      </section>

      {/* SURTIDO DE PRODUCTOS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 20px 100px', maxWidth: '1250px', margin: '0 auto' }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '2.8rem', marginBottom: '50px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              <div>
                <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: '900', fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
                <h3 className="text-bold" style={{ fontSize: '2rem', margin: 0 }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: '#888', margin: '12px 0' }}>{p.desc}</p>
              </div>
              
              <div style={{ margin: '20px 0' }}>
                {p.price ? (
                  <div style={{ fontSize: '3.5rem', fontWeight: '900' }}>${p.price.toFixed(2)}</div>
                ) : (
                  <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#DDD', letterSpacing: '2px' }}>MUY PRONTO</div>
                )}
              </div>

              {p.available ? (
                <button onClick={() => addToCart(p)} className="btn-green" style={{ background: p.accent }}>AÑADIR AL PACK</button>
              ) : (
                <div style={{ background: '#F9F9F9', color: '#BBB', borderRadius: '50px', padding: '15px', fontWeight: '900', fontSize: '12px' }}>PRÓXIMAMENTE</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VALORES TÉCNICOS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '60px 20px', textAlign: 'center', background: '#FAFAFA', borderTop: '1px solid #F0F0F0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px', maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <div style={{ fontSize: '35px', marginBottom: '15px' }}>🛡️</div>
            <h4 className="text-heavy" style={{ fontSize: '15px', margin: '0 0 8px 0' }}>100% PRENSADO EN FRÍO</h4>
            <p style={{ fontSize: '13px', color: '#666' }}>Máxima nutrición y sabor real sin calor.</p>
          </div>
          <div>
            <div style={{ fontSize: '35px', marginBottom: '15px' }}>🏔️</div>
            <h4 className="text-heavy" style={{ fontSize: '15px', margin: '0 0 8px 0' }}>ORIGEN ANDINO</h4>
            <p style={{ fontSize: '13px', color: '#666' }}>Fruta de valles locales y puros.</p>
          </div>
          <div>
            <div style={{ fontSize: '35px', marginBottom: '15px' }}>⚡</div>
            <h4 className="text-heavy" style={{ fontSize: '15px', margin: '0 0 8px 0' }}>CERO AZÚCAR</h4>
            <p style={{ fontSize: '13px', color: '#666' }}>Energía natural sin aditivos químicos.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: 'white', padding: '80px 40px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '40px', marginBottom: '25px', filter: 'brightness(1.5)' }} />
        <div className="text-bold" style={{ fontSize: '14px', letterSpacing: '3px' }}>QUITO FRESH © 2026 — PUREZA REAL</div>
      </footer>

      {/* CARRITO SIDEBAR */}
      <div className="sidebar-cart">
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F5F5F5' }}>
          <h2 className="text-bold" style={{ fontSize: '1.2rem', margin: 0 }}>MI SELECCIÓN</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '35px', cursor: 'pointer', color: '#DDD' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 30px' }}>
          {cart.map(i => (
            <div key={i.id} style={{ padding: '20px 0', borderBottom: '1px solid #FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="text-bold" style={{ fontSize: '0.9rem' }}>{i.name}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '900', marginTop: '5px' }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <button onClick={() => removeItem(i.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>🗑️</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '15px' }}>
                <button onClick={() => updateQty(i.id, -1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #EEE', background: 'white' }}>-</button>
                <span style={{ fontWeight: '900' }}>{i.qty}</span>
                <button onClick={() => updateQty(i.id, 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #EEE', background: 'white' }}>+</button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '100px', color: '#CCC', fontWeight: '900' }}>PACK VACÍO</div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '30px', borderTop: '1px solid #F5F5F5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: '900', marginBottom: '20px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={clearCart} style={{ width: '100%', background: 'none', border: '2px solid #E91E63', color: '#E91E63', padding: '12px', borderRadius: '50px', fontWeight: '900', marginBottom: '15px', cursor: 'pointer' }}>VACIAR PACK</button>
            <button className="btn-green" style={{ background: '#25D366', fontSize: '16px' }}>PEDIR POR WHATSAPP 📱</button>
          </div>
        )}
      </div>
    </div>
  );
}
