import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  'aria-describedby'?: string;
}

export const FormField = ({ 
  label, 
  name, 
  type, 
  value, 
  onChange, 
  placeholder, 
  required, 
  pattern,
  'aria-describedby': ariaDescribedby 
}: FormFieldProps) => {
  const id = `field-${name}`;
  const commonClasses = "w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/20 focus:ring-2 focus:ring-white/20";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label}
        {required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${commonClasses} resize-none h-32`}
          aria-describedby={ariaDescribedby}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          className={commonClasses}
          aria-describedby={ariaDescribedby}
        />
      )}
    </div>
  );
};