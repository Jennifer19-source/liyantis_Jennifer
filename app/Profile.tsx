import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const fadeAnim = new Animated.Value(0);

  const toggleMenu = () => {
    if (!menuVisible) {
      setMenuVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu */}
        {menuVisible && (
          <Animated.View style={[styles.dropdownMenu, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={20} color="#F1FE74" />
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Terms of Service</Text>
              <Ionicons name="chevron-forward" size={20} color="#F1FE74" />
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Sign Out</Text>
              <Ionicons name="chevron-forward" size={20} color="#F1FE74" />
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Profile Image + Info */}
        <View style={styles.center}>
          <Image
            source={require("../assets/images/profile.png")}
            style={styles.profileImage}
          />

          <Text style={styles.nameText}>Arpit Aryan Gupta</Text>
          <Text style={styles.emailText}>arpit@liyantis.com</Text>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>42</Text>
            <Text style={styles.statsLabel}>Projects Analyzed</Text>
          </View>

          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>7</Text>
            <Text style={styles.statsLabel}>Pinned Projects</Text>
          </View>
        </View>

        {/* Menu Cards */}
        <View style={styles.menuCard}>
          <View style={styles.iconBox}>
            <Ionicons name="heart" size={22} color="#000" />
          </View>
          <Text style={styles.menuText}>Saved Projects</Text>
          <Ionicons name="chevron-forward" size={22} color="#F1FE74" />
        </View>

        <View style={styles.menuCard}>
          <View style={styles.iconBox}>
            <Ionicons name="headset-outline" size={22} color="#000" />
          </View>
          <Text style={styles.menuText}>Contact Support</Text>
          <Ionicons name="chevron-forward" size={22} color="#F1FE74" />
        </View>

        <View style={styles.menuCard}>
          <View style={styles.iconBox}>
            <Ionicons name="settings-outline" size={22} color="#000" />
          </View>
          <Text style={styles.menuText}>App Settings</Text>
          <Ionicons name="chevron-forward" size={22} color="#F1FE74" />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="file-text" size={23} color="#fff" />
        </TouchableOpacity>

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
  },

  /* HEADER */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  /* DROPDOWN MENU */
  dropdownMenu: {
    position: "absolute",
    right: 25,
    top: 90,
    backgroundColor: "#1B1D27",
    paddingVertical: 5,
    width: 190,
    borderRadius: 12,
    zIndex: 30,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 15,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: "#333",
    marginHorizontal: 12,
  },

  /* PROFILE */
  center: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 12,
  },
  nameText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  emailText: {
    color: "#A3A3A3",
    marginBottom: 15,
  },
  editBtn: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 5,
  },
  editBtnText: {
    color: "#fff",
  },

  /* STATS */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 10,
  },
  statsBox: {
    alignItems: "center",
  },
  statsNumber: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  statsLabel: {
    color: "#A3A3A3",
    marginTop: 3,
  },

  /* MENU CARDS */
  menuCard: {
    flexDirection: "row",
    backgroundColor: "#1B1D27",
    padding: 18,
    marginHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  iconBox: {
    width: 38,
    height: 38,
    backgroundColor: "#F1FE74",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },

  /* BOTTOM NAV */
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
