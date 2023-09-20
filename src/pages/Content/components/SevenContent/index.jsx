import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { Form, Input, Row, Col, Button, message, Cascader } from 'antd'
import { Map as AMap, Markers } from 'react-amap'
import Oval from '../../../../assets/images/Oval.svg'
import Shape from '../../../../assets/images/Shape.svg'
import Pin from '../../../../assets/images/pin.svg'
import { addContact, getAreaCodeList, getAreaCodeCityList } from '../../../../api/contact'

const { TextArea } = Input
const { Item } = Form

const SevenContent = () => {
    const mapRef = useRef(null)
    const [form] = Form.useForm()

    const headeData = JSON.parse(localStorage.getItem('homeData') || '{}') || '{}'
    const { address, zhAddress, phone } = headeData

    const [areList, setAreaList] = useState([])
    const [markList, setMarkList] = useState([
        {
            context: 1,
            position: {
                longitude: address?.[0] || 116.391344,
                latitude: address?.[1] || 39.905393,
            },
            assetCount: '',
            address: ''
        }])

    useEffect(() => {
        handleAreaCodeList()
        // address.length && getEnName(address)
    }, [])

    const handleGoCenter = () => {
        mapRef.current && mapRef.current.setZoomAndCenter(15, [116.391344, 39.905393])
    }

    const onFinish = async (values) => {
        try {
            const { citys = [] } = values
            await addContact({ ...values, province: citys[0], city: citys[1], citys: undefined, createTime: Date.now() })
            message.success('操作成功！')
            form.resetFields()
        } catch (err) {
            console.log(err)
        }
    }

    const handleAreaCodeList = async () => {
        const areaCodeList = await getAreaCodeList()
        const areaList = areaCodeList.map((item) => ({ ...item, isLeaf: false }))
        setAreaList(areaList || [])
    }

    const handleLoadData = async (selectedOptions = []) => {
        try {
            const targetOption = selectedOptions[selectedOptions.length - 1] || {};
            if (targetOption.code) {
                const optionChildren = await getAreaCodeCityList(targetOption.code)
                targetOption.children = optionChildren || []
                setAreaList([...areList]);
            }
        } catch (err) {
            console.log(err)
        }
    }

    // const getEnName = (address) => {

    //     // geocoder.getLocation(address, function (status, result) {
    //     // if (status === 'complete' && result.geocodes.length) {
    //     //     var lnglat = result.geocodes[0].location
    //     //     document.getElementById('lnglat').value = lnglat;
    //     //     marker.setPosition(lnglat);
    //     //     map.add(marker);
    //     //     map.setFitView(marker);
    //     // } else {
    //     //     log.error('根据地址查询位置失败');
    //     // }

    //     const lnglatArr = address
    //     const geocoder = AMap.plugin("AMap.Geocoder", function () { })
    //     geocoder.getAddress(lnglatArr, (status, result) => {
    //         if (status === 'complete' && result.geocodes.length) {
    //             const { regeocode: { formattedAddress } } = result;
    //             console.log('result', result);
    //             // changeAddressName(formattedAddress)
    //             message.success(formattedAddress)
    //         }
    //     })
    //     // })
    // }

    return (
        <div className={styles['seven-content']}>
            <div className={styles['card-container']}>
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Row gutter={30}>
                        <Col span={12}>
                            <Item name="name" label="您的名字 *" rules={[{ required: true, message: '该项是必填项' }]}>
                                <Input placeholder="请输入您的名字" />
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item name="phone" label="联系电话 *" rules={[{ required: true, message: '该项是必填项' }]}>
                                <Input placeholder="请输入您的联系电话" />
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item name="citys" label="省 / 市">
                                <Cascader placeholder="请输入省 / 市"
                                    fieldNames={{ label: 'name', value: 'name', children: 'children' }}
                                    options={areList}
                                    loadData={handleLoadData}
                                />
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item name="email" label="email *" rules={[{ required: true, message: '该项是必填项' }]}>
                                <Input placeholder="请输入您的电子邮箱" />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Item name="description" label="留言信息 *" rules={[{ required: true, message: '该项是必填项' }]}>
                                <TextArea placeholder="这里输入留言信息..." style={{ height: '120px', resize: "none" }} />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Button htmlType="submit" type="primary">联系我们</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className={styles['address-container']}>
                <div className={styles['address-title-en']}>our address</div>
                <div className={styles['address-title-zh']}>我们的地址</div>
            </div>
            <div className={styles['map-container']}>
                <div className={styles['map-root']} style={{ width: '100%', height: '100%' }}>
                    <AMap
                        amapkey={'fef2a05990680da15b73af8b400e37c3'}
                        zoom={15}
                        center={address || [116.391344, 39.905393]}
                        ref={mapRef}
                        events={{ created: (el) => mapRef.current = el }}
                    >
                        <Markers
                            markers={markList}
                            render={() => <img src={Pin} alt="" />}
                        // useCluster={true}
                        // events={this.markersEvents}
                        ></Markers>
                    </AMap>
                </div>

                <div className={styles['map-footer']}>
                    <div className={styles['footer-left']}>
                        <div className={styles['footer-img-contianer']}>
                            <img src={Oval} alt="" className={styles['footer-img-1']} />
                            <img src={Shape} alt="" className={styles['footer-img-2']} />
                        </div>
                        <div className={styles['footer-descrip']}>
                            <div className={styles['footer-title']}>{zhAddress}</div>
                            <div className={styles['footer-sub']}>资讯热线-町町{phone || '-'}</div>
                        </div>
                    </div>
                    <div className={styles['footer-right']}>
                        <div className={styles['footer-button']} onClick={handleGoCenter}>Navigation</div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default SevenContent