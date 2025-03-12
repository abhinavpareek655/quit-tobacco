"use client"

import { useState } from "react"
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Brain,
  AlertTriangle,
  BookOpen,
  Send,
  Users,
  Bell,
  ChevronRight,
  Sparkles,
  Activity,
} from "lucide-react-native"
import { Card, Avatar, Badge } from "@rneui/themed"

export default function ExplorePage() {
  const [message, setMessage] = useState("")

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Support</Text>
          <Text style={styles.headerSubtitle}>Your 24/7 companion for quitting tobacco</Text>
        </View>

        {/* Chatbot Section */}
        <View style={styles.section}>
          <Card containerStyle={styles.chatCard}>
            <View style={styles.chatHeader}>
              <View style={styles.chatHeaderLeft}>
                <Avatar
                  size={40}
                  rounded
                  icon={{ name: "robot", type: "material-community" }}
                  containerStyle={{ backgroundColor: "#4CAF50" }}
                />
                <View style={styles.chatHeaderInfo}>
                  <Text style={styles.chatbotName}>QuitBot</Text>
                  <Badge
                    value="Online"
                    status="success"
                    textStyle={{ fontSize: 10 }}
                    containerStyle={{ marginTop: 4 }}
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.historyButton}>
                <Text style={styles.historyButtonText}>View History</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.chatPreview}>
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>Hello! How can I help you with your quit journey today?</Text>
              </View>
            </View>

            <View style={styles.chatInput}>
              <TextInput
                style={styles.input}
                placeholder="Type your message..."
                value={message}
                onChangeText={setMessage}
                multiline
              />
              <TouchableOpacity style={styles.sendButton}>
                <Send color="#fff" size={20} />
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* AI Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Features</Text>
          <View style={styles.featuresGrid}>
            <TouchableOpacity style={styles.featureCard}>
              <Brain color="#4CAF50" size={24} />
              <Text style={styles.featureTitle}>Behavioral Analysis</Text>
              <Text style={styles.featureDescription}>Get personalized intervention strategies</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <AlertTriangle color="#4CAF50" size={24} />
              <Text style={styles.featureTitle}>Relapse Prevention</Text>
              <Text style={styles.featureDescription}>Predict and prevent high-risk situations</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <BookOpen color="#4CAF50" size={24} />
              <Text style={styles.featureTitle}>Smart Content</Text>
              <Text style={styles.featureDescription}>Tailored resources for your journey</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <Activity color="#4CAF50" size={24} />
              <Text style={styles.featureTitle}>Progress Insights</Text>
              <Text style={styles.featureDescription}>AI-powered progress tracking</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Personalized Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>For You</Text>
          <Card containerStyle={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <Sparkles color="#4CAF50" size={24} />
              <Text style={styles.recommendationTitle}>Today's Recommendations</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationsScroll}>
              <TouchableOpacity style={styles.recommendation}>
                <Text style={styles.recommendationType}>Exercise</Text>
                <Text style={styles.recommendationText}>5-minute mindfulness meditation</Text>
                <ChevronRight size={16} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.recommendation}>
                <Text style={styles.recommendationType}>Reading</Text>
                <Text style={styles.recommendationText}>Understanding withdrawal symptoms</Text>
                <ChevronRight size={16} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.recommendation}>
                <Text style={styles.recommendationType}>Activity</Text>
                <Text style={styles.recommendationText}>Deep breathing exercises</Text>
                <ChevronRight size={16} color="#666" />
              </TouchableOpacity>
            </ScrollView>
          </Card>
        </View>

        {/* Family Support Section */}
        <View style={styles.section}>
          <Card containerStyle={styles.supportCard}>
            <View style={styles.supportHeader}>
              <Users color="#4CAF50" size={24} />
              <Text style={styles.supportTitle}>Family Support Updates</Text>
            </View>
            <Text style={styles.supportDescription}>
              Keep your loved ones updated about your progress. They can receive SMS updates about your journey.
            </Text>
            <View style={styles.supportActions}>
              <TouchableOpacity style={styles.supportButton}>
                <Text style={styles.supportButtonText}>Add Supporters</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.supportSettingsButton}>
                <Bell color="#4CAF50" size={20} />
                <Text style={styles.supportSettingsText}>Notification Settings</Text>
              </TouchableOpacity>
            </View>
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
  chatCard: {
    borderRadius: 12,
    padding: 16,
    margin: 0,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chatHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatHeaderInfo: {
    marginLeft: 12,
  },
  chatbotName: {
    fontSize: 16,
    fontWeight: "600",
  },
  historyButton: {
    padding: 8,
  },
  historyButtonText: {
    color: "#4CAF50",
    fontSize: 14,
  },
  chatPreview: {
    marginBottom: 16,
  },
  messageBubble: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 14,
    color: "#333",
  },
  chatInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  recommendationCard: {
    borderRadius: 12,
    padding: 16,
    margin: 0,
  },
  recommendationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  recommendationsScroll: {
    marginLeft: -8,
    marginRight: -8,
  },
  recommendation: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    width: 200,
    flexDirection: "column",
  },
  recommendationType: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  supportCard: {
    borderRadius: 12,
    padding: 20,
    margin: 0,
  },
  supportHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  supportDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  supportActions: {
    flexDirection: "row",
    gap: 12,
  },
  supportButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 12,
    flex: 1,
  },
  supportButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  supportSettingsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 8,
  },
  supportSettingsText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600",
  },
})

