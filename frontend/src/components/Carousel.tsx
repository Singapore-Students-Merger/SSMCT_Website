"use client"
import  { useState, useRef,useEffect } from "react";
import { GalleryItem, Info } from "./Gallery";
interface CarouselProps {
  data: Info[];
  setSelectedImage: React.Dispatch<React.SetStateAction<Info | null>>;
}

interface CarouselItemProps {
    info: Info;
    ref: (el: HTMLDivElement | null) => void;
    disableClick?: boolean;
    setSelectedImage: React.Dispatch<React.SetStateAction<Info | null>>;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ info, ref, disableClick,setSelectedImage }) => {

    return (
        <GalleryItem setSelectedImage = {setSelectedImage}
        info={info} ref = {ref} className="perspective w-[20rem] max-w-[90vw] md:w-[35rem] shrink-0" disableClick= {disableClick}/>
    )
}
const Carousel = ({ data, setSelectedImage }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollTimeout = useRef<number | undefined>(undefined);
    const startPos = useRef(0);
    const isDragging = useRef(false);
    const [disableClick, setDisableClick] = useState(false);
    // Function to check the centered item
    const checkCenteredItem = (): number => {
      if (!carouselRef.current) return 0;
  
      const carouselRect = carouselRef.current.getBoundingClientRect();
      const viewportCenter = carouselRect.left + carouselRect.width / 2;
      const carouselRectWidth = carouselRect.width;
      let closestIndex = 0;
      let closestDistance = Infinity;
  
      itemRefs.current.forEach((item, index) => {
        if (item) {
          const itemRect = item.getBoundingClientRect();
          const itemCenter = itemRect.left + itemRect.width / 2;
          const distance = Math.abs(itemCenter - viewportCenter);
          const distAsPercentage = distance / carouselRectWidth;
          item.style.transform = `scale(${1 - distAsPercentage * 0.5})`;
          item.style.opacity = `${1 - distAsPercentage * 0.8}`;
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });
      setCurrentIndex(closestIndex);
      return closestIndex;
    };
  
    // Handle the end of scroll (after a user stops scrolling)
    const handleScrollEnd = (curIndex: number) => {
      if (isDragging.current) return; // Do nothing if the user is dragging
  
      const curItem = itemRefs.current[curIndex];
      if (curItem && carouselRef.current) {
        carouselRef.current.scrollTo({
          left:
            curItem.offsetLeft -
            (carouselRef.current.offsetWidth || 0) / 2 +
            curItem.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    };
    
    interface ScrollWheelEvent extends WheelEvent {
      deltaY: number;
    }

   
  
    // Set up scroll and mouse event listeners
    useEffect(() => {
      const handleScrollWheel = (event: ScrollWheelEvent) => {
        if (carouselRef.current) {
          if (carouselRef.current.scrollLeft <= 100 && event.deltaY < 0) {
            return;
          }
          if (
            carouselRef.current.scrollLeft >=
            carouselRef.current.scrollWidth - carouselRef.current.offsetWidth - 100 &&
            event.deltaY > 0
          ) {
            return;
          }
          carouselRef.current.scrollLeft += event.deltaY;
          event.preventDefault();
        }
      };
      // Handle the scroll event
      const handleScroll = () => {
        const curIndex = checkCenteredItem();
    
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
    
        // Set a new timeout to detect when scrolling has stopped
        scrollTimeout.current = window.setTimeout(() => {
          handleScrollEnd(curIndex); // Trigger the auto-centering
        }, 100); // Wait 100ms after scroll stops
      };
    
      // Track whether the user is actively dragging the scrollbar
      const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>| MouseEvent) => {
        startPos.current = event.clientX;
        isDragging.current = true; // User starts dragging
      };
      const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>| MouseEvent) => {
        if (!isDragging.current) return; // Do nothing if user is not dragging
        // move the carousel
        setDisableClick(true);
        if (carouselRef.current) {
          const diff = startPos.current - event.clientX;
          startPos.current = event.clientX;
          carouselRef.current.scrollLeft += diff;
        }
        
      }
      const handleMouseUp = () => {
          setDisableClick(false);
        isDragging.current = false; // User stops dragging
        const curIndex = checkCenteredItem(); // Recheck centered item when user releases
        handleScrollEnd(curIndex); // Trigger auto-centering after user releases scrollbar
      };

      const ref = carouselRef.current;
      checkCenteredItem();
      if (ref) {
        ref.addEventListener("scroll", handleScroll);
        ref.addEventListener("mousedown", handleMouseDown);
        ref.addEventListener("wheel", handleScrollWheel);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      }
      handleScrollEnd(0)
      return () => {
        if (ref) {
          ref.removeEventListener("scroll", handleScroll);
          ref.removeEventListener("mousedown", handleMouseDown);
          ref.removeEventListener("wheel", handleScrollWheel);
          
        }
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, []);

    return (
        <>
        <div className="scrollbar-custom flex gap-4 overflow-auto py-4 md:py-12 w-full box-border"
            ref = {carouselRef}>
            <div className="w-[20rem] max-w-[90vw] md:w-[30rem] shrink-0"></div>
        {data.map((info, idx) => (
            <CarouselItem key={idx} info={info} 
            ref={(el) => (itemRefs.current[idx] = el)}
            disableClick = {disableClick}
            setSelectedImage = {setSelectedImage}
            />
        ))}
                    <div className="w-[20rem]  md:w-[30rem] max-w-[90vw] shrink-0"></div>

        </div>
        <div className="flex justify-center mt-4">
        {data.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full mx-1 ${idx === currentIndex ? 'bg-white' : 'bg-gray-500'
              }`}
          ></div>
        ))}
      </div>
      </>
    );
}

export {Carousel, CarouselItem}