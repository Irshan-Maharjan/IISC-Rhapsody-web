import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import pronitesBg from '../assets/pronites.webp';
import qrImage from '../assets/copyyy.jpeg';

const CampusAmbassadorModal = ({ onClose }) => {
    const overlayRef = useRef(null);
    const cardRef = useRef(null);
    const qrRef = useRef(null);

    useEffect(() => {
        // Lock body scroll while modal is open
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.lenis?.stop();

        const ctx = gsap.context(() => {
            // Entrance animation
            const tl = gsap.timeline();

            gsap.set(overlayRef.current, { opacity: 0 });
            gsap.set(cardRef.current, { opacity: 0, y: 60, scale: 0.94 });

            tl.to(overlayRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
            });

            tl.to(cardRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.55,
                ease: 'power3.out',
            }, '-=0.2');

            // Subtle QR float
            gsap.to(qrRef.current, {
                y: -10,
                rotation: 1.5,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        });

        return () => {
            ctx.revert();
            document.body.style.overflow = prev;
            window.lenis?.start();
        };
    }, []);

    const handleClose = () => {
        gsap.timeline()
            .to(cardRef.current, {
                opacity: 0,
                y: 40,
                scale: 0.95,
                duration: 0.35,
                ease: 'power2.in',
            })
            .to(overlayRef.current, {
                opacity: 0,
                duration: 0.25,
                ease: 'power1.in',
                onComplete: onClose,
            }, '-=0.1');
    };

    const handleApply = () => {
        window.open('https://forms.office.com/r/R6nb6LLj5z', '_blank');
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
        >
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={handleClose} />

            {/* Modal Card */}
            <div
                ref={cardRef}
                className="relative z-10 w-full max-w-[92%] sm:max-w-4xl rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.7)] border border-white/10"
                style={{ maxHeight: '85vh' }}
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={pronitesBg}
                        alt="Background"
                        className="w-full h-full object-cover brightness-[0.35]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#220202]/90 via-[#1a0505]/70 to-transparent" />
                    {/* Dot grid texture */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(226,226,226,0.2) 1px, transparent 0)',
                            backgroundSize: '36px 36px',
                        }}
                    />
                    {/* Ambient glow */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(255,184,0,0.08) 0%, transparent 70%)',
                        }}
                    />
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/15 hover:text-white transition-all duration-200"
                    aria-label="Close"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </button>

                {/* Content */}
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-10 p-6 md:p-12">

                    {/* LEFT: CTA Text */}
                    <div className="w-full md:w-3/5 space-y-3 md:space-y-5 text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/25">
                            <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
                            <span className="text-[#FFB800] text-[11px] font-bold tracking-widest uppercase">
                                Leadership Opportunity
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-6xl font-display font-black text-white leading-[0.9] tracking-tighter">
                            BECOME A{' '}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] to-[#E2E2E2]">
                                CAMPUS AMBASSADOR
                            </span>
                        </h2>

                        <p className="text-sm md:text-lg text-white/65 max-w-md font-light leading-relaxed">
                            Lead the Rhapsody revolution at your college. Build your network, gain valuable experience, and unlock exclusive rewards as an official representative.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                onClick={handleApply}
                                className="px-6 py-3 bg-[#FFB800] text-[#220202] font-black text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(34,2,2,0.8)] cursor-pointer"
                            >
                                Apply Now
                            </button>
                            <button
                                onClick={handleClose}
                                className="px-6 py-3 bg-transparent text-white/60 font-medium text-xs uppercase tracking-wider border border-white/15 hover:border-white/40 hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                Maybe Later
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: QR Code */}
                    <div className="w-full md:w-2/5 flex justify-center md:justify-end shrink-0">
                        <div
                            ref={qrRef}
                            className="relative group w-64 h-64 md:w-80 md:h-80 bg-white/5 backdrop-blur-xl border border-white/10 p-3 md:p-5 shadow-2xl"
                        >
                            {/* Golden corner brackets */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FFB800]" />
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#FFB800]" />
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#FFB800]" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FFB800]" />

                            <div className="w-full h-full border border-white/5 bg-[#220202] flex flex-col items-center justify-center p-3 md:p-5 text-center relative overflow-hidden">
                                {/* Scanner line */}
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-[#FFB800] shadow-[0_0_12px_#FFB800] z-20 animate-scan" />

                                <div className="z-10 bg-white p-2 md:p-3 mb-2 md:mb-3">
                                    <img
                                        src={qrImage}
                                        alt="Campus Ambassador QR Code"
                                        className="w-32 h-32 md:w-44 md:h-44 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <p className="text-[#FFB800] font-black text-[9px] md:text-xs tracking-widest uppercase">
                                    Scan to Register
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom accent line */}
                <div
                    className="absolute bottom-0 left-0 w-full h-[2px] pointer-events-none"
                    style={{
                        background: 'linear-gradient(to right, transparent, rgba(255,184,0,0.7), rgba(226,226,226,0.4), transparent)',
                    }}
                />
            </div>
        </div>
    );
};

export default CampusAmbassadorModal;
