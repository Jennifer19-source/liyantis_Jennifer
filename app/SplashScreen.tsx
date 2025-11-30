import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SplashScreen: React.FC = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      activeOpacity={1}
      onPress={() => router.push("/onboarding")}
    >
      <LinearGradient
        colors={["#181A20", "#181A20"]} // Dark background
        style={styles.container}
      >
        <View style={styles.centerContent}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>LIYANTIS</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    alignItems: "center",
    marginTop: -50, // moves the logo slightly up like in your screenshot
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "600",
    letterSpacing: 2,
  },
});
