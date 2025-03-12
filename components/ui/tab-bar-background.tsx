import { Platform, View } from "react-native"
import { BlurView } from "expo-blur"
import { useTheme } from "@rneui/themed"

export default function TabBarBackground() {
  const { theme } = useTheme()

  if (Platform.OS === "ios") {
    return (
      <BlurView
        tint={theme.mode}
        intensity={80}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    )
  }

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.mode === "dark" ? "#1a1a1a" : "#ffffff",
      }}
    />
  )
}

