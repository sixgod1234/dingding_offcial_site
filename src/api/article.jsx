import { get, post, Delete, Put } from '../request'

// 新增文章类型
export const addNewsCategory = (data) => {
    return post('/api/newsCategory', data)
}
// 编辑文章类型
export const editNewsCategory = (data) => {
    return Put('/api/newsCategory', data)
}
// 删除文章类型
export const deleteNewsCategory = (id) => {
    return Delete(`/api/newsCategory/${id}`)
}
// 文章类型下的具体分类
export const getTypeCategory = (type) => {
    return post(`/api/newsCategory/${type}`)
}
// 文章所有类型列表
export const getNewsCategoryList = (data) => {
    return post('/api/newsCategory/list', data)
}


// 文章列表
export const getNewsList = (category, name, type, pageNum, pageSize) => {
    return post(`/api/news/list?category=${category}&name=${name}&type=${type}&pageNum=${pageNum}&pageSize=${pageSize}`)
}
// 删除文章
export const delteNews = (id) => {
    return Delete(`/api/news/${id}`)
}
// 新增文章
export const addNews = (data) => {
    return post('/api/news', data)
}
// 编辑文章
export const editNews = (data) => {
    return Put(`/api/news`, data)
}
// 文章详情
export const getNewsDetail = (id) => {
    return get(`/api/news/${id}`)
}
