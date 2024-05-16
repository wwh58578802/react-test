import React from 'react'
import { Table } from 'antd'
import { planetsProps, planetsDataProps } from '@/types/miners'
import { SvgIcon } from '@/components/svgIcon/svgIcon'
import type { TableProps } from 'antd'

export const PlanetsTable: React.FC<planetsProps> = ({ planetsData, createMiner }) => {
    const columns: TableProps<planetsDataProps>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Miners',
            dataIndex: 'miners',
            key: 'miners',
        },
        {
            title: 'Minerals',
            dataIndex: 'minerals',
            key: 'minerals',
            render: (minerals) => (<span className={minerals > 1000 ? 'font-green' : ''}>{minerals}/1000</span>)
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <>
                    {
                        record.minerals > 1000 ?
                            (<a onClick={() => handleRowClick()}>
                                <i className="icon-create-miner">
                                    <SvgIcon name="icon-create-miner" size={11} ></SvgIcon>
                                </i>Create a miner
                            </a>)
                        : ''
                    }
                </>
            ),
        },
    ];
    const handleRowClick = () => {
        createMiner();
    };

    return (
        <>
            <Table columns={columns} dataSource={planetsData} rowKey={record => record._id} pagination={false} />
        </>
    )
}

