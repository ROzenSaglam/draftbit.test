import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { View } from 'react-native';
import { vars } from 'nativewind';
import { Theme } from './Theme';
import lightTheme from './themes/light';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (name: string) => void;
}

type TypographyToken = NonNullable<Theme['typography'][keyof Theme['typography']]>;

const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  setTheme: () => {},
});

const stripHsl = (value?: string) => {
  if (!value) {
    return undefined;
  }
  return value.startsWith('hsl(') ? value.replace('hsl(', '').replace(')', '') : value;
};

export const ThemeProvider = ({
  initialThemeName,
  themes,
  children,
}: {
  initialThemeName: string;
  themes: Theme[];
  children: ReactNode;
}) => {
  if (themes.length === 0) {
    throw new Error('At least one theme must be provided in the ThemeProvider');
  }

  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const theme = themes.find((theme) => theme.name === initialThemeName);
    if (!theme) {
      // eslint-disable-next-line no-console
      console.warn(`Theme '${initialThemeName}' not found, falling back to ${themes[0].name}`);
      return themes[0];
    }
    return theme;
  });

  const setTheme = useCallback(
    (name: string) => {
      const theme = themes.find((theme) => theme.name === name);
      if (!theme) {
        // eslint-disable-next-line no-console
        console.warn(`Theme '${name}' not found, skipping setting theme`);
        return;
      }
      setCurrentTheme(theme);
    },
    [themes]
  );

  const themeContextValue: ThemeContextValue = useMemo(
    () => ({
      theme: currentTheme,
      setTheme,
    }),
    [currentTheme, setTheme]
  );

  const flattenedTypographyVariables = useMemo(() => {
    const flattened: Record<string, string> = {};
    Object.entries(currentTheme.typography).forEach(([typographyItem, values]) => {
      if (values) {
        (Object.keys(values) as Array<keyof TypographyToken>).forEach((key) => {
          const value = values[key];
          if (value !== undefined) {
            flattened[`${typographyItem}-${key}`] = value;
          }
        });
      }
    });
    return flattened;
  }, [currentTheme.typography]);

  const strippedHslColors = useMemo(() => {
    const variables: Record<string, string> = {};
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      const stripped = stripHsl(value);
      if (stripped) {
        variables[key] = stripped;
      }
    });
    return variables;
  }, [currentTheme.colors]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <View
        className="h-full w-full"
        style={vars({ ...strippedHslColors, ...flattenedTypographyVariables })}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  return useContext(ThemeContext);
};
