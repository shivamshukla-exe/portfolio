import { useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroTerminal from './components/HeroTerminal';
import About from './components/About';
import InteractiveTerminal from './components/InteractiveTerminal';
import CodeShowcase from './components/CodeShowcase';
import CodeMatrix from './components/CodeMatrix';
import AdvancedProjects from './components/AdvancedProjects';
import AdvancedContact from './components/AdvancedContact';
import MouseFollower from './components/MouseFollower';
import ScrollIndicator from './components/ScrollIndicator';
import EnhancedFooter from './components/EnhancedFooter';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="antialiased relative" style={{ overflowX: 'clip' }}>
      <AnimatedBackground />
      <MouseFollower />
      <ScrollIndicator />
      <Navigation />
      <main>
        <div id="hero">
          <HeroTerminal />
        </div>
        <div className="section-divider" />
        <CodeMatrix />
        <div className="section-divider" />
        <InteractiveTerminal />
        <div className="section-divider" />
        <CodeShowcase />
        <div id="about">
          <About />
        </div>
        <div className="section-divider" />
        <AdvancedProjects />
        <div className="section-divider" />
        <div id="contact">
          <AdvancedContact />
        </div>
        <EnhancedFooter />
      </main>
    </div>
  );
}

export default App;
