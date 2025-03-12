import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Book, Brain, Bell, PlayCircle, FileText, Award, ArrowRight, BookOpen } from "lucide-react-native"
import { Card } from "@rneui/themed"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";


export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Educational Resources</Text>
          <Text style={styles.headerSubtitle}>Your journey to a tobacco-free life starts here</Text>
        </View>

        {/* Information Hub Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information Hub</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
            <TouchableOpacity>
              <Card containerStyle={styles.card}>
                <Book color="#4CAF50" size={24} />
                <Text style={styles.cardTitle}>Health Effects</Text>
                <Text style={styles.cardDescription}>Learn about the impact of tobacco on your body</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.readMore}>Read More</Text>
                  <ArrowRight size={16} color="#4CAF50" />
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card containerStyle={styles.card}>
                <PlayCircle color="#4CAF50" size={24} />
                <Text style={styles.cardTitle}>Video Guides</Text>
                <Text style={styles.cardDescription}>Watch expert advice and success stories</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.readMore}>Watch Now</Text>
                  <ArrowRight size={16} color="#4CAF50" />
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card containerStyle={styles.card}>
                <BookOpen color="#4CAF50" size={24} />
                <Text style={styles.cardTitle}>Quitting Strategies</Text>
                <Text style={styles.cardDescription}>Evidence-based methods to quit successfully</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.readMore}>Learn More</Text>
                  <ArrowRight size={16} color="#4CAF50" />
                </View>
              </Card>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Tests and Quizzes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tests & Quizzes</Text>
          <View style={styles.quizGrid}>
            <TouchableOpacity style={styles.quizCard}>
              <Brain color="#4CAF50" size={24} />
              <Text style={styles.quizTitle}>Dependence Assessment</Text>
              <Text style={styles.quizTime}>5 min</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quizCard}>
              <FileText color="#4CAF50" size={24} />
              <Text style={styles.quizTitle}>Knowledge Check</Text>
              <Text style={styles.quizTime}>10 min</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quizCard}>
              <Award color="#4CAF50" size={24} />
              <Text style={styles.quizTitle}>Motivation Scale</Text>
              <Text style={styles.quizTime}>3 min</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Push Notifications</Text>
          <Card containerStyle={styles.notificationCard}>
            <View style={styles.notificationHeader}>
              <Bell color="#4CAF50" size={24} />
              <Text style={styles.notificationTitle}>Daily Motivation & Tips</Text>
            </View>
            <Text style={styles.notificationDescription}>
              Receive daily encouragement, helpful reminders, and practical tips to support your journey
            </Text>
            <TouchableOpacity style={styles.notificationButton} onPress={() => {
              AsyncStorage.clear();
              router.replace('/Login');
            }}>
              <Text style={styles.notificationButtonText}>Manage Notifications</Text>
            </TouchableOpacity>
          </Card>
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
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  cardsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  card: {
    width: 280,
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  readMore: {
    color: "#4CAF50",
    marginRight: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  quizGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quizCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  quizTime: {
    fontSize: 14,
    color: "#666",
  },
  notificationCard: {
    borderRadius: 12,
    padding: 20,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  notificationDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  notificationButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  notificationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
