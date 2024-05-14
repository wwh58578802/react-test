import { Table } from 'antd'
import { minersHistoryDataProps } from '@/types/miners'
import type { TableProps } from 'antd';
import { DateFormat } from '@/utils/utils'

export const MinersHistoryTable = ({ minerHistoryData }: any) => {
    const columns: TableProps<minersHistoryDataProps>['columns'] = [
        {
            title: 'Date',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (updatedAt) => (
                <>
                    {DateFormat(updatedAt, 'yyyy/MM/dd hh:mm:ss')}
                </>
            ),
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Planet',
            dataIndex: 'planet',
            key: 'planet',
        },
        {
            title: 'carryCapacity',
            dataIndex: 'capacity',
            key: 'capacity',
            render: (capacity) => (
                <>
                    {capacity.current}/{capacity.max}
                </>
            ),
        },
        {
            title: 'travelSpeed',
            dataIndex: 'speed',
            key: 'speed',
            render: (speed) => (
                <>
                    {speed.travel}
                </>
            ),
        },
        {
            title: 'miningSpeed',
            dataIndex: 'speed',
            key: 'speed',
            render: (speed) => (
                <>
                    {speed.mining}
                </>
            ),
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            render: (position) => (
                <>
                    {Math.floor(position.x)},{Math.floor(position.y)}
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
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
            )
        },
    ];
    return (
        <>
            <Table columns={columns} dataSource={minerHistoryData} rowKey={record => record._id} scroll={{ y: 500 }} className='miner-table-content' />
        </>
    )
}