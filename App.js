import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, View } from "react-native";
import Ball from "./components/Ball";
import Deck from "./components/Deck";
import { Card, Text, Button, Icon } from "react-native-elements";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "https://randomuser.me/api/portraits/men/72.jpg",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "https://randomuser.me/api/portraits/men/73.jpg",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "https://randomuser.me/api/portraits/men/74.jpg",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "https://randomuser.me/api/portraits/men/78.jpg",
  },
];

export default function App() {
  let [position, setPosition] = useState(new Animated.ValueXY(0, 0));

  const renderCard = (item) => (
    <Card key={item.id}>
      <Card.Image source={{ uri: item.uri }} />
      <Text style={{ marginVertical: 10 }}>{item.text}</Text>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="VIEW NOW"
      />
    </Card>
  );

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 200, y: 500 },
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    // <Animated.View style={position.getLayout()}>  enable ball component specific code if you wish to check ball animation
    //   <Ball />
    // </Animated.View>
    <View style={styles.container}>
      <Deck data={DATA} renderCard={renderCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 50,
  },
});
