import React from 'react';
import { NewsSettings } from '../../../types/news';
import { Marquee } from '../../Marquee/Marquee';
import { MarqueeContent } from '../../Marquee/MarqueeContent';

interface MarqueePreviewProps {
  settings: NewsSettings;
}

export const MarqueePreview = ({ settings }: MarqueePreviewProps) => {
  const speed = 11 - settings.marquee.speed; // Invert speed (1-10) for marquee duration

  return (
    <div className="bento-box rounded-2xl overflow-hidden">
      <Marquee 
        speed={speed * 3}
        className="py-3"
        pauseOnHover={settings.marquee.pauseOnHover}
      >
        <MarqueeContent>
          {settings.items.map((item, index) => (
            <React.Fragment key={item.id}>
              <span 
                className={`mx-4 ${
                  settings.marquee.fontWeight === 'bold' ? 'font-bold' : 'font-normal'
                }`}
              >
                {item.text}
              </span>
              {index < settings.items.length - 1 && (
                <span className="mx-4">•</span>
              )}
            </React.Fragment>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
};