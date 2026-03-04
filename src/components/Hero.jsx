import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoSrc from '../assets/iisc.webm';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const bgTextRef = useRef(null);
    const videoCardRef = useRef(null);
    const contentRef = useRef(null);
    const bgTextContainerRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Infinite scrolling background text - Seamless Loop
            gsap.to(bgTextRef.current, {
                xPercent: -50,
                duration: 400,
                ease: "none",
                repeat: -1,
                force3D: true,
            });

            // 2. Scroll Interaction: Video Expansion (DESKTOP ONLY)
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const scrollTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=150%",
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        refreshPriority: 1,
                    }
                });

                scrollTl.to(contentRef.current, {
                    y: -150,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut"
                }, 0);

                scrollTl.to(bgTextContainerRef.current, {
                    y: -300,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut"
                }, 0);

                scrollTl.to(videoCardRef.current, {
                    width: "90%",
                    maxWidth: "1600px",
                    x: 0,
                    y: -40,
                    duration: 1,
                    ease: "power2.inOut",
                    zIndex: 50
                }, 0);

                scrollTl.to(".video-glow", { opacity: 0, duration: 0.3 }, 0);
            });

            // 3. Mobile Reset: Ensure no residual styles from GSAP when resizing
            mm.add("(max-width: 767px)", () => {
                gsap.set(videoCardRef.current, {
                    clearProps: "all"
                });
                gsap.set(contentRef.current, { clearProps: "all" });
                gsap.set(bgTextContainerRef.current, { clearProps: "all" });

                return () => {
                    ScrollTrigger.refresh();
                };
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Create a long repeated string to ensure the viewport is filled
    const marqueeText = "RHAPSODY 4.0 • ".repeat(8);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden py-8 md:py-0"
        >
            <div className="relative z-10 w-full flex flex-col items-center justify-center gap-4 md:gap-6 h-full md:pb-44">
                <div ref={contentRef} className="flex flex-col items-center text-center px-4 max-w-4xl pt-2 md:pt-[4vh]">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-serif font-bold tracking-tight text-white drop-shadow-2xl mb-2 leading-[0.95]"
                    >
                        Realm of the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-[#E2E2E2] to-[#D8B4FE]">
                            Surreal
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-base md:text-xl text-white/80 max-w-xl md:max-w-none text-center font-light leading-relaxed mb-3 md:whitespace-nowrap"
                    >
                        A flagship annual sci-tech, cultural, and sports fest of the <span className="font-semibold text-white">IISc, Bangalore</span>.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-1 rounded-full shadow-xl"
                    >
                        <span className="text-[#FFB800] font-display font-bold tracking-[0.2em] uppercase text-sm md:text-base">
                            20, 21 & 22 March
                        </span>
                    </motion.div>
                </div>

                <div className="relative flex items-center justify-center w-full">
                    <div
                        ref={videoCardRef}
                        className="w-[96vw] md:w-[53vw] max-w-5xl aspect-video rounded-xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden flex items-center justify-center shadow-2xl video-card will-change-transform"
                    >
                        <div className="video-glow absolute -inset-4 bg-[#4A0404]/50 blur-xl pointer-events-none" />

                        <div className="relative w-full h-full flex items-center justify-center">
                            <video
                                ref={videoRef}
                                src={videoSrc}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>
                    </div>
                </div>

                <div
                    ref={bgTextContainerRef}
                    className="relative md:absolute bottom-auto md:bottom-[20vh] z-0 flex items-center justify-start opacity-[0.25] select-none pointer-events-none blur-[2px] w-full mt-12 md:mt-0 overflow-hidden"
                >
                    <div ref={bgTextRef} className="flex whitespace-nowrap">
                        <h2 className="text-[10vh] md:text-[23vh] leading-none font-bold text-white tracking-tighter">
                            {marqueeText}
                        </h2>
                        <h2 className="text-[10vh] md:text-[23vh] leading-none font-bold text-white tracking-tighter">
                            {marqueeText}
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
