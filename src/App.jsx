import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeBand from './components/MarqueeBand';
import Categories from './components/Categories';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import VisitUs from './components/VisitUs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <Categories />
        <WhyChooseUs />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <VisitUs />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

export default App;
