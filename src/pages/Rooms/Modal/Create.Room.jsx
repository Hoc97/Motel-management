import { Modal, Form, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { BsHouseAdd } from 'react-icons/bs';
import { postCreateRoom } from '../../../services/api';

const CreateRoom = ({
    isOpenModalCreate,
    handleCloseModalCreate,
    fetchDataListRoom
}) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            name: 'Phòng',
            numberRoom: '1',
        });
    }, []);
    const handleSubmit = async (values) => {
        const { name, numberRoom } = values;
        let res = await postCreateRoom(name.trim(), numberRoom.trim());
        if (res.status === 201) {
            handleCloseModalCreate();
            form.resetFields();
            fetchDataListRoom();
        }
    };

    return (
        <Modal
            maskClosable={false}
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