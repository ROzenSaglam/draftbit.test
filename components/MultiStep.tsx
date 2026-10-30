import React, { ReactNode, useState, Children, isValidElement } from 'react';
import { View, Pressable, Text } from 'react-native';
import { Button } from '@/components/Button';
import ThemedText from '@/components/ThemedText';
import Icon from '@/components/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';

// Step component that will be used as children
export interface StepProps {
  title: string;
  optional?: boolean;
  children: ReactNode;
}

export const Step: React.FC<StepProps> = ({ children }) => {
  return <>{children}</>; // Just render children, this is mainly for type safety
};

// Add this to help with type checking
const isStepComponent = (child: any): child is React.ReactElement<StepProps> => {
  return isValidElement(child) && (child.type === Step || (typeof child.type === 'function' && child.type.name === 'Step'));
};

interface StepData {
  key: string;
  title: string;
  optional?: boolean;
  component: ReactNode;
}

interface MultiStepProps {
  children: ReactNode;
  onComplete: () => void;
  onClose?: () => void;
  showHeader?: boolean;
  showStepIndicator?: boolean;
  className?: string;
  onStepChange?: (nextStep: number) => boolean;
}

export default function MultiStep({
  children,
  onComplete,
  onClose,
  showHeader = true,
  showStepIndicator = true,
  className = '',
  onStepChange,
}: MultiStepProps) {
  // Filter and validate children to only include Step components
  const validChildren = Children.toArray(children)
    .filter(isStepComponent);
  
  // Extract step data from children
  const steps: StepData[] = validChildren.map((child, index) => {
    const { title, optional, children: stepContent } = (child as React.ReactElement<StepProps>).props;
    return {
      key: `step-${index}`,
      title: title || `Step ${index + 1}`,
      optional,
      component: stepContent
    };
  });

  // Ensure we have at least one step
  if (steps.length === 0) {
    steps.push({
      key: 'empty-step',
      title: 'Empty',
      component: <View><ThemedText>No steps provided</ThemedText></View>
    });
  }

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      const nextStep = currentStepIndex + 1;
      const canProceed = onStepChange ? onStepChange(nextStep) : true;
      
      if (canProceed) {
        setCurrentStepIndex(nextStep);
      }
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep.optional && !isLastStep) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <SafeAreaView edges={['bottom']} className={`flex-1 bg-background ${className}`}>
      {showHeader && (
        <SafeAreaView
          edges={['top']}
          className="w-full flex-row items-center justify-between px-global pb-2 bg-background"
        >
          <View className="flex-row items-center py-4">
            {!isFirstStep && (
              <Icon
                name="ArrowLeft"
                size={24}
                className="text-light-text dark:text-dark-text"
                onPress={handleBack}
              />
            )}
            {currentStep.optional && !isLastStep && (
              <Button
                title="Skip"
                variant="ghost"
                onPress={handleSkip}
                size="small"
              />
            )}
          </View>
          <View className="flex-row items-center py-4">
            {onClose && (
              <Pressable
                onPress={handleClose}
                className="p-2 rounded-full active:bg-secondary"
                hitSlop={8}
              >
                <Icon name="X" size={24} />
              </Pressable>
            )}
          </View>
        </SafeAreaView>
      )}

      {/* Step Indicators */}
      {showStepIndicator && (
        <View className="px-global mb-10 flex-row justify-center w-full">
          {steps.map((_, index) => (
            <View
              key={index}
              className="h-1 overflow-hidden bg-border flex-1"
            >
              <View
                className={`h-full bg-accent ${index <= currentStepIndex ? 'w-full' : 'w-0'}`}
              />
            </View>
          ))}
        </View>
      )}

      {/* Step Content */}
      <View className="flex-1">
        {currentStep.component}
      </View>

      {/* Bottom Navigation */}
      <View className="px-4 py-3">
       
        <Pressable onPress={handleNext} className='w-full bg-accent flex items-center justify-center py-5 rounded-full'>
          <Text className="text-black font-semibold text-base">{isLastStep ? "Complete" : "Next"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
} 
