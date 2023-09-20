import { get, post, Delete } from '../request'

// 新增联系
export const addContact = (data) => {
    return post('/api/contact', data)
}
// 获取省份信息
export const getAreaCodeList = () => {
    return post('/api/areaCode/list')
}
// 获取省份下的城市信息
export const getAreaCodeCityList = (province) => {
    return post(`/api/areaCode/cityList/${province}`)
}
// 查询联系信息列表
export const getContactList = (name, pageNum, pageSize) => {
    return post(`/api/contact/list?name=${name}&pageNum=${pageNum}&pageSize=${pageSize}`)
}
// 删除联系信息
export const deleteContact = (id) => {
    return Delete(`/api/contact/${id}`)
}