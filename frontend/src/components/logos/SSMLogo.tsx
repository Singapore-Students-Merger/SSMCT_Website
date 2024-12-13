import Image from "next/image";

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <Image
            src="/assets/logo.svg"
            alt="Logo"
            width="335"
            height="366"
            className={className}
        />
    );
};

export default Logo;