"use client";

export default function QuitoFreshVibrantLuxe() {
  const whatsappLink = "https://wa.me/593995849214?text=Hola%20Quito%20Fresh%2C%20solicito%20acceso%20a%20la%20experiencia%20Premium.";

  const flavors = [
    { name: "ANDINA", type: "Blackberry", color: "#631024", bg: "#FCE4EC" },
    { name: "VITAL", type: "Red Fruits", color: "#A34848", bg: "#FFEBEE" },
    { name: "DETOX", type: "Green Apple", color: "#4A6B4A", bg: "#F1F8E9" },
    { name: "GOLD", type: "Passion Fruit", color: "#B8860B", bg: "#FFFDE7" }
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: '"Inter", sans-serif', margin: 0, padding: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;900&family=Playfair+Display:ital,wght@1,700&display=swap');
        
        .font-brand { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        
        .hero-text-back {
          font-size: 25vw; font-weight: 900; color: #F0F0F0;
          position: absolute; z-index: 1; top: 10%; letter-spacing: -1vw;
        }

        .product-image {
          position: relative; z-index: 2; width: 85%; max-width: 400px;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.15));
          transition: transform 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }
        .product-image:hover { transform: scale(1.05) rotate(2deg); }

        .btn-luxury {
          background: #1A1A1A; color: #fff; padding: 22px 50px;
          border-radius: 100px; font-weight: 700; text-decoration: none;
          letter-spacing: 2px; font-size: 14px; transition: 0.4s;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .btn-luxury:hover { background: #D32F2F; transform: translateY(-3px); }

        .flavor-card {
          padding: 60px 40px; border-radius: 50px; transition: 0.5s;
          display: flex; flex-direction: column; align-items: center;
          border: 1px solid transparent;
        }
        .flavor-card:hover { transform: translateY(-10px); }
      ` }} />

      {/* HEADER MINIMALISTA */}
      <nav style={{ padding: '30px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', width: '100%', zIndex: 100, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
        <div className="font-brand" style={{ fontWeight: 900, fontSize: '24px', letterSpacing: '2px' }}>QUITO FRESH</div>
        <a href={whatsappLink} style={{ color: '#1A1A1A', textDecoration: 'none', fontWeight: 700, fontSize: '12px', borderBottom: '2px solid #D32F2F' }}>CONCIERGE</a>
      </nav>

      {/* HERO SECTION */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-text-back font-brand">FRESH</div>
        <img src="/botella-hero.png" className="product-image" alt="Premium Juice" />
        <div style={{ zIndex: 10, textAlign: 'center', marginTop: '20px' }}>
          <h2 className="font-serif" style={{ fontSize: '3rem', margin: '0' }}>Vitalidad Andina</h2>
          <p style={{ color: '#666', marginBottom: '40px', letterSpacing: '1px' }}>100% ORGÁNICO • PRENSADO EN FRÍO</p>
          <a href={whatsappLink} className="btn-luxury font-brand">PROBAR AHORA</a>
        </div>
      </section>

      {/* SECCIÓN DE PRODUCTOS */}
      <section style={{ padding: '100px 20px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'left', marginBottom: '60px' }}>
            <h3 className="font-brand" style={{ fontSize: '14px', color: '#D32F2F', fontWeight: 900 }}>EL MENÚ</h3>
            <h2 className="font-serif" style={{ fontSize: '4rem' }}>Sabores Reales</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {flavors.map((f, i) => (
              <div key={i} className="flavor-card" style={{ backgroundColor: f.bg }}>
                <div style={{ fontSize: '12px', fontWeight: 900, color: f.color, marginBottom: '20px' }}>{f.name}</div>
                <h4 className="font-serif" style={{ fontSize: '32px', margin: '0 0 10px 0' }}>{f.type}</h4>
                <p style={{ textAlign: 'center', fontSize: '14px', color: '#555', lineHeight: '1.6' }}>{f.desc}</p>
                <div style={{ marginTop: '30px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: f.color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '20px' }}>+</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER ELEGANTE */}
      <footer style={{ padding: '100px 20px', textAlign: 'center', borderTop: '1px solid #EEE' }}>
        <div className="font-brand" style={{ fontSize: '40px', fontWeight: 900, opacity: 0.1, marginBottom: '20px' }}>QUITO FRESH</div>
        <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA' }}>
          DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS © 2026
        </p>
      </footer>
    </div>
  );
}
