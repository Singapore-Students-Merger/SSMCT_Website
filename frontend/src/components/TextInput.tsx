import { twMerge } from 'tailwind-merge';

interface TextInputProps {
    placeholder?: string;
    onInput?: () => void;
    beforeIcon?: React.ReactNode;
    afterIcon?: React.ReactNode;
    className?: string;
    version?: 'primary' | 'secondary';
    shadow?: boolean;
    border?: boolean;
}
// Button component
// This component is a button that can have an icon before and after the text.
// It has a primary and secondary version. The secondary version is the one used for tags in the create post and view post pages.

const TextInput: React.FC<TextInputProps> = ({
    placeholder,
    onInput,
    beforeIcon,
    afterIcon,
    className,
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
        <div className={twMerge(baseClass, versionClass,borderClass, className)}>
            {beforeIcon && <span className="mr-2">{beforeIcon}</span>}
            <input
                className='bg-transparent w-full'
                onInput={onInput}
                placeholder={placeholder}
                type="text"
            ></input>
            {afterIcon && <span className="ml-2">{afterIcon}</span>}
        </div>
                    
    );
};

export default TextInput;
