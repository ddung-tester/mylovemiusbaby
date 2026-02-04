import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Clock, Image, Award, Music } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhotoWall from '../components/PhotoWall';
import ParticleBackground from '../components/ParticleBackground';
import RosePetals from '../components/RosePetals';
import { memories, stories, galleryOrder } from '../data/memories';

const TimelineView = ({ memories }) => (
    <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="relative border-l-2 border-white/20 ml-4 md:ml-10 space-y-16">
            {memories.map((memory, index) => (
                <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative pl-8 md:pl-16"
                >
                    {/* Dot */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-rose-500 border-4 border-zinc-900 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />

                    <div className="flex flex-col md:flex-row gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
                        <div className="md:w-1/3 shrink-0">
                            <img
                                src={memory.src}
                                alt={memory.title}
                                className="w-full h-48 object-cover rounded-lg shadow-lg"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex-1 space-y-3">
                            <h3 className="text-2xl font-playfair font-bold text-white">{memory.title}</h3>
                            <p className="text-white/70 leading-relaxed">{memory.caption}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

const Memories = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Sắp xếp lại ảnh theo galleryOrder cho Gallery view
    const galleryMemories = galleryOrder.map(id => memories.find(m => m.id === id)).filter(Boolean);

    return (
        <div ref={containerRef} className="min-h-screen relative bg-zinc-950 text-white overflow-hidden pb-20">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-zinc-900 to-zinc-950" />
                <ParticleBackground />
                <div className="vignette" opacity={0.6} />
            </div>

            {/* Rose Petals Effect */}
            <RosePetals />

            <div className="relative z-10">
                {/* Header */}
                <header className="relative pt-20 pb-12 text-center space-y-4 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="inline-block"
                    >
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 p-[2px] mb-6 shadow-2xl shadow-rose-500/30">
                            <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center backdrop-blur-sm">
                                <Heart className="w-8 h-8 text-rose-400 fill-rose-500/50 animate-pulse" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-rose-100 to-white/70 tracking-widest italic"
                    >
                        Hành Trình Yêu
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-rose-200/60 font-light italic max-w-2xl mx-auto"
                    >
                        "Mỗi khoảnh khắc bên em đều là một thước phim đẹp nhất đời anh."
                    </motion.p>
                </header>

                {/* Content Tabs */}
                <div className="max-w-7xl mx-auto px-4 mt-8">
                    <Tabs defaultValue="gallery" className="w-full">
                        <div className="flex justify-center mb-12">
                            <TabsList className="bg-white/5 border border-white/10 p-1 backdrop-blur-md">
                                <TabsTrigger value="gallery" className="gap-2 px-6">
                                    <Image className="w-4 h-4" /> Gallery
                                </TabsTrigger>
                                <TabsTrigger value="timeline" className="gap-2 px-6">
                                    <Clock className="w-4 h-4" /> Timeline
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="gallery" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <PhotoWall memories={galleryMemories} />
                        </TabsContent>

                        <TabsContent value="timeline" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <TimelineView memories={memories} />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Bottom Quote Section */}
                <div className="max-w-4xl mx-auto mt-32 text-center px-6 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/20 rounded-full blur-[100px] pointer-events-none" />
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative z-10 space-y-6"
                    >
                        <Heart className="w-12 h-12 text-rose-500 mx-auto" />
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold leading-tight">
                            "Và câu chuyện này<br />sẽ còn viết tiếp..."
                        </h2>
                        <div className="flex items-center justify-center gap-3 text-white/50 text-sm mt-8">
                            <Music className="w-4 h-4" />
                            <span>Designed with love for Miusbaby</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Memories;
