import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import qrImage from '../assets/qr.jpeg';

gsap.registerPlugin(ScrollTrigger);

const SponsorUs = ({ onViewPackages }) => {
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
                trigger: ctaRef.current, // Start when we reach the button
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
            id="sponsor-us"
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32"
        >
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {/* Deep gradient - bottom matches footer start color */}
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(160deg, #0a0202 0%, #1a0505 45%, #220202 100%)' }} />
                {/* Top glowing stripe */}
                <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(255,184,0,0.5), transparent)' }} />
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,184,0,0.5) 1px, transparent 0)',
                        backgroundSize: '44px 44px',
                    }} />
                {/* Left ambient glow */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
                {/* Right ambient glow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(74,4,4,0.25) 0%, transparent 70%)', filter: 'blur(50px)' }} />
                {/* Bottom fade bridge into footer */}
                <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
                    style={{ background: 'linear-gradient(to bottom, transparent 0%, #220202 100%)' }} />
            </div>

            {/* Golden divider line — sits above fade bridge */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px z-20 pointer-events-none"
                style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(255,184,0,0.8) 30%, rgba(255,220,80,1) 50%, rgba(255,184,0,0.8) 70%, transparent 100%)',
                    boxShadow: '0 0 12px rgba(255,184,0,0.5), 0 0 30px rgba(255,184,0,0.2)',
                }}
            />

            <div className="relative z-10 container mx-auto px-6 md:px-16">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* ——— LEFT: Copy ——— */}
                    <div className="flex-1 w-full">

                        {/* Eyebrow + line */}
                        <div className="flex items-center gap-4 mb-8">
                            <div
                                ref={lineRef}
                                className="h-px flex-1 max-w-[60px] bg-[#FFB800] origin-left"
                            />
                            <span className="text-[#FFB800] text-[10px] font-black tracking-[0.45em] uppercase">
                                Partner With Us
                            </span>
                        </div>

                        {/* Headline */}
                        <h2
                            ref={headlineRef}
                            className="font-display font-black text-5xl md:text-7xl xl:text-8xl leading-[0.88] tracking-tighter text-white uppercase mb-6"
                        >
                            MAKE YOUR<br />
                            BRAND{' '}
                            <span className="relative inline-block">
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: 'linear-gradient(135deg, #FFB800 0%, #fff 50%, #D8B4FE 100%)' }}
                                >
                                    SHINE
                                </span>
                                {/* Underline accent */}
                                <span
                                    className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full"
                                    style={{ background: 'linear-gradient(to right, #FFB800, transparent)' }}
                                />
                            </span><br />
                            AT RHAPSODY
                        </h2>

                        {/* Sub-copy */}
                        <p
                            ref={subRef}
                            className="text-white/55 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-8"
                        >
                            Place your brand at the heart of IISc Bangalore's biggest cultural extravaganza.
                            Reach a highly engaged student audience and associate with a legacy of excellence.
                        </p>


                        {/* CTAs */}
                        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onViewPackages}
                                className="group relative px-10 py-4 bg-[#FFB800] text-[#0d0d0d] font-black text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 shadow-[6px_6px_0px_0px_rgba(255,184,0,0.25)] hover:shadow-[8px_8px_0px_0px_rgba(255,184,0,0.35)] cursor-pointer"
                            >
                                {/* Shimmer */}
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                <span className="relative flex items-center gap-2">
                                    View Packages
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* ——— RIGHT: QR Card ——— */}
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
                            <div className="relative w-64 md:w-80 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                                style={{ transition: 'border-color 0.4s', borderColor: qrHovered ? 'rgba(255,184,0,0.35)' : 'rgba(255,255,255,0.1)' }}
                            >
                                {/* Corner brackets */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FFB800]" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FFB800]" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FFB800]" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FFB800]" />

                                {/* Inner QR area */}
                                <div className="w-full bg-[#1a0505]/80 border border-white/5 flex flex-col items-center justify-center p-5 relative overflow-hidden">
                                    {/* Scanner line - only active when "hovered" or scrolled to on mobile */}
                                    {qrHovered && (
                                        <div className="absolute top-0 left-0 w-full h-0.5 bg-[#FFB800] shadow-[0_0_15px_#FFB800] z-20 animate-scan" />
                                    )}

                                    <div className="bg-white p-3 mb-4 shadow-lg">
                                        <img
                                            src={qrImage}
                                            alt="Sponsor QR Code"
                                            className="w-32 h-32 md:w-44 md:h-44 object-contain"
                                            style={{ filter: qrHovered ? 'none' : 'grayscale(30%)', transition: 'filter 0.5s' }}
                                        />
                                    </div>

                                    <p className="text-[#FFB800] font-black text-[10px] tracking-[0.35em] uppercase mb-1">
                                        Scan to Connect
                                    </p>
                                    <p className="text-white/30 text-[9px] tracking-widest uppercase">
                                        Sponsorship Inquiry
                                    </p>
                                </div>

                                {/* Stats row */}
                                <div className="flex justify-between mt-4 pt-3 border-t border-white/5">
                                    {[['250+', 'College Participation'], ['200+', 'Campus Ambassador'], ['50K+', 'Ground Audience']].map(([val, lbl]) => (
                                        <div key={lbl} className="text-center px-1">
                                            <p className="text-[#FFB800] font-black text-base leading-none">{val}</p>
                                            <p className="text-white/30 text-[8px] tracking-wider uppercase mt-0.5 leading-tight">{lbl}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SponsorUs;
