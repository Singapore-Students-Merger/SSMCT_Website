import { twMerge } from "tailwind-merge";
/**
 * GradientBgProps defines the properties for a gradient background component.
 */
interface GradientBgProps {
    className?: string;

    /**
     * Specifies the position of the light portion of the gradient:
     * - 'x-center': Light portion is centered horizontally.
     * - 'y-center': Light portion is centered vertically.
     * - 'center': Light portion is centered and spreads in all directions.
     * - 'top': Light portion is positioned at the top.
     * - 'bottom': Light portion is positioned at the bottom.
     * - 'left': Light portion is positioned on the left.
     * - 'right': Light portion is positioned on the right.
     */
    gradientPosition?: 
        | 'x-center'
        | 'y-center'
        | 'center'
        | 'top'
        | 'bottom'
        | 'left'
        | 'right';
    children?: React.ReactNode;
}

const GradientBg: React.FC<GradientBgProps> = ({ className, gradientPosition = 'center', children }) => {
    const gradientClass = gradientPosition === 'x-center' ? 'bg-gradient-to-r from-background via-secondary-tier3/80 to-background' :
        gradientPosition === 'y-center' ? 'bg-gradient-to-b from-background via-secondary-tier3/80 to-background' :
        gradientPosition === 'center' ? 'bg-radient-ellipse-c from-secondary-tier3/80 from-30% to-background to-100%' :
        gradientPosition === 'top' ? 'bg-gradient-to-t from-secondary-tier3/80 to-background' :
        gradientPosition === 'bottom' ? 'bg-gradient-to-b from-secondary-tier3/80 to-background' :
        gradientPosition === 'left' ? 'bg-gradient-to-l from-secondary-tier3/80 to-background' :
        gradientPosition === 'right' ? 'bg-gradient-to-r from-secondary-tier3/80 to-background' : '';

    return (
        <div className={twMerge('w-full h-full ', gradientClass, className)} >
            {children}
        </div>
    );
}

export default GradientBg;