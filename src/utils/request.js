import { extend } from 'umi-request';
import { message } from 'antd';

const prefix = '';
const headers = {
  'Content-Type': 'application/json'
};
const extendedRequest = extend({
  responseType: 'json',
  prefix: prefix, // prefix
  errorHandler: error => {
    // 集中处理请求错误
    const { response = {} } = error;
    const { status } = response;
    console.warn('error', error);
    let errorMessage = '请求错误，请重试!';
    switch (status) {
      case 400:
        errorMessage = '请求的参数不正确，或缺少必要信息，请对比文档';
        break;
      case 401:
        errorMessage = '需要用户认证的接口用户信息不正确';
        break;
      case 403:
        errorMessage = '缺少对应功能的权限';
        break;
      case 404:
        errorMessage = '数据不存在，或未开放';
        break;
      case 500:
        errorMessage = '服务器异常';
        break;
      default:
        break;
    }
    setTimeout(() => {
      message.error(errorMessage);
    }, 100);
  },
  headers: headers
});


export default async function request(url, options) {
  return extendedRequest(url, options).then(res => {
    // 业务上的错误统一在这里处理
    // if (res && res.resultcode !== '0') {
    // 错误
    // }
    return res;
  });
}