import React from "react";
import { View, Text, StyleSheet, Pressable, TouchableHighlight, TouchableOpacity } from "react-native";

const CustomButton = ({ onPress, text, bg, txt, bordercolor='transparent' }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: bg, borderWidth:1, borderColor: bordercolor }]}
    >
      <Text style={[styles.text, { color: txt }]}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#FB6666",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
});
export default CustomButton;
