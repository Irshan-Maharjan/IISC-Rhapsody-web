import { useEffect, useRef, useState } from 'react';
import { Mail, Instagram, Facebook, Twitter as XIcon } from 'lucide-react';
import silicLogo from '../assets/siliclogo.png';

const InteractiveFooter = ({ setIsFooterVisible }) => {
    const footerRef = useRef(null);
    const signatureRef = useRef(null);
    const silicoreRef = useRef(null);
    const [isSilicoreVisible, setIsSilicoreVisible] = useState(false);

    useEffect(() => {
        let rafId;
        const handleMouseMove = (e) => {
            if (!footerRef.current || !signatureRef.current) return;

            // Limit updates with requestAnimationFrame for performance
            if (rafId) cancelAnimationFrame(rafId);

            rafId = requestAnimationFrame(() => {
                const rect = signatureRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                signatureRef.current.style.setProperty('--cursor-x', `${x}px`);
                signatureRef.current.style.setProperty('--cursor-y', `${y}px`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    // Intersection Observer to toggle header visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (setIsFooterVisible) {
                    setIsFooterVisible(entry.isIntersecting);
                }
            },
            { threshold: 0.1 } // Trigger when 10% of footer is visible
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, [setIsFooterVisible]);

    // Mobile detection for animation logic
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Observer for Silicore section animation on mobile
        const silicoreObserver = new IntersectionObserver(
            ([entry]) => {
                if (window.innerWidth < 768) {
                    setIsSilicoreVisible(entry.isIntersecting);
                }
            },
            { threshold: 0.8 }
        );

        if (silicoreRef.current) silicoreObserver.observe(silicoreRef.current);

        return () => {
            window.removeEventListener('resize', checkMobile);
            silicoreObserver.disconnect();
        };
    }, []);

    const XIcon = ({ size = 24, className }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );

    return (
        <footer ref={footerRef} className="interactive-footer relative min-h-screen w-full bg-linear-to-b from-[#220202] via-[#1A0A0A] to-[#220202] text-white flex flex-col justify-between overflow-hidden pt-12 md:pt-16 pb-0">

            {/* 1. TOP SECTION: Content */}
            <div className="interactive-footer-content w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-32 z-20 relative px-6 md:px-24">
                <div className="interactive-footer-headline">
                    <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,5rem)] leading-[1.1]">
                        Step into the<br />Spotlight
                    </h2>
                </div>
                <div className="interactive-footer-nav flex flex-col md:flex-row gap-10 md:gap-24">
                    <div className="interactive-footer-nav-column flex flex-col gap-4">
                        <h3 className="interactive-footer-nav-title text-sm tracking-widest uppercase text-[#888888]">Explore</h3>
                        <ul className="interactive-footer-nav-list list-none p-0 flex flex-col gap-3 md:gap-4">
                            <li><a href="#home" className="text-[#cccccc] hover:text-white no-underline transition-all duration-300 hover:translate-x-1 inline-block text-xs md:text-sm">Home</a></li>
                            <li><a href="#about" className="text-[#cccccc] hover:text-white no-underline transition-all duration-300 hover:translate-x-1 inline-block text-xs md:text-sm">About</a></li>
                            <li><a href="#events" className="text-[#cccccc] hover:text-white no-underline transition-all duration-300 hover:translate-x-1 inline-block text-xs md:text-sm">Events</a></li>
                            <li><a href="#sponsors" className="text-[#cccccc] hover:text-white no-underline transition-all duration-300 hover:translate-x-1 inline-block text-xs md:text-sm">Sponsors</a></li>
                        </ul>
                    </div>
                    <div className="interactive-footer-nav-column flex flex-col gap-4">
                        <h3 className="interactive-footer-nav-title text-sm tracking-widest uppercase text-[#888888]">Contact</h3>
                        <ul className="interactive-footer-nav-list list-none p-0 flex flex-col gap-3 md:gap-4">
                            <li>
                                <a href="mailto:rhapsody.sc@iisc.ac.in" className="flex items-center gap-3 w-fit text-[#cccccc] hover:text-white no-underline transition-all duration-300 hover:translate-x-1 group text-xs md:text-sm">
                                    <Mail size={16} className="stroke-white group-hover:stroke-[#FFB800] transition-colors" />
                                    <span>rhapsody.sc@iisc.ac.in</span>
                                </a>
                            </li>

                            <li className="interactive-footer-connect-label text-[#888888] mt-2 mb-1 md:mt-4 md:mb-2 text-xs uppercase tracking-tighter">Connect:</li>

                            <li>
                                <a href="https://www.instagram.com/iisc_rhapsody" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-fit text-[#cccccc] hover:text-white no-underline transition-all duration-300 hover:translate-x-1 group text-xs md:text-sm">
                                    <Instagram size={16} className="stroke-white group-hover:stroke-[#FFB800] transition-colors" />
                                    <span>Rhapsodyiiscrhapsody</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://facebook.com/Rhapsodyiisc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-fit text-[#cccccc] hover:text-white no-underline transition-all duration-300 hover:translate-x-1 group text-xs md:text-sm">
                                    <Facebook size={16} className="stroke-white fill-transparent group-hover:stroke-[#FFB800] transition-colors" />
                                    <span>Rhapsodyiisc</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/Rhapsodyiisc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-fit text-[#cccccc] hover:text-white no-underline transition-all duration-300 hover:translate-x-1 group text-xs md:text-sm">
                                    <XIcon size={14} className="fill-white group-hover:fill-[#FFB800] transition-colors" />
                                    <span>Rhapsodyiisc</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 2. MIDDLE SECTION: Signature Interactive Torchlight Typography */}
            {/* Changing to relative and adjusting positioning to be between content and meta */}
            {/* 2. MIDDLE SECTION: Signature Interactive Torchlight Typography */}
            {/* Changing to relative and adjusting positioning to be between content and meta */}
            <div className="interactive-footer-signature relative w-full flex-1 flex items-center justify-center z-10 py-12 md:py-0 overflow-hidden">
                <div className="interactive-footer-signature-container relative">
                    {/* Grid-based layering to ensure perfect alignment and no clipping */}
                    <div className="grid grid-cols-1 grid-rows-1 justify-items-center items-center relative">
                        {/* 1. Permanent Outline Layer (Always Visible) */}
                        <span
                            className="col-start-1 row-start-1 font-display text-[12vw] md:text-[12.5vw] font-black uppercase tracking-tight leading-none pointer-events-none px-6"
                            style={{
                                WebkitTextFillColor: 'transparent',
                                WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
                                textStroke: '1px rgba(255, 255, 255, 0.3)',
                                opacity: 0.8
                            }}
                        >
                            RHAPSODY 4.0
                        </span>

                        {/* 2. Interactive Fill Layer (Masked on Desktop) */}
                        <div
                            ref={signatureRef}
                            className="col-start-1 row-start-1 relative flex items-center justify-center"
                            style={{
                                // Mask Logic
                                WebkitMaskImage: isMobile ? 'none' : 'radial-gradient(circle 500px at var(--cursor-x) var(--cursor-y), black 40%, transparent 90%)',
                                maskImage: isMobile ? 'none' : 'radial-gradient(circle 500px at var(--cursor-x) var(--cursor-y), black 40%, transparent 90%)'
                            }}
                        >
                            <span
                                className={`interactive-footer-signature-full font-display text-[12vw] md:text-[12.5vw] font-black uppercase tracking-tight leading-none px-6 ${isMobile ? 'animate-pulse' : ''}`}
                                style={{
                                    backgroundImage: 'linear-gradient(135deg, #FFB800 0%, #E2E2E2 50%, #FFB800 100%)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
                                    textStroke: '1px rgba(255, 255, 255, 0.3)',
                                }}
                            >
                                RHAPSODY 4.0
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. BOTTOM SECTION: Meta Information */}
            <div className="interactive-footer-meta grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 z-30 text-center md:text-left text-sm md:text-base border-t border-white/10 pt-8 mt-auto px-6 md:px-24">
                <div className="interactive-footer-meta-left flex flex-col gap-1 items-center md:items-start">
                    <p className="font-medium text-white">Indian Institute of Science</p>
                    <p className="text-[#888]">Bangalore, India</p>
                </div>

                <div className="interactive-footer-meta-center flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6">
                    <a href="#" className="text-[#cccccc] hover:text-white no-underline transition-colors">Privacy Policy</a>
                    <span className="interactive-footer-meta-divider text-[#555] hidden md:inline">•</span>
                    <a href="#" className="text-[#cccccc] hover:text-white no-underline transition-colors">Legal Notice</a>
                </div>

                <div className="interactive-footer-meta-right flex items-center justify-center md:justify-end">
                    <p className="text-[#888]">©️ 2026 Rhapsody. All rights reserved.</p>
                </div>
            </div>
            {/* 4. DEVELOPER CREDIT: Silicore Tech */}
            <div
                ref={silicoreRef}
                className={`w-full bg-black/80 backdrop-blur-md text-white/70 py-2 z-40 border-t border-white/10 transition-colors duration-500 
                    ${isMobile && isSilicoreVisible ? 'bg-black/90 border-[#FFB800]/30' : 'hover:bg-black/90 hover:border-[#FFB800]/30'}`}
            >
                <a
                    href="https://silicore.com.np"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="container mx-auto flex items-center justify-center gap-3 text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium group cursor-pointer"
                >
                    <div className={`w-6 h-6 flex items-center justify-center transition-all duration-700 filter
                        ${isMobile && isSilicoreVisible ? 'scale-125 rotate-[360deg] grayscale-0' : 'group-hover:scale-125 group-hover:rotate-[360deg] active:rotate-[720deg] active:scale-95 grayscale group-hover:grayscale-0'}`}
                    >
                        <img
                            src={silicLogo}
                            alt="Silicore Tech Logo"
                            className={`w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,184,0,0.5)] transition-all duration-500
                                ${isMobile && isSilicoreVisible ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
                        />
                    </div>
                    <span className={`transition-all duration-500 ${isMobile && isSilicoreVisible ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'}`}>
                        Designed and Developed by <span className={`font-bold transition-colors duration-500 ${isMobile && isSilicoreVisible ? 'text-[#FFB800]' : 'text-white group-hover:text-[#FFB800]'}`}>Silicore Tech</span>
                    </span>
                </a>
            </div>
        </footer>
    );
};

export default InteractiveFooter;
