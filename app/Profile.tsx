jai
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';

import React, { useState } from "react";
 main
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
 jai
} from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * MenuItem Component
 */
interface MenuItemProps {
  iconName: string;
  label: string;
  iconLibrary?: any;
}

const MenuItem = ({ iconName, label, iconLibrary = Ionicons }: MenuItemProps) => {
  const Icon = iconLibrary;
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} size={22} color="#000" />
        </View>
        <Text style={styles.menuItemLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#F1FE74" />
    </TouchableOpacity>

} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import userProfileData from "../data/userProfile.json";
import projectsData from "../data/projects.json";

export default function ProfileScreen() {
  const router = useRouter();
  const user = userProfileData.user;

  const totalProjects = projectsData.projects.length;
  const soldProjects = projectsData.projects.filter(
    (p) => p.status === "Sold"
  ).length;

  const [selectedCurrency, setSelectedCurrency] = useState("AED");
  const [selectedUnit, setSelectedUnit] = useState("ft²");
  const [isExpanded, setIsExpanded] = useState(false);

  const primaryCurrencies = ["AED", "USD", "EUR", "RUB", "CNY", "INR"];
  const allCurrencies = [
    ...primaryCurrencies,
    "GBP",
    "JPY",
    "CAD",
    "AUD",
    "CHF",
    "HKD",
    "NZD",
    "SGD",
    "KRW",
  ];
  const visibleCurrencies = isExpanded ? allCurrencies : primaryCurrencies;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View style={styles.contentContainer}>
          <ProfileSummary
            userName={user.name}
            totalProjects={totalProjects}
            soldProjects={soldProjects}
          />

          <PersonalInfoSection email={user.email} phone={user.phone} />

          <PreferencesSection
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            visibleCurrencies={visibleCurrencies}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/homeRouter")}>
          <Ionicons name="home-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="heart-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => router.push("/form1")}
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="document-text-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
 main
  );
}

 jai
/**
 * NavItem Component
 */
interface NavItemProps {
  iconName: string;
  active?: boolean;
  size?: number;
  library?: any;
}

const NavItem = ({ iconName, active = false, size = 24, library = Ionicons }: NavItemProps) => {
  const Icon = library;
  return (
    <TouchableOpacity style={styles.navItem}>
      <Icon name={iconName} size={size} color={active ? "#FFF" : "#9CA3AF"} />
      {active && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={22} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.headerBtn} onPress={toggleMenu}>
            <Ionicons name="menu" size={26} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Dropdown Menu */}
      {menuVisible && (
        <>
          <TouchableOpacity style={styles.menuOverlay} activeOpacity={1} onPress={toggleMenu} />
          <Animated.View style={[styles.dropdown, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Privacy Policy</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Terms of Service</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Sign Out</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}

      {/* Main Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }} 
              style={styles.avatar}
            />
          </View>
          <Text style={styles.userName}>Arpit Aryan Gupta</Text>
          <Text style={styles.userEmail}>arpit@liyantis.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Projects Analyzed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Pinned Projects</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuList}>
          <MenuItem iconName="heart" label="Saved Projects" />
          <MenuItem iconName="headset-outline" label="Contact Support" />
          <MenuItem iconName="settings-outline" label="App Settings" />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <NavItem iconName="home-outline" active={false} />
        </TouchableOpacity>
        <NavItem iconName="file-text" library={Feather} size={22} active={false} />
        
        {/* Center Add Button */}
        <TouchableOpacity style={styles.centerButton}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
        
        <NavItem iconName="search" library={Feather} size={22} active={false} />
        <NavItem iconName="person-circle-outline" active={true} size={28} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12141D',
    paddingTop: 50,
  },
  headerSafeArea: {
    backgroundColor: '#12141D',
    zIndex: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerBtn: {
    padding: 5,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },

  // Dropdown
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 90,
  },
  dropdown: {
    position: 'absolute',
    top: 100,
    right: 24,
    width: 190,
    backgroundColor: '#1B1D27',
    borderRadius: 12,
    zIndex: 101,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    color: '#FFF',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: 12,
  },

  scrollContent: {
    paddingHorizontal: 24,
  },

  // Profile
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatarWrapper: {
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  userName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  userEmail: {
    color: '#A3A3A3',
    fontSize: 14,
    marginTop: 4,

/* ---------------- COMPONENTS ---------------- */

const Header = () => (
  <View style={styles.headerContainer}>
    <LinearGradient
      colors={["#d1d5db", "#9ca3af"]}
      style={styles.headerGradient}
    />
  </View>
);

const ProfileSummary = ({
  userName,
  totalProjects,
  soldProjects,
}: {
  userName: string;
  totalProjects: number;
  soldProjects: number;
}) => (
  <View style={styles.summaryContainer}>
    <View style={styles.avatarWrapper}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${userName}`,
          }}
          style={styles.avatarImage}
        />
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="pencil" size={12} color="#9ca3af" />
      </TouchableOpacity>
    </View>

    <Text style={styles.nameText}>{userName}</Text>

    <View style={styles.statsContainer}>
      <Text style={styles.statText}>
        Projects: <Text style={styles.statHighlight}>{totalProjects}</Text>
      </Text>
      <Text style={styles.statText}>
        Sold: <Text style={styles.statHighlight}>{soldProjects}</Text>
      </Text>
    </View>
  </View>
);

const PersonalInfoSection = ({
  email,
  phone,
}: {
  email: string;
  phone: string;
}) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>Personal information</Text>
    <View style={styles.card}>
      <InfoItem icon="mail-outline" label={email} />
      <Divider />
      <InfoItem icon="call-outline" label={phone} />
      <Divider />
      <InfoItem icon="location-outline" label="Dubai" />
    </View>
  </View>
);

const InfoItem = ({ icon, label }: { icon: string; label: string }) => (
  <TouchableOpacity style={styles.infoItem}>
    <View style={styles.infoItemLeft}>
      <Ionicons name={icon as any} size={18} color="#9ca3af" />
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Ionicons name="pencil" size={14} color="#6b7280" />
  </TouchableOpacity>
);

const Divider = () => <View style={styles.divider} />;

const PreferencesSection = ({
  selectedCurrency,
  setSelectedCurrency,
  selectedUnit,
  setSelectedUnit,
  isExpanded,
  setIsExpanded,
  visibleCurrencies,
}: any) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>Preferences</Text>

    <View style={styles.cardPadding}>
      <Text style={styles.preferenceLabel}>Currency</Text>

      <View style={styles.chipContainer}>
        {visibleCurrencies.map((c: string) => (
          <Chip
            key={c}
            label={c}
            isSelected={selectedCurrency === c}
            onPress={() => setSelectedCurrency(c)}
          />
        ))}
      </View>

      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.showMoreText}>
          {isExpanded ? "Show less" : "Show more currencies"}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.preferenceLabel, { marginTop: 20 }]}>
        Measure units
      </Text>

      <View style={styles.chipContainer}>
        <Chip
          label="ft²"
          isSelected={selectedUnit === "ft²"}
          onPress={() => setSelectedUnit("ft²")}
        />
        <Chip
          label="m²"
          isSelected={selectedUnit === "m²"}
          onPress={() => setSelectedUnit("m²")}
        />
      </View>
    </View>
  </View>
);

const Chip = ({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.chip,
      isSelected ? styles.chipSelected : styles.chipUnselected,
    ]}
  >
    <Text
      style={[
        styles.chipText,
        isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181A20" },
  contentContainer: { padding: 16, paddingBottom: 120 },

  headerContainer: { height: 180 },
  headerGradient: { flex: 1 },

  summaryContainer: { alignItems: "center", marginTop: -60 },
  avatarWrapper: { position: "relative" },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#181A20",
    main
  },
  avatarImage: { width: "100%", height: "100%" },
  editButton: {
jai
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    marginBottom: 32,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
    textAlign: 'center',
  },

  // Menu Items
  menuList: {
    gap: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1B1D27',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 38,
    height: 38,
    backgroundColor: '#F1FE74',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },

  // Navigation

    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2c2d33",
    padding: 6,
    borderRadius: 14,
  },
  nameText: { color: "#fff", fontSize: 20, marginTop: 12 },
  statsContainer: { flexDirection: "row", gap: 24, marginTop: 6 },
  statText: { color: "#9ca3af" },
  statHighlight: { color: "#fff" },

  sectionContainer: { marginTop: 24 },
  sectionTitle: { color: "#fff", fontSize: 18, marginBottom: 12 },

  card: { backgroundColor: "#232429", borderRadius: 12 },
  cardPadding: { backgroundColor: "#232429", borderRadius: 12, padding: 16 },

  infoItem: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoItemLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  infoLabel: { color: "#d1d5db" },
  divider: { height: 1, backgroundColor: "#374151", opacity: 0.5 },

  preferenceLabel: { color: "#9ca3af", marginBottom: 8 },
  chipContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  chipSelected: { backgroundColor: "#F1FE74", borderColor: "#F1FE74" },
  chipUnselected: { borderColor: "#4b5563" },
  chipText: { fontSize: 14 },
  chipTextSelected: { color: "#111827" },
  chipTextUnselected: { color: "#d1d5db" },

  showMoreText: { color: "#9ca3af", marginTop: 8 },
 main
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#27292D",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  activeDot: {
    width: 4,
    height: 4,
    backgroundColor: '#FFF',
    borderRadius: 2,
    marginTop: 4,
  },
  centerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DFFF4F",
    justifyContent: "center",
    alignItems: "center",
  },
 jai
  plus: { 
    fontSize: 22, 
    color: "#000", 
    marginTop: -1 
  },
});

  plus: { fontSize: 32, color: "#000" },
});
 main
