"use client";

import { useInView } from "react-intersection-observer";
import Hero from "@/components/Hero";
import Image from "next/image";
import "@/app/styles/home.css";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import Button from "@/components/Button";
import React from "react";
import GradientBg from "@/components/GradientBg";
const sectionClasses = "px-6 lg:px-32 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-16 lg:gap-32 mb-8 lg:mb-16 py-8 lg:py-16";
const imageClasses = "rounded-2xl shadow-md w-full object-cover !top-1/2 -translate-y-1/2 shadow-secondary-tier1 border-2 border-secondary-tier3";

export default function Home() {

  const sections = [
    {
      title: "About",
      text: <>
      SSM is a <strong>merger team</strong> with players from many CTF teams <strong>across Singapore</strong> with a goal to support and provide opportunities for students that are interested in cybersecurity, to <strong>network</strong> and share knowledge with one another.
      </>,
      imgSrc: "/assets/home/about1.png",
      imgAlt: "About Us",
    },
    {
      title: "Our Mission",
      text: <>We learn from each other under an informal setting and we welcome new and <strong>passionate</strong> people into the team!</>,
      imgSrc: "/assets/home/about2.png",
      imgAlt: "Our Mission",
    },
    {
      title: "Active CTF Players",
      text: <>We compete in CTFs <strong>almost every weekend</strong>, motivating each other to compete internationally. Some
          of us <strong>organize local CTFs</strong>, and we strengthen our team through regular bonding sessions.</>,
      imgSrc: "/assets/home/about3.png",
      imgAlt: "Active Players",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero bgImage="/backgrounds/home.png" title="Singapore's Largest CTF team" className="h-screen" />
      <GradientBg gradientPosition="y-center">
      {sections.map((section, index) => {
        return <Section key={index} section={section} left = {index%2==0}/>
      })}
      </GradientBg>
      <GradientBg gradientPosition="center">
      {/* Accomplishments */}
      <Accomplishments />
      </GradientBg>

      {/* Call to Action */}
      <GradientBg gradientPosition="top">
      <CallToAction />
      </GradientBg>
    </div>
  );
}

interface SectionProps {
  section: {
    title: string;
    text: React.ReactNode;
    imgSrc: string;
    imgAlt: string;
  };
  left?: boolean;
}
const Section = ({ section, left }: SectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures animation runs only once
    threshold: 0.3, // Triggers when 30% of the section is visible
  });

  return (
    <section ref={ref} className={twMerge(sectionClasses,left?"":"lg:!flex-row-reverse")}>
      {/* Left-aligned text */}
      <div className={twMerge("text-center lg:text-left lg:w-1/2", inView ? "animate-fadeIn-right" : "opacity-0")}>
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">{section.title}</h2>
        <p className="text-lg lg:text-xl mb-6">{section.text}</p>
      </div>

      {/* Right-aligned image */}
      <div className={twMerge("w-full lg:w-1/2 aspect-video flex relative", inView ? "animate-fadeIn-left" : "opacity-0")}>
        <Image src={section.imgSrc} alt={section.imgAlt} className={imageClasses} fill={true} />
      </div>
    </section>
  )
}
const Accomplishments = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  return (
    <section className="px-6 lg:px-32 text-center mb-16" ref = {ref}>
    <h2 className="text-3xl lg:text-5xl font-bold mb-12">Our Accomplishments</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {/* Stats */}
      <div className={`flex flex-col items-center gap-4 ${inView?"animate-fadeIn-bottom":"opacity-0"}`}>
        <Image className = "w-16 h-16 md:w-24 md:h-24" src = "/assets/home/people.svg" alt = "100 Members" width = {100} height = {100}/>
        <div className="text-4xl md:text-6xl font-bold text-white">100</div>
        <p className="text-lg">Members</p>
      </div>
      <div className={`flex flex-col items-center gap-4 animate-delay-200 ${inView?"animate-fadeIn-bottom":"opacity-0"}`}>
      <Image className = "w-16 h-16 md:w-24 md:h-24" src = "/assets/home/ctfs.svg" alt = "50 CTFs" width = {100} height = {100}/>

        <div className="text-4xl lg:text-6xl font-bold text-white">50</div>
        <p className="text-lg">CTFs Played</p>
      </div>
      <div className={`col-span-2 flex flex-col items-center gap-4 animate-delay-500 ${inView?"animate-fadeIn-bottom":"opacity-0"}`}>
        <Image className = "w-16 h-16 md:w-24 md:h-24" src = "/assets/home/placings.svg" alt = "10 Top Placings" width = {100} height = {100}/>
        <div className="text-4xl lg:text-6xl font-bold text-white">10</div>
        <p className="text-lg">Top Placings Obtained</p>
      </div>
    </div>
    {/* Images */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
      <Image src="/assets/home/acheivement1.png" alt="Accomplishment 1" className={twMerge(imageClasses,`relative translate-y-0 !top-0 animate-delay-2000 hidden md:visible ${inView?"animate-fadeIn-bottom":"opacity-0"}`)}
      width={400} height= {500}/>
      <Image src="/assets/home/acheivement2.png" alt="Accomplishment 2" className={twMerge(imageClasses,`relative translate-y-0 !top-0 animate-delay-1700 ${inView?"animate-fadeIn-bottom":"opacity-0"}`)} width={400} height= {500}/>
      <Image src="/assets/home/acheivement3.png" alt="Accomplishment 3" className={twMerge(imageClasses,`relative translate-y-0 !top-0 animate-delay-1500 hidden md:visible ${inView?"animate-fadeIn-bottom":"opacity-0"}`)} width={400} height= {500}/>
    </div>
  </section>
  )
}
const CallToAction = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <>
    <div className="flex items-center justify-center mt-4">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">Interested? Join Us!</h2>
      </div>
    <section className={twMerge(sectionClasses,"mb-0")} ref = {ref}>
        {/* Call to Action Image */}
        <div className={`w-full lg:w-1/2 aspect-video flex relative ${inView?"animate-fadeIn-left":"opacity-0"}`}>
          <Image
            src="/assets/home/about4.jpg"
            alt="Our Mission"
            className={imageClasses}
            fill={true}
          />
        </div>
        {/* Call to Action Section */}
        <div className="text-center lg:text-left lg:w-1/2 pb-10">
            <p className={`text-xl lg:text-2xl mb-8 text-center ${inView?"animate-fadeIn-right":"opacity-0"}`}>
                Whether you're just starting out or already a seasoned pro, there's a place for you here.
            </p>
            <Link href = "https://discord.gg/SWAwuFVQ6M">
              <Button version="primary" className={`text-xl w-64 ${inView?"animate-fadeIn-bottom":"opacity-0"} animate-delay-1000 m-auto`}>Join Us</Button>
            </Link>
        </div>
      </section>
      </>
  );
};
