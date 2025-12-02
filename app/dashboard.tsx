import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Feather name="chevron-left" size={28} color="#fff" />
          </Pressable>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>The Weave, JVC</Text>
            <Text style={styles.headerSubtitle}>by Al Ghurair</Text>
          </View>
          <Pressable>
            <Feather name="more-horizontal" size={24} color="#fff" />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Top Grid Area */}
          <View style={styles.gridContainer}>
            {/* Row 1 */}
            <View style={styles.gridRow}>
              {/* Rating Circle */}
              <View style={styles.ratingBox}>
                <View style={styles.ratingCircle}>
                  <Text style={styles.ratingNumber}>7.5</Text>
                </View>
              </View>

              {/* 1 BR Box */}
              <View style={styles.roomBox}>
                <Text style={styles.roomTextLarge}>1</Text>
                <Text style={styles.roomTextSmall}>BR</Text>
              </View>

              {/* Price Box */}
              <View style={styles.priceBox}>
                <Text style={styles.labelTiny}>OFF PLAN</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.currencySmall}>AED</Text>
                  <Text style={styles.priceLarge}>1.225</Text>
                  <Text style={styles.priceUnit}>mn</Text>
                </View>
              </View>
            </View>

            {/* Row 2 */}
            <View style={styles.gridRow}>
              {/* APT Box with Pill */}
              <View style={styles.aptBox}>
                <Text style={styles.labelTiny}>APT</Text>
                <View style={styles.aptRow}>
                  <View style={styles.yellowPill}>
                    <Text style={styles.pillText}>ft²</Text>
                    <Feather name="chevron-down" size={10} color="#000" />
                  </View>
                  <Text style={styles.statValueLarge}>776</Text>
                </View>
              </View>

              {/* SC Box */}
              <View style={styles.smallStatBox}>
                <Text style={styles.statLabelTop}>SC/ft²</Text>
                <Text style={styles.statValueMedium}>11</Text>
              </View>

              {/* Pr Box */}
              <View style={styles.smallStatBox}>
                <Text style={styles.statLabelTop}>Pr/ft²</Text>
                <Text style={styles.statValueMedium}>1,578</Text>
              </View>

              {/* DLD Box */}
              <View style={styles.smallStatBox}>
                <Text style={styles.statLabelTop}>DLD</Text>
                <Text style={styles.statValueMedium}>49</Text>
                <Text style={styles.statUnitTiny}>k</Text>
              </View>
            </View>
          </View>

          {/* 70/30 Payment Plan Card */}
          <View style={styles.paymentCard}>
            
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>70/30</Text>
              <Pressable onPress={() => router.push("/timeline")}>
                <Feather name="maximize-2" size={14} color="#aaa" />
              </Pressable>
            </View>

            {/* Big Percentage Center */}
            <View style={styles.centerPercent}>
              <Text style={styles.bigPercent}>10</Text>
              <Text style={styles.percentSymbol}>%</Text>
            </View>
            
            <View style={styles.dateLabelRow}>
               <Text style={styles.dateLabelLeft}>Mar 26</Text>
               <Text style={styles.aedLabelCenter}>AED <Text style={{color:'#fff', fontWeight:'700'}}>122,500</Text></Text>
            </View>

            {/* Timeline */}
            <View style={styles.timelineContainer}>
              {/* Red Indicator */}
              <View style={styles.redTriangleContainer}>
                <Text style={styles.redTriangle}>▼</Text>
              </View>
              
              <View style={styles.timelineLine} />
              <View style={styles.dotsRow}>
                {new Array(12).fill(0).map((_, i) => (
                   <View 
                      key={i} 
                      style={[
                        styles.dot, 
                        i === 4 && styles.dotActive // Make the 5th dot yellow
                      ]} 
                   />
                ))}
              </View>
              <View style={styles.timelineLabels}>
                <Text style={styles.timeLabel}>Jan 26</Text>
                <Text style={styles.timeLabel}>Jun 26</Text>
                <Text style={styles.timeLabel}>Jan 27</Text>
              </View>
            </View>
          </View>

          {/* Exit Strategies Section */}
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTitle}>Exit Strategies</Text>
              <Text style={styles.sectionSub}>STP — Flipping</Text>
            </View>
            <View style={styles.headerControls}>
               <View style={styles.smallPill}>
                  <Text style={styles.pillText}>%</Text>
                  <Feather name="chevron-down" size={12} color="#000" />
               </View>
               <Feather name="maximize-2" size={14} color="#aaa" style={{marginLeft: 10}}/>
            </View>
          </View>

          {/* 3 Colored Cards */}
          <View style={styles.strategyRow}>
            {/* Moderate (Yellow) */}
            <View style={[styles.strategyCard, { backgroundColor: '#F1FC7E' }]}>
              <Text style={styles.stratHeaderDark}>Moderate</Text>
              <View>
                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                  <Text style={styles.stratPercentDark}>25.46</Text>
                  <Text style={[styles.stratSymbolDark, {fontSize: 12, marginBottom:4}]}>%</Text>
                </View>
                <Text style={styles.stratValueDark}>AED 137.24k</Text>
              </View>
            </View>

            {/* Conservative (Beige) */}
            <View style={[styles.strategyCard, { backgroundColor: '#FFFFE0' }]}>
              <Text style={styles.stratHeaderDark}>Conservative</Text>
              <View>
                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                  <Text style={styles.stratPercentDark}>7.87</Text>
                  <Text style={[styles.stratSymbolDark, {fontSize: 12, marginBottom:4}]}>%</Text>
                </View>
                <Text style={styles.stratValueDark}>AED 42.42k</Text>
              </View>
            </View>

            {/* Optimistic (Lime) */}
            <View style={[styles.strategyCard, { backgroundColor: '#C0D926' }]}>
              <Text style={styles.stratHeaderDark}>Optimistic</Text>
              <View>
                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                  <Text style={styles.stratPercentDark}>34.46</Text>
                  <Text style={[styles.stratSymbolDark, {fontSize: 12, marginBottom:4}]}>%</Text>
                </View>
                <Text style={styles.stratValueDark}>AED 185.75k</Text>
              </View>
            </View>
          </View>

          {/* Footer Note */}
          <Text style={styles.footerNote}>
            ** The project will generate an estimated ROE of ~25.46% based on <Text style={{fontWeight:'700', color:'#fff'}}>AED539k</Text> capital invested by March 2026.
          </Text>

           {/* Pagination Dots */}
           <View style={styles.pagination}>
              <View style={styles.pageDotActive} />
              <View style={styles.pageDot} />
              <View style={styles.pageDot} />
           </View>

           <View style={{height: 100}} /> 
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation Bar (Fixed) */}
      <View style={styles.bottomNav}>
         <Feather name="home" size={24} color="#ccc" />
         <Feather name="file-text" size={24} color="#ccc" />
         <View style={styles.plusButton}>
            <Feather name="plus" size={24} color="#000" />
         </View>
         <Feather name="search" size={24} color="#ccc" />
         <Feather name="user" size={24} color="#ccc" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#0D0F15", // Very dark blue/black
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 50,
  },
  headerTitleContainer: { alignItems: "center" },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  headerSubtitle: { color: "#888", fontSize: 12, marginTop: 2 },

  // Grid
  gridContainer: { gap: 10, marginBottom: 16 },
  gridRow: { flexDirection: "row", gap: 10, height: 80 },

  // Grid Items
  ratingBox: {
    width: 80,
    backgroundColor: "#1A1D24",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingCircle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "#C0D926", // Lime border
    borderLeftColor: "#2A3038", // Simulating the gap in gradient
    justifyContent: "center",
    alignItems: "center",
    transform: [{rotate: '45deg'}] // Rotate the gap
  },
  ratingNumber: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    transform: [{rotate: '-45deg'}] // Counter rotate text
  },

  roomBox: {
    width: 80,
    backgroundColor: "#13161C",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "baseline",
  },
  roomTextLarge: { color: "#fff", fontSize: 32, fontWeight: "400" },
  roomTextSmall: { color: "#ccc", fontSize: 12, marginLeft: 2 },

  priceBox: {
    flex: 1,
    backgroundColor: "#1A1D24",
    borderRadius: 16,
    padding: 12,
    justifyContent: "center",
  },
  priceRow: { flexDirection: "row", alignItems: "baseline", marginTop: 4 },
  priceLarge: { color: "#fff", fontSize: 30, fontWeight: "500", letterSpacing: -1 },
  currencySmall: { color: "#888", fontSize: 12, marginRight: 6 },
  priceUnit: { color: "#888", fontSize: 12 },

  // Row 2 Items
  aptBox: {
    flex: 2,
    backgroundColor: "#1A1D24",
    borderRadius: 16,
    padding: 12,
    justifyContent: "center",
  },
  aptRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 },
  yellowPill: {
    backgroundColor: "#DFFF4F",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  pillText: { fontSize: 12, fontWeight: "700", color: "#000" },
  statValueLarge: { color: "#fff", fontSize: 24, fontWeight: "500" },

  smallStatBox: {
    flex: 1,
    backgroundColor: "#13161C",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  statLabelTop: { color: "#888", fontSize: 10, position: 'absolute', top: 10 },
  statValueMedium: { color: "#fff", fontSize: 18, fontWeight: "500", marginTop: 14 },
  statUnitTiny: { color: "#888", fontSize: 10 },
  labelTiny: { color: "#888", fontSize: 10, textTransform: "uppercase" },

  // 70/30 Card
  paymentCard: {
    backgroundColor: "#22252B",
    borderRadius: 20,
    padding: 20,
    height: 240,
    marginTop: 6,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { color: "#fff", fontWeight: "700", fontSize: 16 },

  centerPercent: { 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "row",
    marginTop: 10
  },
  bigPercent: { fontSize: 72, color: "#fff", fontWeight: "600", letterSpacing: -2 },
  percentSymbol: { fontSize: 24, color: "#fff", marginTop: 14, fontWeight: '600' },
  
  dateLabelRow: {flexDirection:'row', justifyContent:'space-between', width:'100%', paddingHorizontal: 10},
  dateLabelLeft: {color:'#bbb', fontSize: 14, fontWeight: '600'},
  aedLabelCenter: {color:'#888', fontSize: 12, position:'absolute', left: 0, right: 0, textAlign:'center', top: -10},

  // Timeline
  timelineContainer: { marginTop: 20, position: 'relative' },
  redTriangleContainer: { 
    position: 'absolute', 
    top: -12, 
    left: '36.5%', 
    zIndex: 10,
    alignItems: 'center'
  },
  redTriangle: { color: '#FF3B30', fontSize: 16, transform: [{rotate: '180deg'}] }, // Pointing down

  timelineLine: { height: 2, backgroundColor: "#444", width: "100%", position: "absolute", top: 6 },
  dotsRow: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#444", borderWidth: 2, borderColor: '#22252B' },
  dotActive: { backgroundColor: "#DFFF4F", borderColor: '#22252B', width: 14, height: 14, borderRadius: 7 },
  
  timelineLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  timeLabel: { color: "#666", fontSize: 11 },

  // Exit Strategies
  sectionHeaderRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop: 24, marginBottom: 12},
  sectionTitle: {color:'#fff', fontWeight:'700', fontSize: 15},
  sectionSub: {color:'#777', fontSize: 12},
  headerControls: {flexDirection:'row', alignItems:'center'},
  smallPill: {backgroundColor:'#DFFF4F', flexDirection:'row', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, alignItems:'center', gap: 4},

  strategyRow: { flexDirection: 'row', gap: 8 },
  strategyCard: { flex: 1, borderRadius: 16, padding: 12, height: 120, justifyContent: 'space-between' },
  stratHeaderDark: { color: '#000', fontSize: 11, fontWeight: '600'},
  stratPercentDark: { color: '#000', fontSize: 22, fontWeight: '700'},
  stratSymbolDark: { color: '#000', fontWeight: '700'},
  stratValueDark: { color: '#444', fontSize: 10, fontWeight: '500'},

  footerNote: { color: '#666', fontSize: 11, marginTop: 16, lineHeight: 16},

  pagination: {flexDirection:'row', justifyContent:'center', marginTop: 20, gap: 6},
  pageDotActive: {width: 6, height: 6, borderRadius: 3, backgroundColor: '#DFFF4F'},
  pageDot: {width: 6, height: 6, borderRadius: 3, backgroundColor: '#444', borderWidth: 1, borderColor: '#666'},

  // Bottom Nav
  bottomNav: {
     position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, 
     backgroundColor: '#13161C', 
     flexDirection: 'row', justifyContent:'space-around', alignItems:'center',
     paddingBottom: 20,
     borderTopWidth: 1, borderTopColor: '#222'
  },
  plusButton: {
     width: 50, height: 50, borderRadius: 25, backgroundColor: '#DFFF4F',
     justifyContent:'center', alignItems:'center', marginBottom: 10
  },
  avatarWrap: {
     width: 28, height: 28, borderRadius: 14, overflow:'hidden', backgroundColor:'#333'
  },
  avatar: { width: '100%', height: '100%'}

});