import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Heart, Calendar, X } from 'lucide-react';
import { cn } from "@/lib/utils"

const PhotoWall = ({ memories }) => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {memories.map((memory, index) => (
                <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="break-inside-avoid relative group"
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <div
                                className="relative overflow-hidden rounded-2xl cursor-pointer bg-white/5 border border-white/10 shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-rose-500/20"
                                onClick={() => setSelectedId(memory.id)}
                            >
                                {/* Image */}
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <img
                                        src={memory.src}
                                        alt={memory.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Text Reveal */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                        <h3 className="text-white font-playfair text-xl italic leading-tight">
                                            {memory.title}
                                        </h3>
                                    </div>

                                    {/* Heart Icon */}
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100">
                                        <Heart className="w-4 h-4 text-white fill-current" />
                                    </div>
                                </div>
                            </div>
                        </DialogTrigger>

                        {/* Expanded Content (Modal) */}
                        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] md:h-auto border-none bg-transparent shadow-none p-0 overflow-hidden flex flex-col md:flex-row gap-0">
                            <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                                <img
                                    src={memory.src}
                                    alt={memory.title}
                                    className="max-w-full max-h-[50vh] md:max-h-[85vh] object-contain shadow-2xl"
                                />
                                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
                            </div>

                            <div className="w-full md:w-[400px] bg-zinc-950/90 backdrop-blur-xl md:h-[85vh] p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none text-white relative">

                                <div className="space-y-6">

                                    <h2 className="text-4xl md:text-5xl font-playfair font-bold leading-tight">
                                        {memory.title}
                                    </h2>

                                    <div className="w-20 h-1 bg-gradient-to-r from-rose-500 to-indigo-500 rounded-full" />

                                    <p className="text-lg text-white/80 font-light leading-relaxed">
                                        {memory.caption}
                                    </p>

                                    <button className="flex items-center gap-2 text-sm text-rose-300 hover:text-rose-200 transition-colors mt-8 group">
                                        <Heart className="w-4 h-4 group-hover:fill-current transition-all" />
                                        Thêm vào yêu thích
                                    </button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </motion.div>
            ))}
        </div>
    );
};

export default PhotoWall;
