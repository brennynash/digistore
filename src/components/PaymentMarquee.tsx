import React from 'react';
import { Bitcoin, Wallet2 } from 'lucide-react';
import { Marquee } from './Marquee/Marquee';
import { MarqueeContent } from './Marquee/MarqueeContent';

const PaymentMethod = ({ icon: Icon, name }: { icon: React.ElementType; name: string }) => (
  <div className="inline-flex items-center gap-2 px-4">
    <Icon size={20} className="text-white" />
    <span className="font-medium text-white">{name}</span>
  </div>
);

const Separator = () => (
  <div className="mx-6 text-white/20">•</div>
);

export const PaymentMarquee = () => {
  return (
    <footer className="w-full p-4 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="bento-box rounded-2xl overflow-hidden">
          <Marquee speed={30} className="py-3" reverse>
            <MarqueeContent className="gap-4">
              <PaymentMethod icon={Bitcoin} name="Bitcoin" />
              <Separator />
              <PaymentMethod icon={Wallet2} name="Monero" />
              <Separator />
              <PaymentMethod icon={Bitcoin} name="Litecoin" />
              <Separator />
              <PaymentMethod icon={Bitcoin} name="Bitcoin" />
              <Separator />
              <PaymentMethod icon={Wallet2} name="Monero" />
              <Separator />
              <PaymentMethod icon={Bitcoin} name="Litecoin" />
              <Separator />
            </MarqueeContent>
          </Marquee>
        </div>
      </div>
    </footer>
  );
};