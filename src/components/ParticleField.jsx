import React, { useEffect, useState } from "react";

const ParticleField = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const colors = [
            "#4A0404",   // Deep Red Texture
            "#E2E2E2",   // Graphic Accent
            "#4A0404",   // Repeating for balance
        ];

        const newParticles = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100 + 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 20 + 15,
            delay: Math.random() * 10,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));

        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full particle opacity-0"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`, // Initial position
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleField;
