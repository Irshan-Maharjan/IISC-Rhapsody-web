import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import earlyBirdBg from '../assets/iiscpic.webp';
import earlyBirdQr from '../assets/Early Bird Fest Passw.webp';

const EarlyBirdModal = ({ onClose }) => {
    const overlayRef = useRef(null);
    const cardRef = useRef(null);
    const qrRef = useRef(null);

    useEffect(() => {
        // Lock body scroll
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.lenis?.stop();

        const ctx = gsap.context(() => {
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

            // QR float
            gsap.to(qrRef.current, {
                y: -10,
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

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        >
            <div className="absolute inset-0" onClick={handleClose} />

            <div
                ref={cardRef}
                className="relative z-10 w-full max-w-[92%] sm:max-w-4xl rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)] border border-white/10"
                style={{ maxHeight: '90vh' }}
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={earlyBirdBg}
                        alt="Background"
                        className="w-full h-full object-cover brightness-[0.3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#220202]/95 via-[#1a0505]/80 to-transparent" />
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300"
                    aria-label="Close"
                >
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-14">
                    {/* LEFT: Copy */}
                    <div className="w-full md:w-3/5 space-y-6">
                        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30">
                            <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
                            <span className="text-[#FFB800] text-[10px] font-bold tracking-[0.3em] uppercase">
                                Early Bird Discount
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-[0.9] tracking-tighter uppercase">
                            EARLY BIRD<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-white to-[#D8B4FE]">
                                FEST PASS
                            </span>
                        </h2>

                        <p className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-md">
                            Experience RHAPSODY 4.0 at its fullest. Get exclusive access to all events, pronites, and workshops at a special discounted price.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <a
                                href="https://www.meraevents.com/ticketWidget?eventId=269729&ucode=organizer&wcode=9063CD-9063CD-333333-9063CD-&theme=1&samepage=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-[#FFB800] text-[#220202] font-black text-sm uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(34,2,2,0.8)] text-center"
                            >
                                Get Pass Now
                            </a>
                            <button
                                onClick={handleClose}
                                className="px-8 py-4 bg-transparent text-white/60 font-medium text-sm uppercase tracking-wider border border-white/10 hover:border-white/40 hover:text-white transition-all duration-300"
                            >
                                Not Now
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: QR Code */}
                    <div className="w-full md:w-2/5 flex justify-center md:justify-end shrink-0">
                        <div
                            ref={qrRef}
                            className="relative w-64 h-64 md:w-72 md:h-72 bg-white/5 backdrop-blur-2xl border border-white/10 p-3 shadow-2xl"
                        >
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FFB800]" />
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#FFB800]" />
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#FFB800]" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FFB800]" />

                            <div className="w-full h-full border border-white/5 bg-[#1a0505] flex flex-col items-center justify-center p-3 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-[#FFB800] shadow-[0_0_12px_#FFB800] z-20 animate-scan" />

                                <div className="z-10 bg-white p-2 mb-3">
                                    <img
                                        src={earlyBirdQr}
                                        alt="Early Bird QR"
                                        className="w-36 h-36 md:w-44 md:h-44 object-contain"
                                    />
                                </div>
                                <p className="text-[#FFB800] font-black text-[10px] tracking-widest uppercase">
                                    Scan to Buy
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute bottom-0 left-0 w-full h-[2px]"
                    style={{ background: 'linear-gradient(to right, transparent, #FFB800, transparent)' }}
                />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0%, 100% { top: 5%; }
                    50% { top: 95%; }
                }
                .animate-scan {
                    animation: scan 3s ease-in-out infinite;
                }
            `}} />
        </div>
    );
};

export default EarlyBirdModal;
