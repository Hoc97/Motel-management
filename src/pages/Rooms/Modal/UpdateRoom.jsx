import { Modal, Form, Input, Button, Select, message } from 'antd';
import { useEffect, useState } from 'react';

const UpdateRoom = ({
    isOpenModalUpdate,
    handleCloseModalUpdate,
    roomUpdate,
    fetchDataListRoom
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { Option } = Select;
    const statusRoom = [
        {
            text: 'Đang cho thuê'
        },
        {

            text: 'Sắp trả'
        },
        {

            text: 'Phòng trống'
        }
    ];
    const [data, setData] = useState({
        name: '',
        status: '1',
    });
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            name: data.name,
            status: data.status,
        });
    }, []);

    useEffect(() => {
        if (isOpenModalUpdate) {
            fetchDataRoom();
        }
    }, [isOpenModalUpdate]);

    const fetchDataRoom = async () => {
        // let res = await apiRoom();
        // if (res.DT === 0) {
        //     setData(res.data);
        // message.success('Đăng nhập tài khoản thành công!');
        // }else {
        //     notification.error({
        //         message: "Có lỗi xảy ra",
        //         description:
        //             res.message && Array.isArray(res.message) ? res.message[0] : res.message,
        //         duration: 5
        //     });
        // }
        setData({
            name: roomUpdate.name,
            status: roomUpdate.status,
        });
    };


    const handleSubmit = (values) => {
        console.log('Received values of form: ', values);
        handleCloseModalUpdate(false);
        form.resetFields();
        message.success(
            <span>Đã cập nhật
                <b className='highlight-blue'> {values.name}</b> với trạng thái
                <b className='highlight-blue'> {values.status}</b>
            </span>);
        // message.success(`Đã cập nhật ${values.name} với trạng thái ${<a>{values.status}</a>}`);
        // setLoading(true);
        // setTimeout(() => {
        //   setLoading(false);
        //   setOpen(false);
        // }, 3000);
    };
    return (
        <Modal
            forceRender
            width={550}
            title="Cập nhật phòng"
            open={isOpenModalUpdate}
            onCancel={handleCloseModalUpdate}
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
                    Cập nhật phòng
                </Button>
            ]}
        >
            <Form
                initialValues={data}
                form={form}
                className='form-create-room'
                name="basic"
            >
                <Form.Item
                    labelCol={{ span: 7 }}
                    label={`Tên:`}
                    name="name"
                    rules={[
                        { required: true, message: 'Cần nhập tên phòng!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 7 }}
                    label={`Trạng thái:`}
                    name="status"
                    rules={[
                        { required: true, message: 'Cần nhập trạng thái!' }
                    ]}
                >
                    <Select>
                        {statusRoom.map((item, index) => <Option key={item.text}>{item.text}</Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateRoom;