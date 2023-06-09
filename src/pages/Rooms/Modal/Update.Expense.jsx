import { Modal, Form, Input, Button, Select, message, notification, Radio, InputNumber, Checkbox } from 'antd';
import { useEffect, useState, memo } from 'react';
import { patchEditExpense } from '../../../services/api';

const UpdateExpense = ({
    isOpenModalUpdateExpense,
    setIsOpenModalUpdateExpense,
    fetchDataExpense,
    expenseUpdate,
    listRoomName,
    listRoom
}) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [component, setComponent] = useState('moneypayment');
    const [checkAllRooms, setCheckAllRooms] = useState(true);
    const [unit, setUnit] = useState('kwh');
    const [disabledExpense, setDisableExpense] = useState(false);

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
        if (checkAllRooms) {
            form.setFieldsValue({
                roomsName: listRoomName?.map(item => item) ?? [],
            });
        } else {
            form.setFieldsValue({
                roomsName: expenseUpdate.rooms?.map(item => item.name) ?? [],
            });
        }
    };

    const onChangeRoomsName = (value) => {
        if (listRoomName.length === value.length) {
            form.setFieldsValue({
                applyAllRooms: true,
            });
        } else {
            form.setFieldsValue({
                applyAllRooms: false,
            });
        }
    };

    const onChangeUnit = (value) => {
        setUnit(value);
    };
    useEffect(() => {
        if (expenseUpdate.unitPriceFlag) {
            setComponent('unitpricepayment');
        } else {
            setComponent('moneypayment');
        }
        const arrayExpenseDefault = ['Tiền phòng', 'Tiền điện', 'Tiền nước', 'Tiền wifi', 'Tiền rác'];
        const disabledExpense = arrayExpenseDefault.some(item => item === expenseUpdate.name);
        setDisableExpense(disabledExpense);
    }, [expenseUpdate]);
    useEffect(() => {
        form.setFieldsValue({
            name: expenseUpdate.name,
            formPayment: component,
            unitprice: expenseUpdate.price,
            money: expenseUpdate.price,
            roomsName: expenseUpdate.rooms?.map(item => item.name) ?? [],
            applyAllRooms: expenseUpdate.applyAll,
            unit: expenseUpdate.unit?.replace('VNĐ/', '') ?? 'kwh'
        });
    }, [expenseUpdate, component]);

    const handleSubmit = async (values) => {

        let { name, formPayment, money, unitprice, roomsName, applyAllRooms } = values;
        let roomIds = roomsName.map(item => {
            return listRoom.find(room => room.name === item).id;
        });
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
        let res = await patchEditExpense(expenseUpdate.id, name, paymentMethod, roomIds, applyAllRooms);
        if (res.status === 204) {
            setCheckAllRooms(true);
            setIsOpenModalUpdateExpense(false);
            // form.resetFields();
            fetchDataExpense();
        } else {
            notification.error({
                message: "Cập nhật chi phí không thành công",
                duration: 5
            });
        }
    };

    const handleCancel = () => {
        form.setFieldsValue({
            applyAllRooms: expenseUpdate.applyAll,
            roomsName: expenseUpdate.rooms?.map(item => item.name) ?? [],
        });
        setCheckAllRooms(true);
        setIsOpenModalUpdateExpense(false);
    };

    const suffixSelector = (
        <Form.Item name="unit" noStyle>
            <Select
                style={{
                    width: 120,
                }}
                onChange={onChangeUnit}
            >
                <Option key="kwh" value="kwh">VNĐ/kwh</Option>
                <Option key="m3" value="m3">VNĐ/m3</Option>
            </Select>
        </Form.Item>
    );


    return (
        <Modal
            style={{ marginTop: '-40px' }}
            forceRender
            width={700}
            title={`Cập nhật chi phí ID ${expenseUpdate.id}`}
            open={isOpenModalUpdateExpense}
            onCancel={() => handleCancel()}
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
                    Cập nhật chi phí
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
                    <Input disabled={disabledExpense} />
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
                            min={0}
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
                            min={0}
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
                    <Select mode="multiple" allowClear disabled={!checkAllRooms} onChange={onChangeRoomsName} >
                        {listRoomName.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="applyAllRooms"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 2,
                    }}
                >
                    <Checkbox checked={checkAllRooms} onChange={onCheckboxChange}>Tất cả phòng</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default memo(UpdateExpense);