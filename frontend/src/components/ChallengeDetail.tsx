import { twMerge } from "tailwind-merge";


interface ChallengeDetailProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
export default function ChallengeDetail({ title, children, icon, className }: ChallengeDetailProps) {
    const isString = typeof children === 'string';
  return (
    <div className={twMerge(`flex flex-col`,className)}>
      <h3 className="text-lg font-bold text-white my-2">{title}</h3>
      <div className="flex gap-4 text-lg text-[#8db7de] font-semibold">
      {icon}
        {isString ? <p>{children}</p> : children}
      </div>
    </div>
  );
}