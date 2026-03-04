import { useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pronitesBg from "../assets/pronites.webp";
import qrImage from "../assets/copyyy.jpeg";

// Use the local asset for the QR
const caQr = qrImage;

gsap.registerPlugin(ScrollTrigger);

const CampusAmbassador = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const qrRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect for the content
            gsap.fromTo(contentRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                }
            );

            // Subtle rotation and float for QR placeholder
            gsap.to(qrRef.current, {
                y: -15,
                rotation: 2,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleApply = () => {
        window.open("https://forms.office.com/r/R6nb6LLj5z", "_blank");
    };

    return (
        <section
            ref={sectionRef}
            id="campus-ambassador"
            className="relative w-full min-h-screen z-0 flex items-center justify-center overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={pronitesBg}
                    alt="Background"
                    className="w-full h-full object-cover brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#220202] via-transparent to-[#220202]/60" />
            </div>

            {/* Background Texture/Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-[1]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(226,226,226,0.15) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 container mx-auto px-6 md:px-24 pt-6 pb-12 md:py-0">
                <div ref={contentRef} className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-32">

                    {/* LEFT SIDE: CTA */}
                    <div className="w-full md:w-3/5 space-y-3 md:space-y-8 text-left">
                        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/20">
                            <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
                            <span className="text-[#FFB800] text-xs font-bold tracking-widest uppercase">
                                Leadership Opportunity
                            </span>
                        </div>

                        <h2 className="text-5xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter">
                            BECOME A <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] to-[#E2E2E2]">
                                CAMPUS AMBASSADOR
                            </span>
                        </h2>

                        <p className="text-lg md:text-xl text-white/70 max-w-xl font-light leading-relaxed">
                            Lead the Rhapsody revolution at your college. Build your network, gain valuable experience, and unlock exclusive rewards as an official representative.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <button
                                onClick={handleApply}
                                className="px-10 py-5 bg-[#FFB800] text-[#220202] font-black text-lg uppercase tracking-wider rounded-none hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[8px_8px_0px_0px_#220202] cursor-pointer"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE: QR PLACEHOLDER */}
                    <div className="w-full md:w-2/5 flex justify-center md:justify-end">
                        <div
                            ref={qrRef}
                            className="relative group w-52 h-52 md:w-80 md:h-80 bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-6 shadow-2xl"
                        >
                            {/* Decorative Corners */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FFB800]" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FFB800]" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FFB800]" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FFB800]" />

                            <div className="w-full h-full border border-white/5 bg-[#220202] flex flex-col items-center justify-center p-4 md:p-8 text-center relative overflow-hidden group">
                                {/* Scanner Line Animation */}
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-[#FFB800] shadow-[0_0_15px_#FFB800] z-20 animate-scan" />

                                <div className="z-10 bg-white p-2 md:p-4 mb-2 md:mb-4">
                                    <img
                                        src={caQr}
                                        alt="Campus Ambassador QR"
                                        className="w-24 h-24 md:w-40 md:h-40 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <p className="text-[#FFB800] font-black text-[10px] md:text-sm tracking-widest uppercase mt-1 md:mt-2">
                                    Scan to Register
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CampusAmbassador;
