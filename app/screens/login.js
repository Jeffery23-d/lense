import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    setErrors(newErrors);
    return valid;
  };

  const mockSignIn = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Login successful for email:", email);
        navigation.navigate("Home");
      } catch (error) {
        Alert.alert("Error", "Something went wrong during login.");
      } finally {
        setLoading(false);
      }
    }
  };

  const forgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const signUpPressed = () => {
    navigation.navigate("signup");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.root}>
        <Text style={styles.title}>Log into your account</Text>

        <CustomInput
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: "" }));
            }
          }}
          keyboardType="email-address"
          bordercolor={errors.email ? "red" : "#ccc"}
          borderRadius={15}
          iconName="mail"
          style={styles.emailInput}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}

        <View style={styles.passwordContainer}>
          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError("");
            }}
            secureTextEntry={!showPassword}
            bordercolor={passwordError ? "red" : "#ccc"}
            borderRadius={15}
            iconName="lock-closed"
          />
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#7D7D7D"
            style={styles.eyeIcon}
            onPress={toggleVisibility}
          />
        </View>
        {passwordError && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

        <Text style={styles.link} onPress={forgotPasswordPressed}>
          Forgot your password?
        </Text>

        <View style={styles.bottomSection}>
          <CustomButton
            onPress={mockSignIn}
            bg="green"
            txt="white"
            style={styles.button}
            text={loading ? "Processing..." : "Next"}
            disabled={loading}
          />
          <Text style={styles.text}>
            Don't have an account?{" "}
            <Text style={styles.link} onPress={signUpPressed}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  root: {
    alignItems: "center",
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 20,
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 15,
  },
  link: {
    color: "green",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  bottomSection: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
  },
  button: {
    marginVertical: 20,
  },
  text: {
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
  },
});

export default LogIn;
