export interface mapDataProps {
    miners: minersDataProps[];
    planets: planetsDataProps[];
    asteroids: asteroidsDataProps[];
}
export interface minersDataProps {
    _id: string;
    name: string;
    plenet?: planetsDataProps;
    x: number;
    y: number;
    angle: number;
    carryCapacity: number;
    travelSpeed: number;
    miningSpeed: number;
    status: number;
    minerals: number;
    __v: number;
    target?: asteroidsDataProps;
    targetType: string;
    position?: string;
}

export interface minersHistoryDataProps {
    capacity: {
        current: number;
        max: number;
    };
    speed: {
        travel: number;
        mining: number;
    };
    position: {
        x: number;
        y: number;
    };
    _id: string;
    year: number;
    planet: string;
    status: number;
    miner: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    carryCapacity?: string;
    travelSpeed?: string;
    miningSpeed?: string;
}
export interface asteroidsDataProps {
    position: {
        x: number;
        y: number;
    };
    _id: string;
    name: string;
    minerals: number;
    __v: number;
    status: string;
    currentMiner: string;
}
export interface planetsDataProps {
    position: {
        x: number;
        y: number;
    };
    _id: string;
    name: string;
    minerals: number;
    __v: number;
    miners: number;
    icon?: string;
}

export interface minersProps {
    minersData: minersDataProps[];
    onMinersItemClick?: (item: minersDataProps) => void;
}

export interface planetsProps {
    planetsData: planetsDataProps[];
    createMiner: () => void;
}

export interface minersHistoryProps {
    minerHistoryData: minersHistoryDataProps[];
    closeHistoryModa?: () => void;
}

export interface asteroidsProps {
    asteroidsData: asteroidsDataProps[];
}

export interface createMinnerFormProps {
    planetsData: planetsDataProps[];
    onSlectChange: (item: string) => void;
    submitForm: (data: submitFormData) => void;
    createModalVisible: boolean;
    setCreateModalVisible: (value: boolean) => void;
    minerNameList: minerNameListProps[];
}
export interface submitFormData {
    _id: string,
    name: string;
    planet: string;
    carryCapacity: number;
    travelSpeed: number;
    miningSpeed: number;
}

export interface minerNameListProps {
    name: string;
}