import Image from "next/image";

interface AchievementCardProps {
  title: string;
  points: number;
  participants: string[];
  icon: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, points, participants, icon }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <Image src={icon} alt="OSCTF Icon" width={100} height={100} className="mx-auto" />
      <h2 className="text-center text-xl font-bold mt-4">{title}</h2>
      <p className="text-center text-lg mt-2">Points: {points}</p>
      <div className="mt-4">
        {participants.map((participant, index) => (
          <p key={index} className="text-center">
            {participant}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AchievementCard;
