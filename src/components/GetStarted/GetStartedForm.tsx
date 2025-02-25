import React, { useState } from 'react';
import { X } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { FormField } from './FormField';
import { FormInstructions } from './FormInstructions';

interface GetStartedFormProps {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

interface FormData {
  sessionId: string;
  email: string;
  message: string;
}

export const GetStartedForm = ({ onSubmit, onClose }: GetStartedFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    sessionId: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-labelledby="form-title"
      aria-modal="true"
    >
      <GlassCard className="w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          aria-label="Close form"
        >
          <X size={20} />
        </button>

        <h2 id="form-title" className="text-2xl font-bold text-white mb-6">
          Get Started
        </h2>

        <FormInstructions />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Session ID"
            name="sessionId"
            type="text"
            value={formData.sessionId}
            onChange={handleChange}
            placeholder="XXXX-XXXX-XXXX"
            pattern="[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}"
            required
            aria-describedby="sessionId-hint"
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />

          <FormField
            label="Message"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            required
          />

          <button
            type="submit"
            className="w-full glass-effect text-white font-medium py-3 rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Submit
          </button>
        </form>
      </GlassCard>
    </div>
  );
};