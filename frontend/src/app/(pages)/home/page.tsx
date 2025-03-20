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
const imageClasses = "  w-full object-cover !top-1/2 -translate-y-1/2 ";

export default function Home() {

  const sections = [
    {
      title: "About SSMCT",
      text: <>
      The Singapore Students Merger (SSMCT) is a <strong>Singaporean CTF team</strong> with players from many CTF teams <strong>across Singapore</strong>. <br/> <br/> We have a goal to support and provide opportunities for students that are interested in cybersecurity, to <strong>network</strong> and share knowledge with one another.
      </>,
      imgSrc: "/assets/home/about1.png",
      imgAlt: "About SSMCT",
      description:"SSMCT meeting up at the Greyhats Summit 2024"
    },
    {
      title: "Our Mission",
      text: <>SSMCT's mission is to foster a <strong>collaborative environment</strong> where members from <strong>diverse backgrounds</strong> can enhance their cybersecurity skills through <strong>shared learning and participation</strong> in CTF competitions. <br/> <br/> We welcome <strong>new and passionate</strong> individuals to join us in advancing Singapore's cybersecurity landscape.</>,
      imgSrc: "/assets/home/about2.png",
      imgAlt: "Our Mission",
      description:"Our Selected SSMCT Team taking a photo after the Greyhats CTF 2024 Finals, where we obtained 11th place."
    },
    {
      title: "Active CTF Players",
      text: <>SSMCT competes in CTFs <strong>almost every weekend</strong>, motivating each other to compete internationally. <br/> <br/>Some
          of us <strong>organize local CTFs</strong>, and we strengthen our team through regular bonding sessions.</>,
      imgSrc: "/assets/home/about3.png",
      imgAlt: "Active Players",
      description:"SSMCT members taking a photo after successfully organising YBNCTF 2024"
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
      <GradientBg gradientPosition="y-center">
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

interface ImageItemProps {
  src: string;
  alt: string;
  className: string;
  inView: boolean;
  description: string;
}
const ImageItem = ({ src, alt, className, inView, description}: ImageItemProps) => {
  return (
  <div className={twMerge("rounded-2xl shadow-md shadow-secondary-tier1 border-2 border-secondary-tier3 overflow-hidden w-full lg:w-1/2 aspect-video flex relative", 
  inView ? "animate-fadeIn-left" : "opacity-0",
  className)}>
    <Image src={src} alt={alt} className={twMerge(imageClasses)} fill={true} />
    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center opacity-0 transition duration-300 rounded-lg
                    hover:opacity-100">
      <p className="text-white text-lg py-4 px-4">{description}</p>
    </div>
  </div>)
}
interface SectionProps {
  section: {
    title: string;
    text: React.ReactNode;
    imgSrc: string;
    imgAlt: string;
    description: string;
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
      <ImageItem src={section.imgSrc} alt={section.imgAlt} className="" inView={inView} description={section.description}/>
    </section>
  )
}
const Accomplishments = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const imageInfo = [{
      src: "/assets/home/acheivement1.png",
      alt: "One of our SSMCT teams gets top 10% placing in downunderctf 2024",
      className: `hidden md:block lg:w-full !animate-delay-2000 ${inView?"!animate-fadeIn-bottom":"opacity-0"}`,
      description: "One of our SSMCT teams gets top 10% placing in downunderctf 2024"
    },
    {
      src: "/assets/home/acheivement2.png",
      alt: `SSMCT getting 6th place in BCACTF 5.0`,
      className: `lg:w-full !animate-delay-1700 ${inView?"!animate-fadeIn-bottom":"opacity-0"}`,
      description: "SSMCT getting 6th place in BCACTF 5.0"
    },
    {
      src: "/assets/home/acheivement3.png",
      alt: "SSMCT getting 2nd place in BTCTF 2024",
      className: `hidden md:block lg:w-full !animate-delay-1500 ${inView?"!animate-fadeIn-bottom":"opacity-0"}`,
      description: "SSMCT obtains 2nd place in BTCTF 2024"
    }
  ]
  return (
    <section className="px-6 lg:px-32 text-center mb-16" ref = {ref}>
    <h2 className="text-3xl lg:text-5xl font-bold mb-12">Our Accomplishments</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {/* Stats */}
      <div className={`flex flex-col items-center gap-4 ${inView?"animate-fadeIn-bottom":"opacity-0"}`}>
        <Image unoptimized className = "w-16 h-16 md:w-24 md:h-24" src = "/assets/home/people.svg" alt = "100 Members" width = {100} height = {100}/>
        <div className="text-4xl md:text-6xl font-bold text-white">100</div>
        <p className="text-lg">Members</p>
      </div>
      <div className={`flex flex-col items-center gap-4 animate-delay-200 ${inView?"animate-fadeIn-bottom":"opacity-0"}`}>
      <Image unoptimized className = "w-16 h-16 md:w-24 md:h-24" src = "/assets/home/ctfs.svg" alt = "50 CTFs" width = {100} height = {100}/>

        <div className="text-4xl lg:text-6xl font-bold text-white">50</div>
        <p className="text-lg">CTFs Played</p>
      </div>
      <div className={`col-span-2 md:col-span-1 flex flex-col items-center gap-4 animate-delay-500 ${inView?"animate-fadeIn-bottom":"opacity-0"}`}>
        <Image unoptimized className = "w-16 h-16 md:w-24 md:h-24" src = "/assets/home/placings.svg" alt = "10 Top Placings" width = {100} height = {100}/>
        <div className="text-4xl lg:text-6xl font-bold text-white">10</div>
        <p className="text-lg">Top Placings Obtained</p>
      </div>
    </div>
    {/* Images */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
      {
        imageInfo.map((info, index) => {
          return <ImageItem key={index} src={info.src} alt={info.alt} className={info.className} inView={inView} description={info.description}/>
        })
      }
      
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
    <section className={twMerge(sectionClasses,"!mb-0")} ref = {ref}>
        {/* Call to Action Image */}
        <div className={`w-full lg:w-1/2 aspect-video flex relative ${inView?"animate-fadeIn-left":"opacity-0"}`}>
          <ImageItem src="/assets/home/about4.jpg" alt="Our Mission" className="lg:w-full" inView={inView} description="SSM members enjoying the 2024 bonding session"/>
        </div>
        {/* Call to Action Section */}
        <div className="text-center lg:text-left lg:w-1/2 pb-10">
            <p className={`text-xl lg:text-2xl mb-8 text-center ${inView?"animate-fadeIn-right":"opacity-0"}`}>
                Whether you&rsquo;re just starting out or already a seasoned pro, there&apos;s a place for you here in the <strong>Singapore Students Merger CTF Team</strong>.
            </p>
            <Link href = "https://discord.gg/SWAwuFVQ6M">
              <Button version="primary" className={`text-xl w-64 ${inView?"animate-fadeIn-bottom":"opacity-0"} animate-delay-1000 m-auto`}>Join Us</Button>
            </Link>
        </div>
      </section>
      </>
  );
};
