import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding3() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* TOP IMAGE */}
      <Image
        source={require("../assets/images/Img2.png")}
        style={styles.topImage}
      />

      {/* CURVED OVERLAY */}
      <View style={styles.curveContainer} />

      {/* BOTTOM CONTENT */}
      <LinearGradient
        colors={["#0E0F1A", "#1A1B2D"]}
        style={styles.bottomContainer}
      >
        <Text style={styles.title}>Save{"\n"}Brand{"\n"}Share</Text>

        {/* DOTS — this time the MIDDLE one is active */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { opacity: 0.4 }]} />
          <View style={[styles.dot, { opacity: 1 }]} />   {/* middle dot highlighted */}
          <View style={[styles.dot, { opacity: 0.4 }]} />
        </View>

        {/* EMAIL BUTTON */}
        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => router.push("/email")}
        >
          <Feather name="mail" size={20} color="#000" />
          <Text style={styles.emailText}>Continue with Email</Text>
        </TouchableOpacity>

        {/* SOCIAL BUTTONS */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="apple" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>
          By continuing you agree Liyantis's Terms of{"\n"}Services & Privacy
          Policy
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F1A",
  },

  topImage: {
    width: "100%",
    height: "60%",
    resizeMode: "cover",
  },

  curveContainer: {
    display: "none",
  },

  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 40,
  },

  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "600",
    lineHeight: 40,
    marginBottom: 20,
  },

  dotsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 30,
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: "white",
    borderRadius: 4,
  },

  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEFB73",
    paddingVertical: 14,
    borderRadius: 30,
    justifyContent: "center",
    marginBottom: 20,
  },

  emailText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
    color: "#000",
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 30,
  },

  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },

  terms: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 15,
  },
});
