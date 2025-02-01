import Hero from "../../../components/Hero";
import AchievementCard from "../../../components/AchievementCard";
import { getAllCtfs } from "@/utils/getAllCtfs";

export const dynamic = "force-dynamic"
export default async function AchievementsPage() {
  const achievements = await getAllCtfs();

  return (
    <div>
      <Hero
        bgImage="/backgrounds/acheivements.jpg"
        bgImageMobile="/backgrounds/acheivements_mobile.jpg"
        title="Our Achievements"
      />
      <div className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <section className="mb-12">
            <h2 className="text-5xl font-bold text-white mb-6">2025</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(achievements['2025']??[]).map((achievement, index) => (
                <AchievementCard
                  key={index}
                  title={achievement.title}
                  points={achievement.points}
                  participants={achievement.members}
                  icon={achievement.logo ?? "/assets/no_logo.webp"}
                  placing={achievement.placing}
                  link={achievement.link}
                />
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-5xl font-bold text-white mb-6">2024</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements['2024'].map((achievement, index) => (
                <AchievementCard
                  key={index}
                  title={achievement.title}
                  points={achievement.points}
                  participants={achievement.members}
                  icon={achievement.logo ?? "/assets/no_logo.webp"}
                  placing={achievement.placing}
                  link={achievement.link}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
