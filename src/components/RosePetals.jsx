import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const RosePetal = ({ delay, startX, duration }) => {
    return (
        <motion.div
            initial={{
                x: startX,
                y: -20,
                rotate: 0,
                opacity: 0,
            }}
            animate={{
                x: [startX, startX + Math.random() * 100 - 50, startX + Math.random() * 100 - 50],
                y: ['0vh', '110vh'],
                rotate: [0, 360, 720],
                opacity: [0, 0.8, 0.6, 0],
            }}
            transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.1, 0.8, 1],
            }}
            className="absolute pointer-events-none"
            style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
        >
            {/* Rose petal SVG */}
            <svg
                width="20"
                height="24"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 0C10 0 0 8 0 14C0 18 4 22 10 24C16 22 20 18 20 14C20 8 10 0 10 0Z"
                    fill="url(#gradient)"
                    opacity="0.9"
                />
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fda4af" />
                        <stop offset="50%" stopColor="#f43f5e" />
                        <stop offset="100%" stopColor="#be123c" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
    );
};

const RosePetals = () => {
    const [petals, setPetals] = useState([]);

    useEffect(() => {
        // Generate 30 rose petals with random positions and timing
        const petalArray = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            startX: Math.random() * window.innerWidth,
            delay: Math.random() * 10, // Stagger start times
            duration: 8 + Math.random() * 4, // 8-12 seconds fall time
        }));
        setPetals(petalArray);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
            {petals.map((petal) => (
                <RosePetal
                    key={petal.id}
                    delay={petal.delay}
                    startX={petal.startX}
                    duration={petal.duration}
                />
            ))}
        </div>
    );
};

export default RosePetals;
