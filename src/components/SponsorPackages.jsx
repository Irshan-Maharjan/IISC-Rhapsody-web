import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import spso1 from '../assets/spso1c.webp';
import spso2 from '../assets/spso2c.webp';
import spso3 from '../assets/spso3c.webp';

const posters = [
    { src: spso1, label: 'Package I' },
    { src: spso2, label: 'Package II' },
    { src: spso3, label: 'Package III' },
];

const SponsorPackages = ({ onClose }) => {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const [lightbox, setLightbox] = useState(null); // index of expanded poster
    const lightboxRef = useRef(null);
    const lightboxImgRef = useRef(null);

    // Entrance animation (no body lock — let the inner container scroll)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: 'power2.out' }
            );
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.1 }
            );
        });

        return () => {
            ctx.revert();
        };
    }, []);

    const handleClose = () => {
        gsap.timeline()
            .to(contentRef.current, { opacity: 0, y: 30, duration: 0.3, ease: 'power2.in' })
            .to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power1.in', onComplete: onClose }, '-=0.1');
    };

    const openLightbox = (index) => {
        setLightbox(index);
    };

    const closeLightbox = () => {
        gsap.to(lightboxRef.current, {
            opacity: 0,
            duration: 0.25,
            ease: 'power1.in',
            onComplete: () => setLightbox(null),
        });
    };

    // Animate lightbox in when it mounts
    useEffect(() => {
        if (lightbox !== null && lightboxRef.current) {
            gsap.fromTo(lightboxRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo(lightboxImgRef.current,
                { scale: 0.85, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' }
            );
        }
    }, [lightbox]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[300] flex flex-col"
            style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 50%, #0d0d0d 100%)' }}
        >
            {/* Dot grid texture */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,184,0,0.4) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Ambient glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(74,4,4,0.3) 0%, transparent 70%)', filter: 'blur(60px)' }} />

            {/* Back Button */}
            <div className="flex-shrink-0 w-full flex justify-center z-[90] pt-6 pb-2">
                <button
                    onClick={handleClose}
                    className="rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all duration-300 shadow-2xl px-6 py-2 h-auto text-xs md:text-sm font-medium tracking-wider uppercase flex items-center gap-2 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    Back
                </button>
            </div>

            {/* Poster Grid */}
            <div ref={contentRef} className="relative z-10 flex-1 min-h-0 overflow-y-auto px-6 md:px-12 py-10" style={{ WebkitOverflowScrolling: 'touch' }}>
                <p className="text-white/40 text-sm font-light tracking-wide text-center mb-10">
                    Click on a poster to expand
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {posters.map((poster, i) => (
                        <div
                            key={i}
                            onClick={() => openLightbox(i)}
                            className="group relative cursor-pointer rounded-xl overflow-hidden border border-white/10 shadow-2xl hover:border-[#FFB800]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,184,0,0.15)]"
                            style={{ aspectRatio: '3/4' }}
                        >
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10" />

                            {/* Expand icon */}
                            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                                        <path d="M3 3h5M3 3v5M3 3l5.5 5.5M17 3h-5M17 3v5M17 3l-5.5 5.5M3 17h5M3 17v-5M3 17l5.5-5.5M17 17h-5M17 17v-5M17 17l-5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>

                            <img
                                src={poster.src}
                                alt={poster.label}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-10"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
                                <p className="text-[#FFB800] text-xs font-bold tracking-[0.3em] uppercase">{poster.label}</p>
                            </div>

                            {/* Corner brackets */}
                            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#FFB800]/0 group-hover:border-[#FFB800]/70 transition-all duration-300" />
                            <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#FFB800]/0 group-hover:border-[#FFB800]/70 transition-all duration-300" />
                            <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#FFB800]/0 group-hover:border-[#FFB800]/70 transition-all duration-300" />
                            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#FFB800]/0 group-hover:border-[#FFB800]/70 transition-all duration-300" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    ref={lightboxRef}
                    className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-10"
                    style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
                    onClick={closeLightbox}
                >
                    {/* Close */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>

                    {/* Package label */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/25">
                        <span className="text-[#FFB800] text-xs font-bold tracking-widest uppercase">
                            {posters[lightbox].label}
                        </span>
                    </div>

                    <img
                        ref={lightboxImgRef}
                        src={posters[lightbox].src}
                        alt={posters[lightbox].label}
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Prev / Next arrows */}
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200 disabled:opacity-20"
                        disabled={lightbox === 0}
                        onClick={(e) => { e.stopPropagation(); openLightbox(lightbox - 1); }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200 disabled:opacity-20"
                        disabled={lightbox === posters.length - 1}
                        onClick={(e) => { e.stopPropagation(); openLightbox(lightbox + 1); }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default SponsorPackages;
