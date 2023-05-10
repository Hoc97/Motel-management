import { Modal, Form, Input, Button, notification, Select, Checkbox, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { BsHouseAdd } from 'react-icons/bs';
import { postCreateDataRevenue, postCreateRoom } from '../../../services/api';

const CreateRevenue = ({
    isOpenModalCreate,
    setIsOpenModalCreate,
    fetchDataRevenue,
    listRoomName
}) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [checkAllRooms, setCheckAllRooms] = useState(true);

    const onCheckboxChange = (e) => {
        setCheckAllRooms(!e.target.checked);
    };

    useEffect(() => {
        form.validateFields(['roomIds']);
    }, [checkAllRooms, form]);

    useEffect(() => {
        form.setFieldsValue({
            roomsName: [],
            applyAll: false
        });
    }, []);

    const convert = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    };

    const handleSubmit = async (values) => {

        const { date, roomsName, applyAll } = values;
        const createDate = convert(date.$d);
        const roomIds = roomsName.map(name => {
            const a = listRoomName.find(item => item.name === name);
            return a.id;
        });
        let res = await postCreateDataRevenue('2023-06-10', roomIds, applyAll);
        if (res.status === 201) {
            setIsOpenModalCreate(false);
            form.resetFields();
            fetchDataRevenue();
        } else {
            notification.error({
                message: "Tạo chi phí phòng không thành công",
                duration: 5
            });
        }
    };

    return (
        <Modal
            maskClosable={false}
            forceRender
            width={550}
            title="Tạo chi phí phòng"
            open={isOpenModalCreate}
            onCancel={() => setIsOpenModalCreate(false)}
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
                    Tạo chi phí phòng
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
                    label={`Ngày tạo:`}
                    name="date"
                    rules={[
                        { required: true, message: 'Cần nhập ngày tạo!' }
                    ]}
                >
                    <DatePicker />
                </Form.Item>
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
                        {listRoomName.map((item, index) => <Option value={item.name} key={index}>{item.name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="applyAll"
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

export default CreateRevenue;