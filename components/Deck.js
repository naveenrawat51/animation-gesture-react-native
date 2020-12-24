import React from "react";
import { View, Animated } from "react-native";

export default function Deck({ data, renderCard }) {
  const renderCards = () => data.map((item) => renderCard(item));

  return <View>{renderCards()}</View>;
}
