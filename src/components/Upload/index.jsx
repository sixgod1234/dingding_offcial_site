import React, { useState, useEffect } from 'react'
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd'
import { uploadImages } from '../../api/upload'
import axios from 'axios'

const OwnUpload = (props) => {
    const { maxCount = 1, value = [], onChange, ...reset } = props
    const [imageUrl, setImageUrl] = useState([]);

    const beforeUpload = (file, fileList) => {
        const imgs = ['image/jpeg', 'image/png', 'image/jpg']
        const isJpgOrPng = imgs.includes(file.type);
        if (!isJpgOrPng) {
            message.error('请上传后缀为jpeg、png、jpg的图片');
            // return false
            return Upload.LIST_IGNORE
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过2M');
            // return false
            return Upload.LIST_IGNORE
        }
        if (imageUrl?.length > (maxCount - 1)) {
            message.error(`图片最多上传${maxCount}张`);
            // return false
            return Upload.LIST_IGNORE
        }
        return isJpgOrPng && isLt2M;
    };

    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;
        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                // setProgress(percent);
                // if (percent === 100) {
                //     setTimeout(() => setProgress(0), 1000);
                // }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append("file", file);
        try {
            const res = await uploadImages(fmData, config);
            console.log("server res: ", res);
            onSuccess();
            onChange([...value, { url: res.url }])
        } catch (err) {
            console.log("Eroor: ", err);
            const error = new Error("Some error");
            onError({ err });
        }
    };

    const onRemove = (file) => {
        if (file) {
            const newFileList = value.filter((item) => item.uid !== file.uid)
            console.log(newFileList)
            onChange(newFileList)
            return true
        } else {
            return false
        }
    }

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            maxCount={maxCount}
            beforeUpload={beforeUpload}
            customRequest={uploadImage}
            onRemove={onRemove}
            fileList={value}
            showUploadList={{ showPreviewIcon: false }}
            style={{ minHeight: "102px" }}
            {...reset}
        >
            {value.length < maxCount && <PlusOutlined />}
        </Upload >
    )
}

export default OwnUpload