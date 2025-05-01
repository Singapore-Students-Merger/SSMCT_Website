"use client"
import Button from '@/components/ctf/Button';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface AboutSectionProps {
    header: string;
    description: React.ReactNode;
    imageSrc: string;
    imageAlt: string;
    reverse?: boolean;
    href?: string; // URL to navigate to
    buttonText?: string; // Text to display on the button
}

const useSection = () => {
    const sectionRef = useRef<HTMLImageElement>(null);
    const [inView,setInView] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      }
      , { threshold: 0.1 });
      const sectionElement = sectionRef.current;
      if (sectionElement) {
        observer.observe(sectionElement);
      }
      return () => {
      };
    
    }, [sectionRef]);

    const SectionElement = (props: React.HTMLProps<HTMLElement>) => {
        const { children, ...rest } = props;
        return <section {...rest} ref = {sectionRef}>{children}</section>;
    }
    return {SectionElement, inView}
}
const AboutSection = ({ header, description, imageSrc, imageAlt, href, buttonText, reverse = false }:AboutSectionProps) => {
  const {SectionElement,inView} = useSection();
  return (
    <SectionElement
      className={`grid grid-cols-1 md:grid-cols-2 px-8 md:px-32 gap-x-24 gap-y-8 py-16 md:py-0 md:min-h-[75vh] w-full`}
    >
      <>
      {/* Text Content */}
      <div className={`flex flex-col justify-center gap-y-4 items-center ${reverse ? 'md:order-2' : 'md:order-1'}`}>
        <h2 className={`text-4xl font-bold text-center text-border-color ${inView?"fade-in-text-border":"remove-text-border"}`}>    
          {header}
        </h2>

        <p className="text-base md:text-lg text-center">
          {description}
        </p>
        {href && 
          <Button href = {href}>
            {buttonText}
          </Button>
          }
      </div>

      {/* Image Content */}
      <div className={`flex flex-col justify-center items-center ${reverse ? 'md:order-1' : 'md:order-2'} `}>
        <div className={`special-border max-h-full max-w-full w-full aspect-video ${inView?"fade-in-special-border":"remove-special-border"}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
    </SectionElement>
  );
};

export {AboutSection, useSection};