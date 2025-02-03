import Hero from "@/components/Hero";

export default function Home() {
  const gridStyle = "grid grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-32 px-4 lg:px-16 my-16 gap-y-8 lg:gap-y-16";

  const features = [
    {
      title: "Explore Challenges",
      description: "Participate in exciting CTF challenges and improve your skills.",
      image: "/images/explore.png",
    },
    {
      title: "Join the Community",
      description: "Become a part of a growing network of like-minded individuals.",
      image: "/images/community.png",
    },
    {
      title: "Develop Your Expertise",
      description: "Contribute to projects and enhance your technical proficiency.",
      image: "/images/develop.png",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="pt-20 lg:pt-32 w-full max-w-7xl mx-auto px-4">
        <Hero bgImage="/backgrounds/home.png" title="Singapore's Largest CTF team" />
      </div>

      {/* About */}
      <section className="px-6 lg:px-32 flex flex-col lg:flex-row items-center lg:justify-between gap-16 lg:gap-8 mb-16">
        {/* About Section */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">About</h2>
          <p className="text-lg lg:text-xl mb-6">
            SSM is a <strong>merger team</strong> with players from many CTF teams <strong>across Singapore</strong> with a goal to support and provide
            opportunities for students that are interested in cybersecurity, to <strong>network</strong> and share
            knowledge with one another.
          </p>
        </div>
        {/* About Image */}
        <div className="lg:w-1/2">
          <img
            src="/images/about1.png"
            alt="About Us"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 lg:px-32 flex flex-col-reverse lg:flex-row items-center lg:justify-between gap-16 lg:gap-8 mb-16">
        {/* Mission Image */}
        <div className="lg:w-1/2">
          <img
            src="/images/about2.png"
            alt="Our Mission"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
        {/* Mission Section */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg lg:text-xl mb-6">
            We learn from each other under an informal setting and we welcome new and <strong>passionate</strong> people into the team!
          </p>
        </div>
      </section>

      {/* Active Players */}
      <section className="px-6 lg:px-32 flex flex-col lg:flex-row items-center lg:justify-between gap-16 lg:gap-8 mb-16">
        {/* Active Players Section */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Active CTF Players</h2>
          <p className="text-lg lg:text-xl mb-6">
          We compete in CTFs <strong>almost every weekend</strong>, motivating each other to compete internationally. Some
          of us <strong>organize local CTFs</strong>, and we strengthen our team through regular bonding sessions.
          </p>
        </div>
        {/* Active Players Image */}
        <div className="lg:w-1/2">
          <img
            src="/images/players.png"
            alt="Active Players"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Accomplishments */}
      <section className="px-6 lg:px-32 text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold mb-12">Our Accomplishments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold mb-2">100</div>
            <p className="text-lg">Members</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold mb-2">50</div>
            <p className="text-lg">CTFs Played</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold mb-2">10</div>
            <p className="text-lg">Top Placings Obtained</p>
          </div>
        </div>
        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <img src="/images/accomplishment1.png" alt="Accomplishment 1" className="rounded-lg shadow-md" />
          <img src="/images/accomplishment2.png" alt="Accomplishment 2" className="rounded-lg shadow-md" />
          <img src="/images/accomplishment3.png" alt="Accomplishment 3" className="rounded-lg shadow-md" />
        </div>
      </section>


      {/* Call to Action */}
      <div className="flex items-center justify-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">Interested? Join Us!</h2>
      </div>
      <section className="px-6 lg:px-32 flex flex-col-reverse lg:flex-row items-center lg:justify-between gap-16 lg:gap-8 mb-16">
        {/* Call to Action Image */}
        <div className="lg:w-1/2">
          <img
            src="/images/about2.png"
            alt="Our Mission"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
        {/* Call to Action Section */}
        <div className="text-center lg:text-left lg:w-1/2 pb-10">
            <p className="text-lg lg:text-xl mb-8">
                Whether you're just starting out or already a seasoned pro, there's a place for you here.
            </p>
            <a
                href="#"
                className="bg-[#1E3D49] text-white py-3 px-6 text-lg rounded-lg hover:bg-[#284250] transition">
                Join Us
            </a>
        </div>
      </section>
    </div>
  );
}