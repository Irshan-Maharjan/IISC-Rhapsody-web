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
import LoadingScreen from './components/LoadingScreen';
import SponsorUs from './components/SponsorUs';
import PronitesSection from './components/PronitesSection'
import EarlyBirdSection from './components/EarlyBirdSection'

// Lazy load heavy or modal components
const CulturalEventsSection = lazy(() => import('./components/CulturalEventsSection'));
const CulturalEventDetails = lazy(() => import('./components/CulturalEventDetails'));
const SciTechEventsSection = lazy(() => import('./components/SciTechEventsSection'));
const SportsEventsSection = lazy(() => import('./components/SportsEventsSection'));
const PronitesLineupSection = lazy(() => import('./components/PronitesLineupSection'));
const CampusAmbassadorModal = lazy(() => import('./components/CampusAmbassadorModal'));
const EarlyBirdModal = lazy(() => import('./components/EarlyBirdModal'));
const SponsorPackages = lazy(() => import('./components/SponsorPackages'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showEarlyBirdModal, setShowEarlyBirdModal] = useState(false);
  const [showCaModal, setShowCaModal] = useState(false);
  const [showSponsorPackages, setShowSponsorPackages] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [showCultural, setShowCultural] = useState(false);
  const [showSciTech, setShowSciTech] = useState(false);
  const [showSports, setShowSports] = useState(false);
  const [selectedCulturalEvent, setSelectedCulturalEvent] = useState(null);
  const [showPronitesLineup, setShowPronitesLineup] = useState(false);
  const [activeProniteDay, setActiveProniteDay] = useState(1);

  const handleOpenPronites = (day) => {
    setActiveProniteDay(day);
    setShowPronitesLineup(true);
  };

  // Determine if any modal/overlay is currently active
  const isAnyModalOpen = showEarlyBirdModal || showCaModal || showSponsorPackages ||
    showCultural || showSciTech || showSports ||
    !!selectedCulturalEvent || showPronitesLineup;

  // Force Menu visibility by overriding footer visibility when a modal is open
  const effectiveFooterVisibility = isFooterVisible && !isAnyModalOpen;

  // Hard-block ALL scrolling while the loading animation is active
  useEffect(() => {
    if (!isLoading) return;

    const blockScroll = (e) => e.preventDefault();
    window.addEventListener('wheel', blockScroll, { passive: false });
    window.addEventListener('touchmove', blockScroll, { passive: false });
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLoading]);

  const closeAllModals = () => {
    setShowEarlyBirdModal(false);
    setShowCaModal(false);
    setShowSponsorPackages(false);
    setShowCultural(false);
    setShowSciTech(false);
    setShowSports(false);
    setSelectedCulturalEvent(null);
    setShowPronitesLineup(false);
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen
          onComplete={() => {
            setIsLoading(false);
            setTimeout(() => setShowEarlyBirdModal(true), 600);
          }}
        />
      )}

      <GlobalBackground>
        {/* Only mount SmoothScroll (Lenis) after loading — prevents scroll during animation */}
        {!isLoading && <SmoothScroll />}
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

          <EarlyBirdSection />

          <div id="events">
            <SplitImageSection
              onOpenCultural={() => setShowCultural(true)}
              onOpenSciTech={() => setShowSciTech(true)}
              onOpenSports={() => setShowSports(true)}
            />
          </div>

          <CampusAmbassador />

          <div id="sponsors" className="relative z-10">
            <SponsorsSection />
          </div>

          <SponsorUs onViewPackages={() => setShowSponsorPackages(true)} />
        </main>
        <InteractiveFooter setIsFooterVisible={setIsFooterVisible} />
      </GlobalBackground>

      {/* Modals and Overlays - Rendered at the end to ensure proper layering */}
      <Suspense fallback={null}>
        {showEarlyBirdModal && (
          <EarlyBirdModal onClose={() => {
            setShowEarlyBirdModal(false);
            setShowCaModal(true);
          }} />
        )}
        {showCaModal && (
          <CampusAmbassadorModal onClose={() => setShowCaModal(false)} />
        )}
        {showSponsorPackages && (
          <SponsorPackages onClose={() => setShowSponsorPackages(false)} />
        )}
        {showPronitesLineup && (
          <PronitesLineupSection activeDay={activeProniteDay} onClose={() => setShowPronitesLineup(false)} />
        )}
        {showCultural && (
          <CulturalEventsSection
            onClose={() => setShowCultural(false)}
            onOpenEventDetail={(event) => setSelectedCulturalEvent(event)}
          />
        )}
        {selectedCulturalEvent && (
          <CulturalEventDetails
            event={selectedCulturalEvent}
            onClose={() => setSelectedCulturalEvent(null)}
          />
        )}
        {showSciTech && <SciTechEventsSection onClose={() => setShowSciTech(false)} />}
        {showSports && <SportsEventsSection onClose={() => setShowSports(false)} />}
      </Suspense>

      {/* Render Menu at the end so it stays on top of all modals and content */}
      {!isLoading && (
        <ProjectorMenu
          isFooterVisible={effectiveFooterVisibility}
          onNavigate={closeAllModals}
        />
      )}
    </>
  )
}

export default App
