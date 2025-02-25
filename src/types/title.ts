import { TitleSize, TitleAlignment, TitleVariant } from '../components/ui/TitlePanel/types';

export interface TitleSettings {
  titleText: string;
  subtitleText: string;
  size: TitleSize;
  align: TitleAlignment;
  variant: TitleVariant;
  glitchEffect: boolean;
  cyberEffect: boolean;
}