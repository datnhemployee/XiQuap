import {
    Platform
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';

const createFormData = (photo) => {
    // console.log(`uri ${JSON.stringify(photo)}`);
    // console.log(`uri ${JSON.stringify(photo.fileName)}`);
    // console.log(`uri ${JSON.stringify(photo.type)}`);
    // console.log(`uri ${JSON.stringify(photo.uri)}`);

  const data = new FormData();

  data.append('photo', {
      name: `${photo.fileName}.jpg`,
      type: `image/jpeg`,
      // type: photo.type,
      uri: photo.uri,
      // uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    })
  return data;
}

export const openFromLibrary = (
  success = (res) => {},
  failed = (err) => {}
) => {
  const options = {
    noData: true,
  }
  ImagePicker.launchImageLibrary(options, async res => {
    if (res.didCancel) {
      failed(` Đã hủy chọn hình.`)
      return;
    }
    
    if(!!res) {
    console.log(`res ${JSON.stringify(res)}`);

      try {
        // let getResult = await Axios.get('http://192.168.1.36:4000/');
        // console.log(`tui đang lấy dữ liệu nè: `,JSON.stringify(getResult.data));
        // let response = await Axios.post(`https://xiquap.herokuapp.com/`,
        let response = await Axios.post(`http://192.168.1.36:4000/image`,
          createFormData(res));

        if(response.status === 200)
          success(response.data);
        else failed(` lỗi từ server: ` + response );
      } catch (sendErr) {
        console.log(`Lỗi ở đây ${sendErr}`)
        failed(`Lỗi không thể gởi ảnh lên server: ` +sendErr);
      } 
    } else {
      failed(` Lỗi không thể lấy ảnh từ thư viện`);
    }
  })
}