"use client";
import React, { useState, useEffect, useCallback } from 'react';

// --- CONFIGURACIÓN DE BRANDING ---
const BRAND = {
  name: "Quito Fresh",
  colors: {
    celeste: "#00ADEF",      // Celeste Tropical (Logo)
    magenta: "#E91E63",     // Maracumora Accent
    dark: "#1A1A1A",
  },
};

export default function QuitoFreshMaestroFinal() {
  // --- ESTADOS ORIGINALES (SIN CAMBIOS) ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fogParticles, setFogParticles] = useState([]);

  // --- LÓGICA DE MONTAJE Y METADATOS (SIN CAMBIOS) ---
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- SISTEMA DE NIEBLA SENSORIAL DINÁMICA (MANTENIDO) ---
  const handleInteraction = useCallback((e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (!x || !y) return;

    const id = Math.random().toString(36).substr(2, 9);
    setFogParticles(prev => [...prev.slice(-20), { id, x, y }]); // Limitamos a 20 para performance

    setTimeout(() => {
      setFogParticles(prev => prev.filter(p => p.id !== id));
    }, 1200);
  }, []);

  // --- BASE DE DATOS DE PRODUCTOS (SIN CAMBIOS) ---
  const products = [
    { id: 1, name: "Maracumora", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: BRAND.colors.magenta, tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "Green Boost", desc: "Manzana, Apio, Espinaca y Jengibre", price: null, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "Berry Bliss", desc: "Frutos Rojos y Mora Silvestre", price: null, accent: BRAND.colors.magenta, tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "Vital Roots", desc: "Remolacha, Zanahoria y Naranja", price: null, accent: "#D32F2F", tag: "PRÓXIMAMENTE", available: false },
  ];

  // --- ACCIONES DEL CARRITO ---
  const addToCart = (p) => {
    if (!p.available) return;
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(i => i.qty > 0));
  };

  // NUEVO: Funciones para eliminar individualmente y vaciar carrito (Punto 2)
  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);

  // --- WHATSAPP SIGNATURE MSG (MANTENIDO) ---
  const sendWhatsAppOrder = () => {
    const total = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0).toFixed(2);
    const header = `*🏔️ ¡PEDIDO QUITO FRESH! 🍃*\n\nHola, quiero disfrutar de la pureza real. Este es mi Pack Saludable:\n\n`;
    const items = cart.map(i => `🥤 *${i.name.toUpperCase()}* — (${i.qty} un.)`).join('\n');
    const footer = `\n\n*VALOR TOTAL: $${total}*\n\n✨ _Orden generada en quitofresh.app_`;
    
    window.open(`https://wa.me/593995849214?text=${encodeURIComponent(header + items + footer)}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div 
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
      style={{ backgroundColor: '#FFFFFF', color: BRAND.colors.dark, fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Poiret+One&display=swap');
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        
        /* EFECTO CARAMELO PREMIUM: Mantenemos el glow y viscosidad que te gusta */
        .text-caramelo-premium {
          font-family: 'Titan One', cursive;
          color: white;
          text-shadow: 
            2px 2px 0px rgba(0,0,0,0.03),
            0px 0px 15px ${BRAND.colors.celeste}88,
            0px 0px 30px ${BRAND.colors.celeste}44;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
          line-height: 1.1;
        }

        /* PUNTO 1 CORREGIDO: Título Surtido Premium limpio y profesional */
        .text-titulo-seccion-limpio {
          font-family: 'Titan One', cursive;
          color: white; /* Blanco puro */
          text-shadow: 
            2px 2px 0px rgba(0,0,0,0.05),
            0px 0px 10px ${BRAND.colors.celeste}88; /* Glow celeste muy sutil para destacar */
          filter: none; /* Quitamos viscosidad para máxima legibilidad */
          line-height: 1.1;
          letter-spacing: 1px;
        }

        /* NIEBLA DINÁMICA (MANTENIDA) */
        .fog-puff {
          position: fixed; pointer-events: none; z-index: 9999;
          background: radial-gradient(circle, rgba(200, 240, 255, 0.4) 0%, transparent 70%);
          border-radius: 50%; filter: blur(20px);
          animation: particleFade 1.2s forwards;
        }
        @keyframes particleFade {
          0% { opacity: 0.6; transform: scale(0.3) translateY(0); }
          100% { opacity: 0; transform: scale(2.5) translateY(-20px); }
        }

        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; background: white; transition: 0.4s; overflow: hidden; position: relative; }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .featured { border: 4px solid #E91E63; }
        .btn-celeste { background: ${BRAND.colors.celeste}; color: white; border: none; border-radius: 50px; padding: 15px 30px; font-weight: 900; cursor: pointer; transition: 0.3s; }
      ` }} />

      {/* RENDER DE NIEBLA SENSORIAL */}
      {fogParticles.map(p => (
        <div key={p.id} className="fog-puff" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }} />
      ))}

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${BRAND.colors.celeste}22` }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '55px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-celeste" style={{ fontSize: '12px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO SECTION */}
      <header style={{ padding: '100px 20px', textAlign: 'center', overflow: 'hidden', background: 'radial-gradient(circle at top, #FDFDFD 0%, #FFFFFF 100%)' }}>
        <img src="1000786975.png" style={{ position: 'absolute', top: '-20px', right: '-50px', width: '350px', opacity: 0.6, transform: 'rotate(10deg)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontWeight: 900, fontSize: '12px', color: BRAND.colors.celeste, letterSpacing: '4px', marginBottom: '20px' }}>FRESCURA PURA</div>
          <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9, margin: '0 0 40px' }}>TU VIDA <br/><span className="text-caramelo-premium" style={{ fontSize: '5.5rem' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
          <img src="1000786698.png" alt="Logo Hero" style={{ maxWidth: '380px', margin: '0 auto', display: 'block' }} />
        </div>
      </header>

      {/* PRODUCTOS */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* PUNTO 1 APLICADO: Título con estilo limpio y profesional */}
        <h2 className="text-titulo-seccion-limpio" style={{ textAlign: 'center', fontSize: '3.8rem', marginBottom: '70px' }}>NUESTRO SURTIDO PREMIUM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
              <h3 className="text-caramelo-premium" style={{ fontSize: '2.8rem', margin: '0 0 10px', color: p.available ? p.accent : '#999' }}>{p.name}</h3>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '30px' }}>{p.desc}</p>
              {p.price && <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>${p.price.toFixed(2)}</div>}
              {p.available ? (
                <button onClick={() => addToCart(p)} className="btn-celeste" style={{ background: p.accent }}>AÑADIR AL PACK</button>
              ) : (
                <button disabled style={{ background: '#F5F5F5', color: '#BBB', border: 'none', padding: '18px', borderRadius: '50px', fontWeight: 900, width: '100%' }}>PRÓXIMAMENTE</button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: 'white', padding: '100px 5% 40px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '60px', marginBottom: '30px', filter: 'brightness(0) invert(1)' }} />
        <p className="text-bold" style={{ fontSize: '10px', opacity: 0.5, letterSpacing: '4px' }}>QUITO FRESH — PUREZA REAL</p>
        <p style={{ fontSize: '10px', opacity: 0.3, marginTop: '10px' }}>Hecho por <span style={{ fontWeight: 800 }}>ORCA Studios</span> © 2026.</p>
      </footer>

      {/* MODAL CARRITO (DRAWER ELITE CORREGIDO) */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: 'clamp(320px, 90vw, 420px)', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-20px 0 60px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', animation: 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }` }} />
          
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${BRAND.colors.celeste}22` }}>
            <span className="text-bold">TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '50px', color: '#CCC', fontWeight: 800 }}>TU PACK ESTÁ VACÍO</div>
            ) : (
              cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid #F9F9F9' }}>
                  <div style={{ flex: 1 }}>
                    <div className="text-bold" style={{ fontSize: '1.2rem', color: item.accent }}>{item.name}</div>
                    <div style={{ fontSize: '13px', color: BRAND.colors.celeste, fontWeight: 700 }}>${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F9F9F9', borderRadius: '30px', padding: '5px' }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', cursor: 'pointer' }}>-</button>
                    <span style={{ fontWeight: 900 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', cursor: 'pointer' }}>+</button>
                    
                    {/* PUNTO 2 APLICADO: Botón para eliminar individualmente */}
                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: BRAND.colors.magenta, marginLeft: '5px', fontSize: '16px', cursor: 'pointer' }}>❌</button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {cart.length > 0 && (
            <div style={{ padding: '30px', borderTop: `1px solid ${BRAND.colors.celeste}22`, background: '#FDFDFD' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900, marginBottom: '25px' }}>
                <span>TOTAL</span>
                <span style={{ color: BRAND.colors.celeste }}>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
              </div>
              
              {/* PUNTO 2 APLICADO: Botón para vaciar todo el pack */}
              <button onClick={clearCart} style={{ width: '100%', background: 'none', border: '1px solid #DDD', color: '#999', padding: '12px', borderRadius: '50px', fontWeight: 800, fontSize: '11px', marginBottom: '15px', cursor: 'pointer' }}>VACIAR TODO EL PACK</button>
              
              <button onClick={sendWhatsAppOrder} className="btn-celeste" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP 📲</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
