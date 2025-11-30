import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#0E0F1A", "#141429", "#111221"]}
      style={styles.container}
    >
      {/* Floating Icons */}
      <View style={[styles.dot, { top: 60, left: 40 }]} />
      <View style={[styles.dotSmall, { top: 100, left: 120 }]} />
      <View style={[styles.dotSmall, { top: 150, left: 80 }]} />

      {/* Top small image */}
      <View style={[styles.circleSmall, { top: 140, right: 40 }]}>
        <Image
          source={require("../assets/images/Img1.png")}
          style={styles.imgSmall}
        />
      </View>

      {/* Middle image */}
      <View style={[styles.circleMedium, { top: 260, left: 40 }]}>
        <Image
          source={require("../assets/images/Img2.png")}
          style={styles.imgMedium}
        />
      </View>

      {/* Big circle image */}
      <View style={[styles.circleBig, { top: 400, alignSelf: "center" }]}>
        <Image
          source={require("../assets/images/Img3.png")}
          style={styles.imgBig}
        />
      </View>

      {/* Text */}
      <Text style={styles.subTitle}>SUPERPOWERS TO CLOSE DEALS</Text>
      <Text style={styles.title}>Turning{"\n"}Agents into{"\n"}Closers</Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/boardingSlideshow")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Right Curved Arrow */}
      <View style={styles.sideCurve}>
        <Feather name="arrow-right" size={28} color="#000" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
  },

  dot: {
    width: 14,
    height: 14,
    backgroundColor: "#EEFB73",
    borderRadius: 7,
    position: "absolute",
  },
  dotSmall: {
    width: 10,
    height: 10,
    backgroundColor: "#EEFB73",
    borderRadius: 5,
    position: "absolute",
  },

  circleSmall: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    position: "absolute",
    backgroundColor: "#222",
  },
  imgSmall: {
    width: "100%",
    height: "100%",
  },

  circleMedium: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    position: "absolute",
    backgroundColor: "#222",
  },
  imgMedium: {
    width: "100%",
    height: "100%",
  },

  circleBig: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: "hidden",
    position: "absolute",
    backgroundColor: "#222",
  },
  imgBig: {
    width: "100%",
    height: "100%",
  },

  check: {
    position: "absolute",
    right: -6,
    top: -6,
  },

  subTitle: {
    color: "#EEFB73",
    marginTop: 420,
    fontSize: 12,
    fontWeight: "700",
  },

  title: {
    color: "white",
    fontSize: 36,
    marginTop: 10,
    fontWeight: "600",
    lineHeight: 42,
  },

  button: {
    marginTop: 40,
    backgroundColor: "#EEFB73",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 30,
    width: 140,
    alignItems: "center",
    shadowColor: "#EEFB73",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },

  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },

  sideCurve: {
    position: "absolute",
    right: 0,
    bottom: 120,
    width: 90,
    height: 90,
    backgroundColor: "#EEFB73",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
