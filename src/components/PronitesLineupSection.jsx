import React from 'react';
import { cn } from "../lib/utils";
import { ArrowLeft } from "lucide-react";
import paponImg from "../assets/papon.jpeg";
import raftaarImg from "../assets/raftarr.jpeg";
import coffeeImg from "../assets/coffee.jpeg";
import sonewImg from "../assets/sonew.jpeg";
import someoneImg from "../assets/someone.jpeg";
import somesomeImg from "../assets/somesome.jpeg";
import terimImg from "../assets/terim.webp";
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

    const day0Artists = [
        { name: "Rahul Dua", image: sonewImg },
    ];

    const day1Artists = [
        { name: "Terim", image: terimImg },
        { name: "Masala Coffee", image: raftaarImg },
        { name: "Rahul Subramanian", image: someoneImg },
    ];

    const day2Artists = [
        { name: "Raftaar", image: coffeeImg },
        { name: "Papon", image: paponImg },
        { name: "Inder Sahani", image: somesomeImg },
    ];

    const artists = activeDay === 0 ? day0Artists : activeDay === 1 ? day1Artists : day2Artists;

    return (
        <section
            id="pronites-lineup"
            data-lenis-prevent
            className="fixed inset-0 z-[150] bg-[#0a0202] overflow-y-auto overflow-x-hidden animate-fade-in"
        >
            {/* Full Container Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80"
                    alt="Pronites Background"
                    className="w-full h-full object-cover opacity-40 brightness-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0202]/80 via-transparent to-[#0a0202]/95" />
            </div>

            {/* Sticky Navigation Header */}
            <div className="sticky top-0 left-0 w-full z-[160] flex justify-center px-6 md:px-12 py-8 pointer-events-none">
                <button
                    onClick={onClose}
                    className="pointer-events-auto flex items-center gap-2 px-6 py-2.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-[#FFB800] hover:text-black transition-all duration-300 group shadow-2xl"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Back to Pronites</span>
                </button>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-12 md:py-24">
                <div className="text-center mb-16 relative">
                    <span className="text-[#FFB800] font-medium uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in">
                        The Grand Stage
                    </span>
                    <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tighter shadow-2xl drop-shadow-lg">
                        DAY <span className="text-[#FFB800]">{activeDay}</span> ARTISTS
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        Experience the magic of the main stage. Witness some of the biggest names in the industry performing live.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto pb-32">
                    {artists.map((artist, index) => (
                        <div key={index} className="group relative flex flex-col items-center">
                            <div className="relative aspect-[3/4] w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:border-[#FFB800]/50 group-hover:shadow-[0_20px_40px_-15px_rgba(255,184,0,0.3)]">
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-0 left-0 w-full p-8 transition-all duration-500">
                                    <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-3 group-hover:text-[#FFB800] transition-colors">{artist.name}</h3>
                                    <div className="h-1 w-12 bg-[#FFB800] rounded-full transform origin-left transition-all duration-500 group-hover:w-full opacity-60" />
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
