import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/contexts/AudioProvider';
import { lyrics, lastLineDuration } from '@/data/lyrics';

const LyricCinematic = () => {
    const { showLyrics, currentTime, isPlaying } = useAudio();
    const [activeIndex, setActiveIndex] = useState(-1);

    // Calculate active line based on currentTime
    useEffect(() => {
        if (!isPlaying) return;

        // Find the active lyric line
        let newIndex = -1;
        for (let i = 0; i < lyrics.length; i++) {
            const currentLine = lyrics[i];
            const nextLine = lyrics[i + 1];

            if (nextLine) {
                // Check if current time is within this line's range
                if (currentTime >= currentLine.t && currentTime < nextLine.t) {
                    newIndex = i;
                    break;
                }
            } else {
                // Last line: check if within last line + lastLineDuration
                if (currentTime >= currentLine.t && currentTime < currentLine.t + lastLineDuration) {
                    newIndex = i;
                    break;
                }
            }
        }

        // Only update if index changed (optimization)
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    }, [currentTime, isPlaying, activeIndex]);

    // Don't render if lyrics are hidden or no active line
    if (!showLyrics || activeIndex === -1) {
        return null;
    }

    const currentLyric = lyrics[activeIndex];

    // Calculate animation duration for this line
    const nextLine = lyrics[activeIndex + 1];
    const lineDuration = nextLine
        ? (nextLine.t - currentLyric.t)
        : lastLineDuration;

    // Animation variants for cinematic effect
    const variants = {
        enter: {
            opacity: 0,
            filter: 'blur(8px)',
            y: 8,
        },
        center: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
        },
        exit: {
            opacity: 0,
            filter: 'blur(4px)',
            y: -6,
        },
    };

    // Calculate transition timing based on line duration
    const fadeInDuration = lineDuration * 0.25;  // 0-25% (slower fade in)
    const fadeOutDuration = lineDuration * 0.20; // 80-100%

    return (
        <div className="fixed inset-x-0 bottom-[12%] md:bottom-[15%] z-40 pointer-events-none flex justify-center px-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        enter: {
                            duration: fadeInDuration,
                            ease: "easeOut",
                        },
                        exit: {
                            duration: fadeOutDuration,
                            ease: "easeIn",
                        },
                    }}
                    className="relative"
                >
                    {/* Lyric text only - no background */}
                    <p className="text-white/75 text-center font-playfair tracking-wide text-lg md:text-2xl leading-relaxed drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)] font-medium italic px-8">
                        {currentLyric.text}
                    </p>

                    {/* Subtle glow effect */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-rose-500/5 to-indigo-500/5 rounded-full blur-2xl -z-10" />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LyricCinematic;
