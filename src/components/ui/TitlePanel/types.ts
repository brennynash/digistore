export type TitleSize = 'small' | 'default' | 'large';
export type TitleAlignment = 'left' | 'center';
export type TitleVariant = 'default' | 'gradient' | 'outlined';

export interface TitlePanelProps {
  title: string;
  subtitle?: string;
  align?: TitleAlignment;
  size?: TitleSize;
  variant?: TitleVariant;
  className?: string;
  glitchEffect?: boolean;
  cyberEffect?: boolean;
  children?: React.ReactNode;
}

export interface TitleContentProps {
  title: string;
  size: string;
  variant: TitleVariant;
  glitchEffect?: boolean;
  cyberEffect?: boolean;
}

export interface SubtitleContentProps {
  subtitle: string;
  size: string;
  variant: TitleVariant;
}