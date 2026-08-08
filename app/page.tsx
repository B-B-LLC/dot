import Header from "../components/Header";
import Hero from "../components/Hero";
import Trust from "../components/Trust";
import Services from "../components/Services";
import Doctor from "../components/Doctor";
import Clinic from "../components/Clinic";
import Process from "../components/Process";
import Gallery from "../components/Gallery";
import Faq from "../components/Faq";
import Cta from "../components/Cta";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trust />
        <Services />
        <Doctor />
        <Clinic />
        <Process />
        <Gallery />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
