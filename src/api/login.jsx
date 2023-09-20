import { get, post, Delete } from '../request'

// 登录
export const loginIn = (data) => {
    return post('/api/admin/login', data)
}

// 退出登录
export const loginOut = () => {
    return post('/api/admin/logout')
}

// 获取用户信息
export const getUser = () => {
    return get('/api/admin/info')
}

// 刷新token、监测token有没有过期
export const refreshToken = () => {
    return get('/api/admin/refreshToken')
}