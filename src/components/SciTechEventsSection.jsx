import React from 'react';
import { cn } from "../lib/utils";
import { ArrowLeft } from "lucide-react";

// Local Button Component to avoiding missing dependency issues (Same as CulturalEventsSection)
const Button = ({ className, variant = "default", size = "default", children, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-to-r from-red-900 to-black text-white font-bold hover:from-red-950 hover:to-black shadow-lg shadow-red-900/20"
    };

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

const sciTechEvents = [
    {
        title: "FSID",
        description: "Engage in the Foundation for Science Innovation and Development challenge. Prototype solutions for the real world.",
        image: "https://images.unsplash.com/photo-1600869009498-8d429f88d4f5?auto=format&fit=crop&w=800&q=80",
        color: "from-[#00F2FF]/20 to-transparent",
        link: "https://unstop.com/p/ideasprint-lab2launch-rhapsody-indian-institute-of-science-1647828"
    },
    {
        title: "ARTPARK",
        description: "Explore the frontiers of AI & Robotics. Create, command, and conquer with autonomous intelligence.",
        image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?auto=format&fit=crop&w=800&q=80",
        color: "from-[#E2E2E2]/20 to-transparent",
        link: null // Coming Soon
    },
    {
        title: "Coding",
        description: "The ultimate battle of logic, algorithms, and speed. Prove your prowess in the digital colosseum.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
        color: "from-[#00F2FF]/20 to-transparent",
        link: "https://unstop.com/p/rhapsody-coding-challenge-rhapsody-indian-institute-of-science-1647951"
    }
];

const SciTechEventsSection = ({ onClose }) => {
    // Stop/Start Lenis when modal opens/closes
    React.useEffect(() => {
        window.lenis?.stop();
        document.body.style.overflow = 'hidden';
        return () => {
            window.lenis?.start();
            document.body.style.overflow = 'unset';
            // Trigger refresh after closing modal as layout might shift
            setTimeout(() => {
                if (window.ScrollTrigger) window.ScrollTrigger.refresh();
            }, 100);
        };
    }, []);

    return (
        <section
            id="scitech-events"
            data-lenis-prevent
            className="fixed inset-0 z-[150] bg-[#020617] overflow-y-auto overflow-x-hidden animate-fade-in"
        >
            {/* Full Container Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020617] via-[#020617] to-[#01040a]" />

            {/* Sticky Navigation Header */}
            <div className="sticky top-0 left-0 w-full z-[160] flex justify-center px-6 md:px-12 py-8 pointer-events-none">
                <button
                    onClick={onClose}
                    className="pointer-events-auto flex items-center gap-2 px-6 py-2.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-[#00F2FF] hover:text-black transition-all duration-300 group shadow-[0_0_20px_rgba(0,242,255,0.2)]"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Back to Events</span>
                </button>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-12 md:py-24">
                <div className="text-center mb-16 relative">
                    <span className="text-[#00F2FF] font-medium uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in">
                        The Technological Frontier
                    </span>
                    <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tighter shadow-2xl drop-shadow-lg">
                        SCI-TECH <span className="text-[#00F2FF] drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">CIRCUIT</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        Step into the colosseum of high-order logic and digital supremacy. Where engineering meets pure imagination.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32 animate-fade-in relative z-20">
                    {sciTechEvents.map((event, index) => (
                        <div
                            key={index}
                            className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 hover:border-[#00F2FF]/50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,242,255,0.15)] block"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-t ${event.color} z-10`} />
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                                    loading="lazy"
                                />
                                {/* Tech overlay pattern */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                            </div>

                            {/* Content */}
                            <div className="p-8 relative z-20 flex flex-col h-[calc(100%-14rem)]">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] animate-pulse" />
                                    <h3 className="text-2xl font-display font-bold text-white tracking-wide group-hover:text-[#00F2FF] transition-colors">
                                        {event.title}
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light flex-grow">
                                    {event.description}
                                </p>
                                {event.link ? (
                                    <a
                                        href={event.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto w-full py-3 bg-[#00F2FF] text-black border border-[#00F2FF]/20 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white hover:scale-[1.02] text-center"
                                    >
                                        Register Now
                                    </a>
                                ) : (
                                    <button className="mt-auto w-full py-3 bg-white/5 text-white/30 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-not-allowed">
                                        Coming Soon
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SciTechEventsSection;
