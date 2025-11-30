import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding1() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* TOP IMAGE */}
      <Image
        source={require("../assets/images/Img3.png")}
        style={styles.topImage}
      />

      {/* CURVED OVERLAY */}
      <View style={styles.curve} />

      {/* BOTTOM CONTENT */}
      <LinearGradient
        colors={["#0A0A13", "#171725"]}
        style={styles.bottom}
      >
        {/* TITLE */}
        <Text style={styles.title}>
          We Call on{"\n"}Your{"\n"}Behalf
        </Text>

        {/* DOTS */}
        <View style={styles.dots}>
          <View style={[styles.dot, { opacity: 1 }]} />     
          <View style={[styles.dot, { opacity: 0.3 }]} />
          <View style={[styles.dot, { opacity: 0.3 }]} />
        </View>

        {/* EMAIL BUTTON */}
        <TouchableOpacity style={styles.emailBtn} onPress={() => router.push("/email")}>
          <Feather name="mail" size={20} color="#000" />
          <Text style={styles.emailText}>Continue with Email</Text>
        </TouchableOpacity>

        {/* SOCIAL BUTTONS */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <AntDesign name="google" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="apple" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* TERMS */}
        <Text style={styles.terms}>
          By continuing you agree Liyantis’s Terms of{"\n"}Services & Privacy Policy
        </Text>

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A13",
  },

  topImage: {
    width: "100%",
    height: "58%",
    resizeMode: "cover",
  },

  curve: {
    display: "none",
  },

  bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 32,
    paddingBottom: 40,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "600",
    lineHeight: 40,
    marginBottom: 20,
  },

  dots: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 30,
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
  },

  emailBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEFB73",
    paddingVertical: 14,
    borderRadius: 30,
    justifyContent: "center",
    marginBottom: 25,
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
    marginBottom: 25,
  },

  socialBtn: {
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
    lineHeight: 15,
  },
});
