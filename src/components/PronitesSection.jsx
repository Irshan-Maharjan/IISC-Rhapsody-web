import { useRef, useEffect, useState } from "react";
import { cn } from "../lib/utils";
import pronitesBg from "../assets/prinites.webp";
import paponImg from "../assets/papon.jpeg";
import raftaarImg from "../assets/raftarr.jpeg";
import coffeeImg from "../assets/coffee.jpeg";
import sonewImg from "../assets/sonew.jpeg";
import someoneImg from "../assets/someone.jpeg";
import somesomeImg from "../assets/somesome.jpeg";
import terimImg from "../assets/terim.webp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ImageSlider = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="relative w-full h-full">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={cn(
                        "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    )}
                >
                    <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
    );
};

const PronitesSection = ({ onOpenLineup }) => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const [activeDay, setActiveDay] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const day0Images = [sonewImg];
    const day1Images = [terimImg, raftaarImg, someoneImg];
    const day2Images = [coffeeImg, paponImg, somesomeImg];

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        // Auto-advance active day every 5 seconds
        const autoSlide = setInterval(() => {
            setActiveDay(prev => (prev + 1) % 3);
        }, 5000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(autoSlide);
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main content subtle entrance (position only)
            gsap.fromTo(contentRef.current,
                { y: 30 },
                {
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",
                        end: "top 40%",
                        scrub: 1,
                    }
                }
            );

            // Sequenced sliding entrance for cards (Simplified to avoid transparency issues)
            gsap.from(".animate-slide-up", {
                x: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Ensure positions are recalculated properly
            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="pronites-section"
            className="relative w-full min-h-screen z-10 flex items-center justify-center overflow-hidden bg-[#220202] py-20"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={pronitesBg}
                    alt="Pronites Background"
                    className="w-full h-full object-cover brightness-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#220202] via-transparent to-[#220202]/80" />
            </div>

            {/* Content Container */}
            <div
                ref={contentRef}
                className="relative z-20 text-center container mx-auto px-6 h-full flex items-center"
            >
                <div className="flex flex-col items-center w-full">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#FFB800]/20 text-[#FFB800] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 backdrop-blur-md border border-[#FFB800]/30">
                        The Grand Finale
                    </span>

                    <h2 className="text-4xl md:text-7xl font-display font-black text-white italic tracking-tighter mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        PRONITES
                    </h2>

                    <p className="text-base md:text-lg text-white/70 font-light max-w-xl mx-auto leading-tight mb-8">
                        Experience the night like never before with electrifying performances.
                    </p>

                    {/* Poster Grid - Desktop Grid / Mobile Slider */}
                    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-0 mt-8">
                        <div className={cn(
                            "relative transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
                            isMobile ? "flex flex-row items-center gap-6" : "flex flex-row flex-wrap justify-center items-center gap-12 md:gap-20"
                        )}
                            style={{
                                transform: isMobile ? `translateX(calc((100vw - 280px) / 2 - ${activeDay * (240 + 24)}px))` : 'none'
                            }}
                        >
                            {[
                                { title: "Day 0", images: day0Images, interval: 2500, day: 0 },
                                { title: "Day 1", images: day1Images, interval: 3200, day: 1 },
                                { title: "Day 2", images: day2Images, interval: 3800, day: 2 }
                            ].map((dayInfo, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        if (isMobile) setActiveDay(idx);
                                        onOpenLineup && onOpenLineup(dayInfo.day);
                                    }}
                                    className={cn(
                                        "group relative flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-700 animate-slide-up",
                                        isMobile ? "w-[240px]" : "w-[32.5vh]",
                                        isMobile
                                            ? (activeDay === idx ? "scale-110 z-30 opacity-100" : "scale-90 z-10 opacity-100")
                                            : "scale-100 opacity-100 hover:scale-[1.05]"
                                    )}
                                    style={{ animationDelay: `${idx * 150}ms` }}
                                >
                                    <div className={cn(
                                        "relative aspect-[3/4] w-full bg-[#1a0505] backdrop-blur-md border rounded-2xl overflow-hidden shadow-2xl transition-all duration-500",
                                        (!isMobile || activeDay === idx) ? "border-[#FFB800]/50 shadow-[0_0_40px_rgba(255,184,0,0.25)]" : "border-white/10"
                                    )}>
                                        <ImageSlider images={dayInfo.images} interval={dayInfo.interval} />
                                        {/* Glow overlay for active card */}
                                        {(!isMobile || activeDay === idx) && (
                                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#FFB800]/20 to-transparent pointer-events-none" />
                                        )}
                                    </div>
                                    <div className="mt-6 flex flex-col items-center">
                                        <h3 className={cn(
                                            "text-xl md:text-2xl font-display font-black tracking-[0.2em] uppercase transition-all duration-500",
                                            (!isMobile || activeDay === idx) ? "text-white" : "text-white/60"
                                        )}>
                                            {dayInfo.title}
                                        </h3>
                                        <div className={cn(
                                            "h-1 bg-[#FFB800] rounded-full transition-all duration-700 mt-2",
                                            (!isMobile || activeDay === idx) ? "w-24 shadow-[0_0_10px_#FFB800]" : "w-0"
                                        )} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Dots - Mobile Only */}
                        {isMobile && (
                            <div className="flex justify-center gap-3 mt-12 pb-10">
                                {[0, 1, 2].map((i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveDay(i)}
                                        className={cn(
                                            "h-1.5 transition-all duration-500 rounded-full",
                                            activeDay === i ? "w-8 bg-[#FFB800]" : "w-2 bg-white/20 hover:bg-white/40"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Decorative Lines */}
                    <div className="flex justify-center gap-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-0.5 h-10 bg-linear-to-b from-[#FFB800] to-transparent opacity-40 rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PronitesSection;
