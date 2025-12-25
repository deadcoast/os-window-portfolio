import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

const HEIGHT = 160;
const EDGE = 30;

export function Carousel3D() {
  const testImage = 'https://static.wixstatic.com/media/8d9a31_a02da67fa0f245e3b5657a2e480fab3d~mv2.png/v1/crop/x_0,y_795,w_4000,h_2665/fill/w_1948,h_1298,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled_Artwork%203.png';

  const images = Array(8).fill(testImage);

  const [activeIndex, setActiveIndex] = useState(0);

  const toPrev = () => {
    if (activeIndex === 0) return;
    setActiveIndex(prev => prev - 1);
  };

  const toNext = () => {
    if (activeIndex === images.length - 1) return;
    setActiveIndex(prev => prev + 1);
  };

  return (
    <div className="vertical-carousel">
      <button
        className={`carousel-nav ${activeIndex === 0 ? 'disabled' : ''}`}
        onClick={toPrev}
        disabled={activeIndex === 0}
      >
        <ChevronUp size={24} />
      </button>

      <div className="carousel-viewport" style={{ height: HEIGHT + EDGE * 2 }}>
        <motion.div
          className="carousel-track"
          animate={{ y: activeIndex * -HEIGHT + EDGE }}
          transition={{ type: 'spring', bounce: 0.3 }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              style={{ height: HEIGHT }}
              className="carousel-item-wrapper"
            >
              <div
                className={`carousel-item ${activeIndex !== index ? 'inactive' : ''} ${activeIndex > index ? 'prev' : ''} ${activeIndex < index ? 'next' : ''}`}
              >
                <img
                  src={src}
                  alt={`Artwork ${index + 1}`}
                />
                <div className="carousel-overlay"></div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <button
        className={`carousel-nav ${activeIndex === images.length - 1 ? 'disabled' : ''}`}
        onClick={toNext}
        disabled={activeIndex === images.length - 1}
      >
        <ChevronDown size={24} />
      </button>
    </div>
  );
}
