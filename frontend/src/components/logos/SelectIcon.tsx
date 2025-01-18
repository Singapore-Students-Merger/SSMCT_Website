import React from "react";


interface LogoProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
}

const SelectIcon = React.forwardRef<SVGSVGElement, LogoProps>(({ className, fill, ...props }, ref) => {
    const color = fill || "#BAEAFF";
    return (
        <svg className={className} ref = {ref} {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="#BAEAFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color = {color}/>
        </svg>
    );
});

SelectIcon.displayName = "Search";
export default SelectIcon;