import './Electrical-water.scss';
import { Button, Form, Input, InputNumber, Popconfirm, Popover, Table, Tag, Typography, notification } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { numberWithCommas } from '../../components/common/Common';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { getDataRevenue } from '../../services/api';
import CreateRevenue from './Modal/Create.Revenue';


const ElectricalWater = () => {
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const inputSaveNoteRef = useRef(null);
    const [currentMonth, setCurrentMonth] = useState(5);
    const [dataTable, setDataTable] = useState([]);
    const [priceElectric, setPriceElectric] = useState('');
    const [priceWater, setPriceWater] = useState('');
    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    const [listRoomName, setListRoomName] = useState([]);
    const [open, setOpen] = useState(false);

    const hanleSaveNote = () => {
        console.log('savenote:', inputSaveNoteRef.current.resizableTextArea.textArea.value);
        inputSaveNoteRef.current.focus();
        hide();
    };

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        console.log('newOpen', newOpen);
        setOpen(newOpen);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '3%',
            align: 'center',
            editable: false,
        },
        {
            title: 'Tên phòng',
            dataIndex: 'name',
            width: '13%',
            className: 'column-name',
            align: 'center',
            editable: false,
        },
        {
            title: `Tiền phòng T.${currentMonth}`,
            dataIndex: 'roomCharge',
            width: '10%',
            className: 'column-highlight',
            align: 'center',
            editable: true,
        },
        {
            title: `Tiền điện ${priceElectric ? `(${priceElectric})` : ''}`,
            editable: true,
            children: [
                {
                    title: 'Số cũ',
                    dataIndex: 'oldNumberElectric',
                    width: '5%',
                    align: 'center',
                    editable: false,
                },
                {
                    title: 'Số mới',
                    dataIndex: 'newNumberElectric',
                    width: '5%',
                    align: 'center',
                    editable: true,
                },
                {
                    title: 'Thành tiền',
                    dataIndex: 'moneyElectric',
                    width: '8%',
                    className: 'column-highlight',
                    align: 'center',
                    editable: false,
                },
            ],
        },
        {
            title: `Tiền nước ${priceWater ? `(${priceWater})` : ''}`,
            editable: true,
            children: [
                {
                    title: 'Số cũ',
                    dataIndex: 'oldNumberWater',
                    width: '5%',
                    align: 'center',
                    editable: false,
                },
                {
                    title: 'Số mới',
                    dataIndex: 'newNumberWater',
                    width: '5%',
                    align: 'center',
                    editable: true,
                },
                {
                    title: 'Thành tiền',
                    dataIndex: 'moneyWater',
                    width: '8%',
                    className: 'column-highlight',
                    align: 'center',
                    editable: false,
                },
            ],
        },
        {
            title: 'Rác',
            dataIndex: 'waste',
            className: 'column-highlight',
            align: 'center',
            editable: true,
        },
        {
            title: 'Wifi',
            dataIndex: 'wifi',
            className: 'column-highlight',
            align: 'center',
            editable: true,
        },
        {
            title: '',
            dataIndex: 'other',
            className: 'other',
            editable: false,
        },
        {
            title: 'Tổng (VNĐ)',
            dataIndex: 'total',
            className: 'column-highlight',
            align: 'center',
            width: '10%',
            editable: false,
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            render: (text) => {
                let color = 'black';
                if (text === "Đã thanh toán") {
                    color = '#009f47';
                }
                if (text === "Chưa thanh toán") {
                    color = '#ED6004';
                }
                return (
                    <Tag color={color} >
                        {text.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '5%',
            align: 'center',
            render: (_, record) => {
                const editable = isEditing(record);
                return (
                    <div className='edit'>
                        {editable ? (
                            <span>
                                <a
                                    onClick={() => save(record.key)}
                                    style={{ marginRight: 8 }}
                                >
                                    Save
                                </a>
                                <Popconfirm title="Chắc chắn để h?" onConfirm={cancel}>
                                    <a>Cancel</a>
                                </Popconfirm>
                            </span>
                        ) : (
                            <>
                                <Typography.Link disabled={editingKey !== ''} className='icon btn-round' onClick={() => edit(record)}>
                                    <EditOutlined />
                                </Typography.Link>
                                <Popover
                                    content={
                                        <div>
                                            <TextArea rows={4} ref={inputSaveNoteRef} />
                                            <div style={{ marginTop: '10px', textAlign: 'right' }}>
                                                <Button type="primary" onClick={() => hanleSaveNote()}>Save</Button>
                                            </div>
                                        </div>
                                    }
                                    title="Ghi chú"
                                    trigger="focus"
                                    open={open}
                                    onOpenChange={handleOpenChange}
                                >
                                    <Button disabled={editingKey !== ''}>Note</Button>
                                </Popover>
                            </>
                        )}
                    </div>
                );
            },
        },
    ];


    useEffect(() => {
        fetchDataRevenue();
    }, [currentMonth]);


    const fetchDataRevenue = async () => {
        let res = await getDataRevenue(currentMonth, '2023');
        if (res.status === 200) {
            let newData = res.data.map((dataRevenue, index) => {
                let roomCharge = 0;
                let oldNumberElectric = 0;
                let newNumberElectric = 0;
                let moneyElectric = 0;
                let oldNumberWater = 0;
                let newNumberWater = 0;
                let moneyWater = 0;
                let waste = 0;
                let wifi = 0;
                let expenses = dataRevenue.expenses.map(item => {
                    if (item.name === "Tiền phòng") {
                        roomCharge = item.price;
                        return item.name;
                    }
                    if (item.name === "Tiền điện") {
                        oldNumberElectric = item.oldNumber;
                        newNumberElectric = item.newNumber;
                        moneyElectric = (newNumberElectric - oldNumberElectric) * item.price;
                        setPriceElectric(`${item.price} ${item.unit}`);
                        return item.name;
                    }
                    if (item.name === "Tiền nước") {
                        oldNumberWater = item.oldNumber;
                        newNumberWater = item.newNumber;
                        moneyWater = (newNumberWater - oldNumberWater) * item.price;
                        setPriceWater(`${item.price} ${item.unit}`);
                        return item.name;
                    }
                    if (item.name === "Tiền wifi") {
                        wifi = item.price;
                        return item.name;
                    }
                    if (item.name === "Tiền rác") {
                        waste = item.price;
                        return item.name;
                    }
                });
                return {
                    id: dataRevenue.roomId,
                    key: dataRevenue.roomId,  //unique key
                    name: dataRevenue.name,
                    roomCharge: numberWithCommas(roomCharge),
                    oldNumberElectric: numberWithCommas(oldNumberElectric),
                    newNumberElectric: numberWithCommas(newNumberElectric),
                    moneyElectric: numberWithCommas(moneyElectric),
                    oldNumberWater: numberWithCommas(oldNumberWater),
                    newNumberWater: numberWithCommas(newNumberWater),
                    moneyWater: numberWithCommas(moneyWater),
                    waste: numberWithCommas(waste),
                    wifi: numberWithCommas(wifi),
                    total: numberWithCommas(roomCharge + moneyElectric + moneyWater + waste + wifi),
                    status: 'Đã thanh toán'
                };
            });

            let listRoomName = res.data.map((dataRevenue, index) => {
                return {
                    name: dataRevenue.name,
                    id: dataRevenue.roomId
                };
            });
            setListRoomName(listRoomName);
            setDataTable(newData);
        } else {
            notification.error({
                message: "Lấy danh sách doanh thu theo phòng không thành công",
                duration: 5
            });
        }
    };



    //edit key in data table
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            // return new value of form edit
            let row = await form.validateFields();
            row = {
                ...row,
                roomCharge: numberWithCommas(row.roomCharge),
                newNumberElectric: numberWithCommas(row.newNumberElectric),
                moneyElectric: numberWithCommas(row.moneyElectric),
            };
            console.log('formsubmit2', row);
            const newData = [...dataTable];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setDataTable(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setDataTable(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };



    // Every hover in row table function EditableCell will trigger
    // receive para from function onCell and index,children,...restProps
    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {

        const inputNode = inputType === 'number'
            ? <InputNumber
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                min={0} />
            : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        // if editable = false => dataIndex = undefined => that cell can't edit with form
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: `Vui lòng nhập ${title}!`,
                    //     },
                    // ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const mapColumns = col => {
        if (!col.editable) {
            return col;
        }
        const newCol = {
            ...col,
            onCell: record => ({
                record,
                inputType:
                    col.dataIndex === 'roomCharge'
                        || col.dataIndex === 'waste'
                        || col.dataIndex === 'wifi'
                        ? 'number' : 'text',
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            })
        };
        if (col.children) {
            newCol.children = col.children.map(mapColumns);
        }
        return newCol;
    };

    const columnsFlat = columns.map(mapColumns);

    return (
        <div className='revenue'>
            <header className='header-revenue'>
                <div className='month-container'>
                    <span className='pre-year'>
                        <span className='icon'><AiOutlineArrowLeft /></span>
                        <span className='text'>Năm trước</span>
                    </span>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
                        return (
                            <span
                                onClick={() => setCurrentMonth(item)}
                                className={`item-month ${currentMonth === item ? 'active' : ''}`}
                                key={item} style={{ width: `${100 / 14}%` }}>
                                <div className="month-text">
                                    <b className="1">T.{item}</b>
                                </div>
                                <span>2023</span>
                            </span>
                        );
                    })}
                    <span className='next-year'>
                        <span className='text'>Năm tới</span>
                        <span className='icon'><AiOutlineArrowRight /></span>
                    </span>
                </div>
                <div className='header-title'>
                    Chi phí tháng {currentMonth}/2023
                </div>
                <Button className='btn-create' onClick={() => setIsOpenModalCreate(true)}
                >
                    <span className='icon-create'><PlusCircleOutlined /></span>
                    <span>Tạo chi phí tháng</span>
                </Button>
            </header>
            <div className='content'>
                <div className='list-revenue'>
                    <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            columns={columnsFlat}
                            dataSource={dataTable}
                            pagination={false}
                        >
                        </Table>
                    </Form>
                    <CreateRevenue
                        isOpenModalCreate={isOpenModalCreate}
                        setIsOpenModalCreate={setIsOpenModalCreate}
                        fetchDataRevenue={fetchDataRevenue}
                        listRoomName={listRoomName}
                    />
                </div>
            </div>
        </div>
    );
};

export default ElectricalWater;