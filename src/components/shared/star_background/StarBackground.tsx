"use client"
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";


export const GlowingStarsBackgroundCard = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {

    return (
        <div
            className={cn(
                "h-[auto] w-[100%] absolute ",
                className
            )}
        >
            <div className="">
                <Illustration />
            </div>
            <div className="">{children}</div>
        </div>
    );
};

export const Illustration = () => {
    const stars = 408;
    const columns = 15;

    const [glowingStars, setGlowingStars] = useState<number[]>([]);

    const highlightedStars = useRef<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            highlightedStars.current = Array.from({ length: 120 }, () => //
                Math.floor(Math.random() * stars)
            );
            setGlowingStars([...highlightedStars.current]);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="h-full w-full absolute z-0 top-0 left-0"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `1px`,
            }}
        >
            {[...Array(stars)].map((_, starIdx) => {
                const isGlowing = glowingStars.includes(starIdx);
                const delay = (starIdx % 10) * 0.1;
                const staticDelay = starIdx * 0.01;
                return (
                    <div
                        key={`matrix-col-${starIdx}}`}
                        className="flex items-center justify-center"
                    >
                        <Star

                            isGlowing={isGlowing}
                            delay={staticDelay}

                        />

                        <AnimatePresence mode="wait">
                            {isGlowing && <Glow delay={delay} />}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
    return (
        <motion.div
            key={delay}
            initial={{
                scale: 2,
            }}
            animate={{
                scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
                background: isGlowing ? "#fff" : "#666",
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: delay,
            }}
            className={cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")}
        ></motion.div>
    );
};

const Glow = ({ delay }: { delay: number }) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 2,
                ease: "easeInOut",
                delay: delay,
            }}
            exit={{
                opacity: 0,
            }}
            className="absolute  left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400"
        />
    );
};


