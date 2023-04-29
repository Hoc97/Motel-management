import { Modal, Form, Input, Button, Select, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import { patchEditRoom } from '../../../services/api';

const UpdateInfo = ({
    isOpenModalUpdate,
    handleCloseModalUpdate,
    infoUpdate,
    fetchDataListInfo
}) => {
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

    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            name: infoUpdate.name,
            status: infoUpdate.status,
        });
    }, [infoUpdate]);

    const handleSubmit = async (values) => {
        const { name, status } = values;
        // let res = await patchEditRoom(roomUpdate.id, name.trim(), status.trim());
        // if (res.status === 204) {
        //     handleCloseModalUpdate();
        //     form.resetFields();
        //     message.success(
        //         <span>Đã cập nhật
        //             <b className='highlight-blue'> {values.name}</b> với trạng thái
        //             <b className='highlight-blue'> {values.status}</b>
        //         </span>);
        //     fetchDataListInfo();
        // } else {
        //     notification.error({
        //         message: "Cập nhật phòng không thành công",
        //         duration: 5
        //     });
        // }
    };
    return (
        <Modal
            maskClosable={false}
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
                        {statusRoom.map((item) => <Option key={item.text}>{item.text}</Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateInfo;