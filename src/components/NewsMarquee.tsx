import React, { useEffect, useState } from 'react';
import { Marquee } from './Marquee/Marquee';
import { MarqueeContent } from './Marquee/MarqueeContent';
import { useNewsSettings } from '../hooks/useNewsSettings';

export const NewsMarquee = () => {
  const { settings } = useNewsSettings();
  const [speed, setSpeed] = useState(5);

  useEffect(() => {
    // Convert animation speed (100-1000ms) to marquee speed (1-10)
    const newSpeed = 11 - (settings.display.animationSpeed / 100);
    setSpeed(newSpeed);
  }, [settings.display.animationSpeed]);

  if (!settings.items.length) return null;

  return (
    <div className="w-full p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bento-box rounded-2xl overflow-hidden">
          <Marquee 
            speed={speed * 3} 
            className="py-3"
            pauseOnHover
          >
            <MarqueeContent>
              {settings.items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <span className="inline-flex items-center gap-2 mx-4">
                    {settings.display.showEmoji && (
                      <span className="text-lg">{item.emoji}</span>
                    )}
                    <span className="text-white">{item.title}</span>
                  </span>
                  {index < settings.items.length - 1 && (
                    <span className="mx-4 text-white/40">•</span>
                  )}
                </React.Fragment>
              ))}
            </MarqueeContent>
          </Marquee>
        </div>
      </div>
    </div>
  );
};