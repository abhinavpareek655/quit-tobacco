import { View, Text, StyleSheet } from "react-native"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export default function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${((currentStep + 1) / totalSteps) * 100}%` }]} />
      </View>
      <Text style={styles.stepText}>
        Step {currentStep + 1} of {totalSteps}: {steps[currentStep]}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#eee",
    borderRadius: 2,
    marginBottom: 8,
  },
  progress: {
    height: "100%",
    backgroundColor: "#00ADB5",
    borderRadius: 2,
  },
  stepText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
})

