import React from 'react';
import { cn } from "../lib/utils";
import { ArrowLeft } from "lucide-react";

// Local Button Component
const Button = ({ className, variant = "default", size = "default", children, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Keeping "glow" just in case, but will use outline for consistency
        glow: "bg-gradient-to-r from-red-800 to-red-950 text-white font-bold hover:from-red-900 hover:to-black shadow-lg shadow-red-950/30"
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

// Sports with Pink/Rose Theme
const REGISTRATION_LINK = "https://forms.cloud.microsoft/pages/responsepage.aspx?id=l80Vb6f240Gyxa1Bk5dkdvVsYDdxDZhGtLGFZs_8ttRUMTJRWE9WU05RSTZCVFRRWlE2VlBRVUlHQy4u&route=shorturl";

const sportsEvents = [
    {
        title: "Cricket",
        description: "The gentleman's game. Experience the thrill of every ball in this highly competitive campus tournament.",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Swimming",
        description: "Dive in and race to the finish line in our heated swimming competitions.",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Table Tennis (TT)",
        description: "Rapid-fire rallies and intense concentration. A test of elite reflexes and technical skill.",
        image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Carrom",
        description: "Precision, angles, and perfect strikes. Show off your board skills in this classic game.",
        image: "https://images.unsplash.com/photo-1620741212082-4e5c8194883e?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Chess",
        description: "A battle of minds, strategy, and foresight. Outwit your opponent on the 64 squares.",
        image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Kabaddi Women",
        description: "Fierce competition and incredible agility. Experience the raw energy of women's Kabaddi.",
        image: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Volleyball",
        description: "High-flying action above the net. Power hits, teamwork, and defensive excellence in every set.",
        image: "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Frisbee",
        description: "Dynamic, non-contact team sport. High-flying discs and athletic plays across the field.",
        image: "https://images.unsplash.com/photo-1649772317307-988009f89c2f?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Football Women",
        description: "Experience the passion, teamwork, and skill in the women's football tournament.",
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "E Sports",
        description: "Digital battlegrounds and intense reflexes. Compete with the best gamers on campus.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Throwball",
        description: "Fast-paced catching and throwing action. A game of quick reflexes and coordinated teamwork.",
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Kho Kho",
        description: "Traditional tag game at its most competitive. Incredible speed, stamina, and quick dodges.",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
        link: REGISTRATION_LINK
    }
];

const SportsEventsSection = ({ onClose }) => {
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
            id="sports-events"
            data-lenis-prevent
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
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#FFB800]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#220202]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10 py-24">
                <div className="text-center mb-16 relative">
                    <span className="text-[#FFB800] font-medium uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in">
                        Athletic Arena
                    </span>
                    <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tighter shadow-2xl drop-shadow-lg">
                        THE <span className="text-accent glow-text-accent">SPORTS</span> SHOWDOWN
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        Push your limits and ignite your spirit. From team battles to individual tests of endurance, the arena is yours.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32 animate-fade-in relative z-20">
                    {sportsEvents.map((event, index) => (
                        <a
                            key={index}
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-[#1A0A0A]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-[#FFB800]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,184,0,0.3)] block cursor-pointer"
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
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light flex-grow">
                                    {event.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SportsEventsSection;
