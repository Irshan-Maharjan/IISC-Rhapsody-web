import { useState, useEffect, useRef, Suspense } from 'react';
import { Menu, X } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import rhapsodyLogo from '../assets/newlogo.png';

const DiscoBall = ({ scale = 3.5 }) => {
<<<<<<< HEAD
    const { scene } = useGLTF('./assets/3d-models/scene.gltf');
=======
<<<<<<< Updated upstream
    const { scene } = useGLTF('/src/assets/disco_ball/scene.gltf');
=======
    const { scene } = useGLTF('/assets/3d-models/scene.gltf');
>>>>>>> Stashed changes
>>>>>>> 45f5aeb (Update cultural event rules, pronites section enhancements, and campus ambassador CTA design)
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.25;
        }
    });

    return (
        <group dispose={null}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#FFB800" />
            <pointLight position={[-10, -10, -10]} intensity={2} color="#4A0404" />
            <primitive
                ref={meshRef}
                object={scene}
                scale={scale}
                position={[0, 0, 0]}
            />
        </group>
    );
};

const ProjectorMenu = ({ isFooterVisible, onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.lenis?.stop();
        } else {
            document.body.style.overflow = 'unset';
            window.lenis?.start();
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.lenis?.start();
        };
    }, [isOpen]);

    const handleToggle = () => {
        setIsAnimating(true);
        setIsOpen(!isOpen);
        setTimeout(() => setIsAnimating(false), 800);
    };

    const handleItemClick = () => {
        handleToggle();
        if (onNavigate) onNavigate();
    };

    return (
        <>
            <div className={`fixed top-0 left-0 w-full z-[310] pointer-events-none transition-all duration-700 ease-in-out ${isFooterVisible ? 'opacity-0 -translate-y-20' : 'opacity-100 translate-y-0'}`}>
                <a
                    href="/"
                    className="absolute top-6 left-8 md:left-10 pointer-events-auto flex items-center gap-3 transition-transform duration-300 hover:scale-105"
                >
                    <img
                        src={rhapsodyLogo}
                        alt="Rhapsody Logo"
                        className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
                    />
                </a>

                <div
                    className={`absolute top-6 right-6 w-20 h-20 group cursor-pointer pointer-events-auto transition-transform duration-300 hover:scale-110`}
                    onClick={handleToggle}
                >
                    <div className="absolute inset-0 z-0">
                        <Canvas
                            dpr={window.devicePixelRatio}
                            gl={{ alpha: true, antialias: true }}
                            camera={{ position: [0, 0, 4], fov: 45 }}
                        >
                            <Suspense fallback={null}>
                                <DiscoBall scale={isMobile ? 2.6 : 3.2} />
                                <Environment preset="city" />
                            </Suspense>
                        </Canvas>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="relative w-8 h-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                            <span className={`absolute inset-0 transition-all duration-300 transform ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                                <Menu size={32} className="text-white" strokeWidth={2.5} />
                            </span>
                            <span className={`absolute inset-0 transition-all duration-300 transform ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                                <X size={32} className="text-white" strokeWidth={2.5} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div
                data-lenis-prevent
                className="fixed inset-0 z-[300] pointer-events-none overflow-hidden"
                style={{
                    transition: 'clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: 'radial-gradient(circle at calc(100% - 56px) 56px, rgba(255, 184, 0, 0.9) 0%, rgba(226, 226, 226, 0.6) 40%, rgba(34, 2, 2, 0.25) 100%)',
                    boxShadow: '0 0 80px rgba(74, 4, 4, 0.5)',
                    backdropFilter: 'blur(16px)',
                    clipPath: isOpen
                        ? (isMobile
                            ? 'polygon(calc(100% - 80px) 80px, 0 60vh, 0 175vh)'
                            : 'polygon(calc(100% - 80px) 80px, 0 40vh, 0 140vh)')
                        : 'polygon(calc(100% - 80px) 80px, calc(100% - 80px) 80px, calc(100% - 80px) 80px)',
                    pointerEvents: isOpen ? 'auto' : 'none'
                }}
            >
                <div className={`h-full w-full flex flex-col items-start pl-8 md:pl-20 justify-start pt-[60vh] md:pt-[45vh] transition-all duration-500 delay-200 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <nav className="flex flex-col gap-3.5 text-white text-left z-10 drop-shadow-md">
                        {['Home', 'About', 'Pronites', 'Early Bird Pass', 'Events', 'Ambassador', 'Sponsors', 'Sponsor Us'].map((item, index) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase() === 'ambassador' ? 'campus-ambassador' : item.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={handleItemClick}
                                className="font-display font-medium text-xl md:text-2xl lg:text-3xl tracking-tight hover:italic transition-all duration-300 leading-none"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default ProjectorMenu;
