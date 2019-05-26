import {
    Platform
} from 'react-native';

export default (photo,body) => {
    // console.log(`uri ${JSON.stringify(photo)}`);
    // console.log(`uri ${JSON.stringify(photo.fileName)}`);
    // console.log(`uri ${JSON.stringify(photo.type)}`);
    // console.log(`uri ${JSON.stringify(photo.uri)}`);

    const data = new FormData();

    data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
      })
    
      Object.keys(body).forEach(key => {
        data.append(key, body[key])
      })
    
      return data
    }