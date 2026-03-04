import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticleField from '../components/ParticleField';
import rhapshd from '../assets/rhapshd.webp';
import mobilebg from '../assets/mobilebg.webp';

const GlobalBackground = ({ children }) => {
    const containerRef = useRef(null);
    const blobsRef = useRef([]);
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Lock background height on mobile to prevent "zoom" when URL bar toggles
        if (window.innerWidth < 768 && containerRef.current) {
            containerRef.current.style.height = `${window.screen.height}px`;
            containerRef.current.style.bottom = 'auto'; // Prevent inset-0 from overriding height
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Only animate blobs on desktop — mobile should have a perfectly still background

        const ctx = gsap.context(() => {
            blobsRef.current.forEach((blob) => {
                // Place blobs at fixed positions
                gsap.set(blob, {
                    x: gsap.utils.random(0, window.innerWidth),
                    y: gsap.utils.random(0, window.innerHeight),
                    scale: gsap.utils.random(1, 2),
                    opacity: 0.05
                });

                // On desktop: very slow, subtle drift. On mobile: completely static.
                if (!isMobile) {
                    gsap.to(blob, {
                        x: "+=random(-30, 30)",
                        y: "+=random(-30, 30)",
                        duration: "random(20, 30)",
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative w-full bg-[#1A0A0A] text-white">
            {/* Background Layer — fixed and GPU-composited to prevent mobile jitter */}
            <div
                ref={containerRef}
                className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
                style={{
                    backgroundImage: `url(${isMobile ? mobilebg : rhapshd})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    // Force GPU compositing layer — prevents iOS Safari "jello" scroll effect
                    transform: 'translateZ(0)',
                    WebkitTransform: 'translateZ(0)',
                    willChange: 'transform',
                }}
            >
                <ParticleField />

                {/* Decorative Blobs */}
                <div
                    ref={el => blobsRef.current[0] = el}
                    className="absolute w-[40vw] h-[40vw] bg-[#4A0404] rounded-full blur-[100px]"
                />
                <div
                    ref={el => blobsRef.current[1] = el}
                    className="absolute w-[45vw] h-[45vw] bg-[#420101] rounded-full blur-[120px]"
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default GlobalBackground;
