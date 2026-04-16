"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshPosterWeb() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Nuevo catálogo con MARACUMORA resaltado
  const products = [
    { id: 1, name: "MARACUMORA", desc: "Sabor Estrella: Maracuyá + Mora", price: 1.00, accent: "#E91E63", bg: "#FCE4EC", tag: "NUEVO & DESTACADO", isFeatured: true },
    { id: 2, name: "GREEN BOOST", desc: "Próximamente", price: 4.50, accent: "#8CC63F", bg: "#F1F8E9", tag: "PRÓXIMAMENTE", disabled: true },
    { id: 3, name: "BERRY BLISS", desc: "Próximamente", price: 4.50, accent: "#E64A19", bg: "#FFEBEE", tag: "PRÓXIMAMENTE", disabled: true },
    { id: 4, name: "GOLD CITRUS", desc: "Próximamente", price: 4.50, accent: "#FFB300", bg: "#FFFDE7", tag: "PRÓXIMAMENTE", disabled: true },
    { id: 5, name: "ANDINA MORA", desc: "Próximamente", price: 4.50, accent: "#880E4F", bg: "#FCE4EC", tag: "PRÓXIMAMENTE", disabled: true },
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

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: '"Montserrat", sans-serif', margin: 0, position: 'relative', overflowX: 'hidden' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Playfair+Display:ital,wght@1,700&display=swap');
        .text-bold { font-weight: 900; text-transform: uppercase; }
        .featured-card { transform: scale(1.05); border: 3px solid #E91E63 !important; box-shadow: 0 20px 40px rgba(233, 30, 99, 0.2); z-index: 10; }
        .disabled-card { opacity: 0.6; filter: grayscale(0.5); }
        .btn-buy { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 700; cursor: pointer; width: 100%; transition: 0.3s; }
        .btn-buy:hover:not(:disabled) { transform: translateY(-3px); background: #76A935; }
        .sidebar { position: fixed; right: 0; top: 0; width: 100%; max-width: 400px; height: 100%; background: #fff; z-index: 1000; box-shadow: -10px 0 50px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.4s ease-in-out; padding: 30px; }
      ` }} />

      {/* HEADER / NAV */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', zIndex: 100 }}>
        <div className="text-bold" style={{ fontSize: '20px' }}>QUITO FRESH</div>
        <button onClick={() => setIsCartOpen(true)} style={{ background: '#8CC63F', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>
          CARRITO ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO SECTION - REPLICA DEL PÓSTER */}
      <header style={{ 
        minHeight: '100vh', 
        paddingTop: '100px',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        background: 'url("/1000786698.png") no-repeat center center', // Usando tu imagen maestra de fondo
        backgroundSize: 'contain'
      }}>
        <div style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '20px', fontWeight: '900', color: '#8CC63F', border: '2px solid #8CC63F', padding: '5px 15px', borderRadius: '50px' }}>
          EST. 2026
        </div>

        <h1 className="text-bold" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 0.9, marginTop: '40px' }}>
          TU VIDA <br/>
          <span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>
          EMPIEZA AQUÍ.
        </h1>
      </header>

      {/* SECCIÓN MISIÓN Y VISIÓN */}
      <section style={{ padding: '80px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ padding: '40px', borderRadius: '30px', background: '#F9F9F9' }}>
          <h2 className="text-bold" style={{ color: '#8CC63F', marginBottom: '15px' }}>MISIÓN</h2>
          <p style={{ lineHeight: 1.6, fontSize: '1.1rem' }}>Nutrir a nuestra comunidad con extractos puros de la tierra, fomentando un estilo de vida consciente y lleno de energía vital.</p>
        </div>
        <div style={{ padding: '40px', borderRadius: '30px', background: '#F9F9F9' }}>
          <h2 className="text-bold" style={{ color: '#8CC63F', marginBottom: '15px' }}>VISIÓN</h2>
          <p style={{ lineHeight: 1.6, fontSize: '1.1rem' }}>Ser la marca líder en bienestar andino, reconocida por la calidad inigualable de nuestros jugos Cold Pressed en todo el país.</p>
        </div>
        <div style={{ padding: '40px', borderRadius: '30px', background: '#8CC63F', color: 'white' }}>
          <h2 className="text-bold" style={{ marginBottom: '15px' }}>DESDE 2026</h2>
          <p style={{ lineHeight: 1.6, fontSize: '1.1rem' }}>Quito Fresh nace este año con la promesa de llevar la frescura absoluta del campo directamente a tu mano, sin procesos químicos.</p>
        </div>
      </section>

      {/* CATÁLOGO INTERACTIVO */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '50px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
          {products.map(p => (
            <div key={p.id} className={`${p.isFeatured ? 'featured-card' : ''} ${p.disabled ? 'disabled-card' : ''}`} style={{ 
              padding: '40px 30px', 
              borderRadius: '40px', 
              textAlign: 'center', 
              border: '1px solid #EEE',
              background: p.bg
            }}>
              <span style={{ fontSize: '12px', fontWeight: '900', color: p.accent }}>{p.tag}</span>
              <h3 className="text-bold" style={{ fontSize: '2rem', margin: '15px 0' }}>{p.name}</h3>
              <p style={{ marginBottom: '20px', minHeight: '40px' }}>{p.desc}</p>
              <div style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '20px' }}>${p.price.toFixed(2)}</div>
              <button 
                disabled={p.disabled} 
                onClick={() => addToCart(p)}
                className="btn-buy"
                style={{ background: p.accent }}
              >
                {p.disabled ? "MUY PRONTO" : "AÑADIR AL PACK"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px', textAlign: 'center', background: '#FAFAFA' }}>
        <div className="text-bold" style={{ fontSize: '1.5rem' }}>QUITO FRESH</div>
        <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>QUITO, ECUADOR • ESTABLECIDOS EN 2026</p>
        <p style={{ fontSize: '10px', marginTop: '30px', opacity: 0.5 }}>ESTRATEGICAMENTE DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS</p>
      </footer>

      {/* SIDEBAR DEL CARRITO */}
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 className="text-bold">TU SELECCIÓN</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
        </div>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #EEE' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ fontSize: '12px' }}>Cant: {item.qty}</div>
            </div>
            <div style={{ fontWeight: '900' }}>${(item.price * item.qty).toFixed(2)}</div>
          </div>
        ))}
        {cart.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: '900' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0).toFixed(2)}</span>
            </div>
            <button style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '20px', borderRadius: '50px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer' }}>
              PEDIR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
