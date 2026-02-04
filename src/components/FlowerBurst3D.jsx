import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls, Stars } from '@react-three/drei';

// Advanced Particle Component
function MagicalParticle({ index, initialPosition }) {
    const mesh = useRef();
    const time = useRef(Math.random() * 100);
    const factor = useRef(Math.random() * 0.5 + 0.5);
    const speed = useRef(Math.random() * 0.002 + 0.001);
    const offset = useRef(Math.random() * Math.PI * 2);
    const color = useMemo(() => {
        const colors = ['#FDA4AF', '#F43F5E', '#8B5CF6', '#FBCFE8'];
        return colors[Math.floor(Math.random() * colors.length)];
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;
        const t = state.clock.getElapsedTime() * factor.current + offset.current;

        // Spiral motion
        mesh.current.position.y += speed.current * 2;
        mesh.current.position.x = initialPosition[0] + Math.cos(t * 0.5) * (Math.sin(t * 0.1) * 2 + 0.5);
        mesh.current.position.z = initialPosition[1] + Math.sin(t * 0.5) * (Math.sin(t * 0.1) * 2 + 0.5);

        // Rotation
        mesh.current.rotation.x += 0.01;
        mesh.current.rotation.y += 0.02;

        // Opacity fade
        /* Simple material props update here is costly in loop, but okay for moderate counts */
    });

    return (
        <mesh ref={mesh} position={[initialPosition[0], -5, initialPosition[1]]} rotation={[Math.random(), Math.random(), 0]}>
            <planeGeometry args={[0.2, 0.2]} />
            <meshStandardMaterial
                color={color}
                transparent
                opacity={0.8}
                side={THREE.DoubleSide}
                emissive={color}
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

// Scene setup
function Scene() {
    const particles = useMemo(() => {
        return new Array(200).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 10,
            z: (Math.random() - 0.5) * 10,
        }));
    }, []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#FDA4AF" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {particles.map((pos, i) => (
                <MagicalParticle key={i} index={i} initialPosition={[pos.x, pos.z]} />
            ))}
        </>
    );
}

const FlowerBurst3D = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 pointer-events-none"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent" />

            <Canvas camera={{ position: [0, 2, 8], fov: 60 }} dpr={[1, 2]}>
                {/* <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} /> */}
                <Scene />
            </Canvas>

            {/* Cinematic Text Overlay */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <div className="text-center">
                    <h2 className="text-5xl md:text-7xl font-playfair font-bold text-white drop-shadow-[0_0_15px_rgba(244,63,94,0.8)] mb-4 tracking-tighter">
                        Trân trọng<br />từng khoảnh khắc
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto" />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FlowerBurst3D;
