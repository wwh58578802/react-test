import React, { useState, useEffect } from 'react'
import { Flex, Layout } from 'antd'
import HeaderComponent from '@/components/header/header'
import { Menu } from '@/components/menu/menu'
import { get, post } from '@/http/http'
import { minersDataProps, minersHistoryDataProps, asteroidsDataProps, planetsDataProps, mapDataProps } from '@/types/miners'
import { MinersTable } from '@/components/miners/minersTable'
import { MinersHistoryTable } from '@/components/miners/minerHistoryTable'
import { AsteroidTable } from '@/components/miners/asteroidsTable'
import { PlanetsTable } from '@/components/miners/planetsTable'
import { CreateMinnerForm } from '@/components/miners/createMinnerForm'
import { CustomModal } from '@/components/customModal/customModal'
import { Map } from '@/components/map/map'
import { WebsocketServe } from '@/socket/websocketServe'
import './miners.scss';

const { Content } = Layout;

const miners: React.FC = () => {
    const [minersData, setMinersData] = useState<minersDataProps[]>([]),
        [activeTab, setActiveTab] = useState('miners'),
        [minerHistoryData, setMinerHistoryData] = useState<minersHistoryDataProps[]>([]),
        [historyModalVisible, setHistoryModalVisible] = useState(false),
        [minerHistoryModalTitle, setMinerHistoryModalTitle] = useState(''),
        [asteroidsData, setAsteroidsData] = useState<asteroidsDataProps[]>([]),
        [planetsData, setPlanetsData] = useState([]),
        [createModalVisible, setCreateModalVisible] = useState(false),
        [currentData, setCurrentData] = useState<planetsDataProps>(),
        [successModalVisible, setSuccessModalVisible] = useState(false);

    const socket = WebsocketServe();

    useEffect(() => {
        getAllData();
    }, []);

    // Connent websocketserver and get socket message
    useEffect(() => {
        if (!socket) return;
        socket.on('connect', () => {
            const engine = socket.io.engine;
            console.log('Connected to the socket server');
            if (!socket.connected) {
                getAllData();
            }

            // called for each packet received
            engine.on("packet", ({ data }) => {
                if (!data || !data.includes(`"tick",`)) return;
                let res = data.split(`"tick",`)
                let objKey = Object.keys(res)[1];
                let objValues = (res[objKey]).slice(0, -1);
                let mapData: mapDataProps = JSON.parse(objValues)

                handleMinerData(mapData.miners)
                handleAsteroidsData(mapData.asteroids)
                handlePlanetsData(mapData.planets)
            });
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the socket server');
            setTimeout(() => {
                socket.connect();
            }, 1000);
        });

        // Connect failed and retry to connent to socket server
        socket.on("connect_error", () => {
            setTimeout(() => {
                socket.connect();
            }, 1000);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, [socket]);

    // Switch tab
    const onTabChange = (key: string) => {
        setActiveTab(key);
    };

    const getAllData = async () => {
        await getMinersData();
        await getAsteroidsData();
        await getPlanetsData();
    }
    // get Miners data
    const getMinersData = () => {
        get('/miners').then((res: any) => {
            let data: any;
            data = res;
            setMinersData(data)
        }).catch((err) => {
            console.log(err.response?.data);
            throw err;
        });
    }

    //get minners data from websocket
    const handleMinerData = (data: any) => {
        setMinersData(data)
    }

    //get Asteroids data from websocket
    const handleAsteroidsData = (data: any) => {
        setAsteroidsData(data)
    }

    // get planets data from websocket
    const handlePlanetsData = (data: any) => {
        setPlanetsData(data)
    }

    // open history modal
    const showModal = () => {
        setHistoryModalVisible(true);
    };

    // Close history modal
    const closeHistoryModa = () => {
        setHistoryModalVisible(false);
    };

    // Render the minner history table
    const renderMinersHistoryTable = () => {
        return (<MinersHistoryTable minerHistoryData={minerHistoryData} />)
    }

    // Click the miners item and request minier's history interface
    const handleMinersItemClick = (item: any) => {
        showModal();
        setMinerHistoryModalTitle(item.name);
        get('/history?minerId=' + item._id).then((res) => {
            let data: any;
            data = res;
            setMinerHistoryData(data)
        }).catch((err) => {
            console.log(err.response?.data);
            throw err;
        });
    }

    // Get Asteroids data
    const getAsteroidsData = () => {
        get<{ data: any }>('/asteroids').then((res) => {
            let data: any;
            data = res;
            setAsteroidsData(data)
        }).catch((err) => {
            console.log(err.response?.data);
            throw err;
        });
    }

    // Get Asteroids data
    const getPlanetsData = () => {
        get<{ data: planetsDataProps }>('/planets').then((res) => {
            let data: any;
            data = res;
            setPlanetsData(data)
        }).catch((err) => {
            console.log(err.response?.data || err.message);
            throw err;
        });
    }

    // Create minner and open modal
    const createMiner = () => {
        showCreateMinerModal();
    }

    // Open the create miner modal
    const showCreateMinerModal = () => {
        setCreateModalVisible(true);
    };

    // Submit form and open success modal
    const openSuccessModal = () => {
        setSuccessModalVisible(true);
    };

    // Close the success moddel
    const closeSuccessModal = () => {
        setSuccessModalVisible(false);
    };

    // Select planetId
    const onSlectChange = (planetId: string) => {
        setCurrentData(() => planetsData.filter((item: any) => item._id === planetId)[0]);
    };

    // Render the success modal
    const renderSuccessModalContent = () => {
        return (<p className='create-minner-form-text mar-t-l'>The miner was successfully created</p>)
    };

    // Submit the create miner form data
    const submitForm = (formData: any) => {
        let params = {
            ...formData,
            'x': currentData?.position.x,
            'y': currentData?.position.y,
            'angle': 0,
            'status': 0,
            'minerals': currentData?.minerals,
            'target': formData.planet,
            'targetType': 'Planet',
        };
        post<{ data: minersDataProps }>('/miners', params)
            .then(() => {
                setCreateModalVisible(false);
                openSuccessModal();
                getMinersData()
            })
            .catch((err) => {
                console.log(err.response?.data || err.message);
                throw err;
            });
    };

    return (
        <>
            <Flex gap="middle" wrap className='layout-container'>
                <Layout className='layout'>
                    <HeaderComponent />
                    <Layout className='homepage-layout'>
                        <aside>
                            <Menu activeTab={activeTab} onTabChange={(key: string) => onTabChange(key)} />
                            <div className="tab-content">
                                {
                                    activeTab === 'miners' && (
                                        <MinersTable minersData={minersData} onMinersItemClick={(item: any) => handleMinersItemClick(item)} />
                                    )
                                }
                                {
                                    activeTab === 'asteroids' && (
                                        <AsteroidTable asteroidsData={asteroidsData} />
                                    )
                                }
                                {
                                    activeTab === 'planets' && (
                                        <PlanetsTable planetsData={planetsData} createMiner={() => createMiner()} />
                                    )
                                }
                            </div>
                        </aside>
                        <Content className='main'>
                            <Map minersData={minersData} />
                        </Content>
                    </Layout>
                </Layout>
            </Flex>
            <CustomModal isDuration={false} title={'History of' + ' ' + minerHistoryModalTitle} width={782} visible={historyModalVisible} onClose={closeHistoryModa} maskClosable={false} content={renderMinersHistoryTable()} />
            <CreateMinnerForm createModalVisible={createModalVisible} setCreateModalVisible={setCreateModalVisible} planetsData={planetsData} onSlectChange={(planetId: string) => onSlectChange(planetId)} submitForm={(formData: any) => submitForm(formData)} />
            <CustomModal isDuration={true} title='' width={447} duration={3000} visible={successModalVisible} onClose={closeSuccessModal} content={renderSuccessModalContent()} />
        </>
    );
};

export default miners;