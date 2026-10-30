import { Pressable, View } from 'react-native';
import { useTheme } from '@/theming/ThemeProvider';
import { useColorScheme } from '@/lib/useColorScheme';
import Feather from '@expo/vector-icons/Feather';

const ThemeToggle = () => {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const isDark = isDarkColorScheme;

  return (
    <Pressable
      onPress={() => setColorScheme(isDark ? 'light' : 'dark')}
      className='w-20 h-10 p-1 bg-secondary relative flex-row rounded-full items-center justify-between'>
      <Icon icon='sun' />
      <Icon icon='moon' />
      <View
        className={`w-9 h-9 bg-background rounded-full items-center justify-center flex flex-row absolute ${isDark ? 'left-9' : 'left-1'}`}
      />
    </Pressable>
  );
};

const Icon = (props: any) => {
  const { theme } = useTheme();

  return (
    <View className='w-9 h-9 relative z-50 rounded-full items-center justify-center flex flex-row'>
      <Feather name={props.icon} size={16} color={theme.colors.foreground} />
    </View>
  );
};

export default ThemeToggle;
