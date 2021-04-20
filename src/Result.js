import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Result({ route, navigation }) {
    const {translate,result} = route.params
    // console.log(route.params)
    return (
        <View>
            <Image source={{uri: translate.uri}} style={styles.imageStyle} />
            <Text>{result}</Text>
        </View>
    )
}
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
  