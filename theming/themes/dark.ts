import { Theme } from '../Theme';

const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: 'hsl(260 25% 10%)',
    foreground: 'hsl(42 100% 95%)',
    card: 'hsl(260 20% 14%)',
    cardForeground: 'hsl(42 100% 95%)',
    popover: 'hsl(260 20% 16%)',
    popoverForeground: 'hsl(42 100% 95%)',
    primary: 'hsl(210 100% 62%)',
    primaryForeground: 'hsl(260 25% 10%)',
    secondary: 'hsl(340 82% 68%)',
    secondaryForeground: 'hsl(260 25% 10%)',
    tertiary: 'hsl(265 40% 22%)',
    tertiaryForeground: 'hsl(42 100% 95%)',
    muted: 'hsl(260 20% 18%)',
    mutedForeground: 'hsl(260 15% 60%)',
    accent: 'hsl(45 93% 58%)',
    accentForeground: 'hsl(260 25% 10%)',
    success: 'hsl(142 52% 52%)',
    successForeground: 'hsl(260 25% 10%)',
    warning: 'hsl(35 100% 58%)',
    warningForeground: 'hsl(260 25% 10%)',
    destructive: 'hsl(0 72% 58%)',
    destructiveForeground: 'hsl(0 0% 100%)',
    border: 'hsl(260 20% 24%)',
    notification: 'hsl(340 82% 68%)',
    input: 'hsl(260 20% 22%)',
    ring: 'hsl(210 100% 62%)',
    overlay: 'hsl(260 25% 5%)',
    chartGrid: 'rgba(255, 255, 255, 0.05)',
    chartAxis: 'rgba(255, 255, 255, 0.15)',
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

export default darkTheme;
