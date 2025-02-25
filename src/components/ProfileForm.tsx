import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ProfileFormProps } from '../types';
import { GlassCard } from './ui/GlassCard';
import { TextScramble } from './Product/Card/TextScramble';
import { useAdmin } from '../context/AdminContext';
import { useConfetti } from '../hooks/useConfetti';

export const ProfileForm = ({ onSubmit, onClose }: ProfileFormProps) => {
  const [phrase, setPhrase] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const { verifyAdminAccess } = useAdmin();
  const { triggerConfetti } = useConfetti();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin access
    if (verifyAdminAccess(phrase, promoInput)) {
      triggerConfetti();
      return;
    }

    // Regular user submission
    triggerConfetti();
    onSubmit(phrase);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-4 overflow-hidden">
          <TextScramble text="Secure Access" />
        </h2>
        
        <div className="space-y-4 mb-6 text-sm">
          <div className="text-white/90 overflow-hidden">
            <TextScramble 
              text="Welcome 🌟 to our secure session system! 🔒"
              delay={300}
            />
          </div>
          
          <div className="space-y-2">
            <div className="text-white/90 overflow-hidden">
              <TextScramble text="Pick ONE of these:" delay={600} />
            </div>
            <ul className="space-y-1 text-white/80">
              <li className="flex items-center gap-2">
                <span className="text-white/60">•</span>
                <TextScramble 
                  text="Session ID (XXXX-XXXX-XXXX) ✨"
                  delay={900}
                />
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white/60">•</span>
                <TextScramble 
                  text="Threema ID (8 cool characters) 🎯"
                  delay={1200}
                />
              </li>
            </ul>
          </div>

          <div className="text-white/90 overflow-hidden">
            <TextScramble text="Let's go! 🚀" delay={1500} />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/20"
            placeholder="Enter your Session or Threema ID"
            required
          />
          
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/20"
            placeholder="Promo Code (Optional)"
          />
          
          <button
            type="submit"
            className="w-full glass-effect text-white font-medium py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <TextScramble text="Continue" delay={1800} />
          </button>
        </form>
      </GlassCard>
    </div>
  );
};