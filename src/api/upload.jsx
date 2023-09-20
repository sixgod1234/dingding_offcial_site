import { get, post, Delete } from '../request'

// 新增产品
export const uploadImages = (data, config) => {
    return post('/api/minio/upload', data, config)
}
