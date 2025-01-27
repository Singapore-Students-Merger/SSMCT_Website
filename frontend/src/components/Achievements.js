export default function Achievements() {
    const data = [
      {
        year: 2024,
        achievements: [
          { title: 'OSCTF', position: '1st Place', points: 100000, members: ['Chan Si Yu', 'David'] },
          { title: 'OSCTF', position: '1st Place', points: 100000, members: ['Chan Si Yu', 'David'] },
          { title: 'OSCTF', position: '1st Place', points: 100000, members: ['Chan Si Yu', 'David'] },
        ],
      },
    ];
  
    return (
      <div className="p-10">
        {data.map((item) => (
          <div key={item.year} className="mb-10">
            <h2 className="text-3xl mb-6">{item.year}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {item.achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="bg-gray-700 p-6 rounded-lg shadow-md text-center"
                >
                  <h3 className="text-2xl font-bold">{achievement.title}</h3>
                  <p className="mt-4">{achievement.position}</p>
                  <p className="mt-2 text-sm">{achievement.points} Points</p>
                  <p className="mt-2 text-sm">
                    Members: {achievement.members.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  