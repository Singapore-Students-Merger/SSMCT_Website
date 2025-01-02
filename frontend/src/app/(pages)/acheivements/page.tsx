import Hero from "../../../components/Hero";
import AchievementCard from "../../../components/AchievementCard";

export default function AchievementsPage() {
  const achievements = [
    {
      title: "1st Place",
      points: 100000,
      participants: ["Chan Si Yu David", "Chan Si Yu David", "Chan Si Yu David"],
      icon: "/backgrounds/home.png",
    },
    {
      title: "1st Place",
      points: 100000,
      participants: ["Chan Si Yu David", "Chan Si Yu David", "Chan Si Yu David"],
      icon: "/backgrounds/home.png",
    },
    {
      title: "1st Place",
      points: 100000,
      participants: ["Chan Si Yu David", "Chan Si Yu David", "Chan Si Yu David"],
      icon: "/backgrounds/home.png",
    },
  ];

  return (
    <div>
      <Hero
        bgImage="/backgrounds/home.png"
        title="Singapore Students Merger"
        subtitle="Our Achievements"
      />
      <div className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">2024</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                title={achievement.title}
                points={achievement.points}
                participants={achievement.participants}
                icon={achievement.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
