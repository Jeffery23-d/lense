import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";


const BASE_URL = "https://your-api-url.com";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!email || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      setLoading(true);

      const data = {
        email,
        password,
      };

      try {
        console.log("Sending request:", data);
        const url = `${BASE_URL}/auth/register`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Response:", responseData);
          navigation.navigate("Verification", { email });
        } else {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          Alert.alert("Error", errorData?.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error:", error);
        Alert.alert("Error", "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.root}>
          <Image
            source={require("../assets/lense.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <CustomInput
            placeholder="Enter Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            borderColor={errors.email ? "red" : "#ccc"}
            borderRadius={15}
            iconName="mail"
            style={styles.input}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <View style={styles.passwordInputContainer}>
            <CustomInput
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              borderColor={errors.password ? "red" : "#ccc"}
              borderRadius={15}
              iconName="lock-closed"
              style={styles.input}
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#7D7D7D"
              style={styles.eyeIcon}
              onPress={toggleVisibility}
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <CustomButton
            text={loading ? "Processing..." : "Submit"}
            onPress={handleSignUp}
            bg="green"
            txt="white"
            disabled={loading}
          />

          <Text style={styles.text}>
            Already have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("login")}
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flexGrow: 1 },
  root: { alignItems: "center", padding: 20 },
  logo: { width: "50%", height: 200, marginBottom: 20, marginTop: 20 },
  input: {
    width: "100%",
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  eyeIcon: { marginLeft: -35, marginTop: 10, marginHorizontal: 10 },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
  },
  text: { textAlign: "center", marginVertical: 10 },
  link: { color: "green" },
});

export default signup;
