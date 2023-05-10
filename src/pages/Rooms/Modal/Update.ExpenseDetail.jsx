import { Modal, Form, Input, Button, Select, message, notification, Radio, InputNumber, Checkbox } from 'antd';
import { useEffect, useState, memo } from 'react';
import { patchEditExpensedetail } from '../../../services/api';

const UpdateExpenseDetail = ({
    isOpenModalUpdateExpense,
    setIsOpenModalUpdateExpense,
    fetchDataExpenseDetail,
    expenseUpdate,
    roomID
}) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [component, setComponent] = useState('moneypayment');
    const [disabledField, setDisabledField] = useState(false);


    useEffect(() => {
        if (expenseUpdate.unitPriceFlag) {
            setComponent('unitpricepayment');
        } else {
            setComponent('moneypayment');
        }

    }, [expenseUpdate]);
    useEffect(() => {
        form.setFieldsValue({
            name: expenseUpdate.name,
            formPayment: component,
            unitprice: expenseUpdate.price,
            money: expenseUpdate.price,
            unit: expenseUpdate.unit?.replace('VNĐ/', '') ?? 'kwh'
        });
    }, [expenseUpdate, component]);

    const handleSubmit = async (values) => {
        let { money, unitprice } = values;
        let res = await patchEditExpensedetail(roomID, expenseUpdate.id, money ?? unitprice);
        if (res.status === 204) {
            setIsOpenModalUpdateExpense(false);
            fetchDataExpenseDetail();
        } else {
            notification.error({
                message: "Cập nhật chi phí không thành công",
                duration: 5
            });
        }
    };


    return (
        <Modal
            bodyStyle={{ padding: '20px' }}
            forceRender
            width={700}
            title={`Cập nhật chi phí ID ${expenseUpdate.id}`}
            open={isOpenModalUpdateExpense}
            onCancel={() => setIsOpenModalUpdateExpense(false)}
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
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 7 }}
                    label="Hình thức thanh toán:"
                    name="formPayment"
                    rules={[
                        { required: true, message: 'Cần nhập hình thức' }
                    ]}
                >
                    <Radio.Group >
                        <Radio value="moneypayment" disabled={component !== 'moneypayment'}> Thành tiền </Radio>
                        <Radio value="unitpricepayment" disabled={component !== 'unitpricepayment'}> Đơn giá </Radio>
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
                            addonAfter={expenseUpdate.unit}
                            style={{
                                width: '100%',
                            }}
                            min={0}
                        />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default memo(UpdateExpenseDetail);