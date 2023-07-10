import React, { useMemo } from "react";
import { View, FlatList } from "react-native";
import _ from "lodash";

import Header from "../components/Header";
import ForecastCard from "../components/ForecastCard";

function Forecast({ route, navigation }) {
  const { daily } = route.params;
  const data = useMemo(() => _.zip(daily.time, daily.temperature_2m_max, daily.temperature_2m_min), [daily])

  return (
    <View className="flex-1 bg-slate-900">
      <Header navigation={navigation} title="Forecast" />
      <FlatList
        data={data}
        renderItem={({item}) => <ForecastCard date={item[0]} max={item[1]} min={item[2]} />}
      />
    </View>
  );
}

export default Forecast;
