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
        title: "Autodesk H1",
        description: "Showcase your precision and mastery in 3D design and mechanical modeling with Autodesk tools.",
        image: "https://images.unsplash.com/photo-1720879996903-24859d1df48f?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
    },
    {
        title: "Autodesk H2",
        description: "Push the boundaries of design thinking and complex rendering using Autodesk software suites.",
        image: "https://images.unsplash.com/photo-1605459619674-ad1d39981eae?auto=format&fit=crop&w=800&q=80",
        color: "from-[#E2E2E2]/30 to-transparent",
    },
    {
        title: "FSID",
        description: "Engage in the Foundation for Science Innovation and Development challenge. Prototype solutions for the real world.",
        image: "https://images.unsplash.com/photo-1600869009498-8d429f88d4f5?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
    },
    {
        title: "ARTPARK",
        description: "Explore the frontiers of AI & Robotics. Create, command, and conquer with autonomous intelligence.",
        image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?auto=format&fit=crop&w=800&q=80",
        color: "from-[#E2E2E2]/30 to-transparent",
    },
    {
        title: "Coding",
        description: "The ultimate battle of logic, algorithms, and speed. Prove your prowess in the digital colosseum.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
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
                ScrollTrigger.refresh();
            }, 100);
        };
    }, []);

    return (
        <section
            id="scitech-events"
            data-lenis-prevent
            // Matching the Cultural Section's Z-Index and fixed positioning
            className="fixed inset-0 z-[55] bg-[#220202]/95 backdrop-blur-xl overflow-y-auto overflow-x-hidden min-h-screen animate-fade-in"
        >
            {/* Back to Events CTA - Sticky positioning aligned with header */}
            {onClose && (
                <div className="sticky top-6 w-full flex justify-center z-[90] pointer-events-none mb-4">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="pointer-events-auto rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all duration-300 shadow-2xl px-6 py-2 h-auto text-xs md:text-sm font-medium tracking-wider uppercase flex items-center gap-2 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        Back to Events
                    </Button>
                </div>
            )}

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none fixed">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#220202]/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#E2E2E2]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10 py-24">
                <div className="text-center mb-16 relative">
                    <span className="text-[#E2E2E2] font-medium uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in">
                        Technological Frontier
                    </span>
                    <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tighter shadow-2xl drop-shadow-lg">
                        THE <span className="text-[#E2E2E2] glow-text-blue">SCI-TECH</span> CIRCUIT
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        Explore the intersection of logic, creativity, and engineering. From deep-code battles to robotic dominance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32 animate-fade-in relative z-20">
                    {sciTechEvents.map((event, index) => (
                        <div
                            key={index}
                            className="group relative bg-[#1A0A0A]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-[#E2E2E2]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(226,226,226,0.3)] block"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-t ${event.color} z-10`} />
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 relative z-20 flex flex-col h-[calc(100%-14rem)]">
                                <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-wide group-hover:text-[#E2E2E2] transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light flex-grow">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SciTechEventsSection;
