import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import _ from '../assets/utils/util';


const http = axios.create({
  baseURL: '/api',
  timeout: 5000
})

http.defaults.transformRequest = data => {
  // 转为urlencoded格式字符串
  if(_.isPlainObject(data)) data = qs.stringify(data);
  return data;
}

http.interceptors.response.use(response => {
  return response.data
}, err => {
  // 请求失败
  message.error(err.message);
  return Promise.reject(err)
})

export default http