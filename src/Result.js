import React, {useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
export default function Result({route, navigation}) {
  const {data, image} = route.params;
  const [tab, setTab] = useState(1);
  // console.log(route.params)
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Translate"
        component={Translate}
        options={{title: 'Văn bản dịch'}}
        initialParams={{text: data.text1}}
      />
      <Tab.Screen
        name="Raw"
        component={Raw}
        options={{title: 'Văn bản gốc'}}
        initialParams={{text: data.text2}}
      />
      <Tab.Screen
        name="ImageRaw"
        component={ImageRaw}
        options={{title: 'Ảnh gốc'}}
        initialParams={{image: image}}
      />
    </Tab.Navigator>
  );
}
const Translate = ({route}) => {
  const {text} = route.params;
  return <Text>{text}</Text>;
};
const Raw = ({route}) => {
  const {text} = route.params;
  return <Text>{text}</Text>;
};
const ImageRaw = ({route}) => {
  const {image} = route.params;
  return <Image source={{uri: image.uri}} style={{flex: 1}} />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
