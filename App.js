import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainStackNavigator from "./Navigations/MainStackNavigator";

const App = () => {
  return (
    <SafeAreaProvider style={styles.root}>
    <MainStackNavigator />
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  // root: {
  //   flex: 1,
  //   backgroundColor: "#ffff",
  // },
});

export default App;