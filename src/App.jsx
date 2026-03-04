import { useState, useEffect, lazy, Suspense } from 'react'
import GlobalBackground from './layouts/GlobalBackground'
import Hero from './components/Hero'
import About from './components/About'
import SplitImageSection from './components/SplitImageSection'
import ProjectorMenu from './components/ProjectorMenu'
import InteractiveFooter from './components/InteractiveFooter'
import SponsorsSection from './components/SponsorsSection'
import SmoothScroll from './components/SmoothScroll'
import CampusAmbassador from './components/CampusAmbassador'
import SponsorUs from './components/SponsorUs';
import LoadingScreen from './components/LoadingScreen';
import PronitesSection from './components/PronitesSection'

// Lazy load heavy or modal components
const CulturalEventsSection = lazy(() => import('./components/CulturalEventsSection'));
const SciTechEventsSection = lazy(() => import('./components/SciTechEventsSection'));
const SportsEventsSection = lazy(() => import('./components/SportsEventsSection'));
const PronitesLineupSection = lazy(() => import('./components/PronitesLineupSection'));
const CampusAmbassadorModal = lazy(() => import('./components/CampusAmbassadorModal'));
const SponsorPackages = lazy(() => import('./components/SponsorPackages'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCaModal, setShowCaModal] = useState(false);
  const [showSponsorPackages, setShowSponsorPackages] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [showCultural, setShowCultural] = useState(false);
  const [showSciTech, setShowSciTech] = useState(false);
  const [showSports, setShowSports] = useState(false);
  const [showPronitesLineup, setShowPronitesLineup] = useState(false);
  const [activeProniteDay, setActiveProniteDay] = useState(1);

  const handleOpenPronites = (day) => {
    setActiveProniteDay(day);
    setShowPronitesLineup(true);
  };

  // Hard-block ALL scrolling while the loading animation is active
  useEffect(() => {
    if (!isLoading) return;

    const blockScroll = (e) => e.preventDefault();

    // Block wheel (mouse/trackpad) and touch scroll
    window.addEventListener('wheel', blockScroll, { passive: false });
    window.addEventListener('touchmove', blockScroll, { passive: false });

    // Also lock body overflow as a fallback
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <LoadingScreen
          onComplete={() => {
            setIsLoading(false);
            // Show the CA modal a moment after the page is revealed
            setTimeout(() => setShowCaModal(true), 600);
          }}
        />
      )}

      <Suspense fallback={null}>
        {showCaModal && (
          <CampusAmbassadorModal onClose={() => setShowCaModal(false)} />
        )}
      </Suspense>

      <GlobalBackground>
        {!isLoading && <SmoothScroll />}
        <ProjectorMenu isFooterVisible={isFooterVisible} />
        <main className="w-full relative">
          <section id="home">
            <Hero />
          </section>
          <section id="about">
            <About />
          </section>

          <div id="pronites">
            <PronitesSection onOpenLineup={handleOpenPronites} />
          </div>

          <Suspense fallback={<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">Loading...</div>}>
            {showPronitesLineup && <PronitesLineupSection activeDay={activeProniteDay} onClose={() => setShowPronitesLineup(false)} />}
          </Suspense>

          <div id="events">
            <SplitImageSection
              onOpenCultural={() => setShowCultural(true)}
              onOpenSciTech={() => setShowSciTech(true)}
              onOpenSports={() => setShowSports(true)}
            />
          </div>

          <CampusAmbassador />

          <Suspense fallback={null}>
            {showCultural && <CulturalEventsSection onClose={() => setShowCultural(false)} />}
            {showSciTech && <SciTechEventsSection onClose={() => setShowSciTech(false)} />}
            {showSports && <SportsEventsSection onClose={() => setShowSports(false)} />}
          </Suspense>

          <div id="sponsors" className="relative z-10">
            <SponsorsSection />
          </div>

          <SponsorUs onViewPackages={() => setShowSponsorPackages(true)} />

        </main>
        <InteractiveFooter setIsFooterVisible={setIsFooterVisible} />
      </GlobalBackground>

      <Suspense fallback={null}>
        {showSponsorPackages && (
          <SponsorPackages onClose={() => setShowSponsorPackages(false)} />
        )}
      </Suspense>
    </>
  )
}

export default App
