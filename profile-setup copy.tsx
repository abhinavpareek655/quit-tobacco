"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Input } from "@rneui/themed"
import type { UserProfile } from "./types/profile"
import StepIndicator from "./components/step-indicator"
import FormSection from "./components/form-section"
import MultiSelect from "./components/multi-select"

const STEPS = [
  "Basic Information",
  "Smoking History",
  "Triggers",
  "Health",
  "Motivation",
  "Behavior",
  "Financial",
  "Preferences",
]

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(0)
  const [profile, setProfile] = useState<Partial<UserProfile>>({})

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  const renderBasicInfo = () => (
    <>
      <FormSection title="Personal Information">
        <Input
          label="Full Name"
          value={profile.name}
          onChangeText={(text) => updateProfile({ name: text })}
        />
        <Input
          label="Age"
          keyboardType="numeric"
          value={profile.age?.toString()}
          onChangeText={(text) => updateProfile({ age: Number.parseInt(text) || 0 })}
        />
        <MultiSelect
          label="Gender"
          options={["Male", "Female", "Other", "Prefer not to say"]}
          selected={profile.gender ? [profile.gender] : []}
          onSelect={(selected) => updateProfile({ gender: selected[0] })}
        />
      </FormSection>

      <FormSection title="Location">
        <Input
          label="Country"
          value={profile.location?.country}
          onChangeText={(text) => updateProfile({ location: { ...profile.location, country: text } })}
        />
        <Input
          label="State/Province"
          value={profile.location?.state}
          onChangeText={(text) => updateProfile({ location: { ...profile.location, state: text, country: profile.location?.country || "" } })}
        />
        <Input
          label="City"
          value={profile.location?.city}
          onChangeText={(text) => updateProfile({ location: { ...profile.location, city: text, country: profile.location?.country || "" } })}
        />
      </FormSection>

      <FormSection title="Professional Information">
        <Input
          label="Occupation"
          value={profile.occupation}
          onChangeText={(text) => updateProfile({ occupation: text })}
        />
        <MultiSelect
          label="Education Level"
          options={["High School", "Some College", "Bachelor's Degree", "Master's Degree", "Doctorate", "Other"]}
          selected={profile.educationLevel ? [profile.educationLevel] : []}
          onSelect={(selected) => updateProfile({ educationLevel: selected[0] })}
        />
      </FormSection>
    </>
  )

  const renderSmokingHistory = () => (
    <>
      <FormSection title="Tobacco Use">
        <MultiSelect
          label="Types of Tobacco Used"
          options={["PAAN / BETEL QUID WITH TOBACCO", "KHAINI", "CHEWING TOBACCO PLAIN / TAMBAKOO", "GUTHKA", "ZARDA / VIZAPATTA", "LOOSE LEAF / SADA PATA / CHADHA / TOBACCO LEAF", "GUL", "KHARRA", "KIWAM", "MISHRI", "MAWA", "DOHRA", "GUDAKHU", "NASWAR / NASS / NISWAR / NASVAY", "TAPKEER / TAPKIR / DRY SNUFF / BAJAR", "CREAMY SNUFF", "TUIBUR / TOBACCO WATER / HIDAKPHU", "TOOMBAK / SAUTE / SUTE / AMMARI / SAOOD", "MAINPURI / KAPOORI", "LAL DANTAMANJAN / RED TOOTH POWDER / RED TOOTH PASTE", "DISSOLVABLE TOBACCO", "SNUS", "MOIST SNUFF / DIP", "RAPÉ", "CHIMÓ", "TOMBOL", "TWIST / CHEW / CHAW / CHEWING TOBACCO", "SHAMMAH / EL-SHAMA / CHEMMA / AL-SHAMMAH", "PLUG / SPIT TOBACCO / CHEW / CHAW", "IQMIK / BLACK BULL/ DEDIGUSS", "GHANA TRADITIONAL SNUFF / TAWA", "NEFFA / TENFEHA / NUFHA", "SNUIF", "TAABA"]}
          selected={profile.tobaccoTypes || []}
          onSelect={(selected) => updateProfile({ tobaccoTypes: selected })}
        />
        <Input
          label="Brand Preference (Optional)"
          value={profile.brandPreference}
          onChangeText={(text) => updateProfile({ brandPreference: text })}
        />
      </FormSection>

      <FormSection title="Usage History">
        <Input
          label="Years of Use"
          keyboardType="numeric"
          value={profile.yearsOfUse?.toString()}
          onChangeText={(text) => updateProfile({ yearsOfUse: Number.parseInt(text) || 0 })}
        />
        <Input
          label="Daily Consumption"
          keyboardType="numeric"
          value={profile.dailyConsumption?.toString()}
          onChangeText={(text) => updateProfile({ dailyConsumption: Number.parseInt(text) || 0 })}
        />
        <Input
          label="Age When Started"
          keyboardType="numeric"
          value={profile.firstSmokingAge?.toString()}
          onChangeText={(text) => updateProfile({ firstSmokingAge: Number.parseInt(text) || 0 })}
        />
      </FormSection>
    </>
  )

  // Add more render functions for other steps...

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfo()
      case 1:
        return renderSmokingHistory()
      case 2:
        
      default:
        return null
    }
  }

  const canGoNext = () => {
    // Add validation logic based on currentStep
    return true
  }

  const canGoPrevious = () => {
    return currentStep > 0
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />
        <ScrollView style={styles.scrollView}>{renderCurrentStep()}</ScrollView>
        <View style={styles.navigation}>
          {canGoPrevious() && (
            <TouchableOpacity style={styles.navButton} onPress={() => setCurrentStep((prev) => prev - 1)}>
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          {currentStep < STEPS.length - 1 && (
            <TouchableOpacity
              style={[styles.navButton, styles.primaryButton]}
              onPress={() => setCurrentStep((prev) => prev + 1)}
              disabled={!canGoNext()}
            >
              <Text style={styles.primaryButtonText}>Next</Text>
            </TouchableOpacity>
          )}
          {currentStep === STEPS.length - 1 && (
            <TouchableOpacity
              style={[styles.navButton, styles.primaryButton]}
              onPress={() => {
                // Handle form submission
                console.log("Final profile data:", profile)
              }}
            >
              <Text style={styles.primaryButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
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
    padding: 16,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
  },
  navButtonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

