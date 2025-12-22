import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
  );
}

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
  },
  avatarImage: { width: "100%", height: "100%" },
  editButton: {
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
  centerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DFFF4F",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: { fontSize: 32, color: "#000" },
});
