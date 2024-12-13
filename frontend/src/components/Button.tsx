import { twMerge } from 'tailwind-merge';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    beforeIcon?: React.ReactNode;
    afterIcon?: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    version?: 'primary' | 'secondary';
    shadow?: boolean;
    border?: boolean;
}
// Button component
// This component is a button that can have an icon before and after the text.
// It has a primary and secondary version. The secondary version is the one used for tags in the create post and view post pages.

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    beforeIcon,
    afterIcon,
    className,
    type = 'button',
    version = 'primary',
    shadow = true
}) => {
    const baseClass = `
        text-primary
        ${shadow?'shadow-[0_0_2px_0_var(--tw-shadow-color)] shadow-primary/50':''}
        rounded-full
        px-4 py-2
        font-semibold
        hover:brightness-90 
        transition
        duration-200
        flex items-center justify-center
        text-lg
        focus:outline-none
        focus:ring-2
        focus:ring-primary
        flex 
        justify-between
    `;

    const versionClass = version === 'primary' 
        ? 'bg-secondary-tier3' 
        : 'bg-secondary-tier1/50';
    
    const borderClass = 'border-2 border-secondary-tier2';
    return (
        <button
            className={twMerge(baseClass, versionClass,borderClass, className)}
            onClick={onClick}
            type={type}
        >
            {beforeIcon && <span className="mr-2">{beforeIcon}</span>}
            <div className='grow'>
                {children}
            </div>
            {afterIcon && <span className="ml-2">{afterIcon}</span>}
        </button>
    );
};

export default Button;
