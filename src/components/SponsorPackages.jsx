import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, X } from 'lucide-react';
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
            data-lenis-prevent
            className="fixed inset-0 z-[150] bg-[#0a0202] overflow-hidden flex flex-col animate-fade-in"
        >
            {/* Full Container Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80"
                    alt="Sponsorship Background"
                    className="w-full h-full object-cover opacity-30 brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0202]/80 via-transparent to-[#0a0202]/95" />
            </div>

            {/* Sticky Navigation Header */}
            <div className="sticky top-0 left-0 w-full z-[160] flex justify-center px-6 md:px-12 py-8 pointer-events-none">
                <button
                    onClick={handleClose}
                    className="pointer-events-auto flex items-center gap-2 px-6 py-2.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-[#FFB800] hover:text-black transition-all duration-300 group shadow-2xl"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Back to Partners</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto relative z-10 py-12 md:py-24 px-6 md:px-12">
                <div className="text-center mb-16 relative">
                    <span className="text-[#FFB800] font-medium uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in">
                        Collaborate With Us
                    </span>
                    <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tighter shadow-2xl drop-shadow-lg">
                        SPONSORSHIP <span className="text-[#FFB800]">PACKAGES</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        Partner with IISc's flagship cultural festival. Unlock exclusive branding opportunities and connect with the brightest minds in the country.
                    </p>
                </div>

                {/* Poster Grid */}
                <div ref={contentRef} className="max-w-7xl mx-auto">
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.3em] text-center mb-12">
                        Click to Expand Packages
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-32">
                        {posters.map((poster, i) => (
                            <div
                                key={i}
                                onClick={() => openLightbox(i)}
                                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl hover:border-[#FFB800]/50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(255,184,0,0.2)]"
                                style={{ aspectRatio: '3/4' }}
                            >
                                <img
                                    src={poster.src}
                                    alt={poster.label}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                {/* Hover Effect Brackets/Decor */}
                                <div className="absolute inset-4 border border-[#FFB800]/0 group-hover:border-[#FFB800]/40 transition-all duration-700 rounded-xl" />

                                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                                    <p className="text-[#FFB800] text-sm font-black tracking-[0.3em] uppercase mb-1">{poster.label}</p>
                                    <div className="h-0.5 w-12 bg-[#FFB800] rounded-full group-hover:w-full transition-all duration-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    ref={lightboxRef}
                    className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-10"
                    style={{ backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)' }}
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-8 right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-[#FFB800] hover:text-black transition-all duration-300 shadow-2xl"
                    >
                        <X size={24} />
                    </button>

                    <img
                        ref={lightboxImgRef}
                        src={posters[lightbox].src}
                        alt={posters[lightbox].label}
                        className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default SponsorPackages;
