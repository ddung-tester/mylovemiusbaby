import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ParticleBackground = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate random particles
        const particleArray = [];
        for (let i = 0; i < 30; i++) {
            particleArray.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 8 + 4,
                duration: Math.random() * 10 + 10,
                delay: Math.random() * 5,
            });
        }
        setParticles(particleArray);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-gradient-to-br from-romantic-300/30 to-dreamy-300/30 blur-sm"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-romantic-100/20 via-transparent to-dreamy-100/20" />
            <div className="absolute inset-0 bg-gradient-to-tl from-champagne-100/10 via-transparent to-transparent" />
        </div>
    );
};

export default ParticleBackground;
