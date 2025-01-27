"use client"
import { twMerge } from "tailwind-merge";
interface ChipProps {
    className?: string;
    children?: React.ReactNode;
    beforeIcon?: React.ReactNode;
    afterIcon?: React.ReactNode;
    onClick?: () => void;
    beforeIconClickHandler?: () => void;
    afterIconClickHandler?: () => void;
}

const Chip: React.FC<ChipProps> = ({ className, children, beforeIcon, afterIcon, onClick, beforeIconClickHandler, afterIconClickHandler }) => {
    
    return (
        <div onClick={onClick} className={twMerge(`bg-tertiary text-primary w-fit text-lg px-4 py-2 rounded-full`,className)}>
            {beforeIcon && <div onClick={beforeIconClickHandler}>{beforeIcon}</div>}
            <div>{children}</div>
            {afterIcon && <div onClick={afterIconClickHandler}>{afterIcon}</div>}
        </div>
    );
}

export default Chip;