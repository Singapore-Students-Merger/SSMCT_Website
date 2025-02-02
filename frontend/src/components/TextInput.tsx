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
    label?: string;
    value?: string;
    name?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    onClick?: () => void;
}
// Button component
// This component is a button that can have an icon before and after the text.
// It has a primary and secondary version. The secondary version is the one used for tags in the create post and view post pages.

const TextInput: React.FC<TextInputProps> = ({
    value,
    placeholder,
    onInput,
    beforeIcon,
    afterIcon,
    className,
    version = 'primary',
    shadow = true,
    label,
    name,
    required = false,
    onChange,
    onBlur,
    onFocus,
    disabled = false,
    onClick
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
        min-w-72
    `;

    const versionClass = version === 'primary' 
        ? 'bg-secondary-tier1/50' 
        : 'bg-secondary-tier3';
    
    const borderClass = 'border-2 border-secondary-tier2';
    return (
        <div className='flex flex-col gap-2' onClick = {onClick}>
        <div className={twMerge(baseClass, versionClass,borderClass, className)}>
            {beforeIcon && <span className="mr-2">{beforeIcon}</span>}
            <input
                disabled={disabled}
                className='bg-transparent w-full placeholder:text-primary placeholder:font-normal'
                onInput={onInput}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                placeholder={placeholder}
                type="text"
                value={value??''}
                name={name}
                required={required}
            ></input>
            {afterIcon && <span className="ml-2">{afterIcon}</span>}
        </div>
        {label && <label className="text-primary text-lg md:text-md ml-2">{label}</label>}
        </div>      
    );
};

export default TextInput;
