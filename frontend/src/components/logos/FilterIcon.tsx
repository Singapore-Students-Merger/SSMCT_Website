import React from "react";


interface LogoProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
}

const FilterIcon = React.forwardRef<SVGSVGElement, LogoProps>(({ className, fill, ...props }, ref) => {
    const color = fill || "#BAEAFF";
    return (
        <svg {...props} ref = {ref} className = {className} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.83017 6H15.1702C18.4902 6 19.8402 8.35 18.1902 11.22L17.4502 12.5C17.2702 12.81 16.9402 13 16.5802 13H8.42017C8.06017 13 7.73017 12.81 7.55017 12.5L6.81017 11.22C5.16017 8.35 6.51017 6 9.83017 6Z" fill={color}/>
        <path d="M9.29006 14H15.7201C16.1101 14 16.3501 14.42 16.1501 14.75L15.5101 15.85C13.8601 18.72 11.1401 18.72 9.49006 15.85L8.85006 14.75C8.66006 14.42 8.90006 14 9.29006 14Z" fill={color}/>
        </svg>


    );
});

FilterIcon.displayName = "Filter";
export default FilterIcon;