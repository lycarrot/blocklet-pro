import axios from 'axios';

const request = async (method: string, url: string, data = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
        baseURL: window.blocklet ? window.blocklet.prefix || '/' : '',
        timeout: 200000,
      });

      let res = response.data;
      if (res.code) {
        return resolve(res.data);
      } else {
        return reject(res);
      }
    } catch (error) {
      console.error('Error:', error);
      return reject(error);
    }
  });
};

export default request;
