/* eslint-disable no-alert */
import React from 'react';
import {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Camera({navigation}) {
  const [text, setText] = useState();
  const [loading, setLoading] = useState();
  const postImage = async image => {
    fetch('https://quoc-am-server.herokuapp.com/sampleData', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: ''}),
    })
      .then(response => response.json())
      .then(data => {
        setText(data);
        console.log('Success:', data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => setLoading(false));
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        navigation.navigate('Preview', {
          image: response,
        });
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      navigation.navigate('Preview', {
        image: response,
      });
      // setFilePath(response);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text h4>Tải lên một bức ảnh</Text>
        <Text>Chúng tôi sẽ quét bức ảnh và giúp bạn đọc nó</Text>
      </View>

      <Button
        icon={
          <Icon name="camera-alt" type="material" size={32} color="white" />
        }
        onPress={() => captureImage('photo')}
        title="Chụp ảnh"
      />
      <Button
        icon={
          <Icon name="file-upload" type="material" size={32} color="white" />
        }
        onPress={() => chooseFile('photo')}
        title="Chọn ảnh"
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
    alignItems: 'center',
  },
});
