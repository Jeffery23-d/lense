import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function AnimalReport({ onClose, photoUri }) {
  return (
    <View style={styles.popUp}>
      <View style={styles.head}>
        <Text style={styles.popUpHeading}>Scan Report</Text>
        <TouchableOpacity style={styles.cancel} onPress={onClose}>
          <Image
            source={require("../assets/cancel.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.label}>
            Name: <Text style={styles.value}>Goat</Text>
          </Text>
          <Text style={styles.label}>
            Category: <Text style={styles.subText}>Livestock</Text>
          </Text>
        </View>

        <Image source={require("../assets/goat.png")} style={styles.image} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Analysis</Text>
          <Text>
            🩺 Vitality Score: <Text style={styles.value}>9.1</Text>
          </Text>
          <Text>
            🟢 Status: <Text style={styles.green}>Healthy</Text>
          </Text>
          <Text style={styles.indicatorTitle}>📋 Indicators:</Text>
          <Text>✅ Coat Condition: Smooth</Text>
          <Text>✅ Eyes: Bright and Clear</Text>
          <Text>✅ Activity Level: High</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition (Per 100g meat)</Text>
          <Text>🔥 Calories: 143 kcal</Text>
          <Text>🥩 Protein: 27 g</Text>
          <Text>🧈 Fat: 3 g</Text>
          <Text>🧪 Iron: 3.7 mg</Text>
          <Text>💧 Water: 69%</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Remarks</Text>
          <Text>🔴 No signs of disease or malnutrition.</Text>
          <Text>⚠️ Recommend regular hoof trimming.</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Download </Text>
            <Image
              source={require("../assets/download.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Share</Text>
            <View style={{ transform: [{ rotate: "-180deg" }] }}>
              <Image
                source={require("../assets/download.png")}
                style={{ width: 24, height: 24 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  popUp: {
    position: "absolute",
    bottom: 0,
    zIndex: 99,
    width: "100%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.2)",
  },
  popUpHeading: {
    fontSize: 17,
    fontWeight: "500",
    paddingHorizontal: 16,
  },
  cancel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#21C64B",
    marginRight: 16,
  },
  head: {
    width: "100%",
    display: "flex",
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,.2)",
  },
  scrollContent: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
    flexDirection:"column",
    gap:4
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    fontWeight: "600",
  },
  subText: {
    color: "#666",
  },
  green: {
    color: "green",
    fontWeight: "600",
  },
  indicatorTitle: {
    marginTop: 4,
    fontWeight: "500",
    marginBottom: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 12,
    paddingBottom: 32,
  },
  button: {
    flex: 1,
    backgroundColor: "#21C64B",
    padding: 12,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    gap: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
