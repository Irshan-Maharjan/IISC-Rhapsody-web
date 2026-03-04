import React from 'react';
import { cn } from "../lib/utils";
import { ArrowLeft } from "lucide-react";

// Local Button Component to avoiding missing dependency issues
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

const culturalEvents = [
    {
        title: "Dance",
        description: "Express yourself through movement and rhythm. Compete in various dance styles and formations.",
        subEvents: ["Group", "Solo", "Duet", "Synchro", "Battle"],
        image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
    },
    {
        title: "Art",
        description: "Unleash your creativity and imagination across various artistic mediums.",
        subEvents: ["Canvas Painting", "Junkyard architecture", "Live Sketching", "Art Relay", "Face Painting", "T Shirt Painting", "Comic Strip Making", "Doodle Art", "Dry Rangoli"],
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
    },
    {
        title: "Digital Arts",
        description: "Create stunning visuals using digital tools. Show off your design skills.",
        subEvents: ["Poster Making", "Logo Making", "Book Cover Design"],
        image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=800&q=80",
        color: "from-[#E2E2E2]/30 to-transparent",
    },
    {
        title: "Digital Media Arts",
        description: "Tell stories and capture moments through lenses and screens.",
        subEvents: ["Digital Ad Making", "Short Film Making", "Documentary", "Photography", "Videography"],
        image: "https://images.unsplash.com/photo-1625690303837-654c9666d2d0?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
    },
    {
        title: "Music",
        description: "Let the melodies flow. Compete in vocal and instrumental musical events.",
        subEvents: ["Battle of Bands", "Duet Singing", "Solo Singing", "Group Instrumental", "Rap Battle", "Beatboxing"],
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
    },
    {
        title: "Business Event",
        description: "Test your corporate skills and strategic thinking in competitive business scenarios.",
        subEvents: ["The Negotiator", "The Crisis Room", "The 30-second Manager", "The Bidding War & Company Positioning Challenge"],
        image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80",
        color: "from-[#E2E2E2]/30 to-transparent",
    },
    {
        title: "Literary Arts",
        description: "Celebrate the power of words through innovative writing and literary challenges.",
        subEvents: ["Lexicon", "Story relay", "Con fiction", "X compose"],
        image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
    },
    {
        title: "Speaking Arts",
        description: "Captivate the audience with your voice, wit, and rhetorical skills.",
        subEvents: ["Standup Comedy", "English debate", "Poetry Slam Competition", "Extempore"],
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
    },
    {
        title: "Dramatics",
        description: "Bring characters to life on stage and street. Express through the art of acting.",
        subEvents: ["Street play", "Stage play", "Mono acting", "Character representation", "Ad Spoof"],
        image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80",
        color: "from-[#E2E2E2]/30 to-transparent",
    },
    {
        title: "Lifestyle",
        description: "Showcase fashion, style, and creativity on the runway.",
        subEvents: ["Theme Walk", "Fashion Show", "Best out of Waste"],
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
    },
    {
        title: "Quiz",
        description: "Test your knowledge across various domains in thrilling quiz formats.",
        subEvents: ["General", "MELA", "Biz-Tech", "Sports", "Hands-on-Science"],
        image: "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
    }
];

const CulturalEventsSection = ({ onClose }) => {
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
            id="cultural-events"
            data-lenis-prevent
            className="fixed inset-0 z-[55] bg-[#220202]/95 backdrop-blur-xl overflow-y-auto overflow-x-hidden min-h-screen animate-fade-in"
        >
            {/* Back to Events CTA */}
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
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#FFB800]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10 py-24">
                <div className="text-center mb-16 relative">
                    <span className="text-[#FFB800] font-medium uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in">
                        Cultural Pillars
                    </span>
                    <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tighter shadow-2xl drop-shadow-lg">
                        THE <span className="text-gradient-gold glow-text">CULTURAL</span> LINEUP
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        From electrifying stage performances to intellectual showdowns, discover the events that form the soul of Rhapsody.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32 animate-fade-in relative z-20">
                    {culturalEvents.map((event, index) => (
                        <div
                            key={index}
                            className="group relative bg-[#1A0A0A]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-[#FFB800]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,184,0,0.3)] block"
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
                                <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-wide group-hover:text-[#FFB800] transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4 font-light flex-grow">
                                    {event.description}
                                </p>

                                {/* Sub Events Badges */}
                                {event.subEvents && event.subEvents.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {event.subEvents.map((subEvent, subIndex) => (
                                            <span
                                                key={subIndex}
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 group-hover:border-white/20 group-hover:bg-white/10 transition-colors"
                                            >
                                                {subEvent}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CulturalEventsSection;
