'use client';
import s from './tooltip.module.scss';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface iProps {
    children: React.ReactNode;
    tooltipText: string;
}

const Tooltip = ({ children, tooltipText }: iProps) => {
    const { data: session } = useSession();
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => !session ? setShowTooltip(true) : null;
    const handleMouseLeave = () => setShowTooltip(false);

    return (
        <div className={s.tooltip_wrapper}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            {children}

            {showTooltip ? (
                <div className={s.tooltip}>
                    <span>{tooltipText}</span>
                    <span className={s.arrow}></span>
                </div>
            ) : null}
        </div>
    )
}

export default Tooltip