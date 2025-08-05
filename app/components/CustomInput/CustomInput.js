import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  bordercolor = "#ccc",
  borderRadius = 10,
  iconName,
}) => {
  return (
    <View
      style={[
        styles.inputContainer,
        { borderColor: bordercolor, borderRadius: Number(borderRadius) },
      ]}
    >
      {iconName && (
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={24} color="#7D7D7D" />
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#ccc"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%", 
    height: 60, 
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginTop: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
});

export default CustomInput;
