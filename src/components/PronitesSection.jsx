import { useRef, useEffect, useState } from "react";
import { cn } from "../lib/utils";
import pronitesBg from "../assets/prinites.webp";
import paponImg from "../assets/papon.jpeg";
import raftaarImg from "../assets/raftarr.jpeg";
import coffeeImg from "../assets/coffee.jpeg";
import sonewImg from "../assets/sonew.jpeg";
import someoneImg from "../assets/someone.jpeg";
import somesomeImg from "../assets/somesome.jpeg";
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

    const day1Images = [raftaarImg, sonewImg, someoneImg];
    const day2Images = [coffeeImg, paponImg, somesomeImg];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax and fade-in effect for the content
            gsap.fromTo(contentRef.current,
                { y: 60, opacity: 0 },
                {
                    y: -40,
                    opacity: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="pronites-section"
            className="relative w-full h-screen z-10 flex items-center justify-center overflow-hidden bg-[#220202]"
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
                className="relative z-20 text-center container mx-auto px-6 pt-20"
            >
                <div className="flex flex-col items-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#FFB800]/20 text-[#FFB800] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 backdrop-blur-md border border-[#FFB800]/30">
                        The Grand Finale
                    </span>

                    <h2 className="text-4xl md:text-7xl font-display font-black text-white italic tracking-tighter mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        PRONITES
                    </h2>

                    <p className="text-base md:text-lg text-white/70 font-light max-w-xl mx-auto leading-tight mb-8">
                        Experience the night like never before with electrifying performances.
                    </p>




                    {/* Poster Grid - Image Slider Placeholder */}
                    <div className="flex flex-row justify-center gap-16 md:gap-40 w-full max-w-6xl mb-8 px-4">
                        {/* Day 1 Card - Image Slider */}
                        <div
                            onClick={() => onOpenLineup && onOpenLineup(1)}
                            className="group relative flex flex-col items-center w-[30.5vh] md:w-[38.5vh] cursor-pointer hover:scale-[1.02] transition-transform duration-500"
                        >
                            <div className="relative aspect-[3/4] w-full bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden rounded-lg">
                                <ImageSlider images={day1Images} interval={3000} />
                            </div>
                            <h3 className="mt-4 text-[#FFB800] text-xl font-display font-black tracking-widest uppercase group-hover:text-white transition-colors duration-300">Day 1</h3>
                        </div>

                        {/* Day 2 Card - Image Slider */}
                        <div
                            onClick={() => onOpenLineup && onOpenLineup(2)}
                            className="group relative flex flex-col items-center w-[30.5vh] md:w-[38.5vh] cursor-pointer hover:scale-[1.02] transition-transform duration-500"
                        >
                            <div className="relative aspect-[3/4] w-full bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden rounded-lg">
                                <ImageSlider images={day2Images} interval={3500} />
                            </div>
                            <h3 className="mt-4 text-[#FFB800] text-xl font-display font-black tracking-widest uppercase group-hover:text-white transition-colors duration-300">Day 2</h3>
                        </div>
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
