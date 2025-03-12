"use client"

import { useState } from "react"
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Card } from "@rneui/themed"
import { Wallet, Heart, Battery, Leaf, Award, ChevronRight, ArrowUpRight, Zap } from "lucide-react-native"
import { LineChart, ProgressChart } from "react-native-chart-kit"

export default function ProgressPage() {
  const [timeFrame, setTimeFrame] = useState("week")

  // Mock data for charts
  const moodData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [3, 4, 3, 5, 4, 4, 5],
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
      },
    ],
  }

  const progressData = {
    labels: ["Health", "Cravings", "Mood"], // These labels aren't shown
    data: [0.8, 0.6, 0.9],
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header with Summary */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Progress</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Days Smoke-Free</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹150</Text>
              <Text style={styles.statLabel}>Money Saved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>75</Text>
              <Text style={styles.statLabel}>Cravings Beaten</Text>
            </View>
          </View>
        </View>

        {/* Time Frame Selector */}
        <View style={styles.timeFrameContainer}>
          <TouchableOpacity
            style={[styles.timeFrameButton, timeFrame === "week" && styles.timeFrameButtonActive]}
            onPress={() => setTimeFrame("week")}
          >
            <Text style={[styles.timeFrameText, timeFrame === "week" && styles.timeFrameTextActive]}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.timeFrameButton, timeFrame === "month" && styles.timeFrameButtonActive]}
            onPress={() => setTimeFrame("month")}
          >
            <Text style={[styles.timeFrameText, timeFrame === "month" && styles.timeFrameTextActive]}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.timeFrameButton, timeFrame === "year" && styles.timeFrameButtonActive]}
            onPress={() => setTimeFrame("year")}
          >
            <Text style={[styles.timeFrameText, timeFrame === "year" && styles.timeFrameTextActive]}>Year</Text>
          </TouchableOpacity>
        </View>

        {/* Mood Tracking */}
        <View style={styles.section}>
          <Card containerStyle={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Mood Tracking</Text>
              <TouchableOpacity>
                <ChevronRight size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <LineChart
              data={moodData}
              width={300}
              height={180}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={styles.chart}
            />
          </Card>
        </View>

        {/* Progress Overview */}
        <View style={styles.section}>
          <Card containerStyle={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Progress Overview</Text>
              <TouchableOpacity>
                <ArrowUpRight size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <ProgressChart
              data={progressData}
              width={300}
              height={180}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              }}
              hideLegend={false}
              style={styles.chart}
            />
          </Card>
        </View>

        {/* Health Improvements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Improvements</Text>
          <View style={styles.healthGrid}>
            <View style={styles.healthCard}>
              <Heart color="#4CAF50" size={24} />
              <Text style={styles.healthValue}>+15%</Text>
              <Text style={styles.healthLabel}>Blood Circulation</Text>
            </View>
            <View style={styles.healthCard}>
              <Battery color="#4CAF50" size={24} />
              <Text style={styles.healthValue}>+25%</Text>
              <Text style={styles.healthLabel}>Energy Level</Text>
            </View>
            <View style={styles.healthCard}>
              <Leaf color="#4CAF50" size={24} />
              <Text style={styles.healthValue}>+20%</Text>
              <Text style={styles.healthLabel}>Lung Capacity</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
            <TouchableOpacity style={styles.achievementCard}>
              <Award color="#FFD700" size={32} />
              <Text style={styles.achievementTitle}>Two Weeks Clean!</Text>
              <Text style={styles.achievementDesc}>Stayed smoke-free for 14 days</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.achievementCard}>
              <Zap color="#FFD700" size={32} />
              <Text style={styles.achievementTitle}>Craving Master</Text>
              <Text style={styles.achievementDesc}>Overcame 50 cravings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.achievementCard}>
              <Wallet color="#FFD700" size={32} />
              <Text style={styles.achievementTitle}>Money Saver</Text>
              <Text style={styles.achievementDesc}>Saved ₹100 from not smoking</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#4CAF50",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.9,
  },
  timeFrameContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  timeFrameButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  timeFrameButtonActive: {
    backgroundColor: "#4CAF50",
  },
  timeFrameText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600",
  },
  timeFrameTextActive: {
    color: "#fff",
  },
  section: {
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 0,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  chart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    marginVertical: 8,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  healthGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  healthCard: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  healthValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginVertical: 8,
  },
  healthLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  achievementsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  achievementCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 160,
    alignItems: "center",
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
    textAlign: "center",
  },
  achievementDesc: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
})

