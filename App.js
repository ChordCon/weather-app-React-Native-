import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.cityBox}>
        <Text style={styles.cityName}>대구</Text>
      </View>
      <ScrollView
        //pagingEnabled 어중간하게 멈추지 않고 페이지에 맞게 스크롤됨.
        //horizontal 가로 스크롤
        //showsHorizontalScrollIndicator={false} 아래쪽에 뜨던 스크롤 바를 삭제
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weatherBox}
      >
        <View style={styles.nowWeather}>
          <Text style={styles.weather}>맑음</Text>
          <Text style={styles.temperature}>26°</Text>
          <Text style={styles.precipitation}>☔ 0%</Text>
        </View>
        <View style={styles.nowWeather}>
          <Text style={styles.weather}>맑음</Text>
          <Text style={styles.temperature}>26°</Text>
          <Text style={styles.precipitation}>☔ 0%</Text>
        </View>
        <View style={styles.nowWeather}>
          <Text style={styles.weather}>맑음</Text>
          <Text style={styles.temperature}>26°</Text>
          <Text style={styles.precipitation}>☔ 0%</Text>
        </View>
        <View style={styles.nowWeather}>
          <Text style={styles.weather}>맑음</Text>
          <Text style={styles.temperature}>26°</Text>
          <Text style={styles.precipitation}>☔ 0%</Text>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD133",
  },
  cityBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 50,
    fontWeight: "500",
  },
  weatherBox: {},
  nowWeather: {
    width: windowWidth,
    marginTop: -180,
    justifyContent: "center",
    alignItems: "center",
  },
  weather: {
    marginBottom: -30,
    fontSize: 30,
    fontWeight: "500",
  },
  temperature: {
    fontSize: 120,
    fontWeight: "500",
  },
  precipitation: {
    fontSize: 50,
    fontWeight: "500",
  },
});
