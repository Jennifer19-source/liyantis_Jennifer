import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PROPERTIES = [
  { name: "The Weave", builder: "At JVC by Al Ghurair", isFav: true },
  { name: "Ellington Properties", builder: "The Cove", isFav: true },
  { name: "Dubai Islands", builder: "Emaar, Ellington Properties" },
  { name: "Dubai Marina", builder: "Nakheel Properties" },
  { name: "Palm Jumeirah", builder: "Emaar" },
  { name: "Dubai Hills Estate", builder: "Meraas" },
];

export default function HomeScreen() {
  const router = useRouter();

  // ❤️ maintain heart state for each item
  const [favStates, setFavStates] = useState(
    PROPERTIES.map((item) => item.isFav || false)
  );

  const toggleFav = (index: number) => {
    const updated = [...favStates];
    updated[index] = !updated[index];
    setFavStates(updated);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.greetingText}>Hello Arpit,</Text>
          <Text style={styles.mainHeading}>Good Morning !</Text>
        </View>

        {/* Notification Icon */}
        <TouchableOpacity style={styles.notificationWrapper}>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => router.back()}>
          <Text style={styles.tabTextInactive}>Recent</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabTextActive}>All</Text>
        </TouchableOpacity>
      </View>

      {/* Property List */}
      <FlatList
        data={PROPERTIES}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.propertyCard}
            onPress={() => {
              if (item.name === "The Weave") {
                router.push("/dashboard");
              }
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                {/* ❤️ HEART BUTTON (left aligned) */}
                <TouchableOpacity onPress={() => toggleFav(index)}>
                  <Ionicons
                    name={favStates[index] ? "heart" : "heart-outline"}
                    size={16}
                    color={favStates[index] ? "red" : "white"}
                  />
                </TouchableOpacity>

                <Text style={styles.propertyName}>{item.name}</Text>
              </View>

              <Text style={styles.propertyBuilder}>{item.builder}</Text>
            </View>

            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="file-text" size={23} color="#fff" />
        </TouchableOpacity>

        {/* Center Button */}
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
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  /* Header */
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greetingText: {
    color: "#B9B9B9",
    fontSize: 18,
  },
  mainHeading: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700",
  },
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

  /* Tabs */
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#1B1D27",
    padding: 6,
    borderRadius: 12,
    marginBottom: 20,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  tabActive: {
    flex: 1,
    backgroundColor: "#E4FF65",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  tabTextActive: {
    color: "#000",
    fontWeight: "600",
  },
  tabTextInactive: {
    color: "#A3A3A3",
  },

  /* List Cards */
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

  /* Bottom Nav */
  bottomNav: {
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
