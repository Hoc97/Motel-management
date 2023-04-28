import { Form, Input, InputNumber, Popconfirm, Table } from 'antd';
import { useState } from 'react';
import { numberWithCommas } from '../../components/common/Common';
import iconDisabled from '../../assets/Image/icon/disabled.png';

const ElectricalWater = () => {
    const data = [
        {
            id: '001',
            key: 1,
            name: 'Tiền phòng',
            money: numberWithCommas(1700000),
            unitprice: <img className='icon-disabled' src={iconDisabled} alt='' />,
            action: <ActionExpense
                handleShowModalUpdateExpense={handleShowModalUpdateExpense}
            // expense={expense}
            />
        },
        {
            id: '002',
            key: 2,
            name: 'Điện',
            money: false ? numberWithCommas(1700000) : <img className='icon-disabled' src={iconDisabled} alt='' />,
            unitprice: true ? `${numberWithCommas(3500)}/${'kWh'}` : <img className='icon-disabled' src={iconDisabled} alt='' />,
            action: <ActionExpense
                handleShowModalUpdateExpense={handleShowModalUpdateExpense}
            // expense={expense}
            />
        },
        {
            id: '003',
            key: 3,
            name: 'Nước',
            money: <img className='icon-disabled' src={iconDisabled} alt='' />,
            unitprice: `${numberWithCommas(5000)}/${'khối'}`,
            action: <ActionExpense
                handleShowModalUpdateExpense={handleShowModalUpdateExpense}
            // expense={expense}
            />
        },
        {
            id: '004',
            key: 4,
            name: 'Rác',
            money: numberWithCommas(20000),
            unitprice: <img className='icon-disabled' src={iconDisabled} alt='' />,
            action: <ActionExpense
                handleShowModalUpdateExpense={handleShowModalUpdateExpense}
            // expense={expense}
            />
        },
        {
            id: '005',
            key: 5,
            name: 'Wifi',
            money: numberWithCommas(100000),
            unitprice: <img className='icon-disabled' src={iconDisabled} alt='' />,
            action: <ActionExpense
                handleShowModalUpdateExpense={handleShowModalUpdateExpense}
            // expense={expense}
            />
        },
    ];
    // test
    const originData = [];
    for (let i = 0; i < 10; i++) {
        originData.push({
            key: i.toString(),
            name: `Edward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }
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
        // console.log('editing', editing);
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    const [form] = Form.useForm();
    const [data1, setData1] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data1];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData1(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData1(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns1 = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
            align: 'center',
            editable: true,
        },
        {
            title: 'Danh mục',
            dataIndex: 'name',
            width: '22.5%',
            align: 'center',
            editable: true,
        },
        {
            title: 'Thành tiền (VNĐ)',
            dataIndex: 'money',
            width: '22.5%',
            align: 'center',
            editable: true,
        },
        {
            title: 'Đơn giá (VNĐ/đơn vị)',
            dataIndex: 'unitprice',
            width: '22.5%',
            align: 'center',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </a>
                );
            },
        },
    ];
    const mergedColumns = columns1.map((col) => {
        console.log('col', col);
        if (!col.editable) {
            return col;
        }
        console.log('coltitle', col.title);
        return {
            ...col,
            onCell: (record) => {
                console.log('record', record);
                return ({
                    record,
                    inputType: col.dataIndex === 'money' || col.dataIndex === 'unitprice' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                });
            },
        };
    });
    console.log(2);
    console.log('mergedColumns', mergedColumns);

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data1}
                columns={mergedColumns}
                pagination={false}
            />
        </Form>
    );
};

export default ElectricalWater;