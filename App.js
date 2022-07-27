import {
  Alert,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// 페이지 이동 스택형식으로 쌓는것
import { NavigationContainer } from "@react-navigation/native";

//새로고침
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
//새로고침

//현재 사용자의 윈도우 크기를 가져옴.
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// API_KEY 원래는 db에 저장해야 안전하지만 지금 사용하는 키는 무료키라 괞찬.
const API_KEY = "9d7e8d61b78f7ceb762f24f2a3f114de";

export default function App() {
  //새로고침
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  //새로고침

  // 사용자의 위치정보
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("where?"); // 도시이름 빼내기.
  const [days, setDays] = useState([]);

  const ask = async () => {
    // requestForegroundPermissionsAsync 사용중일때 승인 요구
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 }); //getCurrentPositionAsync 현재위치
    const location = await Location.reverseGeocodeAsync(
      //reverseGeocodeAsync  경도 위도를 지역이름으로 바꿈
      { latitude, longitude },
      { uesGoogleMaps: false }
    );
    setCity(location[0].region);

    // 날씨 API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    // setDays(json); 날씨 정보를 days arr 로 빼내기
    setDays(json);
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cityBox}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        //pagingEnabled 어중간하게 멈추지 않고 페이지에 맞게 스크롤됨.
        //horizontal 가로 스크롤
        //showsHorizontalScrollIndicator={false} 아래쪽에 뜨던 스크롤 바를 삭제
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weatherBox}
        //새로고침
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        //새로고침
      >
        {days.length === 0 ? (
          <View style={styles.nowWeather}>
            <ActivityIndicator color={"black"} size={"large"} />
          </View>
        ) : (
          //현재 날씨
          <View style={styles.nowWeather}>
            <View style={styles.weatherItems}>
              {/* 크기를  지정하지 않으면 이미지가 안나옴!@# */}
              <Image
                style={styles.img}
                source={{
                  uri: `http://openweathermap.org/img/wn/${days.weather[0].icon}@2x.png`,
                }}
              />
              <Text style={styles.weather}>{days.weather[0].main}</Text>
              <Text style={styles.temperature}>
                {Math.round(days.main.temp)}°
              </Text>
              <Text style={styles.precipitation}>
                <Ionicons name="water-outline" size={24} color="black" />{" "}
                {days.main.humidity}%
              </Text>
              <Text style={{ textAlign: "center" }}>
                아래로 당겨서 새로고침
              </Text>
            </View>

            <Text
              style={styles.button}
              onPress={() => Alert.alert("Simple Button pressed")}
            >
              <MaterialCommunityIcons
                name="calendar-week"
                size={25}
                color="black"
              />
              주간예보
            </Text>
          </View>
        )}
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
  weatherItems: {
    marginBottom: 50,
    marginTop: 20,
  },
  nowWeather: {
    width: windowWidth,
    flex: 1,
    alignItems: "center",
  },
  weather: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "500",
  },
  temperature: {
    marginBottom: -30,
    marginTop: -30,
    fontSize: 120,
    fontWeight: "500",
  },
  precipitation: {
    textAlign: "right",
    fontSize: 30,
    fontWeight: "500",
  },
  img: {
    marginBottom: -10,
    width: 60,
    height: 60,
  },
  button: {
    flex: 1,
    fontSize: 30,
    marginTop: 50,
  },
});
