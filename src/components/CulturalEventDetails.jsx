import React, { useEffect, useRef } from 'react';
import { ArrowLeft, FileText, Info, Share2, Calendar, Clock, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import danceBg from '../assets/dancew.webp';

gsap.registerPlugin(ScrollTrigger);


const CulturalEventDetails = ({ event, onClose }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const headerRef = useRef(null);

    const isDance = event?.title === 'Dance';

    useEffect(() => {
        // Scroll to top when opening
        containerRef.current.scrollTo(0, 0);

        // Block scroll on page
        window.lenis?.stop();
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            // Entrance animation
            gsap.fromTo(contentRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
        }, containerRef);

        return () => {
            ctx.revert();
            window.lenis?.start();
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!event) return null;

    // Use danceBg for Dance, and event.image for others
    const backgroundImage = isDance ? danceBg : event.image;

    return (
        <div
            ref={containerRef}
            data-lenis-prevent
            className="fixed inset-0 z-[150] bg-[#0a0202] overflow-y-auto overflow-x-hidden animate-fade-in"
        >
            {/* Navigation Header - Top Center */}
            <div className="sticky top-0 left-0 w-full z-[110] flex justify-center px-6 md:px-12 py-8 pointer-events-none">
                <button
                    onClick={onClose}
                    className="pointer-events-auto flex items-center gap-2 px-6 py-2.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-[#FFB800] hover:text-black transition-all duration-300 group shadow-2xl"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Back to Cultural</span>
                </button>
            </div>

            <div className="relative min-h-full w-full -mt-24">
                {/* Full Container Background - Applied to all events */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={backgroundImage}
                        alt={`${event.title} Background`}
                        className="w-full h-full object-cover opacity-50 brightness-[0.6]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0202]/80 via-transparent to-[#0a0202]/95" />
                </div>

                {/* Hero Header */}
                <div className="relative h-[35vh] md:h-[45vh] w-full overflow-hidden flex items-end justify-center">
                    <div className="relative z-10 pb-12 px-6 text-center">
                        <span className="text-[#FFB800] font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Cultural Event</span>
                        <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter drop-shadow-2xl">
                            {event.title}
                        </h1>
                    </div>
                </div>

                {/* Content Section */}
                <div ref={contentRef} className="container mx-auto px-6 py-8 md:py-12 max-w-5xl relative z-10">

                    {/* About Event */}
                    <div className="mb-16 md:mb-20">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-px bg-[#FFB800]" />
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#FFB800]">The Essence</h2>
                        </div>
                        <p className="text-xl md:text-3xl text-white/90 font-light leading-tight">
                            {event.description}
                        </p>
                    </div>

                    <div className="space-y-20">
                        {/* Sub-events */}
                        <section>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tighter">
                                        Featured Competitions
                                    </h3>
                                    <p className="text-white/40 text-sm mt-2">Individual and team categories available for {event.title.toLowerCase()}</p>
                                </div>
                                <div className="h-px flex-grow bg-white/5 hidden md:block mb-4 ml-8" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {event.subEvents?.map((sub, i) => {
                                    const subName = typeof sub === 'string' ? sub : sub.name;
                                    const subLink = typeof sub === 'string' ? event.link : (sub.link || event.link);
                                    const isComingSoon = !subLink;

                                    return (
                                        <div key={i} className="group relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-[#FFB800]/40 transition-all duration-500 overflow-hidden shadow-2xl">
                                            {/* Accent Glow */}
                                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FFB800]/5 rounded-full blur-[60px] group-hover:bg-[#FFB800]/10 transition-colors" />

                                            <div className="relative z-10 flex flex-col h-full">
                                                <h4 className="text-white font-bold text-2xl mb-3 group-hover:text-[#FFB800] transition-colors">{subName}</h4>
                                                <p className="text-white/50 text-base font-light leading-relaxed mb-8">
                                                    Showcase your talent in the {subName} category. Detailed registration and participation slots are now open.
                                                </p>

                                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                                    <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
                                                        {isComingSoon ? "Registrations Opening Soon" : "Open for Entries"}
                                                    </span>
                                                    {isComingSoon ? (
                                                        <button className="bg-white/5 text-white/30 px-6 py-2.5 rounded-full font-bold uppercase text-[10px] tracking-widest cursor-not-allowed">
                                                            Soon
                                                        </button>
                                                    ) : (
                                                        <a
                                                            href={subLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-white/10 hover:bg-[#FFB800] text-white hover:text-black px-6 py-2.5 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all duration-300 pointer-events-auto"
                                                        >
                                                            Register
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Event Rules Link Section */}
                        <section className="pt-16 md:pt-24 border-t border-white/5">
                            <div className="text-center mb-10">
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tighter">
                                    Event Guideline
                                </h3>
                                <p className="text-white/40 text-sm mt-2">Please review the official regulations before participating</p>
                            </div>

                            <div className="flex justify-center">
                                {event.rulebookLink ? (
                                    <a
                                        href={event.rulebookLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#FFB800]/50 text-white px-8 md:px-12 py-5 rounded-2xl font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-white/5 transition-all duration-500 shadow-2xl"
                                    >
                                        <FileText className="w-5 h-5 text-[#FFB800] group-hover:scale-110 transition-transform" />
                                        <span>View Official Event Rules</span>
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 text-white/30 px-8 md:px-12 py-5 rounded-2xl font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] cursor-not-allowed">
                                        <FileText className="w-5 h-5 opacity-20" />
                                        <span>Rules Coming Soon</span>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                    {/* Bottom Spacer */}
                    <div className="h-32" />
                </div>
            </div>
        </div>
    );
};

export default CulturalEventDetails;
