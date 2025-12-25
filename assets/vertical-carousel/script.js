import React, { useState, useEffect } from "https://esm.sh/react@19"
import { createRoot } from "https://esm.sh/react-dom@19/client"
import { motion } from "https://esm.sh/motion/react"
// with tailwind 4 

const data = [
  'https://images.unsplash.com/photo-1580863621684-c99fa617804a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjYyNjYyODV8&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1473447547337-5770a453122d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjYyNjYzMzB8&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjYyNjYzMzB8&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1458712197423-adcdc2a426ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjYyNjYzODh8&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjYyNjYzODh8&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1643188389404-5a10e50023bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjYyNjY0MDh8&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1620039423210-439be0d2b3cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjYyNjY0MjF8&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1621939650348-2a4139949c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjYyNjY0NDh8&ixlib=rb-4.1.0&q=80&w=800',
]

const HEIGHT = 200
const EDGE = 40

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const toPrev = () => {
    if (activeIndex === 0) return
    setActiveIndex(prev => prev - 1)
  }
  
  const toNext = () => {
    if (activeIndex === data.length - 1) return
    setActiveIndex(prev => prev + 1)
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className={`p-2 select-none ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={toPrev}>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 15l6-6l6 6"/></svg>
      </div>
      <div className="overflow-hidden" style={{ height: HEIGHT + EDGE * 2 }}>
        <motion.div 
          className="flex flex-col items-center"
          animate={{ y: activeIndex * -HEIGHT + EDGE }}
          transition={{ type: 'spring', bounce: 0.3 }}
          >
         {data.map((src, index) => (
            // NOTE: dynamic height on outer, rotateX on inner. Otherwise the height will be incorrect
            <div
              key={index}
              style={{ height: HEIGHT }}
              className="shrink-0 perspective-distant transform-3d"
            >
              <div className={`h-full aspect-[16/9] md:aspect-[3] rounded-lg overflow-hidden relative transition-all duration-300 ${activeIndex !== index ? 'scale-85 opacity-30' : ''} ${activeIndex > index ? 'rotate-x-30' : ''} ${activeIndex < index ? '-rotate-x-30' : ''}`}>
                <img
                  className="w-full h-full object-cover grayscale-80 contrast-170 brightness-80"
                  src={src}
                  alt=""
                  />
                <div className="absolute inset-0 bg-[#f1a1a3] mix-blend-screen"></div>
              </div>
              
            </div>
          ))}
        </motion.div>
      </div>
      <div className={`p-2 select-none ${activeIndex === data.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={toNext}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/></svg>
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById("app"))

root.render(<App />)