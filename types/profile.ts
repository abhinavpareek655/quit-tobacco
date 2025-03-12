export interface UserProfile {
  // Basic Demographics
  name?: string
  age: number
  email: string
  gender: string
  location: {
    country: string
    state?: string
    city?: string
  }
  occupation?: string
  educationLevel?: string

  // Smoking Habits & History
  tobaccoTypes: string[]
  brandPreference?: string
  yearsOfUse: number
  dailyConsumption: number
  firstSmokingAge: number
  heaviestConsumptionPeriod?: string
  previousQuitAttempts: boolean
  numberOfQuitAttempts?: number
  longestQuitDuration?: string
  relapseReasons?: string[]

  // Triggers & Context
  mainReasons: string[]
  situationalTriggers: string[]
  socialTriggers: string[]
  emotionalTriggers: string[]
  physicalTriggers: string[]
  preferredTimes: string[]

  // Health & Lifestyle
  medicalConditions: string[]
  mentalHealthConditions: string[]
  physicalActivityLevel: string
  dietHabits: string
  alcoholConsumption: string
  caffeineConsumption: string
  sleepHours: number
  sleepQuality: string
  stressLevel: string

  // Motivation & Readiness
  primaryReasonToQuit: string
  confidenceLevel: number
  readinessToQuit: string
  preferredQuitMethod: string
  supportSystem: string[]

  // Behavioral & Psychological
  selfDisciplineLevel: string
  copingStrategies: string[]
  pastAddictions?: string[]
  alternativeHabits: string[]
  progressTrackingPreference: string[]

  // Financial & Logistical
  monthlyTobaccoExpense: number
  preferredRewardMethod: string[]
  accessToCessationAids: string[]

  // Digital Preferences
  communicationPreferences: string[]
  motivationalContentTypes: string[]
  willShareProgress: string

  // Password
  password: string
}

