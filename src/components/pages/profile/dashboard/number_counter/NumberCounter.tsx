'use client'
import React, { useEffect, useRef } from 'react';
import s from './number_counter.module.scss';


const NumberCounter = ({ count = 99 }: { count: number }) => {
    const duration = 2000; // Duration in ms
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        let start: number;
        let current: number = 0;

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            current = customEasing(progress, 0, count, duration);
            if (element) {
                element.textContent = Math.floor(current).toString();
            }
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                if (element) {
                    element.textContent = count.toString();
                }
            }
        };

        requestAnimationFrame(animate);
    }, [count, duration]);

    const customEasing = (t: number, b: number, c: number, d: number) => {
        t /= d;
        return c * (1 - Math.pow(1 - t, 3)) + b; // Using a custom easing function for variable speed
    };

    return <span ref={elementRef} className={s.number_counter} />;
};

export default NumberCounter;
