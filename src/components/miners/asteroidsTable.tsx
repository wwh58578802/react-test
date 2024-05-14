import { Table } from 'antd'
import { asteroidsDataProps } from '@/types/miners'
import type { TableProps } from 'antd';

export const AsteroidTable = ({ asteroidsData }: any) => {
    const columns: TableProps<asteroidsDataProps>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Minerals',
            dataIndex: 'minerals',
            key: 'minerals',
        },
        {
            title: 'CurrentMiner',
            dataIndex: 'currentMiner',
            key: 'currentMiner',
            render: (currentMiner) => (
                <>
                    {currentMiner ? currentMiner : 0}
                </>
            ),
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            render: (position) => (
                <>
                    {position?.x},{position?.y}
                </>
            ),
        }
    ];

    return (
        <>
            <Table columns={columns} dataSource={asteroidsData} rowKey={record => record._id} pagination={false} />
        </>
    )
}

