import { TitleSettings } from '../types/title';
import { DEFAULT_TITLE_SETTINGS } from '../constants/titleSettings';

export const validateTitleSettings = (settings: any): TitleSettings => {
  if (!settings) return DEFAULT_TITLE_SETTINGS;

  return {
    titleText: settings.titleText || DEFAULT_TITLE_SETTINGS.titleText,
    subtitleText: settings.subtitleText || DEFAULT_TITLE_SETTINGS.subtitleText,
    size: settings.size || DEFAULT_TITLE_SETTINGS.size,
    align: settings.align || DEFAULT_TITLE_SETTINGS.align,
    variant: settings.variant || DEFAULT_TITLE_SETTINGS.variant,
    glitchEffect: settings.glitchEffect ?? DEFAULT_TITLE_SETTINGS.glitchEffect,
    currencyAnimation: settings.currencyAnimation ?? DEFAULT_TITLE_SETTINGS.currencyAnimation
  };
};