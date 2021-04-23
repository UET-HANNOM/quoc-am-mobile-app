import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

const PreviewPicture = ({route, navigation}) => {
  const {image} = route.params;
  const [loading, setLoading] = useState(false);
  const handleScan = () => {
    setLoading(true);
    fetch('https://quoc-am-server.herokuapp.com/sampleData', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: ''}),
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        navigation.navigate('Result', {
          data: data,
          image: image,
        });
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <View style={styles.container}>
      <Image source={{uri: image.uri}} style={styles.img} />
      <Button
        title="Scan"
        loading={loading}
        buttonStyle={styles.btn}
        onPress={handleScan}
        disabled={loading}
      />
    </View>
  );
};

export default PreviewPicture;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  img: {
    width: 300,
    height: 400,
    alignItems: 'center',
  },
  btn: {
    width: 120,
  },
});
