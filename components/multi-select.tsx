import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

interface MultiSelectProps {
  options: string[]
  selected: string[]
  onSelect: (selected: string[]) => void
  label: string
}

export default function MultiSelect({ options, selected, onSelect, label }: MultiSelectProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onSelect(selected.filter((item) => item !== option))
    } else {
      onSelect([...selected, option])
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, selected.includes(option) && styles.selectedOption]}
            onPress={() => toggleOption(option)}
          >
            <Text style={[styles.optionText, selected.includes(option) && styles.selectedOptionText]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  selectedOption: {
    backgroundColor: "#00ADB5",
    borderColor: "#00ADB5",
  },
  optionText: {
    color: "#666",
    fontSize: 14,
  },
  selectedOptionText: {
    color: "#fff",
  },
})

