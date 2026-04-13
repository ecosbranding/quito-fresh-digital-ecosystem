"use client";

export default function QuitoFreshMasterpiece() {
  const whatsappLink = "https://wa.me/593995849214?text=Hola%20Quito%20Fresh%2C%20deseo%20el%20Pack%20Premium.%20Solicito%20asesor%C3%ADa%20sobre%20la%20disponibilidad%20de%20sabores.";

  const flavors = [
    { name: "Mora Silvestre", desc: "Antioxidante natural de altura.", color: "#4A0E0E" },
    { name: "Frutos Rojos", desc: "Mix vital de fresas y arándanos.", color: "#8B0000" },
    { name: "Verde Detox", desc: "Manzana verde, apio y espinaca.", color: "#1A2F1A" },
    { name: "Maracuyá Real", desc: "Energía tropical pura.", color: "#B8860B" }
  ];

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', fontFamily: '"Inter", sans-serif', margin: 0, padding: 0, overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,700&family=Inter:wght@200;400;700&display=swap');
        
        body { margin: 0; background: #000; }
        .font-luxury { font-family: 'Cormorant Garamond', serif; }
        .text-red { color: #D32F2F; }
        
        .hero-section { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; padding-top: 80px; }
        
        .bottle-container {
          position: relative; width: 100%; max-width: 500px; margin: 40px auto;
          display: flex; justify-content: center;
        }

        .bottle-image {
          width: 90%; border-radius: 40px; border: 1px solid rgba(255,255,255,0.1);
          filter: contrast(1.1) brightness(0.9); transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .cta-main {
          background: #D32F2F; color: #fff; padding: 22px 60px; border-radius: 100px;
          font-weight: 700; text-decoration: none; text-transform: uppercase;
          letter-spacing: 4px; font-size: 13px; transition: 0.5s;
          display: inline-block; border: none; cursor: pointer;
          box-shadow: 0 20px 40px rgba(211,47,47,0.3);
        }
        .cta-main:hover { transform: translateY(-5px); box-shadow: 0 30px 60px rgba(211,47,47,0.5); background: #f00; }

        .flavor-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; padding: 0 20px; }
        
        .flavor-card {
          background: rgba(255,255,255,0.03); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.05); padding: 40px;
          border-radius: 35px; transition: 0.5s ease;
        }
        .flavor-card:hover { background: rgba(211,47,47,0.05); border-color: #D32F2F; transform: scale(1.02); }
      ` }} />

      {/* NAV PREMIUM */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '25px 40px', zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(15px)' }}>
        <div className="font-luxury" style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-1px' }}>QUITO FRESH</div>
        <a href={whatsappLink} style={{ color: '#fff', textDecoration: 'none', fontSize: '11px', border: '1px solid #D32F2F', padding: '12px 25px', borderRadius: '50px', letterSpacing: '2px', fontWeight: '700' }}>CONCIERGE</a>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="font-luxury" style={{ fontSize: '14vw', textAlign: 'center', margin: 0, lineHeight: 0.9 }}>
          PUREZA <br/> <span className="text-red">ANDINA</span>
        </h1>
        
        <div className="bottle-container">
          <img src="/botella-hero.png" className="bottle-image" alt="Quito Fresh Premium" />
        </div>

        <div style={{ textAlign: 'center', padding: '0 20px' }}>
          <p className="font-luxury" style={{ fontSize: '22px', fontStyle: 'italic', marginBottom: '40px', color: 'rgba(255,255,255,0.6)' }}>
            "Prensado en frío para quienes no aceptan menos que la perfección."
          </p>
          <a href={whatsappLink} className="cta-main">ADQUIRIR EXPERIENCIA</a>
        </div>
      </section>

      {/* SECCIÓN SABORES */}
      <section style={{ padding: '120px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="font-luxury" style={{ fontSize: '60px', textAlign: 'center', marginBottom: '80px' }}>
            Colección de <span className="text-red italic">Temporada</span>
          </h2>
          
          <div className="flavor-grid">
            {flavors.map((f, i) => (
              <div key={i} className="flavor-card">
                <div style={{ width: '50px', height: '5px', backgroundColor: f.color, marginBottom: '30px' }}></div>
                <h3 className="font-luxury" style={{ fontSize: '35px', margin: '0 0 15px 0' }}>{f.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px', lineHeight: '1.8' }}>{f.desc}</p>
                <div style={{ marginTop: '30px', fontSize: '11px', letterSpacing: '3px', color: '#D32F2F', fontWeight: '700' }}>DISPONIBLE</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFIESTO ORCA */}
      <section style={{ padding: '150px 20px', textAlign: 'center', background: 'linear-gradient(to bottom, #000, #0a0a0a)' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h2 className="font-luxury" style={{ fontSize: '45px', marginBottom: '30px' }}>Visión de Lujo</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '2.2', fontSize: '18px' }}>
            Desarrollado bajo los estándares de **ORCA Studios**, Quito Fresh redefine la nutrición premium. No entregamos solo un producto, entregamos un activo para tu rendimiento diario.
          </p>
        </div>
      </section>

      <footer style={{ padding: '80px 40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: '10px', letterSpacing: '4px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
          Estratégicamente desarrollado por ECOS Branding & ORCA Studios © 2026
        </p>
      </footer>
    </div>
  );
}
