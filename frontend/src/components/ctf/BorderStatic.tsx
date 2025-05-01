import React from 'react';
import { twMerge } from 'tailwind-merge'; 

interface BorderStaticProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const BorderStatic: React.FC<BorderStaticProps> = ({ children, className, ...props }) => {
    return (
        <div style={{ border: '1px solid white' }} className={twMerge(className,"border-4")} {...props}>
            {children}
        </div>
    );
};

export default BorderStatic;
