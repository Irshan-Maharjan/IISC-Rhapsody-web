import { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "../lib/utils";
import splitDesktopImage from "../assets/splitdesktop.webp";
import splitMobileImage from "../assets/splitmobile.webp";
import cukImage from "../assets/cuk.webp";
import cultuyImage from "../assets/cultuy.webp";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const SplitImageSection = ({ onOpenCultural, onOpenSports, onOpenSciTech }) => {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    const titleRef = useRef(null);
    const flipperRefs = useRef([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isInteractionEnabled, setIsInteractionEnabled] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=150%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: 1,
                    onUpdate: (self) => {
                        const enabled = self.progress > 0.6;
                        setIsInteractionEnabled(enabled);
                        if (!enabled) setHoveredIndex(null);
                    }
                }
            });

            // 1. Title Fade (0 -> 0.3)
            tl.fromTo(titleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.3 },
                0
            );

            // 2. Flip Phase (0.3 -> 1.0)
            tl.to(flipperRefs.current, {
                rotateY: 180,
                duration: 0.7,
                ease: "none"
            }, 0.3);

        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    const frontImageUrl = isMobile ? splitMobileImage : splitDesktopImage;
    const backImageUrl = isMobile ? cultuyImage : cukImage;

    return (
        <section ref={sectionRef} id="events" className="relative w-full h-screen z-20">
            <div className="w-full h-full flex flex-col justify-center items-center perspective-[2000px]">
                <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full max-w-7xl">
                    <div ref={titleRef} className="mb-12 text-center z-20">
                        <h2 className="text-4xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter shadow-black drop-shadow-lg">
                            Events
                        </h2>
                    </div>

                    <div className={cn("flex justify-center items-center w-full", isMobile ? "flex-col gap-4" : "flex-row gap-6")}>
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                ref={el => cardRefs.current[i] = el}
                                className={cn(
                                    "relative will-change-transform",
                                    isMobile ? "w-full h-[150px]" : "h-[400px] md:h-[500px] flex-1",
                                    "rounded-2xl",
                                    isInteractionEnabled ? "cursor-pointer" : "cursor-default",
                                    isInteractionEnabled && hoveredIndex !== null && hoveredIndex !== i && "opacity-40 blur-[2px]"
                                )}
                                onMouseEnter={() => isInteractionEnabled && setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => {
                                    if (isInteractionEnabled) {
                                        if (i === 0) onOpenCultural();
                                        else if (i === 1) onOpenSciTech();
                                        else if (i === 2) onOpenSports();
                                    }
                                }}
                                style={{
                                    transform: (isInteractionEnabled && hoveredIndex === i) ? "scale(1.1) translateY(-20px)" : "scale(1) translateY(0)"
                                }}
                            >
                                <div
                                    ref={el => flipperRefs.current[i] = el}
                                    className="w-full h-full relative transition-transform duration-100 ease-out shadow-2xl preserve-3d"
                                >
                                    {/* FRONT */}
                                    <div className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-2xl bg-neutral-900 preserve-3d">
                                        <div
                                            className={cn("absolute inset-0", isMobile ? "w-full h-[300%]" : "w-[300%] h-full")}
                                            style={{
                                                left: isMobile ? 0 : `${i * -100}%`,
                                                top: isMobile ? `${i * -100}%` : 0,
                                                backgroundImage: `url(${frontImageUrl})`,
                                                backgroundSize: isMobile ? "100% 100%" : "cover",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                    </div>

                                    {/* BACK */}
                                    <div
                                        className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden"
                                        style={{ transform: "rotateY(180deg)", backgroundColor: "#1a1a1a" }}
                                    >
                                        <div
                                            className={cn("absolute inset-0", isMobile ? "w-full h-[300%]" : "w-[300%] h-full")}
                                            style={{
                                                left: isMobile ? 0 : `${i * -100}%`,
                                                top: isMobile ? `${i * -100}%` : 0,
                                                backgroundImage: `url(${backImageUrl})`,
                                                backgroundSize: isMobile ? "100% 100%" : "cover",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/20" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                            {/* Text labels removed as requested */}
                                            <p className={cn("text-white/80 text-xs font-light tracking-[0.2em] uppercase transition-all", hoveredIndex === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                                                Click to View
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SplitImageSection;

