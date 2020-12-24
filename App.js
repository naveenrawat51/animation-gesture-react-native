import React, { useEffect, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import Ball from "./components/Ball";

export default function App() {
  let [position, setPosition] = useState(new Animated.ValueXY(0, 0));

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 200, y: 500 },
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View style={position.getLayout()}>
      <Ball />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 50,
  },
});
