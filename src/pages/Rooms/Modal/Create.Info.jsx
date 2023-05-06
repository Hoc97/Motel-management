import { Modal, Form, Input, Button, message, notification, Upload, Col, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { postCreateUserEachRoom } from '../../../services/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { blobToBase64, urltoFile } from '../../../components/common/Common';




const CreateInfo = ({
    isOpenModalCreateUser,
    setIsOpenModalCreateUser,
    fetchDataListInfo,
    roomID
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);


    useEffect(() => {
        form.setFieldsValue({
            name: '',
            email: '',
            phoneNumber: '',
            identifyCard: []
        });
        return () => {
            form.resetFields();
        };
    }, []);

    const handleCloseModal = () => {
        setIsOpenModalCreateUser(false);
        form.resetFields();
        setFileList([]);
    };

    const handleSubmit = async (values) => {
        console.log('values', values);
        const { name, email, phoneNumber, identifyCard } = values;
        const data = await Promise.all(identifyCard.map(async item => {
            return await urltoFile(item.thumbUrl, item.name, 'image/png');
        }));

        const front = data[0];
        const back = data[1];
        setLoadingSubmit(true);
        let res = await postCreateUserEachRoom(roomID, front, back, name, email, phoneNumber);
        console.log('postCreateUserEachRoom', res);
        if (res.status === 204) {
            setIsOpenModalCreateUser(false);
            form.resetFields();
            setFileList([]);
            setLoadingSubmit(false);
            fetchDataListInfo();
        } else {
            notification.error({
                message: `Tạo thông tin ${name}  không thành công`,
                duration: 5
            });
        }
    };

    // upload image
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ cố thể upload file hình ảnh!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('File hình ảnh phải nhỏ hơn 2 MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        const { status } = info.file;
        if (status === 'uploading' && fileList.length < 2) {
            setLoading(true);
            return;
        }
        if (status === 'done') {
            setLoading(false);
            setTimeout(() => {
                message.success(`${info.file.name} đã upload thành công`);
            }, 0);
        } else if (status === 'error') {
            message.error(`${info.file.name} đã upload thất bại`);
        }
    };

    const handleUploadFile = async ({ file, onSuccess, onError }) => {
        if (fileList.length < 2) {
            const newFile = {
                key: file.uid,
                uid: file.uid,
                name: file.name,
                status: 'done',
                url: await blobToBase64(file)
            };
            setFileList(fileList => [...fileList, newFile]);
            onSuccess("ok");
        } else {
            message.error(`Chỉ có thể upload tối đa 2 ảnh CMND`);
            onError('error');
        }
    };

    const handleRemoveFile = (file) => {
        const newFileList = fileList.filter(x => x.uid !== file.uid);
        setFileList(newFileList);
    };

    const handlePreview = async (file) => {
        if (file.url && !file.originFileObj) {
            setPreviewImage(file.url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
            return;
        }
        getBase64(file.originFileObj, (url) => {
            setPreviewImage(url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        });
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <Modal
            forceRender
            width={"50vw"}
            title="Cập nhật khách thuê phòng"
            open={isOpenModalCreateUser}
            onCancel={() => handleCloseModal()}
            footer={[
                <Button
                    form="myForm" key="submit" htmlType="submit" type="primary" loading={loadingSubmit} onClick={() => {
                        form.validateFields()
                            .then((values) => {
                                handleSubmit(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}>
                    Cập nhật
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
                        { required: true, message: 'Cần nhập tên khách!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 7 }}
                    label={`Email:`}
                    name="email"
                    rules={[
                        { required: true, message: 'Cần nhập email!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 7 }}
                    label={`SĐT:`}
                    name="phoneNumber"
                    rules={[
                        { required: true, message: 'Cần nhập SĐT!' }
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ offset: 7 }}
                    label={`CMND (Upload tối đa 2 ảnh CMND) ::`}
                    name="identifyCard"
                    rules={[
                        { required: true, message: 'Cần upload ít nhất 1 ảnh!' }
                    ]}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        multiple
                        maxCount={2}
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        customRequest={handleUploadFile}
                        beforeUpload={beforeUpload}
                        onChange={(info) => handleChange(info)}
                        onRemove={(file) => handleRemoveFile(file)}
                        onPreview={handlePreview}
                        accept="image/*"
                    >
                        <div>
                            {loading ? <LoadingOutlined /> : <PlusOutlined />}
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
            </Form>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)} width={800} >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Modal>
    );
};

export default CreateInfo;