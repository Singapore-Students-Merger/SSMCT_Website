import React from "react";


interface LogoProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
}

const TickIcon = React.forwardRef<SVGSVGElement, LogoProps>(({ className, fill, ...props }, ref) => {
    const color = fill || "#10a64a";
    return (
        <svg className={className} ref={ref} {...props} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 101.6">
            <path fill={color} d="M4.67,67.27c-14.45-15.53,7.77-38.7,23.81-24C34.13,48.4,42.32,55.9,48,61L93.69,5.3c15.33-15.86,39.53,7.42,24.4,23.36L61.14,96.29a17,17,0,0,1-12.31,5.31h-.2a16.24,16.24,0,0,1-11-4.26c-9.49-8.8-23.09-21.71-32.91-30v0Z" />
        </svg>
    );
});

TickIcon.displayName = "Tick";
export default TickIcon;