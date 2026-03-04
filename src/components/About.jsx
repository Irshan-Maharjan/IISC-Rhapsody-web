import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import buildingImg from '../assets/IISC-building.webp';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const leftTextRef = useRef(null);
    const rightTextRef = useRef(null);
    const buildingRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Header Entry Animation (One-shot, not scrubbed)
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 20 }, // Changed from -20 to 20 to come from below
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%", // Trigger when section enters viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Desktop Animation
            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=150%", // Reduced from 250% to unpin earlier when text reaches midpoint
                        pin: true,
                        scrub: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        refreshPriority: 1,
                    }
                });

                // Animate both text columns upwards
                tl.fromTo([leftTextRef.current, rightTextRef.current],
                    { y: "100vh" },
                    { y: "-50%", ease: "none", duration: 1 },
                    0
                );

                // FADE OUT BUILDING
                // Starts at 70% of the scroll (when text is near top)
                tl.to(buildingRef.current,
                    { opacity: 0, y: "15vh", duration: 0.3, ease: "power1.in" },
                    0.7
                );
            });

            // Mobile Animation
            mm.add("(max-width: 767px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=100%", // Reduced from 150% to unpin earlier when text reaches midpoint
                        pin: true,
                        scrub: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        refreshPriority: 1,
                    }
                });

                // Ensure building stays visible/anchored nicely and is above text
                gsap.set(buildingRef.current, { opacity: 1, zIndex: 20 });
                // Text behind building
                gsap.set([leftTextRef.current, rightTextRef.current], { zIndex: 10 });

                // Animate both blocks from behind the building
                tl.fromTo(leftTextRef.current,
                    { y: "150vh" },
                    { y: "-50vh", duration: 1, ease: "none" },
                    0
                );

                tl.fromTo(rightTextRef.current,
                    { y: "150vh" },
                    { y: "-50vh", duration: 1, ease: "none" },
                    "<0.05"
                );

                // FADE OUT BUILDING (Mobile)
                // Starts a bit earlier as mobile screens are taller relative to text block width sometimes
                tl.to(buildingRef.current,
                    { opacity: 0, y: "10vh", duration: 0.3, ease: "power1.in" },
                    0.7
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        // Extreme negative margin to overlap Hero and show building immediately
        <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row justify-center items-end">

            {/* Static Header - Pinned to absolute top, Z-10 to be behind building */}
            {/* Moved to top-[2vh], added opacity (text-white/20), smaller/bolder on desktop with less tracking */}
            <h2 ref={headerRef} className="absolute top-[2vh] w-full text-center z-10 text-2xl md:text-4xl font-black tracking-[0.5em] md:tracking-[0.2em] text-white/60 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                About
            </h2>

            {/* Text Container - Mobile: Stacked, Desktop: Side-by-side */}
            {/* Constrained to width of building */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full pointer-events-none">

                {/* Width Constraint Wrapper - Mobile: w-full (screen width), Desktop: w-full (100vw) */}
                <div className="w-full md:w-full flex flex-col items-center gap-8 md:gap-12">

                    {/* Placeholder for spacing where header used to be in flex flow, if needed. 
                        But we want text centered/aligned relative to container. 
                        Since header is absolute, we don't need it here. */}

                    {/* Increased gap: gap-20 (mobile vertical), gap-32 (desktop horizontal) */}
                    <div className="flex flex-col md:flex-row w-full items-start justify-center gap-20 md:gap-32">
                        {/* Left Column - IISc */}
                        <div
                            ref={leftTextRef}
                            className="w-full md:w-1/2 h-auto md:h-full flex flex-col items-center justify-start text-center text-white px-6 md:px-8 pb-0 md:pb-[55vh]"
                        >
                            <div className="flex flex-col gap-4 w-full">
                                {/* Glowing Title - Intensified Glow */}
                                <h2 className="text-5xl md:text-7xl font-black font-serif text-[#FFB800] drop-shadow-[0_0_35px_rgba(74,4,4,0.8)] leading-tight">
                                    IISc
                                </h2>
                                {/* Brighter Text - Removed opacity, stronger shadow */}
                                <p className="text-lg md:text-xl font-semibold leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-justify">
                                    The Indian Institute of Science (IISc) is a renowned public research university located in Bangalore, India.
                                    Established in 1909, it is recognized as one of the premier institutions for scientific and technological research in India.
                                    IISc offers undergraduate, postgraduate, and doctoral programs across various disciplines, including engineering, sciences, and design.
                                    It boasts state-of-the-art facilities and a vibrant academic community. Known for its cutting-edge research and innovation,
                                    IISc consistently ranks among the top institutions in India and has garnered international recognition.
                                    It has been ranked as the best university in India by the National Institutional Ranking Framework (NIRF) and has achieved significant global rankings in various disciplines.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Rhapsody */}
                        <div
                            ref={rightTextRef}
                            className="w-full md:w-1/2 h-auto md:h-full flex flex-col items-center justify-start text-center text-white px-6 md:px-8 pb-0 md:pb-[55vh]"
                        >
                            <div className="flex flex-col gap-4 w-full">
                                {/* Glowing Title - Intensified Glow */}
                                <h2 className="text-5xl md:text-7xl font-black font-serif text-[#FFB800] drop-shadow-[0_0_35px_rgba(74,4,4,0.8)] leading-tight uppercase">
                                    Rhapsody
                                </h2>
                                {/* Brighter Text - Removed opacity, stronger shadow */}
                                <p className="text-lg md:text-xl font-semibold leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-justify">
                                    Rhapsody is the annual sci-tech, cultural, and sports fest of the Indian Institute of Science (IISc).
                                    It is a dynamic extravaganza that blends innovation, creativity, and talent in a diverse range of disciplines.
                                    Rhapsody offers a captivating lineup of events and competitions that cater to the interests of both science and art enthusiasts.
                                    From showcasing groundbreaking research projects to hosting enthralling cultural performances and adrenaline-pumping sports competitions,
                                    Rhapsody brings together the best of both worlds. Rhapsody also organizes its own Pronites with a footfall of above 20k.
                                    Artists like T.R.A.P, Naalayak and Lost Stories have performed in our Pronites.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Building Image - Pinned at Bottom */}
            {/* Shift down slightly (bottom-[-13vh] / md:bottom-[-21vh]) to reveal top text without changing size */}
            <div ref={buildingRef} className="absolute bottom-0 md:bottom-[-21vh] left-0 w-full z-20 flex items-end justify-center pointer-events-none">
                <div className="relative w-full flex justify-center">
                    <img
                        src={buildingImg}
                        alt="IISc Building"
                        /* Original sizes restored: Mobile: w-[180vw] / h-[125vh] | Desktop: w-full (100vw) */
                        className="w-[180vw] md:w-full h-[125vh] md:h-auto object-contain object-bottom drop-shadow-2xl"
                    />
                    {/* Bottom gradient for smooth transition */}
                    <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#220202] via-[#220202]/70 to-transparent"></div>
                </div>
            </div>
        </section>
    );
};

export default About;
