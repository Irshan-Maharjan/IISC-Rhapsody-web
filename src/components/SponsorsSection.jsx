import { useRef, useState, useEffect } from "react";
import { cn } from "../lib/utils";
import cnlLogo from "../assets/cnl.png";
import tplLogo from "../assets/tpl.png";
import whiteeLogo from "../assets/whitee.webp";

const sponsors = [
    { name: "Sponsor 1", logo: cnlLogo },
    { name: "Sponsor 2", logo: tplLogo },
    { name: "Sponsor 3", logo: whiteeLogo },
];

const SponsorsSection = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty("--mouse-x", `${x}px`);
        containerRef.current.style.setProperty("--mouse-y", `${y}px`);
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-32 md:py-40 overflow-hidden z-10" // Transparent to show Global Background
        >
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className={cn(
                    "text-center mb-20 transition-all duration-700 ease-out",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#E2E2E2]/60 mb-4 block">
                        Backed By
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight drop-shadow-lg">
                        Our Partners
                    </h2>
                </div>

                {/* Grid Container */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                        "relative grid grid-cols-1 sm:grid-cols-3 max-w-5xl mx-auto border-t border-white/10 transition-opacity duration-1000",
                        isVisible ? "opacity-100" : "opacity-0"
                    )}
                >
                    {/* Spotlight Effect Overlay - Using CSS Variables for Performance */}
                    <div
                        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-20 mix-blend-overlay"
                        style={{
                            opacity,
                            background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,184,0,0.15), transparent 40%)`
                        }}
                    />

                    {sponsors.map((sponsor, index) => (
                        <div
                            key={sponsor.name}
                            className={cn(
                                "group relative flex items-center justify-center p-12 border-r border-b border-white/10 bg-white/20 backdrop-blur-2xl transition-colors duration-300 overflow-hidden",
                                index === 0 ? "border-l" : ""
                            )}
                        >
                            {/* Hover Highlight per box */}
                            <div className="absolute inset-0 bg-[#FFB800]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Logo */}
                            <div className="relative w-full h-16 md:h-20 flex items-center justify-center z-10">
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="max-w-[100px] md:max-w-[140px] h-auto object-contain transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Tagline */}
                <div className={cn(
                    "text-center mt-20 transition-all duration-700 ease-out delay-300",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    <p className="text-sm text-white/30 font-light tracking-wide">
                        Trusted by leading institutions and visionary partners.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SponsorsSection;
