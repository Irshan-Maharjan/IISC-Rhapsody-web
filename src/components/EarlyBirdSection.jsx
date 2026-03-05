import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import earlyBirdBg from '../assets/iiscpic.webp';
import earlyBirdQr from '../assets/Early Bird Fest Passw.webp';


gsap.registerPlugin(ScrollTrigger);

const EarlyBirdSection = () => {
    const sectionRef = useRef(null);
    const headlineRef = useRef(null);
    const subRef = useRef(null);
    const ctaRef = useRef(null);
    const qrRef = useRef(null);
    const lineRef = useRef(null);
    const [qrHovered, setQrHovered] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    once: true,
                },
            });

            tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, 0);
            tl.fromTo(headlineRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
            tl.fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.4);
            tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.55);
            tl.fromTo(qrRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, 0.3);

            // Gentle floating for QR card
            gsap.to(qrRef.current, {
                y: -12,
                duration: 3.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 1,
            });

            // Mobile: Auto-activate "hover" state when we reach the button
            ScrollTrigger.create({
                trigger: ctaRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                onToggle: (self) => {
                    if (window.innerWidth < 1024) {
                        setQrHovered(self.isActive);
                    }
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="early-bird-pass"
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={earlyBirdBg}
                    alt="Early Bird background"
                    className="w-full h-full object-cover brightness-[0.4]"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#220202] via-transparent to-[#220202]/80" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Glowing stripe at top */}
            <div className="absolute top-0 left-0 right-0 h-px z-10"
                style={{ background: 'linear-gradient(to right, transparent, rgba(255,184,0,0.5), transparent)' }} />

            <div className="relative z-10 container mx-auto px-6 md:px-16">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* ——— LEFT: Copy ——— */}
                    <div className="flex-1 w-full text-center lg:text-left">

                        {/* Eyebrow + line */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                            <div
                                ref={lineRef}
                                className="h-px flex-1 max-w-[60px] bg-[#FFB800] origin-left"
                            />
                            <span className="text-[#FFB800] text-[10px] font-black tracking-[0.45em] uppercase">
                                Exclusive Offer
                            </span>
                        </div>

                        {/* Headline */}
                        <h2
                            ref={headlineRef}
                            className="font-display font-black text-5xl md:text-7xl xl:text-8xl leading-[0.88] tracking-tighter text-white uppercase mb-6"
                        >
                            EARLY-BIRD<br />
                            <span className="relative inline-block">
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: 'linear-gradient(135deg, #FFB800 0%, #fff 50%, #D8B4FE 100%)' }}
                                >
                                    FEST-PASS
                                </span>
                                {/* Underline accent */}
                                <span
                                    className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full"
                                    style={{ background: 'linear-gradient(to right, #FFB800, transparent)' }}
                                />
                            </span>
                        </h2>

                        {/* Sub-copy */}
                        <p
                            ref={subRef}
                            className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-8 mx-auto lg:mx-0"
                        >
                            Grab your passes now at a special discounted price! Limited slots available for the most anticipated event of the year.
                        </p>

                        {/* CTAs */}
                        <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                            <a
                                href="https://www.meraevents.com/ticketWidget?eventId=269729&ucode=organizer&wcode=9063CD-9063CD-333333-9063CD-&theme=1&samepage=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-10 py-5 bg-[#FFB800] text-[#0d0d0d] font-black text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 shadow-[6px_6px_0px_0px_rgba(255,184,0,0.25)] hover:shadow-[8px_8px_0px_0px_rgba(255,184,0,0.35)] cursor-pointer inline-flex items-center justify-center gap-2"
                            >
                                {/* Shimmer */}
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                <span className="relative flex items-center gap-2">
                                    Get Your Pass
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* ——— RIGHT: QR Placeholder ——— */}
                    <div className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0">
                        <div
                            ref={qrRef}
                            className="relative"
                            onMouseEnter={() => setQrHovered(true)}
                            onMouseLeave={() => setQrHovered(false)}
                        >
                            {/* Outer glow ring */}
                            <div
                                className="absolute -inset-4 rounded-2xl transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,184,0,0.15) 0%, transparent 75%)',
                                    opacity: qrHovered ? 1 : 0.4,
                                }}
                            />

                            {/* Card */}
                            <div className="relative w-36 h-36 md:w-80 md:h-80 bg-white/5 backdrop-blur-2xl border border-white/10 p-1.5 md:p-5 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                                style={{ transition: 'border-color 0.4s', borderColor: qrHovered ? 'rgba(255,184,0,0.35)' : 'rgba(255,255,255,0.1)' }}
                            >
                                {/* Corner brackets */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FFB800]" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FFB800]" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FFB800]" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FFB800]" />

                                {/* Inner QR area */}
                                <div className="w-full h-full bg-[#1a0505]/80 border border-white/5 flex flex-col items-center justify-center p-3 md:p-5 relative overflow-hidden">
                                    {/* Scanner line */}
                                    <div className="absolute top-0 left-0 w-full h-0.5 bg-[#FFB800] shadow-[0_0_15px_#FFB800] z-20 animate-scan" />

                                    {/* QR Code Image */}
                                    <div className="z-10 bg-white p-1 md:p-3 mb-1 md:mb-3">
                                        <img
                                            src={earlyBirdQr}
                                            alt="Early Bird Fest Pass QR"
                                            className="w-16 h-16 md:w-44 md:h-44 object-contain"
                                            style={{ filter: qrHovered ? 'none' : 'grayscale(20%)', transition: 'filter 0.5s' }}
                                        />
                                    </div>

                                    <div className="text-center">
                                        <p className="text-[#FFB800] font-black text-[9px] md:text-xs tracking-[0.35em] uppercase mb-1">
                                            Scan to Buy
                                        </p>
                                        <p className="text-white/30 text-[8px] md:text-[9px] tracking-widest uppercase">
                                            Fest Pass
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EarlyBirdSection;
