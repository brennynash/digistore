import React from 'react';

export const FormInstructions = () => (
  <div className="mb-6 space-y-4 text-sm">
    <p className="text-white/90">
      Welcome to our secure contact system! Please fill out the form below to get started.
    </p>
    
    <div className="space-y-2">
      <p className="text-white/90">Important Information:</p>
      <ul className="space-y-1 text-white/80 list-disc pl-5">
        <li>Session ID format: XXXX-XXXX-XXXX</li>
        <li>All fields marked with * are required</li>
        <li>We'll respond to your email within 24 hours</li>
      </ul>
    </div>

    <p id="sessionId-hint" className="text-white/70 text-xs">
      Your Session ID can be found in your welcome email or account dashboard
    </p>
  </div>
);