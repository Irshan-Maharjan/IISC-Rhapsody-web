import React from 'react';
import { cn } from "../lib/utils";
import { ArrowLeft } from "lucide-react";
import kabaddiImg from "../assets/kabaddi.png";
import khokhoImg from "../assets/khokho.png";

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
        color: "from-[#FF4D00]/20 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Swimming",
        description: "Dive in and race to the finish line in our heated swimming competitions.",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/20 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Table Tennis",
        description: "Rapid-fire rallies and intense concentration. A test of elite reflexes and technical skill.",
        image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FF4D00]/20 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Carrom",
        description: "Precision, angles, and perfect strikes. Show off your board skills in this classic game.",
        image: "https://images.unsplash.com/photo-1620741212082-4e5c8194883e?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/20 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Chess",
        description: "A battle of minds, strategy, and foresight. Outwit your opponent on the 64 squares.",
        image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FF4D00]/20 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Kabaddi Women",
        description: "Fierce competition and incredible agility. Experience the raw energy of women's Kabaddi.",
        image: kabaddiImg,
        color: "from-[#220202]/20 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Volleyball",
        description: "High-flying action above the net. Power hits, teamwork, and defensive excellence in every set.",
        image: "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FF4D00]/20 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Ultimate Frisbee",
        description: "Dynamic, non-contact team sport. High-flying discs and athletic plays across the field.",
        image: "https://images.unsplash.com/photo-1649772317307-988009f89c2f?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/20 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Football Women",
        description: "Experience the passion, teamwork, and skill in the women's football tournament.",
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FF4D00]/20 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "E-Sports",
        description: "Digital battlegrounds and intense reflexes. Compete with the best gamers on campus.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/20 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Throwball",
        description: "Fast-paced catching and throwing action. A game of quick reflexes and coordinated teamwork.",
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FF4D00]/20 to-transparent",
        link: REGISTRATION_LINK
    },
    {
        title: "Kho Kho",
        description: "Traditional tag game at its most competitive. Incredible speed, stamina, and quick dodges.",
        image: khokhoImg,
        color: "from-[#220202]/20 to-transparent",
        link: REGISTRATION_LINK
    }
];

const SportsEventsSection = ({ onClose }) => {
    React.useEffect(() => {
        window.lenis?.stop();
        document.body.style.overflow = 'hidden';
        return () => {
            window.lenis?.start();
            document.body.style.overflow = 'unset';
            setTimeout(() => {
                if (window.ScrollTrigger) window.ScrollTrigger.refresh();
            }, 100);
        };
    }, []);

    return (
        <section
            id="sports-events"
            data-lenis-prevent
            className="fixed inset-0 z-[150] bg-[#0c0101] overflow-y-auto overflow-x-hidden animate-fade-in"
        >
            {/* Full Container Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0c0101] via-[#0c0101] to-[#050000]" />

            {/* Sticky Navigation Header */}
            <div className="sticky top-0 left-0 w-full z-[160] flex justify-center px-6 md:px-12 py-8 pointer-events-none">
                <button
                    onClick={onClose}
                    className="pointer-events-auto flex items-center gap-2 px-6 py-2.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-[#FF4D00] hover:text-black transition-all duration-300 group shadow-[0_0_20px_rgba(255,77,0,0.2)]"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Back to Events</span>
                </button>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-12 md:py-24">
                <div className="text-center mb-16 relative">
                    <span className="text-[#FF4D00] font-medium uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in">
                        The Athletic Arena
                    </span>
                    <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tighter shadow-2xl drop-shadow-lg">
                        THE <span className="text-[#FF4D00] drop-shadow-[0_0_15px_rgba(255,77,0,0.5)]">SPORTS</span> SHOWDOWN
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        Push your limits, ignite your spirit, and conquer the field. The ultimate showdown of grit and glory starts here.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32 animate-fade-in relative z-20">
                    {sportsEvents.map((event, index) => (
                        <a
                            key={index}
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF4D00]/50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(255,77,0,0.15)] block cursor-pointer"
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
                                {/* Dynamic speed/line pattern overlay */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
                            </div>

                            {/* Content */}
                            <div className="p-8 relative z-20 flex flex-col h-[calc(100%-14rem)]">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
                                    <h3 className="text-2xl font-display font-bold text-white tracking-wide group-hover:text-[#FF4D00] transition-colors">
                                        {event.title}
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light flex-grow">
                                    {event.description}
                                </p>
                                <div className="mt-auto w-full py-3 bg-[#FF4D00] text-black border border-[#FF4D00]/20 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 group-hover:bg-white group-hover:scale-[1.02] text-center">
                                    Register Now
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SportsEventsSection;
