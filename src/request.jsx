//在index.js中引入axios
import axios from 'axios';
//引入qs模块，用来序列化post类型的数据
import QS from 'qs';
//antd的message提示组件，大家可根据自己的ui组件更改。
import { message } from 'antd'

//保存环境变量
// const isPrd = process.env.NODE_ENV == 'production';

//区分开发环境还是生产环境基础URL
// export const basciUrl = isPrd ? 'https://www.production.com' : 'http://www.development.com'

//设置axios基础路径
const service = axios.create({
    baseURL: '',
    timeout: 8000
})


const urlArr = ['/api/admin/refreshToken', '/api/admin/logout']

// 请求拦截器
service.interceptors.request.use(config => {
    // const token = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');
    // //在每次的请求中添加token
    // config.data = Object.assign({}, config.data, {
    //     token: token,
    // })
    //设置请求头
    config.headers = {
        'Content-Type': 'application/json; charset=utf-8',
        ...config.headers
    }
    //序列化请求参数，不然post请求参数后台接收不正常
    // config.data = QS.stringify(config.data)
    if (urlArr.includes(config.url)) {
        config.headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': localStorage.getItem('token'),
            ...config.headers
        }
    }
    return config
}, error => {
    return error;
})

// 响应拦截器
service.interceptors.response.use(response => {
    switch (response.data.code) {
        case 200:
            return response.data;
        case 401:
            //未登录处理方法
            break;
        case 403:
            //token过期处理方法
            break;
        default: {
            let msg = response?.data?.message
            if (msg === 'token已经过期！') {
                message.warning('登录已经过期')
            } else {
                message.error(msg)
            }
            return Promise.reject(response.data)
        }
    }
    return response
}, (err) => {
    console.log(err)
})
//最后把封装好的axios导出
export default service

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
        service.post(url, data, config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function Delete(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
        service.delete(url, data, config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
/**
 * 封装Put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function Put(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
        service.put(url, data, config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
