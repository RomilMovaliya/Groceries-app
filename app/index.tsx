import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import LogoIcon from "../assets/logoicon.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserSession } from "../supabase/auth/authFunction";
const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const isLoggedIn = await getUserSession();
      if (isLoggedIn.success) {
        router.replace("/tabs");
      } else {
        router.replace("/OnBoarding");
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#53B175"} />
      <LogoIcon height={100} width={90} />
      <View style={styles.name}>
        <Text style={styles.title}>nectar</Text>
        <Text style={styles.slogan}>online groceriet</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#53B175",
  },
  name: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    color: "white",
    fontWeight: "900",
    fontSize: 50,
    lineHeight: 50,
  },
  slogan: {
    color: "white",
    letterSpacing: 2,
  },
});
