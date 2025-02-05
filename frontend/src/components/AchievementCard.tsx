import Link from "next/link";
import Image from "next/image";
import getNumberWithOrdinal from "@/utils/getNumberWithOrdinal";

interface AchievementCardProps {
  title: string;
  points: number | null;
  participants: { realName?: string; name: string }[];
  icon: string | null;
  placing: string | null;
  link: string | null;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, points, participants, icon, placing, link }) => {
  const CardContent = (
    <div
      className={`bg-secondary-tier3/75 text-white rounded-lg overflow-hidden
                  shadow-[0px_0px_8px_0px_rgba(91,194,217,0.70)] relative
                  ${link ? "hover:brightness-125 transition duration-500" : ""}`}
    >
      <div className="relative">
        <h2
          className="pb-2 text-3xl text-white absolute text-center bottom-0 z-10 w-full 
                     font-bold mix-blend-difference"
        >
          {title}
        </h2>
        <div className="aspect-video w-full">
          <Image
            src={icon ? icon : "/assets/no_logo.webp"}
            alt={title}
            fill={true}
            objectFit="contain"
          />
        </div>
        <div
          className="bg-black/30  
                     absolute h-full w-full top-0 left-0"
        ></div>
        <div
          className="bg-gradient-to-t from-[#0F1B26] to-50% to-transparent 
                     absolute h-full w-full top-0 left-0"
        ></div>
      </div>
      <div className="my-4 px-4">
        <h3 className="text-center text-2xl font-bold relative">
          {placing && `${getNumberWithOrdinal(Number(placing))} Place`}
          <div className="absolute w-full bottom-0 border-b-2 border-secondary-tier1">
            <div
              className="absolute h-4 left-0 top-1/2 -translate-y-1/2 border-l-2 border-secondary-tier1"
            ></div>
            <div
              className="absolute h-4 right-0 top-1/2 -translate-y-1/2 border-l-2 border-secondary-tier1"
            ></div>
          </div>
        </h3>
        <div className="grid grid-cols-2 items-center mt-4 relative py-4 h-full">
          <div
            className="absolute border-l-2 border-secondary-tier1 h-full left-1/2 -translate-x-1/2"
          ></div>
          <p className="text-left text-lg">
            Points <br />
            <b className="text-3xl">{points}</b>
          </p>
          <div className="flex-col max-h-24 overflow-auto scrollbar-custom gap-2">
            {participants.map((participant, index) => (
              <p
                key={index}
                className="text-right text-xl px-2 overflow-x-clip"
              >
                {participant.realName ?? participant.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return link ? <Link href={link}>{CardContent}</Link> : CardContent;
};

export default AchievementCard;
