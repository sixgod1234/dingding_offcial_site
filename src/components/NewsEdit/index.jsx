import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useNavigate } from 'react-router-dom'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '../../editor.css'
import styles from './index.module.scss'
import { uploadImages } from '../../api/upload'
import { SlateText } from '@wangeditor/editor'

const NewsEdit = (props, ref) => {
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('')
    const [text, setText] = useState('')

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
        }
    }, [editor])

    useImperativeHandle(ref, () => {
        return ({
            html,
            text,
            setHtml
        })
    })

    const toolbarConfig = {
        excludeKeys: ['fullScreen', 'todo', 'group-video']
    }

    const editorConfig = {
        placeholder: '请输入内容...',
        MENU_CONF: {
            uploadImage: {
                async customUpload(resultFiles, insertImgFn) {                   // JS 语法
                    // resultFiles 是 input 中选中的文件列表
                    // insertImgFn 是获取图片 url 后，插入到编辑器的方法
                    console.log(resultFiles)
                    try {
                        const formData = new FormData();
                        formData.append('file', resultFiles);
                        const res = await uploadImages(formData, { headers: { "content-type": "multipart/form-data" }, })
                        insertImgFn(res.url, res.name, res.url)
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
            uploadVideo: {
                // 自定义上传
                async customUpload(file, insertFn) {                   // JS 语法
                    // file 即选中的文件
                    // 自己实现上传，并得到视频 url poster
                    // 最后插入视频
                    // insertFn(url, poster)
                    try {
                        const formData = new FormData();
                        formData.append('file', file);
                        const res = await uploadImages(formData, { headers: { "content-type": "multipart/form-data" }, })
                        insertFn(res.url, res.name, res.url)
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        }
    }

    return (
        <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px' }}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editor => { setHtml(editor.getHtml()); setText(editor.getText()) }}
                mode="default"
                style={{ height: '500px' }}
            />
        </div>
    )
}

export default forwardRef(NewsEdit)