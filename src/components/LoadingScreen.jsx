import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
    const overlayRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const taglineRef = useRef(null);
    const progressRef = useRef(null);
    const progressBarRef = useRef(null);
    const curtainTopRef = useRef(null);
    const curtainBottomRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // Set initial states
            gsap.set([line1Ref.current, line2Ref.current, taglineRef.current], {
                y: 80,
                opacity: 0,
            });
            gsap.set(progressRef.current, { opacity: 0 });
            gsap.set(progressBarRef.current, { width: '0%' });

            // 1. Lines reveal
            tl.to(line1Ref.current, {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
            }, 0.3);

            tl.to(line2Ref.current, {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
            }, 0.55);

            tl.to(taglineRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power2.out',
            }, 0.9);

            // 2. Progress bar appears and fills
            tl.to(progressRef.current, {
                opacity: 1,
                duration: 0.4,
            }, 1.1);

            tl.to(progressBarRef.current, {
                width: '100%',
                duration: 1.4,
                ease: 'power2.inOut',
                onUpdate: function () {
                    const pct = Math.round(this.progress() * 100);
                    setProgress(pct);
                },
            }, 1.2);

            // 3. Brief hold
            tl.to({}, { duration: 0.2 });

            // 4. Curtain exit — top and bottom panels slide away
            tl.to(curtainTopRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: 'power4.inOut',
            }, '+=0.1');

            tl.to(curtainBottomRef.current, {
                yPercent: 100,
                duration: 0.8,
                ease: 'power4.inOut',
            }, '<');

        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden"
        >
            {/* Top Curtain */}
            <div
                ref={curtainTopRef}
                className="absolute top-0 left-0 w-full h-1/2 flex flex-col items-center justify-end pb-4 overflow-hidden"
                style={{ background: 'linear-gradient(to bottom, #0a0a0a 70%, #1a0505)' }}
            >
                {/* Ambient glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(74,4,4,0.4) 0%, transparent 70%)',
                    }}
                />

                {/* Main Text */}
                <div className="relative z-10 text-center px-6 pb-8">
                    <p
                        ref={taglineRef}
                        className="text-[#FFB800]/70 text-xs md:text-sm tracking-[0.5em] font-light mb-4"
                    >
                        RHAPSODY 4.0 &nbsp;•&nbsp; IISc BANGALORE
                    </p>

                    <div className="overflow-hidden mb-1">
                        <h1
                            ref={line1Ref}
                            className="font-display font-black text-[13vw] md:text-[10vw] leading-none uppercase tracking-tight text-white"
                        >
                            Full Masti
                        </h1>
                    </div>
                </div>
            </div>

            {/* Bottom Curtain */}
            <div
                ref={curtainBottomRef}
                className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col items-center justify-start pt-4 overflow-hidden"
                style={{ background: 'linear-gradient(to top, #0a0a0a 70%, #1a0505)' }}
            >
                {/* Ambient glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,4,4,0.4) 0%, transparent 70%)',
                    }}
                />

                <div className="relative z-10 text-center px-6 pt-8">
                    {/* Macha text */}
                    <div className="overflow-hidden mb-8">
                        <h1
                            ref={line2Ref}
                            className="font-display font-black text-[13vw] md:text-[10vw] leading-none uppercase tracking-tight"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #FFB800 0%, #fff 50%, #D8B4FE 100%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Macha!
                        </h1>
                    </div>

                    {/* Progress bar */}
                    <div ref={progressRef} className="flex flex-col items-center gap-2">
                        <div className="w-48 md:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <div
                                ref={progressBarRef}
                                className="h-full rounded-full"
                                style={{
                                    background: 'linear-gradient(to right, #FFB800, #D8B4FE)',
                                    width: '0%',
                                    boxShadow: '0 0 12px rgba(255,184,0,0.6)',
                                }}
                            />
                        </div>
                        <span className="text-white/40 text-[10px] tracking-widest font-mono">
                            {progress}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Center divider glow line */}
            <div
                className="absolute left-0 right-0 top-1/2 -translate-y-px h-px z-20 pointer-events-none"
                style={{
                    background: 'linear-gradient(to right, transparent, rgba(255,184,0,0.6), rgba(216,180,254,0.6), transparent)',
                    boxShadow: '0 0 20px rgba(255,184,0,0.3)',
                }}
            />
        </div>
    );
};

export default LoadingScreen;
