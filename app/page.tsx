"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshMaster() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Mantenemos los 8 sabores para que sea un menú completo
  const products = [
    { id: 1, name: "Green Boost", desc: "Manzana, Apio, Espinaca", price: 4.50, accent: "#8CC63F", bg: "#F1F8E9", tag: "100% Natural" },
    { id: 2, name: "Berry Bliss", desc: "Frutos Rojos y Mora Silvestre", price: 4.50, accent: "#E64A19", bg: "#FFEBEE", tag: "Antioxidante" },
    { id: 3, name: "Zest Citrus", desc: "Maracuyá y Cítricos", price: 4.50, accent: "#FFB300", bg: "#FFFDE7", tag: "Full Energía" },
    { id: 4, name: "Andina Mora", desc: "Mora de altura premium", price: 4.50, accent: "#880E4F", bg: "#FCE4EC", tag: "Hierro +" },
    { id: 5, name: "Amazon Power", desc: "Guayusa y Limón", price: 5.00, accent: "#2E7D32", bg: "#E8F5E9", tag: "Enfoque" },
    { id: 6, name: "Sunrise Mix", desc: "Zanahoria y Naranja", price: 4.75, accent: "#FB8C00", bg: "#FFF3E0", tag: "Vitamina C" },
    { id: 7, name: "Pure Water", desc: "Agua de Coco Real", price: 4.00, accent: "#03A9F4", bg: "#E1F5FE", tag: "Hidratación" },
    { id: 8, name: "Relax Blue", desc: "Lavanda y Arándanos", price: 5.50, accent: "#5E35B1", bg: "#EDE7F6", tag: "Calma" }
  ];

  // Acción del botón principal
  const scrollToMenu = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const addToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const checkout = () => {
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2);
    const items = cart.map(i => `🥤 *${i.name}* x${i.qty}`).join('%0A');
    const msg = `✨ *ORDEN QUITO FRESH* ✨%0A%0AHola! Quiero armar mi pack:%0A%0A${items}%0A%0A💰 *TOTAL:* $${total}%0A%0A📍 *Entrega en Quito.* 🏔️🍏`;
    window.open(`https://wa.me/593995849214?text=${msg}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: '"Montserrat", sans-serif', margin: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
        .text-bold { font-weight: 900; text-transform: uppercase; }
        .btn-green { background: #8CC63F; color: white; border: none; border-radius: 50px; font-weight: 700; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(140, 198, 63, 0.3); }
        .btn-green:hover { background: #76A935; transform: translateY(-3px); box-shadow: 0 6px 20px rgba(140, 198, 63, 0.4); }
        .info-box { padding: 40px; border-radius: 25px; background: #F9F9F9; flex: 1; min-width: 300px; border: 1px solid #EEE; }
        .qty-btn { width: 32px; height: 32px; border-radius: 50%; border: 1px solid #DDD; background: white; cursor: pointer; font-weight: bold; }
        .sidebar { position: fixed; right: 0; top: 0; width: 100%; max-width: 420px; height: 100%; background: #fff; z-index: 1000; box-shadow: -10px 0 50px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.4s ease-in-out; padding: 40px; box-sizing: border-box; display: flex; flex-direction: column; }
      ` }} />

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', zIndex: 100, borderBottom: '1px solid #F0F0F0', boxSizing: 'border-box' }}>
        <div className="text-bold" style={{ fontSize: '22px', color: '#1A1A1A' }}>QUITO FRESH</div>
        <button onClick={() => setIsCartOpen(true)} className="btn-green" style={{ padding: '12px 25px', fontSize: '14px' }}>
          🛒 MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO */}
      <section style={{ padding: '160px 40px 100px 40px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 className="text-bold" style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: 0.9, marginBottom: '25px' }}>
          TU VIDA <span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/> EMPIEZA AQUÍ.
        </h1>
        <p style={{ fontSize: '19px', color: '#555', marginBottom: '45px', maxWidth: '650px', margin: '0 auto 45px auto', lineHeight: 1.6 }}>
          Descubre la pureza de los Andes en cada botella. Prensado en frío, 100% orgánico y diseñado para tu máximo rendimiento.
        </p>
        <button onClick={scrollToMenu} className="btn-green" style={{ padding: '22px 55px', fontSize: '18px' }}>
          VER NUESTRO MENÚ
        </button>
      </section>

      {/* MISION / VISION / 2026 */}
      <section style={{ padding: '60px 40px', background: '#FFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          <div className="info-box">
            <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.1rem', marginBottom: '15px' }}>Misión</h3>
            <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.6 }}>Nutrir a nuestra comunidad con extractos puros de la tierra, fomentando un estilo de vida consciente y lleno de energía vital.</p>
          </div>
          <div className="info-box">
            <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.1rem', marginBottom: '15px' }}>Visión</h3>
            <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.6 }}>Ser la marca líder en bienestar andino, reconocida por la calidad inigualable de nuestros jugos Cold Pressed en todo el país.</p>
          </div>
          <div className="info-box" style={{ background: '#8CC63F', color: 'white', borderColor: '#8CC63F' }}>
            <h3 className="text-bold" style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Desde 2026</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.6 }}>Quito Fresh nace este año con la promesa de llevar la frescura absoluta del campo directamente a tu mano, sin procesos químicos.</p>
          </div>
        </div>
      </section>

      {/* CATALOGO */}
      <main id="catalog" style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-bold" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>Nuestro Surtido</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '35px' }}>
          {products.map(p => (
            <div key={p.id} style={{ borderRadius: '30px', padding: '45px 30px', border: `2px solid ${p.bg}`, textAlign: 'center' }}>
              <div style={{ color: p.accent, fontSize: '12px', fontWeight: 800, marginBottom: '15px', letterSpacing: '1px' }}>{p.tag}</div>
              <h3 className="text-bold" style={{ fontSize: '1.9rem', color: '#1A1A1A', margin: '0 0 10px 0' }}>{p.name}</h3>
              <p style={{ fontSize: '15px', color: '#777', marginBottom: '25px', height: '40px' }}>{p.desc}</p>
              <div style={{ fontSize: '24px', fontWeight: 900, marginBottom: '30px' }}>${p.price.toFixed(2)}</div>
              <button onClick={() => addToCart(p)} className="btn-green" style={{ width: '100%', padding: '18px', background: p.accent }}>
                AÑADIR AL PACK
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ padding: '80px 40px', textAlign: 'center', borderTop: '1px solid #EEE', background: '#FAFAFA' }}>
        <div className="text-bold" style={{ fontSize: '1.8rem', letterSpacing: '-1px' }}>QUITO FRESH</div>
        <p style={{ color: '#AAA', fontSize: '14px', marginTop: '10px' }}>Establecidos con orgullo en Quito, Ecuador • 2026</p>
        <div style={{ marginTop: '40px', fontSize: '10px', fontWeight: 700, opacity: 0.3, letterSpacing: '2px' }}>
          STRATEGICALLY DEVELOPED BY ECOS BRANDING & ORCA STUDIOS
        </div>
      </footer>

      {/* CARRITO SIDEBAR */}
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 className="text-bold" style={{ fontSize: '1.6rem' }}>Tu Selección</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '35px', cursor: 'pointer' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #F5F5F5' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '16px' }}>{i.name}</div>
                <div style={{ fontSize: '13px', color: '#999' }}>${i.price.toFixed(2)} unit.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 20px' }}>
                <button className="qty-btn" onClick={() => updateQty(i.id, -1)}>-</button>
                <span style={{ fontWeight: 700 }}>{i.qty}</span>
                <button className="qty-btn" onClick={() => updateQty(i.id, 1)}>+</button>
              </div>
              <div style={{ fontWeight: 900, minWidth: '60px', textAlign: 'right' }}>
                ${(i.price * i.qty).toFixed(2)}
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '100px', color: '#CCC' }}>
              <div style={{ fontSize: '50px' }}>🥤</div>
              <p>Tu pack está vacío</p>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '2px solid #EEE', paddingTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: 900, marginBottom: '25px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={checkout} className="btn-green" style={{ width: '100%', padding: '22px', background: '#25D366', fontSize: '16px' }}>
              PEDIR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
