import { get, post, Delete, Put } from '../request'

// 头部 - 增加
export const addHome = (data) => {
    return post('/api/home', data)
}

//  头部 - 编辑
export const editHome = (data) => {
    return Put('/api/home', data)
}

//  头部 - 详情
export const getHome = (id) => {
    return get(`/api/home/${id}`)
}
//  头部 - 列表
export const getHomeList = () => {
    return post(`/api/home/list`)
}


// 下方信息 - 新增
export const addContent = (data) => {
    return post('/api/basicInfo', data)
}
// 下方信息 - 编辑
export const editContent = (data) => {
    return Put('/api/basicInfo', data)
}
// 下方信息 - 详情
export const getContent = (id) => {
    return get(`/api/basicInfo/${id}`)
}
// 根据类型查询基础信息
export const getTypeContent = (type) => {
    return post(`/api/basicInfo/${type}`)
}