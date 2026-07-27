import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import RiseStore from '@/components/RiseStore';
import Portfolio from '@/components/Portfolio';
import RiseProductions from '@/components/RiseProductions';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <RiseStore />
        <Portfolio />
        <RiseProductions />
        <About />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
