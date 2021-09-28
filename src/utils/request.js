import axios from 'axios'
import { Message } from 'element-ui'
// 创建 axios 实例
const service = axios.create({
    baseURL: 'https://autumnfish.cn/',
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use()


// 响应拦截器
service.interceptors.response.use(response => {
    // console.log(response.data);
    const { code, data } = response.data
        //   要根据 status 的成功与否决定下面的操作
    if (code === 200) {
        return response.data
    } else {
        // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
        // Message.error(statusText) // 提示错误消息
        return Promise.reject(new Error(code + 'request.js'))
    }
}, error => {
    return Promise.reject(error)
})

export default service