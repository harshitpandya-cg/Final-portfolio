import React, { useEffect, useState } from 'react';
import { Sword } from 'lucide-react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const springX = useSpring(0, { stiffness: 500, damping: 28 });
  const springY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ 
        x: springX,
        y: springY,
        translateX: '-10%',
        translateY: '-10%',
        rotate: -45 // Pointing diagonally up-left to match the user's sword orientation
      }}
    >
      <div className="relative">
        <Sword 
          size={42} 
          className="text-black stroke-[4px]" 
        />
        <div className="absolute inset-0">
          <Sword 
            size={42} 
            className="text-cyan-300 stroke-[2.5px] drop-shadow-[0_0_8px_#22d3ee]" 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CustomCursor;
