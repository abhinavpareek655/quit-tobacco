"use client"

import React from "react"
import { TouchableOpacity } from "react-native"
import * as Haptics from "expo-haptics"

export function HapticTab(props: any) {
  const { onPress, ...otherProps } = props

  const handlePress = React.useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPress?.()
  }, [onPress])

  return <TouchableOpacity {...otherProps} onPress={handlePress} />
}

