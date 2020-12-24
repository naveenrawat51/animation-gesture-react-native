import React from "react";
import { View, StyleSheet, Animated } from "react-native";

export default function Ball() {
  return <View style={styles.ball} />;
}

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: "red",
    backgroundColor: "green",
  },
});
