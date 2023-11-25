'use client';
import s from './tooltip.module.scss';
import { useState } from 'react';

interface iProps {
    children: React.ReactNode;
    tooltipText: string;
}

const Tooltip = ({ children, tooltipText }: iProps) => {
    const [showTooltip, setShowTooltip] = useState(false);

    // let timeoutId: NodeJS.Timeout;
    // useEffect(() => {
    //     return () => {
    //         clearTimeout(timeoutId);
    //     };
    // }, []);
    // show tooltip after 1s, when mouse leaves - clear timeout using specific identifier 'timeoutId'
    // const handleMouseEnter = () => timeoutId = setTimeout(() => setShowTooltip(true), 1000);
    // const handleMouseLeave = () => {
    //     clearTimeout(timeoutId);
    //     setShowTooltip(false);
    // };
    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);


    return (
        <div className={s.tooltip_wrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            {children}
            {showTooltip ? (
                <div className={s.tooltip}>
                    <p>{tooltipText}</p>
                    <span className={s.arrow}></span>
                </div>
            ) : null}
        </div>
    )
}

export default Tooltip
