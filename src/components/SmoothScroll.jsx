import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SmoothScroll = () => {
    useEffect(() => {
        // Prevent double initialization in StrictMode
        if (window.lenis) {
            window.lenis.destroy();
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', () => {
            ScrollTrigger.update();
        });

        const updateLenis = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        // Reset ScrollTrigger config and clear memory to prevent cached position issues on resize
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.config({
            ignoreMobileResize: false,
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
        });

        // Handle anchor links
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a');
            if (target && target.hash && target.origin === window.location.origin) {
                e.preventDefault();
                const id = target.hash.slice(1);
                const element = document.getElementById(id);
                if (element) {
                    lenis.scrollTo(element, {
                        offset: 0,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    });
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        // Robust Refresh on resize and orientation change
        let resizeTimeout;
        const handleRefresh = () => {
            // Immediately notify Lenis and ScrollTrigger
            lenis.resize();
            ScrollTrigger.refresh();

            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Force a full re-calculation after components have finished re-rendering
                ScrollTrigger.sort();
                ScrollTrigger.refresh(true);
                lenis.resize();
            }, 600);
        };
        window.addEventListener('resize', handleRefresh);
        window.addEventListener('orientationchange', handleRefresh);

        // Initial refresh after a small delay to ensure DOM is ready
        const refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 800);

        // Optional: Export lenis to window for global access
        window.lenis = lenis;

        return () => {
            lenis.destroy();
            gsap.ticker.remove(updateLenis);
            document.removeEventListener('click', handleAnchorClick);
            window.removeEventListener('resize', handleRefresh);
            window.removeEventListener('orientationchange', handleRefresh);
            clearTimeout(resizeTimeout);
            clearTimeout(refreshTimeout);
            window.lenis = null;
        };
    }, []);

    return null;
};

export default SmoothScroll;
