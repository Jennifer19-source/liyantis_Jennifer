import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function BoardingSlideshow() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const slides = [
    {
      title: "Investor\nMath\nDone.",
      dotIndex: 0,
      image: require("../assets/images/Img1.png"),
    },
    {
      title: "Save\nBrand\nShare",
      dotIndex: 1,
      image: require("../assets/images/Img2.png"),
    },
    {
      title: "We Call on\nYour\nBehalf",
      dotIndex: 2,
      image: require("../assets/images/Img3.png"),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % 3;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000); // Auto-advance every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* CAROUSEL - TOP PART */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.carouselContainer}
      >
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slide, { width }]}>
            {/* TOP IMAGE */}
            <Image
              source={slide.image}
              style={styles.topImage}
            />

            {/* CURVED OVERLAY */}
            <View style={styles.curveContainer} />

            {/* TITLE */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{slide.title}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FIXED BOTTOM CONTENT */}
      <LinearGradient
        colors={["#0E0F1A", "#1A1B2D"]}
        style={styles.bottomContainer}
      >
        {/* Dots */}
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((dotIndex) => (
            <View
              key={dotIndex}
              style={[
                styles.dot,
                { opacity: currentIndex === dotIndex ? 1 : 0.4 },
              ]}
            />
          ))}
        </View>

        {/* EMAIL BUTTON */}
        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => router.push("/email")}
        >
          <Feather name="mail" size={20} color="#000" />
          <Text style={styles.emailText}>Continue with Email</Text>
        </TouchableOpacity>

        {/* SOCIAL BUTTONS */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={20} color="#FF968E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="apple" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* TERMS TEXT */}
        <Text style={styles.terms}>
          By continuing you agree Liyantis's Terms of{"\n"}Services &
          Privacy Policy
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F1A",
  },
  carouselContainer: {
    flex: 1,
  },
  slide: {
    height: "100%",
  },
  topImage: {
    width: "100%",
    height: "58%",
    resizeMode: "cover",
  },
  curveContainer: {
    display: "none",
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    left: 32,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "600",
    lineHeight: 40,
    marginBottom: 20,
  },
  bottomContainer: {
    width: "100%",
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  dotsContainer: {
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
  emailButton: {
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
  socialButton: {
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
