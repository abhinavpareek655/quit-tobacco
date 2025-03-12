import { useState, useEffect , useRef} from "react"
import { 
View, 
ScrollView, 
StyleSheet, 
TouchableOpacity, 
Text, 
KeyboardAvoidingView, 
Platform, 
TextInput, 
Alert, 
NativeSyntheticEvent, 
TextInputKeyPressEventData,
ActivityIndicator
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Input, Slider } from "@rneui/themed"
import type { UserProfile } from "../../types/profile"
import StepIndicator from "../../components/step-indicator"
import FormSection from "../../components/form-section"
import MultiSelect from "../../components/multi-select"
import axios from 'axios';
import { SegmentedButtons } from 'react-native-paper';
import { router } from "expo-router"

const API_URL = 'http://192.168.87.238:5000/api/user-profile';
const VER_URL = 'http://192.168.87.238:5000/api/verify';

const sendUserProfile = async (userProfile: UserProfile) => {
  try {
    console.log(userProfile);
    const response = await axios.post(API_URL, userProfile, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Profile saved:', response.data);
  } catch (error) {
    console.error('Error saving profile:', error);
  }
};

const STEPS = [
  "Basic Information",
  "Tobacco Consumption History",
  "Triggers",
  "Health",
  "Motivation",
  "Behavior",
  "Financial",
  "Preferences",
  "Email Verification",
  "Password Setup",
]

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(0)
  const [profile, setProfile] = useState<Partial<UserProfile>>({})
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordError, setPasswordError] = useState("")
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputs = useRef<(TextInput | null)[]>([])
  const [error, setError] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  
    // Move to next input when text is entered
    if (text.length === 1 && index < code.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      setError('not enough digits');
      return;
    }

    try {
      setError('');

      const response = await axios.post(VER_URL, {
        email: profile.email,
        otp: verificationCode
      });

      if (response.data.success) {
        setError('Verification Successful!');
        setLoading(false);
        setCurrentStep((prev) => prev + 1);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Verification failed');
      } else {
        setError('Verification failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    setLoading(true);
    try {
      setError('');

      const response = await axios.post(VER_URL+'/send-otp', {
        email: profile.email,
      });

      if (response.data.success) {
        setError('OTP Sent Successfully!');
        setEmailSent(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'OTP sending failed');
      } else {
        setError('OTP sending failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = ({ nativeEvent }: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (nativeEvent.key === 'Backspace') {
      if (code[index] === '' && index > 0) {
        // Delete previous input's content and focus it
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0

    if (pass.length >= 8) strength += 1
    if (/[A-Z]/.test(pass)) strength += 1
    if (/[a-z]/.test(pass)) strength += 1
    if (/[0-9]/.test(pass)) strength += 1
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1

    setPasswordStrength(strength)
  }
  
  useEffect(() => {
    calculatePasswordStrength(password)
  }, [password])

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  const getStrengthText = () => {
    if (password.length === 0) return ""
    if (passwordStrength < 2) return "Weak"
    if (passwordStrength < 4) return "Medium"
    return "Strong"
  }

  const onSubmit = (password: string) => {
    profile.password = password;
  };

  const handleSubmit = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      return
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (passwordStrength < 3) {
      Alert.alert("Weak Password", "Your password is not very strong. Do you want to continue anyway?", [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", onPress: () => onSubmit(password) },
      ])
      return
    }

    setPasswordError("")
    onSubmit(password)
  }

  const getStrengthColor = () => {
    if (password.length === 0) return "#EEEEEE"
    if (passwordStrength < 2) return "#FF6B6B"
    if (passwordStrength < 4) return "#FFD166"
    return "#06D6A0"
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
            label="Email Address"
            value={profile.email}
            onChangeText={(text) => updateProfile({ email: text })}
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
            onSelect={(selected) => updateProfile({ gender: selected.length > 0 ? selected[selected.length - 1] : "", })}
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
            onSelect={(selected) => updateProfile({ educationLevel : selected.length > 0 ? selected[selected.length - 1] : "", })}
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

  const renderTriggersAndContext = () => (
    <>
      <FormSection title="Main Reasons for Tobacco Consumption">
        <MultiSelect
          label="Select all that apply"
          options={[
            "Stress Relief",
            "Habit/Routine",
            "Social Pressure",
            "Pleasure/Enjoyment",
            "Concentration Aid",
            "Weight Control",
            "Other",
          ]}
          selected={profile.mainReasons || []}
          onSelect={(selected) => updateProfile({ mainReasons: selected })}
        />
      </FormSection>

      <FormSection title="Situational Triggers">
        <MultiSelect
          label="When do you typically consume tobacco?"
          options={[
            "After Meals",
            "With Coffee",
            "With Alcohol",
            "During Work Breaks",
            "While Driving",
            "When Bored",
            "During Social Events",
          ]}
          selected={profile.situationalTriggers || []}
          onSelect={(selected) => updateProfile({ situationalTriggers: selected })}
        />
      </FormSection>

      <FormSection title="Emotional Triggers">
        <MultiSelect
          label="Which emotions trigger consuming tobacco?"
          options={["Stress", "Anxiety", "Loneliness", "Sadness", "Anger", "Joy/Celebration", "Boredom"]}
          selected={profile.emotionalTriggers || []}
          onSelect={(selected) => updateProfile({ emotionalTriggers: selected })}
        />
      </FormSection>

      <FormSection title="Preferred Tobacco Consumption Times">
        <MultiSelect
          label="Select typical smoking times"
          options={[
            "Early Morning",
            "Morning Break",
            "After Lunch",
            "Afternoon Break",
            "Evening",
            "Before Bed",
            "Middle of Night",
          ]}
          selected={profile.preferredTimes || []}
          onSelect={(selected) => updateProfile({ preferredTimes: selected })}
        />
      </FormSection>
    </>
  )

  const renderHealthAndLifestyle = () => (
    <>
      <FormSection title="Medical Conditions">
        <MultiSelect
          label="Select any existing conditions"
          options={["Heart Disease", "Hypertension", "Diabetes", "Asthma", "COPD", "None", "Other"]}
          selected={profile.medicalConditions || []}
          onSelect={(selected) => {
            if (selected.includes("None")) {
              updateProfile({ medicalConditions: ["None"] });
            } else {
              updateProfile({ medicalConditions: selected.filter((item) => item !== "None") });
            }
          }}
        />
      </FormSection>

      <FormSection title="Mental Health">
        <MultiSelect
          label="Select any relevant conditions"
          options={["Anxiety", "Depression", "ADHD", "Stress Disorder", "None", "Other"]}
          selected={profile.mentalHealthConditions || []}
          onSelect={(selected) => {
            if (selected.includes("None")) {
              updateProfile({ mentalHealthConditions: ["None"] });
            } else {
              updateProfile({ mentalHealthConditions: selected.filter((item) => item !== "None") });
            }
          }}
        />
      </FormSection>

      <FormSection title="Lifestyle Factors">
        <MultiSelect
          label="Physical Activity Level"
          options={["Sedentary", "Light", "Moderate", "Active", "Very Active"]}
          selected={profile.physicalActivityLevel ? [profile.physicalActivityLevel] : []}
          onSelect={(selected) => updateProfile({ physicalActivityLevel: selected.length > 0 ? selected[selected.length - 1] : "", })}
        />

        <MultiSelect
          label="Diet Habits"
          options={["Healthy", "Balanced", "Occasional Junk Food", "Mostly Junk Food"]}
          selected={profile.dietHabits ? [profile.dietHabits] : []}
          onSelect={(selected) => updateProfile({ dietHabits: selected.length > 0 ? selected[selected.length - 1] : "", })}
        />

        <MultiSelect
          label="Alcohol Consumption"
          options={["Never", "Occasionally", "Regularly", "Daily"]}
          selected={profile.alcoholConsumption ? [profile.alcoholConsumption] : []}
          onSelect={(selected) => updateProfile({ alcoholConsumption: selected.length > 0 ? selected[selected.length - 1] : "", })}
        />

        <MultiSelect
          label="Caffeine Consumption"
          options={["Never", "Occasionally", "Regularly", "Daily"]}
          selected={profile.caffeineConsumption ? [profile.caffeineConsumption] : []}
          onSelect={(selected) => updateProfile({ caffeineConsumption: selected.length > 0 ? selected[selected.length - 1] : "", })}
        />
      </FormSection>

      <FormSection title="Sleep Patterns">
        <Input
          label="Average Hours of Sleep per Night"
          keyboardType="numeric"
          value={profile.sleepHours?.toString()}
          onChangeText={(text) => updateProfile({ sleepHours: Number.parseInt(text) || 0 })}
        />
        <MultiSelect
          label="Sleep Quality"
          options={["Poor", "Fair", "Good", "Excellent"]}
          selected={profile.sleepQuality ? [profile.sleepQuality] : []}
          onSelect={(selected) => updateProfile({ sleepQuality: selected.length > 0 ? selected[selected.length - 1] : "", })}
        />
      </FormSection>
    </>
  )

  const renderMotivationAndReadiness = () => (
    <>
      <FormSection title="Quit Motivation">
        <MultiSelect
          label="Primary Reason for Quitting"
          options={[
            "Health Concerns",
            "Family/Relationships",
            "Financial Reasons",
            "Social Pressure",
            "Pregnancy/Children",
            "Better Quality of Life",
            "Other",
          ]}
          selected={profile.primaryReasonToQuit ? [profile.primaryReasonToQuit] : []}
          onSelect={(selected) => updateProfile({ primaryReasonToQuit: selected.length > 0 ? selected[selected.length - 1] : "", })}
        />
      </FormSection>

      <FormSection title="Confidence Assessment">
        <Text style={styles.segmentedButtonsLabels}>How confident are you in your ability to quit? (1-5)</Text>
        <View style={styles.segmentedContainer}>
          <SegmentedButtons
            value={profile.confidenceLevel?.toString() || "5"}
            onValueChange={(value) => updateProfile({ confidenceLevel: parseInt(value) })}
            buttons={[
              { label: "1", value: "1", style: styles.button, checkedColor: "#00ADB5" },
              { label: "2", value: "2", style: styles.button, checkedColor: "#00ADB5" },
              { label: "3", value: "3", style: styles.button, checkedColor: "#00ADB5" },
              { label: "4", value: "4", style: styles.button, checkedColor: "#00ADB5" },
              { label: "5", value: "5", style: styles.button, checkedColor: "#00ADB5" },
            ]}
            theme={{ roundness: 10 }}
            style={styles.segmentedButtons}
          />
        </View>
        <Text style={styles.sliderValue}>{profile.confidenceLevel || 5}</Text>
      </FormSection>

      <FormSection title="Quit Timeline">
        <MultiSelect
          label="When do you plan to quit?"
          options={["Immediately", "Within a week", "Within a month", "Within 3 months", "Not sure yet"]}
          selected={profile.readinessToQuit ? [profile.readinessToQuit] : []}
          onSelect={(selected) => updateProfile({ readinessToQuit: selected.length > 0 ? selected[selected.length - 1] : "", })}
        />
      </FormSection>

      <FormSection title="Preferred Quit Method">
        <MultiSelect
          label="How would you like to quit?"
          options={[
            "Cold Turkey",
            "Gradual Reduction",
            "Nicotine Replacement",
            "Medication",
            "Behavioral Therapy",
            "Not Sure",
          ]}
          selected={profile.preferredQuitMethod ? [profile.preferredQuitMethod] : []}
          onSelect={(selected) => updateProfile({ preferredQuitMethod: selected.length > 0 ? selected[selected.length - 1] : "", })}
        />
      </FormSection>
    </>
  )

  const renderBehavioralAndPsychological = () => (
    <>
      <FormSection title="Self-Assessment">
        <MultiSelect
          label="Self-Discipline Level"
          options={["Low", "Moderate", "High"]}
          selected={profile.selfDisciplineLevel ? [profile.selfDisciplineLevel] : []}
          onSelect={(selected) => updateProfile({ selfDisciplineLevel: selected.length > 0 ? selected[selected.length - 1] : "", })}
        />
      </FormSection>

      <FormSection title="Coping Strategies">
        <MultiSelect
          label="Select preferred methods"
          options={[
            "Exercise",
            "Meditation",
            "Deep Breathing",
            "Journaling",
            "Hobby Activities",
            "Social Support",
            "Professional Help",
          ]}
          selected={profile.copingStrategies || []}
          onSelect={(selected) => updateProfile({ copingStrategies: selected })}
        />
      </FormSection>

      <FormSection title="Alternative Habits">
        <MultiSelect
          label="Interested in trying"
          options={[
            "Chewing Gum",
            "Fidget Toys",
            "Exercise",
            "Meditation",
            "Art/Creative Activities",
            "Reading",
            "Other Hobbies",
          ]}
          selected={profile.alternativeHabits || []}
          onSelect={(selected) => updateProfile({ alternativeHabits: selected })}
        />
      </FormSection>
    </>
  )

  const renderFinancialConsiderations = () => (
    <>
      <FormSection title="Financial Impact">
        <Input
          label="Monthly Tobacco Expenses ($)"
          keyboardType="numeric"
          value={profile.monthlyTobaccoExpense?.toString()}
          onChangeText={(text) => updateProfile({ monthlyTobaccoExpense: Number.parseInt(text) || 0 })}
        />
      </FormSection>

      <FormSection title="Reward Preferences">
        <MultiSelect
          label="How would you like to track progress?"
          options={[
            "Money Saved Calculator",
            "Achievement Badges",
            "Health Milestones",
            "Personal Goal Tracking",
            "Reward System",
          ]}
          selected={profile.preferredRewardMethod || []}
          onSelect={(selected) => updateProfile({ preferredRewardMethod: selected })}
        />
      </FormSection>
    </>
  )

  const renderDigitalPreferences = () => (
    <>
      <FormSection title="App Preferences">
        <MultiSelect
          label="Preferred Communication Methods"
          options={[
            "Push Notifications",
            "Email Updates",
            "In-App Messages",
            "Daily Tips",
            "Progress Reports",
            "Community Posts",
          ]}
          selected={profile.communicationPreferences || []}
          onSelect={(selected) => updateProfile({ communicationPreferences: selected })}
        />
      </FormSection>

      <FormSection title="Content Preferences">
        <MultiSelect
          label="What motivates you?"
          options={[
            "Success Stories",
            "Health Facts",
            "Financial Savings",
            "Scientific Research",
            "Tips & Tricks",
            "Community Support",
          ]}
          selected={profile.motivationalContentTypes || []}
          onSelect={(selected) => updateProfile({ motivationalContentTypes: selected })}
        />
      </FormSection>

      <FormSection title="Social Features">
        <MultiSelect
          label="Would you like to:"
          options={[
            "Share Progress Publicly",
            "Share Anonymously",
            "Connect with Others",
            "Join Support Groups",
            "Prefer Private Journey",
          ]}
          selected={profile.willShareProgress ? [profile.willShareProgress] : []}
          onSelect={(selected) =>
            updateProfile({
              willShareProgress: selected.length > 0 ? selected[selected.length - 1] : "",
            })
          }
        />
      </FormSection>
    </>
  )

  const renderEmailVerification = () => (
    <>
      <View style={styles.content}>
      <Text style={styles.title}>Verification</Text>
      {emailSent ? <Text style={styles.subtitle}>Enter the 6-digit code sent to {profile.email}</Text> : 
        <Text style={styles.subtitle}>Click 'Send Code' to receive a verification code at {profile.email}</Text>}

      {emailSent ? <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.codeInput}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            onKeyPress={(key) => handleKeyPress(key, index)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View> : null }
      {error === "not enough digits" ? <Text style={styles.errorTextVerify}>Please enter 6 digits varification code</Text> : null}

      {!emailSent && (
        <TouchableOpacity style={styles.passButton} onPress={handleSendCode} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Send Code</Text>}
        </TouchableOpacity>
      )}
        

      {emailSent && (
        <TouchableOpacity style={styles.passButton} onPress={handleVerify} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Verify</Text>}
        </TouchableOpacity>
      )}

      {emailSent && (
        <TouchableOpacity style={styles.resendButton} onPress={handleSendCode} disabled={loading}>
          {loading ? <ActivityIndicator size="large" color="#00ADB5" /> : <Text style={styles.resendButtonText}>Resend Code</Text>}
        </TouchableOpacity>
      )}

      {error && (error === 'OTP Sent Successfully!' || error === 'Verification Successful!') ? (
        <Text style={[styles.errorTextVerify, { color: '#06D6A0', fontWeight: 'bold', }]}>{error}</Text>
      ) : (
        <Text style={styles.errorTextVerify}>{error}</Text>
      )}

      <View style={styles.changeEmailContainer}>
        <Text style={styles.changeEmailText}>Not your email address? </Text>
            <TouchableOpacity 
                onPress={() => setCurrentStep((prev) => prev - 8)}
            >        
        <Text style={styles.changeEmailLink}>Change email</Text>
            </TouchableOpacity>
      </View>
      </View>
    </>
  )

  const renderPasswordSetup = () => (
    <>
        <View style={styles.content}>
          <Text style={styles.title}>Create Password</Text>
          <Text style={styles.subtitle}>
            Your password must be at least 8 characters and include a mix of letters, numbers, and symbols.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={profile.password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.strengthContainer}>
            <View style={styles.strengthBars}>
              {[1, 2, 3, 4, 5].map((level) => (
                <View
                  key={level}
                  style={[
                    styles.strengthBar,
                    {
                      backgroundColor: passwordStrength >= level ? getStrengthColor() : "#EEEEEE",
                    },
                  ]}
                />
              ))}
            </View>
            <Text style={[styles.strengthText, { color: getStrengthColor() }]}>{getStrengthText()}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              placeholderTextColor="#999"
            />
          </View>

          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TouchableOpacity style={styles.passButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Set Password</Text>
          </TouchableOpacity>
        </View>
      </>
  )
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfo()
      case 1:
        return renderSmokingHistory()
      case 2:
        return renderTriggersAndContext()
      case 3:
        return renderHealthAndLifestyle()
      case 4:
        return renderMotivationAndReadiness()
      case 5:
        return renderBehavioralAndPsychological()
      case 6:
        return renderFinancialConsiderations()
      case 7:
        return renderDigitalPreferences()
      case 8:
        return renderEmailVerification()
      case 9:
        return renderPasswordSetup()
      default:
        return null
    }
  }

  const canGoNext = () => {
    return true;
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
                sendUserProfile(profile as UserProfile);
                router.replace("../(app)");
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
    borderColor: "#00ADB5",
  },
  primaryButton: {
    backgroundColor: "#00ADB5",
  },
  navButtonText: {
    color: "#00ADB5",
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  segmentedButtonsLabels: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    color: "#00ADB5",
  },
  sliderThumb: {
    backgroundColor: "#00ADB5",
    width: 24,
    height: 24,
  },
  sliderTrack: {
    height: 4,
  },
  segmentedContainer: {
    width: "80%", 
    alignSelf: "center", 
  },
  segmentedButtons: {
    borderRadius: 10,
    justifyContent: "center",
    flexDirection: "row",
    width: "100%", 
    backgroundColor: "#f0f0f0", 
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#ffffff", // Default button color
    borderColor: "#00ADB5", // Border color
    borderWidth: 0.3,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222831",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#393E46",
    marginBottom: 32,
    opacity: 0.8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#393E46",
    marginBottom: 8,
  },
  input: {
    borderColor: "#00ADB5",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    color: "#222831",
    fontSize: 16,
  },
  strengthContainer: {
    marginBottom: 24,
  },
  strengthBars: {
    flexDirection: "row",
    marginBottom: 8,
  },
  strengthBar: {
    flex: 1,
    height: 6,
    marginHorizontal: 2,
    borderRadius: 3,
  },
  strengthText: {
    fontSize: 14,
    textAlign: "right",
  },
  passButton: {
    backgroundColor: "#00ADB5",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: -12,
    marginBottom: 12,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  codeInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: "#00ADB5",
    borderRadius: 8,
    color: "#222831",
    fontSize: 24,
    textAlign: "center",
  },
  errorTextVerify: {
    color: "#ff4d4d",
    fontSize: 14,
    marginTop: 11,
  },
  changeEmailContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  changeEmailText: {
    color: '#888',
  },
  changeEmailLink: {
    color: '#00ADB5',
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: 20,
  },
  resendButtonText: {
    color: "#00ADB5",
    fontSize: 16,
  },
})

