import { Modal, Form, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { BsHouseAdd } from 'react-icons/bs';

const CreateRoom = ({
    isOpenModalCreate,
    handleCloseModalCreate,
}) => {
    const [data, setData] = useState({
        name: '',
        numberRoom: '',
    });
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            name: data.name,
            numberRoom: data.numberRoom,
        });
    }, [data]);
    const handleSubmit = (values) => {
        console.log('Received values of form: ', values);
        handleCloseModalCreate(false);
        form.resetFields();
        // setLoading(true);
        // setTimeout(() => {
        //   setLoading(false);
        //   setOpen(false);
        // }, 3000);
    };

    useEffect(() => {
        if (isOpenModalCreate) {
            fetchDataRoom();
            // console.log('data vào', isOpenModalCreate);
        }
    }, [isOpenModalCreate]);

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
            name: 'Phòng',
            numberRoom: '1',
        });
    };
    return (
        <Modal
            forceRender
            width={550}
            title="Tạo phòng"
            open={isOpenModalCreate}
            onCancel={handleCloseModalCreate}
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
                    Tạo phòng
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
                    label={`Số phòng cần tạo:`}
                    name="numberRoom"
                    rules={[
                        { required: true, message: 'Cần nhập số phòng!' }
                    ]}
                >
                    <Input addonAfter={<BsHouseAdd />} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateRoom;