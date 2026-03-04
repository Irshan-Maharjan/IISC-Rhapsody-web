import React from 'react';
import { cn } from "../lib/utils";
import { ArrowLeft } from "lucide-react";
import paponImg from "../assets/papon.jpeg";
import raftaarImg from "../assets/raftarr.jpeg";
import coffeeImg from "../assets/coffee.jpeg";
import sonewImg from "../assets/sonew.jpeg";
import someoneImg from "../assets/someone.jpeg";
import somesomeImg from "../assets/somesome.jpeg";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const PronitesLineupSection = ({ activeDay, onClose }) => {
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

    const day1Artists = [
        { name: "Masala Coffee", image: raftaarImg },
        { name: "Rahul Dua", image: sonewImg },
        { name: "Rahul Subramanian", image: someoneImg },
    ];

    const day2Artists = [
        { name: "Raftaar", image: coffeeImg },
        { name: "Papon", image: paponImg },
        { name: "Inder Sahani", image: somesomeImg },
    ];

    const artists = activeDay === 1 ? day1Artists : day2Artists;

    return (
        <section
            id="pronites-lineup"
            data-lenis-prevent
            className="fixed inset-0 z-[60] bg-[#1a0505]/98 backdrop-blur-xl overflow-y-auto overflow-x-hidden min-h-screen animate-fade-in"
        >
            {/* Back Button */}
            <div className="sticky top-6 w-full flex justify-center z-[90] pointer-events-none mb-2">
                <Button
                    onClick={onClose}
                    variant="outline"
                    className="pointer-events-auto rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all duration-300 shadow-2xl px-6 py-2 h-auto text-xs md:text-sm font-medium tracking-wider uppercase flex items-center gap-2 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    Back to Pronites
                </Button>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
                <div className="text-center mb-16">
                    <span className="text-[#FFB800] font-medium uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in">
                        Lineup
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display font-black text-white italic tracking-tighter mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        DAY <span className="text-gradient-gold">{activeDay}</span> ARTISTS
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
                    {artists.map((artist, index) => (
                        <div key={index} className="group relative flex flex-col items-center">
                            <div className="relative aspect-[3/4] w-full max-w-sm rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 group-hover:border-[#FFB800]/50 group-hover:shadow-[0_0_30px_rgba(255,184,0,0.2)]">
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                                    <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-1">{artist.name}</h3>
                                    <div className="h-1 w-12 bg-[#FFB800] rounded-full transform origin-left transition-all duration-500 group-hover:w-full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PronitesLineupSection;
