"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshFinalBrand() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", bg: "#FCE4EC", tag: "SABOR ESTRELLA", disabled: false },
    { id: 2, name: "GREEN BOOST", desc: "Próximamente", price: 4.50, accent: "#8CC63F", bg: "#F1F8E9", tag: "PRÓXIMAMENTE", disabled: true },
    { id: 3, name: "BERRY BLISS", desc: "Próximamente", price: 4.50, accent: "#E64A19", bg: "#FFEBEE", tag: "PRÓXIMAMENTE", disabled: true },
    { id: 4, name: "GOLD CITRUS", desc: "Próximamente", price: 4.50, accent: "#FFB300", bg: "#FFFDE7", tag: "PRÓXIMAMENTE", disabled: true },
  ];

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(i => i.qty > 0));
  };

  const addToCart = (p) => {
    if (p.disabled) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'sans-serif', margin: 0, position: 'relative', overflowX: 'hidden' }}>
      
      {/* CAPA DE SPLASH Y HOJAS CON CSS VECTORIAL */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* Splash Superior Derecho (Inspirado en Maracuyá) */}
        <div style={{ position: 'absolute', top: '-5%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255, 179, 0, 0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
        {/* Splash Central Izquierdo (Inspirado en Mora) */}
        <div style={{ position: 'absolute', top: '30%', left: '-15%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(233, 30, 99, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
        
        {/* Hojas Abstractas en las esquinas */}
        <div style={{ position: 'absolute', top: '10%', left: '3%', width: '120px', height: '180px', background: '#8CC63F', opacity: 0.12, borderRadius: '0 100% 0 100%', transform: 'rotate(-25deg)', border: '1px solid rgba(140, 198, 63, 0.2)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '2%', width: '90px', height: '140px', background: '#2E7D32', opacity: 0.08, borderRadius: '100% 0 100% 0', transform: 'rotate(15deg)' }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; }
        .product-card { padding: 40px 20px; border-radius: 35px; border: 1px solid #F0F0F0; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); transition: 0.4s ease; text-align: center; }
        .featured { border: 2px solid #E91E63; transform: scale(1.05); box-shadow: 0 20px 45px rgba(233, 30, 99, 0.12); }
        .btn-main { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 12px 28px; font-weight: 900; cursor: pointer; transition: 0.3s; }
        .btn-main:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(140, 198, 63, 0.3); }
        .sidebar { position: fixed; right: 0; top: 0; width: 100%; max-width: 420px; height: 100%; background: #fff; z-index: 1000; box-shadow: -15px 0 60px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); padding: 40px; display: flex; flex-direction: column; }
        .logo-nav { height: 50px; width: auto; transition: 0.3s; }
        .logo-nav:hover { transform: scale(1.05); }
      ` }} />

      {/* NAV CON LOGO INTEGRADO */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(15px)', borderBottom: '1px solid #F0F0F0' }}>
        <img src="/1000786698.png" alt="Quito Fresh Logo" className="logo-nav" /> 
        <button onClick={() => setIsCartOpen(true)} className="btn-main">MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO SECTION */}
      <header style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ border: '2px solid #8CC63F', color: '#8CC63F', display: 'inline-block', padding: '6px 18px', borderRadius: '50px', fontWeight: '900', fontSize: '13px', letterSpacing: '2px', marginBottom: '25px' }}>EST. 2026</div>
        <h1 className="text-bold" style={{ fontSize: 'clamp(2.5rem, 9vw, 6.5rem)', lineHeight: 0.85, margin: 0, color: '#1A1A1A' }}>
          TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.
        </h1>
        
        <div style={{ marginTop: '50px', position: 'relative' }}>
            <img src="/1000786698.png" alt="Botellas Quito Fresh" style={{ maxWidth: '85%', height: 'auto', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.12))' }} />
        </div>
      </header>

      {/* SECCIÓN MANIFIESTO */}
      <section style={{ position: 'relative', zIndex: 1, padding: '60px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: '#F9FCF7', padding: '45px', borderRadius: '35px', border: '1px solid #EAF2E5' }}>
          <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.4rem', marginBottom: '15px' }}>Nuestra Misión</h3>
          <p style={{ lineHeight: '1.7', color: '#444' }}>Nutrir con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital.</p>
        </div>
        <div style={{ background: '#F9FCF7', padding: '45px', borderRadius: '35px', border: '1px solid #EAF2E5' }}>
          <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.4rem', marginBottom: '15px' }}>Nuestra Visión</h3>
          <p style={{ lineHeight: '1.7', color: '#444' }}>Ser líderes en bienestar premium en Ecuador, reconocidos por la calidad inigualable de nuestros procesos Cold Pressed.</p>
        </div>
        <div style={{ background: '#8CC63F', color: 'white', padding: '45px', borderRadius: '35px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 className="text-bold" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Inauguración 2026</h3>
          <p style={{ lineHeight: '1.7', opacity: 0.95 }}>Nacemos con la promesa de llevar la frescura absoluta del campo directamente a tu mano, sin aditivos ni procesos químicos.</p>
        </div>
      </section>

      {/* CATÁLOGO DESTACADO */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '70px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.id === 1 ? 'featured' : ''}`} style={{ opacity: p.disabled ? 0.6 : 1 }}>
              <div style={{ color: p.accent, fontWeight: '900', fontSize: '13px', marginBottom: '15px', letterSpacing: '1px' }}>{p.tag}</div>
              <h3 className="text-bold" style={{ fontSize: '2.2rem', margin: '0 0 10px 0' }}>{p.name}</h3>
              <p style={{ fontSize: '15px', color: '#666', height: '45px' }}>{p.desc}</p>
              <div style={{ fontSize: '2.8rem', fontWeight: '900', margin: '25px 0', color: '#1A1A1A' }}>${p.price.toFixed(2)}</div>
              <button 
                disabled={p.disabled} 
                onClick={() => addToCart(p)}
                style={{ width: '100%', padding: '18px', borderRadius: '50px', border: 'none', background: p.accent, color: 'white', fontWeight: '900', cursor: 'pointer', transition: '0.3s' }}
              >
                {p.disabled ? "PRÓXIMAMENTE" : "AÑADIR AL PACK"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CORPORATIVO */}
      <footer style={{ padding: '80px 40px', textAlign: 'center', background: '#111', color: 'white', marginTop: '100px' }}>
        <img src="/1000786698.png" alt="Quito Fresh Footer" style={{ height: '60px', marginBottom: '25px', filter: 'brightness(0) invert(1)' }} />
        <div className="text-bold" style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>QUITO FRESH © 2026</div>
        <p style={{ color: '#666', marginTop: '10px', fontSize: '14px' }}>Quito, Ecuador • Pura Esencia Andina</p>
        <div style={{ borderTop: '1px solid #222', marginTop: '50px', paddingTop: '30px', fontSize: '10px', fontWeight: '700', opacity: 0.4, letterSpacing: '3px' }}>
          ESTRATÉGICAMENTE DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS
        </div>
      </footer>

      {/* SIDEBAR DEL CARRITO */}
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #F0F0F0', paddingBottom: '20px' }}>
          <h2 className="text-bold" style={{ fontSize: '1.8rem', margin: 0 }}>TU PACK</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '35px', cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #F5F5F5' }}>
              <div>
                <div className="text-bold" style={{ fontSize: '1.1rem' }}>{i.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #DDD', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                  <span style={{ fontWeight: '900', fontSize: '1.1rem' }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #DDD', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                </div>
              </div>
              <div style={{ fontWeight: '900', fontSize: '1.3rem' }}>${(i.price * i.qty).toFixed(2)}</div>
            </div>
          ))}
          {cart.length === 0 && <p style={{ textAlign: 'center', color: '#999', marginTop: '60px' }}>Tu selección está vacía.</p>}
        </div>
        {cart.length > 0 && (
          <div style={{ borderTop: '2px solid #EEE', paddingTop: '30px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem', fontWeight: '900', marginBottom: '30px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '22px', borderRadius: '50px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              PEDIR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
