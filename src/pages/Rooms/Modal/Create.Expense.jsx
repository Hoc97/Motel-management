import { Modal, Form, Input, Button, Radio, Checkbox, Select, InputNumber, notification } from 'antd';
import { useEffect, useState, memo } from 'react';
import { postCreateExpense } from '../../../services/api';

const CreateExpense = ({
    isOpenModalCreateExpense,
    setIsOpenModalCreateExpense,
    fetchDataExpense,
    listRoomName,
    listRoom
}) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [component, setComponent] = useState('moneypayment');
    const [unit, setUnit] = useState('kwh');
    const [checkAllRooms, setCheckAllRooms] = useState(true);

    const onComponentChange = (e) => {
        if (e.target.value) {
            setComponent(e.target.value);
        }
    };
    useEffect(() => {
        form.validateFields(['roomsName']);
    }, [checkAllRooms, form]);

    const onCheckboxChange = (e) => {
        setCheckAllRooms(!e.target.checked);
    };

    const onChangeUnit = (value) => {
        setUnit(value);
    };

    useEffect(() => {
        form.setFieldsValue({
            name: '',
            formPayment: component,
            unitprice: '',
            money: '',
            roomsName: [],
            applyAllRooms: false,
            unit: unit
        });
    }, []);

    const handleSubmit = async (values) => {
        let { name, formPayment, money, unitprice, roomsName, applyAllRooms } = values;
        let roomIds = roomsName.map(item => listRoom.find(room => room.name === item).id);
        let paymentMethod = {
            "price": money,
            "isUnitPrice": true,
            "unitPriceId": ''
        };
        if (formPayment === "moneypayment") {
            paymentMethod = {
                ...paymentMethod,
                "isUnitPrice": false,
            };
        }
        if (formPayment === "unitpricepayment") {
            if (unit === 'kwh') {
                paymentMethod.unitPriceId = 1;
            }
            if (unit === 'm3') {
                paymentMethod.unitPriceId = 2;
            }
            paymentMethod = {
                ...paymentMethod,
                "price": unitprice,
                "isUnitPrice": true,
            };
        }
        let res = await postCreateExpense(name, paymentMethod, roomIds, applyAllRooms);
        if (res.status === 201) {
            setIsOpenModalCreateExpense(false);
            // form.resetFields();
            fetchDataExpense();
        } else {
            notification.error({
                message: "Tạo chi phí không thành công",
                duration: 5
            });
        }
    };

    const suffixSelector = (
        <Form.Item name="unit" noStyle>
            <Select
                style={{
                    width: 120,
                }}
                onChange={onChangeUnit}
            >
                <Option value="kwh">VNĐ/kwh</Option>
                <Option value="m3">VNĐ/m3</Option>
            </Select>
        </Form.Item>
    );
    return (
        <Modal
            style={{ marginTop: '-40px' }}
            forceRender
            width={700}
            title="Tạo chi phí mới"
            open={isOpenModalCreateExpense}
            onCancel={() => setIsOpenModalCreateExpense(false)}
            footer={[
                <Button
                    form="myForm" key="submit" htmlType="submit" type="primary" onClick={() => {
                        form.validateFields()
                            .then((values) => {
                                handleSubmit(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}>
                    Tạo chi phí mới
                </Button>
            ]}
        >
            <Form
                form={form}
                className='form-create-room'
                name="basic"
            >
                <Form.Item
                    labelCol={{ span: 7 }}
                    label={`Tên:`}
                    name="name"
                    rules={[
                        { required: true, message: 'Cần nhập tên chi phí!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 7 }}
                    label="Hình thức thanh toán:"
                    name="formPayment"
                    rules={[
                        { required: true, message: 'Cần nhập hình thức' }
                    ]}
                >
                    <Radio.Group onChange={onComponentChange}>
                        <Radio value="moneypayment"> Thành tiền </Radio>
                        <Radio value="unitpricepayment"> Đơn giá </Radio>
                    </Radio.Group>
                </Form.Item>
                {component === 'moneypayment' && (
                    <Form.Item
                        labelCol={{ span: 7 }}
                        label={`Thành tiền:`}
                        name="money"
                        rules={[
                            { required: true, message: 'Cần nhập thành tiền!' }
                        ]}
                    >
                        <InputNumber
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            step="1000"
                            addonAfter="VNĐ"
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>)}
                {component === 'unitpricepayment' && (
                    <Form.Item
                        labelCol={{ span: 7 }}
                        label={`Đơn giá:`}
                        name="unitprice"
                        rules={[
                            { required: true, message: 'Cần nhập đơn giá!' }
                        ]}
                    >
                        <InputNumber
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            step="1000"
                            addonAfter={suffixSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                )}

                <Form.Item
                    className='roomId'
                    labelCol={{ span: 7 }}
                    label={`Áp dụng cho:`}
                    name="roomsName"
                    rules={[
                        { required: checkAllRooms, message: 'Cần nhập phòng!' }
                    ]}
                >
                    <Select mode="multiple" allowClear disabled={!checkAllRooms} >
                        {listRoomName.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="applyAllRooms"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 7,
                    }}
                >
                    <Checkbox checked={checkAllRooms} onChange={onCheckboxChange}>Tất cả phòng</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default memo(CreateExpense);