import React from "react";


interface LogoProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
}

const AddIcon = React.forwardRef<SVGSVGElement, LogoProps>(({ className, fill, ...props }, ref) => {
    const color = fill || "#BAEAFF";
    return (
        <svg className = {className} {...props} ref = {ref} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14 10.75H10.75V14C10.75 14.41 10.41 14.75 10 14.75C9.59 14.75 9.25 14.41 9.25 14V10.75H6C5.59 10.75 5.25 10.41 5.25 10C5.25 9.59 5.59 9.25 6 9.25H9.25V6C9.25 5.59 9.59 5.25 10 5.25C10.41 5.25 10.75 5.59 10.75 6V9.25H14C14.41 9.25 14.75 9.59 14.75 10C14.75 10.41 14.41 10.75 14 10.75Z" fill={color}/>
        </svg>
    );
});

AddIcon.displayName = "Add";
export default AddIcon;