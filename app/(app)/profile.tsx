import React from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Settings,
  Bell,
  Moon,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Award,
  Wallet,
  Activity,
  Share2,
} from "lucide-react-native"
import { useTheme } from "@rneui/themed"

interface MenuItem {
  icon: React.ReactNode
  title: string
  subtitle?: string
  value?: string | boolean
  onPress?: () => void
  type?: "switch" | "button"
}

export default function ProfileScreen() {
  const { theme, updateTheme } = useTheme()
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const [darkMode, setDarkMode] = React.useState(theme.mode === "dark")

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
    updateTheme((theme) => ({
      mode: theme.mode === "light" ? "dark" : "light",
    }))
  }

  const progressStats = [
    { label: "Smoke-Free Days", value: "15" },
    { label: "Money Saved", value: "₹150" },
    { label: "Cravings Resisted", value: "45" },
  ]

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: "Progress",
      items: [
        {
          icon: <Award size={24} color={theme.colors.primary} />,
          title: "Achievements",
          subtitle: "8 badges earned",
          onPress: () => console.log("Achievements"),
        },
        {
          icon: <Wallet size={24} color={theme.colors.primary} />,
          title: "Savings",
          subtitle: "Track your financial progress",
          onPress: () => console.log("Savings"),
        },
        {
          icon: <Activity size={24} color={theme.colors.primary} />,
          title: "Health Timeline",
          subtitle: "See your health improvements",
          onPress: () => console.log("Health Timeline"),
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: <Bell size={24} color={theme.colors.primary} />,
          title: "Notifications",
          type: "switch",
          value: notificationsEnabled,
          onPress: () => setNotificationsEnabled(!notificationsEnabled),
        },
        {
          icon: <Moon size={24} color={theme.colors.primary} />,
          title: "Dark Mode",
          type: "switch",
          value: darkMode,
          onPress: handleDarkModeToggle,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: <Shield size={24} color={theme.colors.primary} />,
          title: "Privacy Policy",
          onPress: () => console.log("Privacy Policy"),
        },
        {
          icon: <HelpCircle size={24} color={theme.colors.primary} />,
          title: "Help & Support",
          onPress: () => console.log("Help & Support"),
        },
        {
          icon: <Share2 size={24} color={theme.colors.primary} />,
          title: "Share App",
          onPress: () => console.log("Share App"),
        },
      ],
    },
  ]

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity key={item.title} style={styles.menuItem} onPress={item.onPress} disabled={item.type === "switch"}>
      <View style={styles.menuItemLeft}>
        {item.icon}
        <View style={styles.menuItemText}>
          <Text style={[styles.menuItemTitle, { color: theme.mode === "dark" ? "#fff" : "#1a1a1a" }]}>
            {item.title}
          </Text>
          {item.subtitle && <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>}
        </View>
      </View>
      {item.type === "switch" ? (
        <Switch
          value={item.value as boolean}
          onValueChange={item.onPress}
          trackColor={{ false: "#767577", true: theme.colors.primary }}
          thumbColor="#fff"
        />
      ) : (
        <ChevronRight size={20} color="#999" />
      )}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.mode === "dark" ? "#000" : "#fff" }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image source={{ uri: "https://i.pravatar.cc/150" }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={[styles.name, { color: theme.mode === "dark" ? "#fff" : "#1a1a1a" }]}>John Doe</Text>
              <Text style={styles.email}>john.doe@example.com</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton} onPress={() => console.log("Settings")}>
              <Settings size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            {progressStats.map((stat, index) => (
              <View key={stat.label} style={[styles.statItem, index < 2 && styles.statBorder]}>
                <Text style={[styles.statValue, { color: theme.mode === "dark" ? "#fff" : "#1a1a1a" }]}>
                  {stat.value}
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {menuSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.mode === "dark" ? "#fff" : "#666" }]}>
              {section.title}
            </Text>
            <View style={styles.menuContainer}>{section.items.map((item) => renderMenuItem(item))}</View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={() => console.log("Logout")}>
          <LogOut size={24} color="#FF5252" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  settingsButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statBorder: {
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 20,
    marginBottom: 8,
  },
  menuContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemText: {
    marginLeft: 16,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: "#666",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 32,
    backgroundColor: "#FFF5F5",
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#FF5252",
  },
})

