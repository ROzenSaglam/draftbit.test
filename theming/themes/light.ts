import { Theme } from '../Theme';

const lightTheme: Theme = {
  name: 'light',
  colors: {
    background: 'hsl(42 100% 97%)',
    foreground: 'hsl(260 30% 18%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(260 30% 18%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(260 30% 18%)',
    primary: 'hsl(210 100% 55%)',
    primaryForeground: 'hsl(0 0% 100%)',
    secondary: 'hsl(340 82% 62%)',
    secondaryForeground: 'hsl(0 0% 100%)',
    tertiary: 'hsl(265 55% 92%)',
    tertiaryForeground: 'hsl(260 30% 18%)',
    muted: 'hsl(265 30% 94%)',
    mutedForeground: 'hsl(260 15% 50%)',
    accent: 'hsl(45 93% 55%)',
    accentForeground: 'hsl(260 30% 15%)',
    success: 'hsl(142 52% 48%)',
    successForeground: 'hsl(0 0% 100%)',
    warning: 'hsl(35 100% 55%)',
    warningForeground: 'hsl(260 30% 15%)',
    destructive: 'hsl(0 72% 55%)',
    destructiveForeground: 'hsl(0 0% 100%)',
    border: 'hsl(265 30% 88%)',
    notification: 'hsl(340 82% 62%)',
    input: 'hsl(265 30% 90%)',
    ring: 'hsl(210 100% 55%)',
    overlay: 'hsl(260 30% 10%)',
    chartGrid: 'rgba(0, 0, 0, 0.05)',
    chartAxis: 'rgba(0, 0, 0, 0.15)',
  },
  typography: {
    h1: {
      fontSize: '36px',
      fontFamily: 'Outfit_700Bold',
    },
    h2: {
      fontSize: '28px',
      fontFamily: 'Outfit_700Bold',
    },
    h3: {
      fontSize: '24px',
      fontFamily: 'Outfit_700Bold',
    },
    h4: {
      fontSize: '20px',
      fontFamily: 'Outfit_700Bold',
    },
    h5: {
      fontSize: '18px',
      fontFamily: 'Outfit_700Bold',
    },
    h6: {
      fontSize: '16px',
      fontFamily: 'Outfit_700Bold',
    },
    body: {
      fontSize: '16px',
      fontFamily: 'Outfit_400Regular',
    },
    caption: {
      fontSize: '14px',
      fontFamily: 'Outfit_400Regular',
    },
    button: {
      fontSize: '18px',
      fontFamily: 'Outfit_700Bold',
    },
  },
};

export default lightTheme;
