import { get, post, Delete, Put } from '../request'
// 产品
// 新增产品
export const addProduct = (data) => {
    return post('/api/product', data)
}
// 编辑产品
export const editProduct = (data) => {
    return Put('/api/product', data)
}
// 删除产品
export const deleteProduct = (id) => {
    return Delete(`/api/product/${id}`)
}
// 产品详情
export const getProductDetail = (id) => {
    return get(`/api/product/${id}`)
}
// 产品列表
export const addProductList = (name, pageNum, pageSize) => {
    return post(`/api/product/list?name=${name}&pageNum=${pageNum}&pageSize=${pageSize}`)
}
// 产品列表分组
export const getProductAll = () => {
    return post(`/api/product/all`)
}


// 产品类型
// 新增
export const addProductType = (data) => {
    return post('/api/productType', data)
}
// 编辑
export const editProductType = (data) => {
    return Put('/api/productType', data)
}
// 删除
export const deleteProductType = (id) => {
    return Delete(`/api/productType/${id}`)
}
// 查询产品类型
export const getProductTypeList = (pageSize) => {
    return post(`/api/productType/list?pageSize=${pageSize}`)
}