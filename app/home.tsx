import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  // ❤️ heart states for each property
  const [heart1, setHeart1] = useState(false);
  const [heart2, setHeart2] = useState(false);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greetingSmall}>Hello Arpit,</Text>
          <Text style={styles.greetingLarge}>Good Morning !</Text>
        </View>

        {/* Notification Icon */}
        <TouchableOpacity style={styles.notificationWrapper}>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.toggleActive}>
          <Text style={styles.toggleActiveText}>Recent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toggleInactive}
          onPress={() => router.push("/home2")}
        >
          <Text style={styles.toggleInactiveText}>All</Text>
        </TouchableOpacity>
      </View>

      {/* -------- PROPERTY 1 -------- */}
      <TouchableOpacity style={styles.propertyCard}>
        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            {/* ❤️ CLICKABLE HEART (left aligned) */}
            <TouchableOpacity onPress={() => setHeart1(!heart1)}>
              <Ionicons
                name={heart1 ? "heart" : "heart-outline"}
                size={18}
                color={heart1 ? "red" : "white"}
              />
            </TouchableOpacity>

            <Text style={styles.propertyName}>The Weave</Text>
          </View>
          <Text style={styles.propertyBuilder}>At JVC by Al Ghurair</Text>
        </View>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>

      {/* -------- PROPERTY 2 -------- */}
      <TouchableOpacity style={styles.propertyCard}>
        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            {/* ❤️ CLICKABLE HEART (left aligned) */}
            <TouchableOpacity onPress={() => setHeart2(!heart2)}>
              <Ionicons
                name={heart2 ? "heart" : "heart-outline"}
                size={18}
                color={heart2 ? "red" : "white"}
              />
            </TouchableOpacity>

            <Text style={styles.propertyName}>Ellington Properties</Text>
          </View>
          <Text style={styles.propertyBuilder}>The Cove</Text>
        </View>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>

      {/* BOTTOM TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="file-text" size={23} color="#fff" />
        </TouchableOpacity>

        {/* CENTER BUTTON */}
        <TouchableOpacity style={styles.centerButton}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="search" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12141D",
    padding: 24,
    paddingTop: 70,
  },

  /* HEADER */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greetingSmall: {
    color: "#B9B9B9",
    fontSize: 18,
  },
  greetingLarge: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  /* Notification */
  notificationWrapper: {
    position: "relative",
    padding: 6,
  },
  notificationDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#F1FE74",
    position: "absolute",
    top: 2,
    right: 2,
  },

  /* Toggle Buttons */
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#1B1D27",
    padding: 6,
    borderRadius: 12,
    marginBottom: 30,
  },
  toggleActive: {
    flex: 1,
    backgroundColor: "#F1FE74",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  toggleActiveText: {
    color: "#000",
    fontWeight: "600",
  },
  toggleInactive: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  toggleInactiveText: {
    color: "#A3A3A3",
  },

  /* Property items */
  propertyCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#2F313C",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  propertyName: {
    color: "white",
    fontSize: 16,
  },
  propertyBuilder: {
    color: "#8A8A8A",
    marginTop: 4,
    fontSize: 13,
  },

  /* Bottom Bar */
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#1A1C20",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  centerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1FE74",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    fontSize: 22,
    color: "#000",
    marginTop: -1,
  },
});
