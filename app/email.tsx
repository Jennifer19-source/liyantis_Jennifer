import { Entypo, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("arpit@liyantis.com");

  return (
    <LinearGradient
      colors={["#0b0f1a", "#14121f", "#1a1428"]}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Feather name="arrow-left" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.heading}>
        What’s your{"\n"}email{"\n"}address?
      </Text>

      {/* Label */}
      <Text style={styles.label}>YOUR EMAIL</Text>

      {/* Input Row */}
      <View style={styles.inputRow}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {email.length > 0 && (
          <TouchableOpacity onPress={() => setEmail("")}>
            <Entypo name="cross" size={18} color="#777" />
          </TouchableOpacity>
        )}
      </View>

      {/* Underline */}
      <View style={styles.underline} />

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn} onPress={() => router.push("/login")}>
        <Feather name="mail" size={20} color="#000" />
        <Text style={styles.continueText}>Continue with Email</Text>
      </TouchableOpacity>

      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 70,
  },

  backButton: {
    marginBottom: 40,
  },

  heading: {
    fontSize: 34,
    color: "#fff",
    fontWeight: "600",
    lineHeight: 40,
    marginBottom: 40,
  },

  label: {
    color: "#3A3D46",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 10,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    paddingRight: 10,
  },

  underline: {
    height: 1.4,
    backgroundColor: "#C8FF52",
    marginTop: 4,
    marginBottom: 40,
  },

  continueBtn: {
    backgroundColor: "#EEFB73",
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  continueText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "700",
    marginLeft: 10,
  },

  
});
