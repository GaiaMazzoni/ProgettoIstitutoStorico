// frontend/src/components/Menu.jsx
import Footer from "./Footer";
import ContentSlider from "./ContentSlider";
import ProgettiRete from "./ProgettiRete";
import React from 'react';


export default function Home() {

  return (
    <>
        <section className="eventi-section">
            <h2>Ultimi eventi e novità</h2>
            <ContentSlider />
        </section>
        <section className="progetti-di-rete-section">
            <ProgettiRete />
        </section>
        <section className="footer-section">
            <Footer />
        </section>
    </>
  );
}
