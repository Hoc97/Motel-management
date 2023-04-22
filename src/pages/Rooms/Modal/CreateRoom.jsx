import { Modal, Form, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { BsHouseAdd } from 'react-icons/bs';
import { postCreateRoom } from '../../../services/api';

const CreateRoom = ({
    isOpenModalCreate,
    handleCloseModalCreate,
    fetchDataListRoom
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
    const handleSubmit = async (values) => {
        console.log('Received values of form: ', values);
        const { name, numberRoom } = values;
        let res = await postCreateRoom(name.trim(), numberRoom.trim());
        if (res.status === 201) {
            handleCloseModalCreate(false);
            form.resetFields();
            fetchDataListRoom();
        }
    };

    useEffect(() => {
        if (isOpenModalCreate) {
            fetchDataRoom();
        }
    }, [isOpenModalCreate]);

    const fetchDataRoom = async () => {
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