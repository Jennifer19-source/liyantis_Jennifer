import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// --- Configuration Constants ---
const TOTAL_PRICE = 1225000;
const START_DATE = new Date(2026, 0, 26); // Jan 26, 2026
const TOTAL_MONTHS = 12;
const SCREEN_WIDTH = Dimensions.get('window').width;

// --- Helpers ---
const formatAED = (value: number) => {
  // Simple formatter for AED
  return value.toLocaleString();
};

const addMonths = (date: Date, months: number) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function App() {
  const router = useRouter();
  
  // --- State ---
  const [sliderValue, setSliderValue] = useState(2); // Start index (March)
  const [sliderWidth, setSliderWidth] = useState(0);

  // --- Derived Values ---
  const currentPercentage = Math.round(5 + (sliderValue / TOTAL_MONTHS) * 25);
  const currentAmount = Math.round(TOTAL_PRICE * (currentPercentage / 100));
  const currentDate = addMonths(START_DATE, sliderValue);

  // Status Logic - More responsive status changes
  let statusText = "";
  let statusColor = "transparent";
  if (sliderValue <= 1) {
    statusText = "Start";
    statusColor = "#ffffff";
  } else if (sliderValue >= 5 && sliderValue <= 7) {
    statusText = "Flip Ready";
    statusColor = "#eef878";
  } else if (sliderValue >= TOTAL_MONTHS - 1) {
    statusText = "Handover";
    statusColor = "#f87171"; // Red-400 equivalent
  }

  // --- Pan Responder for Slider ---
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // Handle initial touch
        handleTouch(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Handle drag movement
        handleTouch(evt.nativeEvent.locationX);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Handle release
        handleTouch(evt.nativeEvent.locationX);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Handle termination
      },
    })
  ).current;

  const handleTouch = (x: number) => {
    if (sliderWidth === 0) return;
    // Constrain X between 0 and width
    const constrainedX = Math.max(0, Math.min(x, sliderWidth));
    const percentage = constrainedX / sliderWidth;
    const newValue = Math.round(percentage * TOTAL_MONTHS);
    setSliderValue(newValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" color="#D1D5DB" size={28} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>The Weave, JVC</Text>
          <Text style={styles.headerSubtitle}>by Al Ghurair</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" color="#D1D5DB" size={28} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Rating Circle */}
          <View style={[styles.card, styles.ratingCard]}>
            <View style={{ transform: [{ rotate: '-90deg' }] }}>
              <Svg height="48" width="48" viewBox="0 0 48 48">
                <Circle 
                  cx="24" 
                  cy="24" 
                  r="20" 
                  stroke="#333" 
                  strokeWidth="4" 
                  fill="transparent" 
                />
                <Circle
                  cx="24" 
                  cy="24" 
                  r="20"
                  stroke="#bef264"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="125"
                  strokeDashoffset="30"
                  strokeLinecap="round"
                />
              </Svg>
            </View>
            <Text style={styles.ratingText}>7.5</Text>
          </View>

          {/* 1 BR Box */}
          <View style={[styles.card, styles.brCard]}>
            <View style={styles.rowBaseline}>
              <Text style={styles.brText}>1</Text>
              <Text style={styles.brLabel}>BR</Text>
            </View>
          </View>

          {/* Price Box */}
          <View style={[styles.card, styles.priceCard]}>
            <Text style={styles.labelSmall}>OFF PLAN</Text>
            <View style={[styles.rowBetween, { marginTop: 4 }]}>
              <Text style={styles.currencyLabel}>AED</Text>
              <View style={styles.rowBaseline}>
                <Text style={styles.priceMain}>1.225</Text>
                <Text style={styles.priceSub}>mn</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Secondary Stats Row (5 Columns) */}
        <View style={styles.secondaryGrid}>
          {/* 1. APT */}
          <View style={styles.secondaryCard}>
            <Text style={styles.secondaryLabelLeft}>APT</Text>
            <View style={styles.tagYellow}>
              <Text style={styles.tagText}>ft²</Text>
              <Ionicons name="chevron-down" size={8} color="#000" />
            </View>
          </View>

          {/* 2. Value */}
          <View style={styles.secondaryCard}>
            <Text style={styles.secondaryValue}>776</Text>
          </View>

          {/* 3. SC/ft */}
          <View style={styles.secondaryCard}>
            <Text style={styles.secondaryLabel}>SC/ft²</Text>
            <Text style={styles.secondaryValue}>11</Text>
          </View>

          {/* 4. Pr/ft */}
          <View style={styles.secondaryCard}>
            <Text style={styles.secondaryLabel}>Pr/ft²</Text>
            <Text style={styles.secondaryValueSmall}>1,578</Text>
          </View>

          {/* 5. DLD */}
          <View style={styles.secondaryCard}>
            <Text style={styles.secondaryLabel}>DLD</Text>
            <View style={styles.rowBaseline}>
              <Text style={styles.secondaryValue}>49</Text>
              <Text style={styles.secondaryUnit}>k</Text>
            </View>
          </View>
        </View>

        {/* --- MAIN SLIDER CARD --- */}
        <View style={styles.mainCard}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <Text style={styles.cardTitle}>40/60</Text>
            </View>
            <Ionicons name="expand" size={16} color="#9CA3AF" />
          </View>

          {/* Dynamic Content */}
          <View style={styles.dynamicContent}>
            {/* Percentage */}
            <View style={styles.rowBaseline}>
              <Text style={styles.percentageBig}>{currentPercentage}</Text>
              <Text style={styles.percentageSmall}>%</Text>
            </View>

            {/* Info Row: Date - Amount - Status */}
            <View style={styles.infoRow}>
              {/* Left: Date */}
              <Text style={styles.infoDate}>{currentDate}</Text>

              {/* Center: Amount */}
              <View style={styles.infoAmountContainer}>
                {currentAmount > 0 && (
                  <View style={styles.rowBaseline}>
                    <Text style={styles.aedLabel}>AED</Text>
                    <Text style={styles.amountValue}>{formatAED(currentAmount)}</Text>
                  </View>
                )}
              </View>

              {/* Right: Status */}
              <View style={styles.statusContainer}>
                {statusText !== "" && (
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {statusText}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Interactive Timeline */}
          <View 
            style={styles.sliderContainer} 
            onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
            onTouchStart={(evt) => {
              handleTouch(evt.nativeEvent.locationX);
            }}
            onTouchMove={(evt) => {
              handleTouch(evt.nativeEvent.locationX);
            }}
            {...panResponder.panHandlers}
          >
            {/* Track Line */}
            <View style={styles.trackLine} pointerEvents="none" />

            {/* Dots */}
            <View style={styles.dotsContainer} pointerEvents="none">
              {[...Array(TOTAL_MONTHS + 1)].map((_, i) => (
                <View 
                  key={i}
                  style={[
                    styles.dot,
                    i <= sliderValue ? styles.dotActive : styles.dotInactive,
                    (i === 0 || i === 6 || i === TOTAL_MONTHS) ? styles.dotLarge : styles.dotSmall,
                    i === sliderValue ? styles.dotCurrent : null
                  ]}
                />
              ))}
            </View>

            {/* Red Arrow Indicator */}
            {sliderWidth > 0 && (
              <View 
                style={[
                  styles.arrowContainer, 
                  { left: (sliderValue / TOTAL_MONTHS) * sliderWidth }
                ]}
              >
                <View style={styles.arrowTriangle} />
                {/* Larger touch area for better dragging */}
                <View style={styles.arrowTouchArea} />
              </View>
            )}

            {/* Date Labels below */}
            <View style={styles.labelsContainer} pointerEvents="none">
              <Text style={styles.sliderLabel}>Jan 26</Text>
              <Text style={styles.sliderLabel}>Jun 26</Text>
              <Text style={styles.sliderLabel}>Jan 27</Text>
            </View>
          </View>
        </View>

        {/* Exit Strategies */}
        <View style={styles.strategiesCard}>
          <View style={[styles.rowBetween, { marginBottom: 16 }]}>
            <View>
              <Text style={styles.sectionHeader}>EXIT STRATEGIES</Text>
              <Text style={styles.strategyTitle}>STP — Flipping</Text>
            </View>
            <View style={styles.rowCenter}>
              <View style={styles.percentTag}>
                <Text style={styles.percentTagText}>%</Text>
                <Ionicons name="chevron-down" size={10} color="#000" style={{marginLeft: 2}}/>
              </View>
              <Ionicons name="expand" size={12} color="#9CA3AF" style={{marginLeft: 8}}/>
            </View>
          </View>

          {/* Cards Grid */}
          <View style={styles.strategyGrid}>
            {/* Moderate */}
            <View style={[styles.strategyBox, styles.bgModerate]}>
              <Text style={styles.strategyBoxTitle}>Moderate</Text>
              <View>
                <View style={styles.rowBaseline}>
                  <Text style={styles.boxPercent}>25.46</Text>
                  <Text style={styles.boxPercentSmall}>%</Text>
                </View>
                <Text style={styles.boxValue}>AED 137.24k</Text>
              </View>
            </View>

            {/* Conservative */}
            <View style={[styles.strategyBox, styles.bgConservative]}>
              <Text style={styles.strategyBoxTitle}>Conservative</Text>
              <View>
                <View style={styles.rowBaseline}>
                  <Text style={styles.boxPercent}>7.87</Text>
                  <Text style={styles.boxPercentSmall}>%</Text>
                </View>
                <Text style={styles.boxValue}>AED 42.42k</Text>
              </View>
            </View>

            {/* Optimistic */}
            <View style={[styles.strategyBox, styles.bgOptimistic]}>
              <Text style={[styles.strategyBoxTitle, {opacity: 0.8}]}>Optimistic</Text>
              <View>
                <View style={styles.rowBaseline}>
                  <Text style={styles.boxPercent}>34.46</Text>
                  <Text style={styles.boxPercentSmall}>%</Text>
                </View>
                <Text style={styles.boxValue}>AED 185.75k</Text>
              </View>
            </View>
          </View>

          <Text style={styles.disclaimer}>
            ** The project will generate an estimated ROE of ~25.46% based on <Text style={styles.boldText}>AED539k</Text> capital invested by March 2026.
          </Text>

          {/* Pagination */}
          <View style={styles.pagination}>
            <View style={[styles.pageDot, styles.pageDotActive]} />
            <View style={styles.pageDot} />
            <View style={styles.pageDot} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="file-text" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton} onPress={() => router.push("/form1")}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="search" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  // Top Stats
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  card: {
    backgroundColor: '#27292D',
    borderRadius: 12,
    height: 80,
    justifyContent: 'center',
  },
  ratingCard: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  ratingText: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  brCard: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  priceCard: {
    flex: 2,
    paddingHorizontal: 12,
  },
  rowBaseline: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '300',
  },
  brLabel: {
    color: 'white',
    fontSize: 12,
    marginLeft: 2,
  },
  labelSmall: {
    color: '#9CA3AF',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  currencyLabel: {
    color: '#6B7280',
    fontSize: 12,
  },
  priceMain: {
    color: 'white',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 32,
  },
  priceSub: {
    color: 'white',
    fontSize: 14,
    marginLeft: 2,
  },
  // Secondary Grid
  secondaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 16,
  },
  secondaryCard: {
    flex: 1,
    backgroundColor: '#27292D',
    borderRadius: 12,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  secondaryLabelLeft: {
    color: '#9CA3AF',
    fontSize: 10,
    width: '100%',
    textAlign: 'left',
    paddingLeft: 4,
    marginBottom: 4,
  },
  secondaryLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    marginBottom: 4,
  },
  tagYellow: {
    backgroundColor: '#eef878',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  tagText: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 2,
  },
  secondaryValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  secondaryValueSmall: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  secondaryUnit: {
    color: 'white',
    fontSize: 10,
  },
  // Main Slider Card
  mainCard: {
    backgroundColor: '#27292D',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  cardTitle: {
    color: '#D1D5DB',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dynamicContent: {
    alignItems: 'center',
    marginVertical: 16,
  },
  percentageBig: {
    color: 'white',
    fontSize: 64,
    fontWeight: '300',
    letterSpacing: -2,
    lineHeight: 70,
  },
  percentageSmall: {
    color: '#9CA3AF',
    fontSize: 24,
    fontWeight: '300',
    marginLeft: 4,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    height: 24,
  },
  infoDate: {
    flex: 1,
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
  },
  infoAmountContainer: {
    flex: 1,
    alignItems: 'center',
  },
  aedLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    marginRight: 4,
  },
  amountValue: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Slider Component
  sliderContainer: {
    height: 60,
    justifyContent: 'center',
    marginTop: 8,
    width: '100%',
    position: 'relative',
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  trackLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#4B5563',
    width: '100%',
    top: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    top: 20, // (24 track top) - (half dot height approx)
    paddingHorizontal: 2,
  },
  dot: {
    borderRadius: 99,
  },
  dotActive: {
    backgroundColor: '#eef878',
  },
  dotInactive: {
    backgroundColor: '#4B5563',
  },
  dotLarge: {
    width: 10,
    height: 10,
    top: 0,
  },
  dotSmall: {
    width: 6,
    height: 6,
    top: 2,
  },
  dotCurrent: {
    backgroundColor: '#10B981', // Green color for current position
    borderWidth: 2,
    borderColor: '#ffffff',
    width: 12,
    height: 12,
    top: 0,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  arrowContainer: {
    position: 'absolute',
    top: 4, 
    width: 32, // Larger container width for better touch
    height: 32, // Add height for touch area
    marginLeft: -16, // Center align with larger width
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowTouchArea: {
    position: 'absolute',
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
    top: -10,
  },
  arrowTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 0,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#DC2626', // Red-600
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  sliderLabel: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: '500',
  },
  // Strategies
  strategiesCard: {
    backgroundColor: '#27292D',
    borderRadius: 16,
    padding: 16,
    paddingBottom: 24,
    marginBottom: 40,
  },
  sectionHeader: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  strategyTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
  },
  percentTag: {
    backgroundColor: '#eef878',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentTagText: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
  strategyGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  strategyBox: {
    flex: 1,
    height: 112,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-between',
  },
  bgModerate: {
    backgroundColor: '#eef878',
    // shadow simulation
    elevation: 4,
    shadowColor: '#eef878',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  bgConservative: {
    backgroundColor: '#fcfde1', // Light cream
    opacity: 0.9,
  },
  bgOptimistic: {
    backgroundColor: '#a3b808', // Darker yellow/green
  },
  strategyBoxTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  boxPercent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  boxPercentSmall: {
    fontSize: 10,
    color: 'black',
    marginLeft: 2,
    marginBottom: 4,
  },
  boxValue: {
    fontSize: 9,
    color: 'black',
    opacity: 0.8,
  },
  disclaimer: {
    marginTop: 16,
    color: '#6B7280',
    fontSize: 10,
    lineHeight: 14,
  },
  boldText: {
    color: '#D1D5DB',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  pageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4B5563',
    borderWidth: 1,
    borderColor: '#6B7280',
  },
  pageDotActive: {
    backgroundColor: '#eef878',
    borderColor: '#eef878',
  },
  // Bottom Navigation
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
    marginTop: -1 
  },
});