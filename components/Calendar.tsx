import React, { useState } from 'react';
import { View, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '@/theming/ThemeProvider';
import ThemedText from './ThemedText';
import Icon from './Icon';

interface ThemedCalendarProps {
  onDateChange: (date: Date) => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
  initialDate?: Date;
  maxDate?: string;
  minDate?: string;
}

export const ThemedCalendar: React.FC<ThemedCalendarProps> = ({
  onDateChange,
  className = '',
  style,
  initialDate = new Date('1990-01-01'),
  maxDate = new Date().toISOString().split('T')[0],
  minDate = '1900-01-01',
}) => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(
    initialDate.toISOString().split('T')[0]
  );
  const [currentMonth, setCurrentMonth] = useState(
    initialDate.toISOString().split('T')[0]
  );

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    onDateChange(new Date(day.dateString));
  };

  const handleMonthChange = (month: any) => {
    setCurrentMonth(month.dateString);
  };

  // Generate years for quick selection
  const currentYear = new Date().getFullYear();
  const selectedYear = new Date(currentMonth).getFullYear();
  const selectedMonthIndex = new Date(currentMonth).getMonth();
  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const jumpToYear = (yearDelta: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(selectedYear + yearDelta);
    setCurrentMonth(newDate.toISOString().split('T')[0]);
  };

  const jumpToMonth = (monthDelta: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(selectedMonthIndex + monthDelta);
    setCurrentMonth(newDate.toISOString().split('T')[0]);
  };

  return (
    <View className={`rounded-2xl overflow-hidden ${className}`} style={style}>
      {/* Year Navigation */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-secondary border-b border-border">
        <TouchableOpacity onPress={() => jumpToYear(-1)} className="p-2">
          <Icon name="ChevronLeft" size={20} color={theme.colors.foreground} />
        </TouchableOpacity>
        
        <ThemedText className="text-lg font-semibold">
          {selectedYear}
        </ThemedText>
        
        <TouchableOpacity onPress={() => jumpToYear(1)} className="p-2">
          <Icon name="ChevronRight" size={20} color={theme.colors.foreground} />
        </TouchableOpacity>
      </View>

      {/* Month Quick Navigation */}
      <View className="px-4 py-2 bg-secondary">
        <View className="flex-row justify-between">
          {months.map((month, index) => (
            <TouchableOpacity
              key={month}
              onPress={() => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(index);
                setCurrentMonth(newDate.toISOString().split('T')[0]);
              }}
              className={`px-2 py-1 rounded ${
                index === selectedMonthIndex ? 'opacity-100' : 'opacity-60'
              }`}
              style={{
                backgroundColor: index === selectedMonthIndex ? theme.colors.accent : 'transparent'
              }}
            >
              <ThemedText 
                className="text-xs font-medium"
                style={{
                  color: index === selectedMonthIndex ? theme.colors.primaryForeground : theme.colors.foreground
                }}
              >
                {month}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Calendar */}
      <Calendar
        current={currentMonth}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: theme.colors.accent,
            selectedTextColor: theme.colors.primaryForeground,
          }
        }}
        theme={{
          backgroundColor: theme.colors.secondary,
          calendarBackground: theme.colors.secondary,
          textSectionTitleColor: theme.colors.foreground,
          selectedDayBackgroundColor: theme.colors.accent,
          selectedDayTextColor: theme.colors.primaryForeground,
          todayTextColor: theme.colors.accent,
          dayTextColor: theme.colors.foreground,
          textDisabledColor: theme.colors.mutedForeground,
          dotColor: theme.colors.accent,
          selectedDotColor: theme.colors.primaryForeground,
          arrowColor: theme.colors.foreground,
          monthTextColor: theme.colors.foreground,
          indicatorColor: theme.colors.accent,
          textDayFontFamily: 'System',
          textMonthFontFamily: 'System',
          textDayHeaderFontFamily: 'System',
          textDayFontWeight: '400',
          textMonthFontWeight: '600',
          textDayHeaderFontWeight: '400',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        style={{
          backgroundColor: theme.colors.secondary,
          paddingBottom: 10,
        }}
        hideExtraDays={true}
        enableSwipeMonths={true}
        maxDate={maxDate}
        minDate={minDate}
        monthFormat={'MMMM yyyy'}
        firstDay={1}
        showWeekNumbers={false}
      />
    </View>
  );
};

export default ThemedCalendar; 
