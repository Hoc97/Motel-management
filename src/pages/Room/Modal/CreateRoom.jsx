import { Modal, Form, Divider, Input, Button, Select } from 'antd';
import { BsHouseAdd } from 'react-icons/bs';

const CreateRoom = ({
    isModalCreate,
    handleCloseModalCreate,
}) => {

    const { Option } = Select;
    return (
        <Modal title="Tạo loại phòng" open={isModalCreate} onOk={handleCloseModalCreate} onCancel={handleCloseModalCreate}>
            <Form
                className='form-create-room'
                name="basic"
                // style={{ maxWidth: 600, margin: '0 auto' }}
                // onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    labelCol={{ span: 6 }}
                    label={`Loại:`}
                    rules={[
                        {
                            required: true,
                            message: 'Input something!',
                        },
                    ]}
                >

                    <Select defaultValue='1'>
                        <Option value="1">Phòng trọ</Option>
                        <Option value="2">Nhà nguyên căn</Option>
                        <Option value="3">Kiot</Option>
                    </Select>

                </Form.Item>
                <Form.Item
                    labelCol={{ span: 6 }}
                    label={`Số phòng cần tạo:`}
                >
                    <Input addonAfter={<BsHouseAdd />} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateRoom;