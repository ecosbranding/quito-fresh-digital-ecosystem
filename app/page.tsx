"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshDefinitiveWeb() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Catálogo: MARACUMORA a $1.00 (Habilitado) y los demás bloqueados
  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", bg: "#FCE4EC", tag: "SABOR ESTRELLA", isFeatured: true, disabled: false },
    { id: 2, name: "GREEN BOOST", desc: "Manzana, Apio, Espinaca", price: 4.50, accent: "#8CC63F", bg: "#F1F8E9", tag: "PRÓXIMAMENTE", disabled: true },
    { id: 3, name: "BERRY BLISS", desc: "Frutos Rojos y Mora Silvestre", price: 4.50, accent: "#E64A19", bg: "#FFEBEE", tag: "PRÓXIMAMENTE", disabled: true },
    { id: 4, name: "GOLD CITRUS", desc: "Maracuyá & Cítricos", price: 4.50, accent: "#FFB300", bg: "#FFFDE7", tag: "PRÓXIMAMENTE", disabled: true },
    { id: 5, name: "ANDINA MORA", desc: "Mora de altura premium", price: 4.50, accent: "#880E4F", bg: "#FCE4EC", tag: "PRÓXIMAMENTE", disabled: true },
    { id: 6, name: "AMAZON POWER", desc: "Guayusa y Limón", price: 5.00, accent: "#2E7D32", bg: "#E8F5E9", tag: "PRÓXIMAMENTE", disabled: true },
  ];

  const addToCart = (p) => {
    if (p.disabled) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const checkout = () => {
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2);
    const items = cart.map(i => `🥤 *${i.name}* x${i.qty}`).join('%0A');
    const msg = `✨ *ORDEN QUITO FRESH* ✨%0A%0AHola! Quiero mi pack:%0A%0A${items}%0A%0A💰 *TOTAL:* $${total}%0A%0A📍 *Entrega en Quito.*`;
    window.open(`https://wa.me/593995849214?text=${msg}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: '"Montserrat", sans-serif', margin: 0, position: 'relative', overflowX: 'hidden' }}>
      
      {/* ESTILOS GLOBALES Y ANIMACIONES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
        .text-bold { font-weight: 900; text-transform: uppercase; }
        
        /* Imágenes de fondo decorativas ancladas a los lados (no rompen el contenido) */
        .deco-leaf-left { position: absolute; left: -50px; top: 15%; width: 250px; z-index: 0; pointer-events: none; opacity: 0.8; }
        .deco-splash-right { position: absolute; right: -50px; top: 40%; width: 300px; z-index: 0; pointer-events: none; opacity: 0.8; }
        
        /* Tarjetas de producto */
        .product-card { position: relative; z-index: 10; padding: 40px 25px; border-radius: 30px; text-align: center; background: #fff; transition: 0.3s; border: 2px solid #EEE; }
        .featured-card { border: 3px solid #E91E63; transform: scale(1.05); box-shadow: 0 15px 35px rgba(233, 30, 99, 0.15); background: #FFF0F5; }
        .disabled-card { opacity: 0.6; filter: grayscale(0.8); }
        
        /* Botones */
        .btn-green { background: #8CC63F; color: white; border: none; border-radius: 50px; font-weight: 700; cursor: pointer; transition: 0.3s; padding: 12px 25px; }
        .btn-green:hover { background: #76A935; }
        .btn-buy { color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; width: 100%; transition: 0.3s; cursor: pointer; }
        .btn-buy:hover:not(:disabled) { transform: translateY(-3px); opacity: 0.9; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
        .btn-buy:disabled { cursor: not-allowed; opacity: 0.5; }
        
        /* Sidebar */
        .sidebar { position: fixed; right: 0; top: 0; width: 100%; max-width: 400px; height: 100%; background: #fff; z-index: 1000; box-shadow: -10px 0 50px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.4s ease-in-out; padding: 30px; display: flex; flex-direction: column; }
      ` }} />

      {/* ELEMENTOS GRÁFICOS LATERALES (Hojas y Splash) */}
      <img src="/p-leaves-left.png" alt="" className="deco-leaf-left" />
      <img src="/p-splash-right.png" alt="" className="deco-splash-right" />

      {/* BARRA DE NAVEGACIÓN */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div className="text-bold" style={{ fontSize: '24px', color: '#1A1A1A' }}>QUITO FRESH</div>
        <button onClick={() => setIsCartOpen(true)} className="btn-green">
          🛒 MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO SECTION COMPOSICIÓN LIMPIA */}
      <header style={{ position: 'relative', paddingTop: '140px', paddingBottom: '80px', textAlign: 'center', zIndex: 10 }}>
        <div style={{ display: 'inline-block', border: '2px solid #8CC63F', color: '#8CC63F', fontWeight: '900', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', letterSpacing: '2px', marginBottom: '20px' }}>
          EST. 2026
        </div>
        
        <h1 className="text-bold" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, color: '#1A1A1A', margin: '0 0 40px 0' }}>
          TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.
        </h1>

        {/* IMAGEN DE TUS BOTELLAS (Carga la que generamos con los logos) */}
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
          <img src="/hero-quito-fresh.png" alt="Botellas Quito Fresh" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }} />
        </div>
      </header>

      {/* MANIFIESTO: MISIÓN, VISIÓN Y AÑO DE INICIO */}
      <section style={{ padding: '60px 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ background: '#F8FBF5', padding: '40px', borderRadius: '30px', border: '1px solid #E1EED3' }}>
            <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.5rem', marginBottom: '15px' }}>Nuestra Misión</h3>
            <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1.1rem' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital para el día a día.</p>
          </div>

          <div style={{ background: '#F8FBF5', padding: '40px', borderRadius: '30px', border: '1px solid #E1EED3' }}>
            <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.5rem', marginBottom: '15px' }}>Nuestra Visión</h3>
            <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1.1rem' }}>Ser la marca líder en bienestar premium en Ecuador, reconocida por la calidad inigualable de nuestros jugos Cold Pressed y nuestro compromiso con la salud pura.</p>
          </div>

          <div style={{ background: '#8CC63F', padding: '40px', borderRadius: '30px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="text-bold" style={{ fontSize: '2rem', marginBottom: '10px' }}>DESDE 2026</h3>
            <p style={{ lineHeight: '1.7', fontSize: '1.1rem', opacity: 0.9 }}>Quito Fresh nace con la promesa inquebrantable de llevar la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños.</p>
          </div>

        </div>
      </section>

      {/* CATÁLOGO DE SABORES (MARACUMORA DESTACADO) */}
      <section style={{ padding: '80px 20px', backgroundColor: '#FAFAFA', position: 'relative', zIndex: 10 }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '60px', color: '#1A1A1A' }}>NUESTRO SURTIDO</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.isFeatured ? 'featured-card' : ''} ${p.disabled ? 'disabled-card' : ''}`}>
              
              <div style={{ color: p.accent, fontSize: '13px', fontWeight: '900', letterSpacing: '1px', marginBottom: '10px' }}>{p.tag}</div>
              <h3 className="text-bold" style={{ fontSize: '2rem', margin: '0 0 15px 0', color: '#1A1A1A' }}>{p.name}</h3>
              <p style={{ color: '#666', fontSize: '15px', minHeight: '45px', marginBottom: '20px' }}>{p.desc}</p>
              
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1A1A1A', marginBottom: '25px' }}>
                ${p.price.toFixed(2)}
              </div>
              
              <button 
                disabled={p.disabled} 
                onClick={() => addToCart(p)}
                className="btn-buy"
                style={{ background: p.disabled ? '#CCC' : p.accent }}
              >
                {p.disabled ? "MUY PRONTO" : "AÑADIR AL PACK"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CORPORATIVO */}
      <footer style={{ padding: '60px 20px', textAlign: 'center', background: '#1A1A1A', color: 'white', position: 'relative', zIndex: 10 }}>
        <div className="text-bold" style={{ fontSize: '1.8rem', marginBottom: '15px' }}>QUITO FRESH</div>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '30px' }}>PURA ESENCIA ANDINA • QUITO, ECUADOR • ESTABLECIDOS EN 2026</p>
        <div style={{ borderTop: '1px solid #333', paddingTop: '30px', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', color: '#555' }}>
          ESTRATÉGICAMENTE DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS
        </div>
      </footer>

      {/* SIDEBAR DEL CARRITO DINÁMICO */}
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #EEE', paddingBottom: '15px' }}>
          <h2 className="text-bold" style={{ fontSize: '1.5rem', margin: 0 }}>TU PACK</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '28px', cursor: 'pointer', color: '#1A1A1A' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #F5F5F5' }}>
              <div>
                <div style={{ fontWeight: '900', color: '#1A1A1A' }}>{i.name}</div>
                <div style={{ fontSize: '13px', color: '#888' }}>x{i.qty} unidad(es)</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontWeight: '900', color: '#1A1A1A' }}>${(i.price * i.qty).toFixed(2)}</span>
                <button onClick={() => removeItem(i.id)} style={{ border: 'none', background: 'none', color: '#E91E63', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <p style={{ textAlign: 'center', color: '#999', marginTop: '50px', fontSize: '14px' }}>Aún no has añadido tu sabor estrella.</p>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #EEE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: '900', marginBottom: '20px', color: '#1A1A1A' }}>
              <span>TOTAL:</span>
              <span>${cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={checkout} className="btn-green" style={{ width: '100%', padding: '18px', fontSize: '1.1rem', background: '#25D366' }}>
              PEDIR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
