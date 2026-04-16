"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshPurezaRealFinal() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Catálogo completo de 8 sabores (solo Maracumora disponible con precio)
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

  // Función para generar el mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    let message = "Hola *Quito Fresh*, me gustaría pedir:\n";
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
      
      {/* CAPA VISUAL: NATURALEZA Y SPLASHES PUREZA REAL */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        
        {/* Splashes de acuarela Pureza Real */}
        <div style={{ position: 'absolute', top: '5%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(233, 30, 99, 0.08) 0%, transparent 75%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(140, 198, 63, 0.1) 0%, transparent 75%)', borderRadius: '50%' }} />
        
        {/* Naturaleza estilizada (Cut-out de papel) en movimiento */}
        <div className="decor leaf-1" style={{ top: '15%', left: '3%', width: '120px', height: '180px', background: '#a1d35d', borderRadius: '5% 95%' }} />
        <div className="decor monstera-1" style={{ top: '65%', right: '-20px', width: '140px', height: '140px', background: '#2E7D32', border: '5px double #a1d35d', borderRadius: '50%', animationDelay: '1.5s' }} />
        <div className="decor hibiscus-1" style={{ top: '40%', right: '5%', width: '60px', height: '60px', border: '3px solid #E91E63', background: 'rgba(233,30,99,0.05)', borderRadius: '50%', animationDelay: '0.5s' }} />
        <div className="decor leaf-2" style={{ bottom: '15%', left: '8%', width: '100px', height: '150px', background: '#2E7D32', borderRadius: '95% 5%', animationDelay: '2s' }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wind-sway { 0%, 100% { transform: rotate(-3deg) translate(0,0); } 50% { transform: rotate(3deg) translate(5px,-5px); } }
        .decor { position: absolute; opacity: 0.1; animation: wind-sway 6s infinite ease-in-out; filter: blur(0.8px); z-index: 0; }
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        .glass-box { background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.05); border-radius: 40px; padding: 40px; }
        .product-card { background: white; border: 1.5px solid #F0F0F0; border-radius: 40px; padding: 45px 30px; transition: 0.5s ease; text-align: center; position: relative; display: flex; flex-direction: column; justify-content: space-between; min-height: 450px; }
        .featured { border: 4px solid #E91E63; }
        .featured::after { content: '🏆'; position: absolute; top: 15px; right: 20px; fontSize: 22px; }
        .side-cart { position: fixed; right: 0; top: 0; width: 380px; height: 100dvh; background: #FFF; z-index: 2000; transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; box-shadow: -10px 0 60px rgba(0,0,0,0.05); }
        .btn-wa-carrito { background: #25D366; color: white; border: none; padding: 18px; border-radius: 50px; font-weight: 900; width: 100%; cursor: pointer; }
        @media (max-width: 600px) { .side-cart { width: 100%; } h1 { font-size: 2.3rem !important; } }
      ` }} />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(253,253,253,0.9)', backdropFilter: 'blur(15px)', borderBottom: '1px solid #F5F5F5' }}>
        <img src="1000786698.png" alt="Logo Quito Fresh" style={{ height: '48px' }} />
        <button onClick={() => setIsCartOpen(true)} style={{ background: '#a1d35d', color: 'white', border: 'none', borderRadius: '50px', padding: '10px 22px', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}>
          PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO SECTION */}
      <header style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ border: '2.5px solid #8CC63F', color: '#8CC63F', display: 'inline-block', padding: '6px 22px', borderRadius: '50px', fontWeight: '900', fontSize: '12px', marginBottom: '25px' }}>EST. 2026</div>
        <h1 className="text-bold" style={{ fontSize: '3.8rem', lineHeight: 0.85, margin: 0 }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="1000786698.png" alt="Logo Central" style={{ maxWidth: '280px', margin: '40px auto', display: 'block' }} />
      </header>

      {/* CORPORATE INFO */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto 80px' }}>
        <div className="glass-box">
          <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.2rem', marginBottom: '15px' }}>Nuestra Misión</h3>
          <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: '#555', margin: 0 }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital.</p>
        </div>
        <div className="glass-box" style={{ background: '#a1d35d', color: 'white' }}>
          <h3 className="text-bold" style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Llevando Felicidad</h3>
          <p style={{ fontSize: '14.5px', lineHeight: '1.7', margin: 0 }}>Llevamos la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
        </div>
        <div className="glass-box">
          <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.2rem', marginBottom: '15px' }}>Nuestra Visión</h3>
          <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: '#555', margin: 0 }}>Ser líderes en bienestar premium en Ecuador, reconocidos por la calidad inigualable de nuestros jugos Cold Pressed.</p>
        </div>
      </section>

      {/* CATALOGUE */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 20px 100px', maxWidth: '1250px', margin: '0 auto' }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '3.2rem', marginBottom: '60px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              <div>
                <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: '900', fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
                <h3 className="text-bold" style={{ fontSize: '2rem', margin: 0 }}>{p.name}</h3>
                <p style={{ fontSize: '14px', color: '#888', margin: '12px 0' }}>{p.desc}</p>
              </div>
              
              <div style={{ margin: '20px 0' }}>
                {p.price ? (
                  <div style={{ fontSize: '3.8rem', fontWeight: '900' }}>${p.price.toFixed(2)}</div>
                ) : (
                  <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#DDD', letterSpacing: '2px' }}>MUY PRONTO</div>
                )}
              </div>

              {p.available ? (
                <button onClick={() => addToCart(p)} style={{ width: '100%', background: p.accent, color: 'white', border: 'none', borderRadius: '50px', padding: '16px', fontWeight: '900', cursor: 'pointer' }}>AÑADIR AL PACK</button>
              ) : (
                <div style={{ background: '#F9F9F9', color: '#BBB', borderRadius: '50px', padding: '16px', fontWeight: '900', fontSize: '12px' }}>PRÓXIMAMENTE</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* TECH SPECS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '60px 20px', textAlign: 'center', background: '#FAFAFA', borderTop: '1px solid #F0F0F0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px', maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <div style={{ fontSize: '35px', marginBottom: '15px' }}>⚙️</div>
            <h4 className="text-heavy" style={{ fontSize: '15px', margin: '0 0 8px 0', textTransform: 'uppercase', fontWeight: 900 }}>100% PRENSADO EN FRÍO</h4>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Conserva Máxima Nutrición y Sabor Real.</p>
          </div>
          <div>
            <div style={{ fontSize: '35px', marginBottom: '15px' }}>🏔️</div>
            <h4 className="text-heavy" style={{ fontSize: '15px', margin: '0 0 8px 0', textTransform: 'uppercase', fontWeight: 900 }}>ORIGEN ANDINO</h4>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Valles Locales de Quito y Pichincha.</p>
          </div>
          <div>
            <div style={{ fontSize: '35px', marginBottom: '15px' }}>⚡</div>
            <h4 className="text-heavy" style={{ fontSize: '15px', margin: '0 0 8px 0', textTransform: 'uppercase', fontWeight: 900 }}>ENERGÍA NATURAL</h4>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Sin Azúcar Añadida, Solo Fruta Real.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: 'white', padding: '90px 40px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '40px', marginBottom: '20px', filter: 'brightness(1.5)' }} />
        <div className="text-bold" style={{ fontSize: '14px', letterSpacing: '3px' }}>QUITO FRESH © 2026 — PUREZA REAL</div>
      </footer>

      {/* CARRITO SIDEBAR */}
      <div className="side-cart">
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F5F5F5' }}>
          <h2 className="text-bold" style={{ fontSize: '1.2rem', margin: 0 }}>TU SELECCIÓN</h2>
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
                const phone = "593987654321"; // Necesitas reemplazar esto con tu número real
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
              }}
            >
              PEDIR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
