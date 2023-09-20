import React, { useState, useEffect } from 'react'
import { Form, Input, Space, message, Row, Col, InputNumber, Button, Spin } from 'antd'
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.scss'
import OwnUpload from '../../../../components/Upload'
import { headerImg } from '../../../Content/data';
import { mockHomeData } from '../mockData';
import axios from 'axios'
import {
    getHomeList,
    getHome,
    addHome,
    editHome,
    addContent,
    editContent,
    getTypeContent
} from '../../../../api/home'

const { Item } = Form

const HomeFormEdit = () => {
    const [loading, setLoading] = useState(false);
    const [waiting, setWaiting] = useState(false);
    // const [idMap, setIdMap] = useState((new Map()))

    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location || {}
    const { idMap, homeData } = state
    const [form] = Form.useForm()

    useEffect(() => {
        // form.setFieldsValue(mockHomeData)
        // getDetail()
        if (!homeData || idMap.size === 0) {
            message.error('未获取到数据')
            navigate('/admin/home-detail')
        } else {
            form.setFieldsValue(homeData || {})
        }
    }, [])


    const onFinish = async (values) => {
        try {
            // console.log(values)
            setWaiting(true)
            const { headZnTitle, headEnTitle, headDescription, carouselImgs, dingProfile, dingDescription, dingProfileImgs, case: pcase, zhAddress, phone, splitTitle, splitContent,
                area, supplier, customer, productCase, coreAdvantages, teamIntroduction, teamStyle, companyIntroduction, companyDescription, companyStyle, honorWall, address, contactUs } = values
            await editHome(
                {
                    id: idMap.get('home'),
                    name: headZnTitle,
                    enName: headEnTitle,
                    description: headDescription,
                    images: carouselImgs.map((item) => item.url).join(';'),
                }
            )
            // profile --- 项
            await editContent(
                {
                    id: idMap.get('profile'),
                    type: 'profile',
                    name: dingProfile,
                    description: dingDescription,
                    images: dingProfileImgs.map((item) => item.url).join(';'),
                    remark: JSON.stringify({ case: pcase, area, supplier, customer, contactUs, address, zhAddress, phone, splitTitle, splitContent })
                }
            )
            // about --- 项目案例
            await editContent(
                {
                    id: idMap.get('about'),
                    type: 'about',
                    name: productCase.map((item) => item.title).join(';'),
                    description: productCase.map((item) => item.content).join(';'),
                    images: productCase.map((item) => item.imgUrl?.[0]?.url || '').join(';'),
                }
            )
            // advantage --- 核心优势
            await editContent(
                {
                    id: idMap.get('advantage'),
                    type: 'advantage',
                    name: coreAdvantages.map((item) => item.title).join(';'),
                    description: coreAdvantages.map((item) => item.content).join(';'),
                    images: coreAdvantages.map((item) => item.imgUrl?.[0]?.url || '').join(';'),
                }
            )
            // teamStyle --- 团队风采
            await editContent(
                {
                    id: idMap.get('employee'),
                    type: 'employee',
                    name: teamStyle.map((item) => item.title).join(';'),
                    description: teamStyle.map((item) => item.content).join(';'),
                    images: teamStyle.map((item) => item.imgUrl?.[0]?.url || '').join(';'),
                    remark: teamIntroduction,
                }
            )
            // aboutDetail --- 关于我们详情
            await editContent(
                {
                    id: idMap.get('aboutDetail'),
                    type: 'aboutDetail',
                    name: companyIntroduction,
                    description: companyDescription,
                    images: companyStyle.map((item) => item.url).join(';')
                }
            )
            // honor --- 荣誉
            await editContent(
                {
                    id: idMap.get('honor'),
                    type: 'honor',
                    name: '',
                    description: '',
                    images: honorWall.map((item) => item.url).join(';')
                }
            )
            setWaiting(false)
            message.success('操作成功')
            navigate('/admin/home-detail')
        } catch (err) {
            setWaiting(false)
            console.log(err)
        }
    }

    return (
        <Spin spinning={loading}>
            <div className={styles['HomeFormEdit-container']}>
                <h3 className={styles['edit-header']}>编辑基本配置信息</h3>
                <Form form={form} onFinish={onFinish} labelCol={{ span: 4 }} colon={false} scrollToFirstError className={styles['form-container']}>
                    <Row gutter={30}>
                        <Col span={12}>
                            <Item labelCol={{ span: 8 }} name="headZnTitle" label="轮播图区域中文名" rules={[
                                {
                                    required: true,
                                    message: "轮播图区域中文名必填",
                                },
                            ]}>
                                <Input />
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item labelCol={{ span: 8 }} name="headEnTitle" label="轮播图区域英文名" rules={[
                                {
                                    required: true,
                                    message: "轮播图区域英文名必填",
                                },
                            ]}>
                                <Input />
                            </Item>
                        </Col>
                    </Row>
                    <Item name="headDescription" label="轮播图区域描述" rules={[
                        {
                            required: true,
                            message: "轮播图区域描述必填",
                        },
                    ]}>
                        <Input.TextArea />
                    </Item>
                    <Item name="carouselImgs" label="轮播图" rules={[
                        {
                            required: true,
                            message: "轮播图",
                        },
                    ]}>
                        <OwnUpload maxCount={5} />
                    </Item>
                    <Item name="dingProfile" label="町町介绍" rules={[
                        {
                            required: true,
                            message: "町町介绍必填",
                        },
                    ]}>
                        <Input />
                    </Item>
                    <Item name="dingDescription" label="町町描述" rules={[
                        {
                            required: true,
                            message: "町町描述必填",
                        },
                    ]}>
                        <Input.TextArea />
                    </Item>
                    <Item name="dingProfileImgs" label="町町介绍图" rules={[
                        {
                            required: true,
                            message: "町町介绍图必填",
                        },
                    ]}>
                        <OwnUpload maxCount={2} />
                    </Item>
                    <Row gutter={20}>
                        <Col span={6}>
                            <Item labelCol={{ span: 16 }} name="case" label="项目案例数" rules={[
                                {
                                    required: true,
                                },
                            ]}>
                                <InputNumber precision={0} min={0} max={9999} />
                            </Item>
                        </Col>
                        <Col span={6}>
                            <Item labelCol={{ span: 16 }} name="area" label="合作地区数" rules={[
                                {
                                    required: true,
                                },
                            ]}>
                                <InputNumber precision={0} min={0} max={9999} />
                            </Item>
                        </Col>
                        <Col span={6}>
                            <Item labelCol={{ span: 16 }} name="supplier" label="合作供应商数" rules={[
                                {
                                    required: true,
                                },
                            ]}>
                                <InputNumber precision={0} min={0} max={9999} />
                            </Item>
                        </Col>
                        <Col span={6}>
                            <Item labelCol={{ span: 16 }} name="customer" label="运营客户数" rules={[
                                {
                                    required: true,
                                    message: "公司介绍必填",
                                },
                            ]}>
                                <InputNumber precision={0} min={0} max={9999} />
                            </Item>
                        </Col>
                    </Row>
                    <Form.List
                        name="productCase"
                        initialValue={[{}]}
                        rules={[
                            {
                                validator: async (_, value) => {
                                    console.log(value)
                                    if (value && value.length > 5) {
                                        return Promise.reject(new Error('最多新增5条优秀案例'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <div className={styles['form-list-container']}>
                                {fields.map((field, index) => (
                                    <Row key={field.key}>
                                        <Col span={19}>
                                            <Form.Item
                                                label={'优秀案例' + (index + 1)}
                                                labelCol={{ span: 5 }}
                                                key={field.key + 'title'}
                                                name={[field.name, 'title']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "优秀案例标题必填",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="请输入优秀案例标题" />
                                            </Form.Item>
                                            <Form.Item
                                                wrapperCol={{ offset: 5 }}
                                                key={field.key + 'content'}
                                                name={[field.name, 'content']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "优秀案例描述必填",
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea placeholder="请输入优秀案例案例描述" style={{ height: '52px' }} />
                                            </Form.Item>
                                        </Col>
                                        <Form.Item
                                            key={field.key + 'imgUrl'}
                                            name={[field.name, 'imgUrl']}
                                            style={{ marginLeft: '10px' }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "案例图必填",
                                                },
                                            ]}
                                        >
                                            <OwnUpload />
                                        </Form.Item>
                                        <div className={styles['action-button-container']}>
                                            {fields.length > 1 &&
                                                <MinusCircleOutlined
                                                    className={styles["dynamic-delete-button"]}
                                                    onClick={() => remove(field.name)}
                                                />}
                                            {(index === fields.length - 1 && fields.length < 5) &&
                                                < PlusCircleOutlined
                                                    className={styles["dynamic-add-button"]}
                                                    onClick={() => add()}
                                                />}
                                        </div>
                                    </Row>
                                ))}
                            </div>
                        )}
                    </Form.List>
                    <Form.List
                        name="coreAdvantages"
                        initialValue={[{}]}
                        rules={[
                            {
                                validator: async (_, value) => {
                                    console.log(value)
                                    if (value && value.length > 5) {
                                        return Promise.reject(new Error('最多新增5条核心优势'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <div className={styles['form-list-container']}>
                                {fields.map((field, index) => (
                                    <Row key={field.key}>
                                        <Col span={19}>
                                            <Form.Item
                                                label={'核心优势' + (index + 1)}
                                                labelCol={{ span: 5 }}
                                                key={field.key + 'title'}
                                                name={[field.name, 'title']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "核心优势标题必填",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="请输入核心优势标题" />
                                            </Form.Item>
                                            <Form.Item
                                                wrapperCol={{ offset: 5 }}
                                                key={field.key + 'content'}
                                                name={[field.name, 'content']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "核心优势描述必填",
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea placeholder="请输入核心优势描述" style={{ height: '52px' }} />
                                            </Form.Item>
                                        </Col>
                                        <Form.Item
                                            key={field.key + 'imgUrl'}
                                            name={[field.name, 'imgUrl']}
                                            style={{ marginLeft: '10px' }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "图片必填",
                                                },
                                            ]}
                                        >
                                            <OwnUpload />
                                        </Form.Item>
                                        <div className={styles['action-button-container']}>
                                            {fields.length > 1 &&
                                                <MinusCircleOutlined
                                                    className={styles["dynamic-delete-button"]}
                                                    onClick={() => remove(field.name)}
                                                />}
                                            {(index === fields.length - 1 && fields.length < 5) &&
                                                < PlusCircleOutlined
                                                    className={styles["dynamic-add-button"]}
                                                    onClick={() => add()}
                                                />}
                                        </div>
                                    </Row>
                                ))}
                            </div>
                        )}
                    </Form.List>
                    {/* <Form.List
                    name="coreAdvantages"
                    initialValue={[{}]}
                    rules={[
                        {
                            validator: async (_, value) => {
                                if (value && value.length > 5) {
                                    return Promise.reject(new Error('最多新增5条核心优势'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Row key={field.key}>
                                    <Col span={19}>
                                        <Form.Item
                                            label={index > 0 ? '' : '核心优势'}
                                            labelCol={{ span: 5 }}
                                            wrapperCol={{ offset: index > 0 ? 5 : 0 }}
                                            key={field.key + index}
                                            name={[field.name]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "核心优势描述必填",
                                                },
                                            ]}
                                        >
                                            <Input.TextArea placeholder="请输入核心优势" style={{ height: '60px' }} />
                                        </Form.Item>
                                    </Col>
                                    <div className={styles['action-button-container']} style={{ marginLeft: "10px", height: '60px' }}>
                                        {fields.length > 1 &&
                                            <MinusCircleOutlined
                                                className={styles["dynamic-delete-button"]}
                                                onClick={() => remove(field.name)}
                                            />}
                                        {(index === fields.length - 1 && fields.length < 5) &&
                                            < PlusCircleOutlined
                                                className={styles["dynamic-add-button"]}
                                                onClick={() => add()}
                                            />}
                                    </div>
                                </Row>
                            ))}
                        </>
                    )}
                </Form.List> */}
                    <Item name="splitTitle" label="分割标题" rules={[
                        {
                            required: true,
                            message: "分割标题必填",
                        },
                    ]}>
                        <Input />
                    </Item>
                    <Item name="splitContent" label="分割内容" rules={[
                        {
                            required: true,
                            message: "分割内容必填",
                        },
                    ]}>
                        <Input.TextArea />
                    </Item>
                    <Item name="teamIntroduction" label="团队介绍">
                        <Input.TextArea />
                    </Item>
                    <Form.List
                        name="teamStyle"
                        initialValue={[{}]}
                        rules={[
                            {
                                validator: async (_, value) => {
                                    if (value && value.length > 5) {
                                        return Promise.reject(new Error('最多新增5条团队风采'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <div className={styles['form-list-container']}>
                                {fields.map((field, index) => (
                                    <Row key={field.key}>
                                        <Col span={19}>
                                            <Form.Item
                                                label={'团队风采' + (index + 1)}
                                                labelCol={{ span: 5 }}
                                                key={field.key + 'title'}
                                                name={[field.name, 'title']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "团队人员姓名必填",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="请输入团队人员姓名" />
                                            </Form.Item>
                                            <Form.Item
                                                wrapperCol={{ offset: 5 }}
                                                key={field.key + 'content'}
                                                name={[field.name, 'content']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "人员简介必填",
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea placeholder="请输入人员简介" style={{ height: '52px' }} />
                                            </Form.Item>
                                        </Col>
                                        <Form.Item
                                            key={field.key + 'imgUrl'}
                                            name={[field.name, 'imgUrl']}
                                            style={{ marginLeft: '10px' }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "成员图必填",
                                                },
                                            ]}
                                        >
                                            <OwnUpload />
                                        </Form.Item>
                                        <div className={styles['action-button-container']}>
                                            {fields.length > 1 &&
                                                <MinusCircleOutlined
                                                    className={styles["dynamic-delete-button"]}
                                                    onClick={() => remove(field.name)}
                                                />}
                                            {(index === fields.length - 1 && fields.length < 5) &&
                                                < PlusCircleOutlined
                                                    className={styles["dynamic-add-button"]}
                                                    onClick={() => add()}
                                                />}
                                        </div>
                                    </Row>
                                ))}
                            </div>
                        )}
                    </Form.List>
                    <Item name="companyIntroduction" label="公司介绍" rules={[
                        {
                            required: true,
                            message: "公司介绍必填",
                        },
                    ]}>
                        <Input.TextArea />
                    </Item>
                    <Item name="companyDescription" label="公司简介" rules={[
                        {
                            required: true,
                            message: "公司简介必填",
                        },
                    ]}>
                        <Input.TextArea />
                    </Item>
                    <Item name="companyStyle" label="公司风采" rules={[
                        {
                            required: true,
                            message: "公司风采必填",
                        },
                    ]}>
                        <OwnUpload maxCount={5} />
                    </Item>
                    <Item name="honorWall" label="荣誉墙" rules={[
                        {
                            required: true,
                            message: "荣誉墙必填",
                        },
                    ]}>
                        <OwnUpload maxCount={6} />
                    </Item>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item
                                label={'公司坐标经度'}
                                labelCol={{ span: 8 }}
                                name={["address", 0]}
                                rules={[
                                    {
                                        required: true,
                                        message: "公司坐标经度必填",
                                    },
                                ]}
                            >
                                <InputNumber precision={6} min={-180} max={180} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={'公司坐标纬度'}
                                name={["address", 1]}
                                labelCol={{ span: 8 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "公司坐标纬度必填",
                                    },
                                ]}
                            >
                                <InputNumber precision={6} min={-90} max={90} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label={'公司详细地址'}
                        name={'zhAddress'}
                        labelCol={{ span: 4 }}
                        rules={[
                            {
                                required: true,
                                message: "公司详细地址必填",
                            },
                        ]}
                    >
                        <Input placeholde="请输入公司详细地址如：河北省北京市xxxx" />
                    </Form.Item>
                    <Item name="phone" label="联系电话" rules={[
                        {
                            required: true,
                            message: "联系电话必填",
                        },
                    ]}>
                        <Input />
                    </Item>
                    <Form.Item
                        label={'底部联系我们文案'}
                        name={'contactUs'}
                        labelCol={{ span: 4 }}
                        rules={[
                            {
                                required: true,
                                message: "底部联系我们文案必填",
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <p className={styles['action-container']}>
                        <Space>
                            <Button onClick={() => navigate(-1)}>返回</Button>
                            <Button type="primary" htmlType="submit" loading={waiting}>提交</Button>
                        </Space>
                    </p>
                </Form>

            </div>
        </Spin>
    )
}

export default HomeFormEdit