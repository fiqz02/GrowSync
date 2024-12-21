import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator, Image
} from "react-native";
import { auth } from "../firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleAuthAction = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Registration successful.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Login successful.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email to reset the password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/GrowSync.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#666"
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showPasswordToggle}
        >
          <Text style={styles.showPasswordText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      {isRegistering && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholderTextColor="#666"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.showPasswordToggle}
          >
            <Text style={styles.showPasswordText}>
              {showConfirmPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#00008b" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
            <Text style={styles.buttonText}>
              {isRegistering ? "Register" : "Login"}
            </Text>
          </TouchableOpacity>

          {!isRegistering && (
            <TouchableOpacity onPress={handlePasswordReset}>
              <View style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => setIsRegistering(!isRegistering)}
            style={styles.switchButton}
          >
            <Text style={styles.switchText}>
              {isRegistering
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#87cefa", // Light blue background
  },
  logo: {
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    alignSelf: "center", // Center the logo
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    position: "fixed",
  },
  input: {
    borderWidth: 1,
    borderColor: "#00008b", // Blue border
    borderRadius: 8,
    padding: 12,
    paddingRight: 50, // Space for 'Show' button
    fontSize: 16,
    backgroundColor: "#ffffff", // White background
    color: "#00008b", // Dark blue text
    marginBottom: 10,
  },
  showPasswordToggle: {
    position: "absolute",
    right: 10,
    top: 13, // Align with text input
  },
  showPasswordText: {
    fontSize: 16,
    color: "#00008b", // Bright blue for show/hide text
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  forgotPassword: {
    color: "#00008b", // Blue color
    textDecorationLine: "underline",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#00008b", // Bright blue background
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 1,
  },
  buttonText: {
    color: "#ffffff", // White text
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "#ef4444", // Red color for error messages
    marginBottom: 10,
    textAlign: "center",
  },
  switchButton: {
    marginTop: 10,
    alignItems: "center",
  },
  switchText: {
    color: "#00008b", // Bright blue for switch text
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
