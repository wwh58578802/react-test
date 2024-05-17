import React from 'react'
import { Table } from 'antd'
import { minersProps, minersDataProps } from '@/types/miners'
import type { TableProps } from 'antd'

export const MinersTable: React.FC<minersProps> = ({ minersData, onMinersItemClick }) => {
    const columns: TableProps<minersDataProps>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Planet',
            dataIndex: 'planet',
            key: 'planet',
            render: (planet) => (
                <>
                    {planet?.name}
                </>
            ),
        },
        {
            title: 'carryCapacity',
            dataIndex: 'carryCapacity',
            key: 'carryCapacity',
            render: (carryCapacity) => (
            <>
                    <span className={carryCapacity === 200 ?'font-green':''}>{carryCapacity}/200</span>
            </>
            )
        },
        {
            title: 'travelSpeed',
            dataIndex: 'travelSpeed',
            key: 'travelSpeed',
        },
        {
            title: 'miningSpeed',
            dataIndex: 'miningSpeed',
            key: 'miningSpeed',
        },
        {
            title: 'Position',
            dataIndex: 'postiton',
            key: 'postiton',
            render: (_, record) => (
                <>
                    {Math.floor(record.x)},{Math.floor(record.y)}
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status)=>(<>
                <>
                    {status == 0 ? (
                        'Idle'
                    ) : status == 1 ? (
                        'Traveling'
                    ) : status == 2 ? (
                        'Mining'
                    ) : (
                        'Transfering minerals to planet'
                    )}
                </>
            </>)
        },
    ];
    const handleRowClick = (record: minersDataProps) => {
        if (onMinersItemClick) {
            onMinersItemClick(record);
        }
    };
    return (
        <>
            <Table columns={columns} dataSource={minersData} rowKey={record => record._id} pagination={false} scroll={{ x: 543 }} onRow={(record) => ({
                onClick: () => handleRowClick(record)
            })} />
        </>
    )
}

