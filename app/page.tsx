"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshCompleteBotanical() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const whatsappLink = "https://wa.me/593995849214?text=Hola%20Quito%20Fresh%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20su%20Manifiesto%20Andino.";

  const products = [
    { id: 1, name: "GREEN BOOST", desc: "Manzana, Apio, Espinaca", price: 4.50, accent: "#8CC63F", bg: "#F1F8E9", tag: "100% Natural" },
    { id: 2, name: "BERRY BLISS", desc: "Frutos Rojos y Mora Silvestre", price: 4.50, accent: "#E64A19", bg: "#FFEBEE", tag: "Antioxidante" },
    { id: 3, name: "GOLD CITRUS", desc: "Maracuyá & Cítricos", price: 4.50, accent: "#FFB300", bg: "#FFFDE7", tag: "Full Energía" },
    { id: 4, name: "ANDINA MORA", desc: "Mora de altura premium", price: 4.50, accent: "#880E4F", bg: "#FCE4EC", tag: "Hierro +" },
    { id: 5, name: "AMAZON POWER", desc: "Guayusa y Limón", price: 5.00, accent: "#2E7D32", bg: "#E8F5E9", tag: "Enfoque" },
    { id: 6, name: "SUNRISE MIX", desc: "Zanahoria y Naranja", price: 4.75, accent: "#FB8C00", bg: "#FFF3E0", tag: "Vitamina C" },
    { id: 7, name: "PURE WATER", desc: "Agua de Coco Real", price: 4.00, accent: "#03A9F4", bg: "#E1F5FE", tag: "Hidratación" },
    { id: 8, name: "RELAX BLUE", desc: "Lavanda y Arándanos", price: 5.50, accent: "#5E35B1", bg: "#EDE7F6", tag: "Calma" }
  ];

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
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
      {/* INYECCIÓN DE FUENTES, BOTÁNICOS Y CSS VIBRANTE */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Playfair+Display:ital,wght@1,700&display=swap');
        .text-bold { font-weight: 900; text-transform: uppercase; }
        .text-serif { font-family: 'Playfair Display', serif; }
        .btn-green { background: #8CC63F; color: white; border: none; border-radius: 50px; font-weight: 700; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(140, 198, 63, 0.3); }
        .btn-green:hover { background: #76A935; transform: translateY(-3px); box-shadow: 0 6px 20px rgba(140, 198, 63, 0.4); }
        .qty-btn { width: 32px; height: 32px; border-radius: 50%; border: 1px solid #DDD; background: white; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; }
        .qty-btn:hover { background: #EEE; }
        .sidebar { position: fixed; right: 0; top: 0; width: 100%; max-width: 420px; height: 100%; background: #fff; z-index: 1000; box-shadow: -10px 0 50px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.4s ease-in-out; padding: 40px; box-sizing: border-box; display: flex; flex-direction: column; }
        
        /* HOJAS Y SPLASHES LATERALES DEL PÓSTER */
        .leaf-left { position: fixed; top: 15%; left: 0; width: 20%; max-width: 300px; transform: rotate(-5deg); z-index: -1; pointer-events: none; opacity: 0.5; }
        .splash-right { position: fixed; bottom: 20%; right: 0; width: 25%; max-width: 350px; transform: rotate(10deg); z-index: -1; pointer-events: none; opacity: 0.6; }
        .leaf-right { position: fixed; top: 60%; right: 0; width: 15%; max-width: 200px; z-index: -1; pointer-events: none; opacity: 0.4; }
      ` }} />

      {/* ELEMENTOS DE DISEÑO FLOTANTES */}
      <img src="/p-leaves-left.png" alt="" className="leaf-left" /> {/* Reemplaza con una imagen de las hojas de tu póster */}
      <img src="/p-splash-right.png" alt="" className="splash-right" /> {/* Reemplaza con un splash de color de tu póster */}
      <img src="/p-leaves-right.png" alt="" className="leaf-right" /> {/* Reemplaza con una hoja de tu póster */}

      {/* NAV PREMIUM */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(15px)', zIndex: 100, borderBottom: '1px solid #F0F0F0', boxSizing: 'border-box' }}>
        <div className="text-bold" style={{ fontSize: '22px', letterSpacing: '-1px' }}>QUITO FRESH</div>
        <button onClick={() => setIsCartOpen(true)} className="btn-green" style={{ padding: '12px 25px', fontSize: '14px' }}>
          🛒 VER MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO SECTION - REPLICA DEL PÓSTER */}
      <header style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '160px', right: '100px', fontSize: '12px', letterSpacing: '2px', color: '#666' }}>EST. 2026</div>
        
        <h1 className="text-bold" style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: 0.9, marginBottom: '25px', color: '#000' }}>
          TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.
        </h1>
        
        {/* REPLICA DE LA MASCARA CIRCULAR Y BOTELLAS */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '60px' }}>
          <img src="/botella-green.png" alt="Green Boost Bottle" style={{ height: '35vh' }} /> {/* Reemplaza con imagen real */}
          <img src="/botella-berry.png" alt="Berry Bliss Bottle" style={{ height: '35vh', transform: 'rotate(5deg)' }} /> {/* Reemplaza con imagen real */}
          <img src="/botella-gold.png" alt="Gold Citrus Bottle" style={{ height: '35vh', transform: 'rotate(10deg)' }} /> {/* Reemplaza con imagen real */}
        </div>
      </header>

      {/* INFORMACIÓN DE MARCA PROFUNDA (EL MANIFIESTO) */}
      <section style={{ padding: '200px 30px', textAlign: 'center', background: '#FDFDFD', position: 'relative' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', color: '#1A1A1A' }}>
          <h2 className="text-bold" style={{ fontSize: '14px', color: '#8CC63F', fontWeight: 900, marginBottom: '20px' }}>PURA ESENCIA ANDINA</h2>
          <h2 className="text-serif" style={{ fontSize: '4rem', fontStyle: 'italic', marginTop: '30px' }}>Prensado en Frío, Elevado para Tu Vida.</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '2.4', fontSize: '1.2rem', fontWeight: 300, letterSpacing: '0.05rem', color: '#555' }}>
            Nuestra visión en Quito Fresh es redefinir el bienestar premium. No entregamos un producto simple; entregamos un activo para tu rendimiento y vitalidad diaria. Diseñado para el paladar que exige perfección, cada botella captura el alma intacta de los Andes.
          </p>
          <a href={whatsappLink} className="btn-green sans" style={{ padding: '20px 50px', fontSize: '1.2rem', marginTop: '60px' }}>ADQUIRIR EXPERIENCIA</a>
        </div>
      </section>

      {/* CATALOGO INTERACTIVO CON DISEÑO DE TARJETA PÓSTER */}
      <main id="catalog" style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-bold" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>Nuestro Surtido</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '35px' }}>
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

      {/* INFOGRAFÍAS DEL PÓSTER (ENERGÍA NATURAL, ORIGEN ANDINO) */}
      <section style={{ padding: '100px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div>
              <div style={{ fontSize: '60px' }}>⚙️</div>
              <h3 className="text-bold" style={{ fontSize: '1rem', color: '#8CC63F' }}>Prensado en Frío</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Conserva Máxima Nutrición y Sabor Real.</p>
          </div>
          <div>
              <div style={{ fontSize: '60px' }}>🏔️</div>
              <h3 className="text-bold" style={{ fontSize: '1rem', color: '#8CC63F' }}>Origen Andino</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Valles Locales de Quito y Pichincha.</p>
          </div>
          <div>
              <div style={{ fontSize: '60px' }}>🌿</div>
              <h3 className="text-bold" style={{ fontSize: '1rem', color: '#8CC63F' }}>Energía Natural</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Sin Azúcar Añadida. Solo Fruta Real.</p>
          </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 40px', textAlign: 'center', borderTop: '1px solid #EEE', background: '#FAFAFA' }}>
        <p style={{ color: '#AAA', fontSize: '14px', marginBottom: '40px' }}>
          QUITO FRESH © 2026 - PUREZA REAL.
        </p>
        <p style={{ fontSize: '10px', fontWeight: 700, opacity: 0.3, letterSpacing: '2px' }}>
          DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS
        </p>
      </footer>

      {/* SIDEBAR DEL CARRITO INTERACTIVO */}
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-bold" style={{ fontSize: '1.4rem' }}>Tu Selección Andina</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #EEE' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{i.name}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>${i.price.toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 20px' }}>
                <button onClick={() => updateQty(i.id, -1)} className="qty-btn">-</button>
                <span style={{ fontWeight: 700 }}>{i.qty}</span>
                <button onClick={() => updateQty(i.id, 1)} className="qty-btn">+</button>
              </div>
              <div style={{ fontWeight: 900 }}>${(i.price * i.qty).toFixed(2)}</div>
              <button onClick={() => removeItem(i.id)} style={{ border: 'none', background: 'none', color: '#F44336', fontSize: '12px', cursor: 'pointer' }}>🗑️</button>
            </div>
          ))}
          {cart.length === 0 && <p style={{ textAlign: 'center', color: '#AAA', marginTop: '40px' }}>Tu selección está vacía</p>}
        </div>

        {cart.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 900, marginBottom: '20px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={checkout} className="btn-green" style={{ width: '100%', padding: '20px', background: '#25D366' }}>
              PEDIR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
