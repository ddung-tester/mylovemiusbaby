import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioProvider';
import { toast } from '@/hooks/use-toast';

const Gate = ({ onUnlock }) => {
    const [answer, setAnswer] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [error, setError] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [isShake, setIsShake] = useState(false);

    // Audio context
    const { start } = useAudio();

    // Đáp án chính xác
    const correctAnswer = 'tam đảo';

    const normalizeText = (text) => text.trim().toLowerCase().replace(/\s+/g, ' ');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const normalized = normalizeText(answer);

        if (normalized === correctAnswer) {
            setIsCorrect(true);
            setError('');

            // Start music with fade-in
            const result = await start();

            // Handle autoplay block
            if (!result.success) {
                toast({
                    title: "🎵 Nhạc nền",
                    description: "Nhấn Play ở góc phải dưới để bật nhạc nhé!",
                    duration: 5000,
                });
            }

            setTimeout(() => onUnlock(), 1500);
        } else {
            setAttempts(prev => prev + 1);
            setIsShake(true);
            setTimeout(() => setIsShake(false), 500);

            const hints = [
                'Ưm... chưa đúng rồi bé ơi 🤔',
                'Suy nghĩ kỹ lại xem nào, nơi mình đi chơi xa á!',
                'Gợi ý nè: Nơi đó có mây mù sương khói... 🌫️',
                'Vẫn chưa ra hả? Là thị trấn mờ sương đó! 💝'
            ];

            setError(hints[Math.min(attempts, hints.length - 1)]);
            setAnswer('');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-aurora" />
            <div className="absolute inset-0 bg-black/15 z-0" />
            <ParticleBackground />
            <div className="vignette" />

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20 w-full max-w-md px-6"
            >
                <Card className="border-white/40 bg-white/30 backdrop-blur-2xl shadow-2xl overflow-hidden relative">
                    {/* Decorative Elements */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="p-8 md:p-10 flex flex-col items-center text-center">
                        {/* Animated Icon */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                                filter: ["drop-shadow(0 0 0px #f43f5e)", "drop-shadow(0 0 10px #f43f5e)", "drop-shadow(0 0 0px #f43f5e)"]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="mb-8 relative"
                        >
                            <Heart className="w-16 h-16 text-rose-500 fill-rose-500/50" />
                            <Sparkles className="w-6 h-6 text-amber-500 absolute -top-2 -right-3 animate-pulse" />
                        </motion.div>

                        {/* Typography */}
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-3 tracking-tight text-rose-950 drop-shadow-sm">
                            Xin chào
                        </h1>
                        <p className="text-rose-700 text-lg mb-8 font-light tracking-wide">
                            Miusbaby 💖
                        </p>

                        {/* Success State */}
                        <AnimatePresence>
                            {isCorrect ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-4"
                                >
                                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600 animate-pulse">
                                        Chính xác rồi!
                                    </p>
                                    <p className="text-rose-800">Đợi anh một chút nhé...</p>
                                </motion.div>
                            ) : (
                                /* Form State */
                                <motion.form
                                    animate={isShake ? { x: [-10, 10, -10, 10, 0] } : {}}
                                    transition={{ duration: 0.4 }}
                                    onSubmit={handleSubmit}
                                    className="w-full space-y-5"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-playfair font-medium text-rose-900/90 tracking-wide italic">
                                            Nơi chúng ta có nhiều kỷ niệm nhất?
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                value={answer}
                                                onChange={(e) => setAnswer(e.target.value)}
                                                placeholder="Nhập câu trả lời..."
                                                className="bg-white/50 border-rose-200/50 text-rose-900 placeholder:text-rose-400 focus:border-rose-400 focus:ring-rose-400/20"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    <div className="h-6">
                                        <AnimatePresence mode="wait">
                                            {error && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="text-sm text-rose-600 font-medium"
                                                >
                                                    {error}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <Button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-rose-500 to-indigo-600 hover:opacity-90 transition-opacity border-0 text-white shadow-rose-500/20"
                                            disabled={!answer.trim()}
                                        >
                                            <span className="mr-2">Trả lời</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="border-rose-200 bg-white/50 hover:bg-white text-rose-500"
                                            onClick={() => setShowHint(!showHint)}
                                        >
                                            <HelpCircle className="w-5 h-5" />
                                        </Button>
                                    </div>

                                    {/* Hint Content */}
                                    <AnimatePresence>
                                        {showHint && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-white/40 rounded-lg p-3 text-sm text-rose-800 border border-rose-100 mt-2">
                                                    💡 Gợi ý: Đó là nơi có núi, có mây... 🏔️
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </Card>
            </motion.div>

            {/* Floating Background Hearts */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-rose-500/10 pointer-events-none z-10"
                    initial={{
                        x: Math.random() * 100 + "vw",
                        y: "110vh",
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: "-10vh",
                        x: `calc(${Math.random() * 100}vw + ${Math.random() * 200 - 100}px)`,
                        rotate: 360,
                    }}
                    transition={{
                        duration: Math.random() * 20 + 15,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear",
                    }}
                >
                    <Heart size={Math.random() * 100 + 50} fill="currentColor" />
                </motion.div>
            ))}
        </div>
    );
};

export default Gate;
