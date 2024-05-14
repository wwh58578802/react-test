export interface mapDataProps {
    miners: minersDataProps;
    planets: planetsDataProps;
    asteroids: asteroidsDataProps;
    currentTick: number;
}
export interface minersDataProps {
    _id: string,
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
    },
    position: {
        x: number;
        y: number;
    },
    _id: string,
    year: number,
    planet: string,
    status: number,
    miner: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    carryCapacity?: string,
    travelSpeed?: string,
    miningSpeed?: string,
}

export interface asteroidsDataProps {  
    position: {
        x: number,
        y: number,
    },
    _id: string,
    name: string,
    minerals: number,
    __v: number,
    status: string,
    currentMiner: string,
}

export interface planetsDataProps {
    position: {
        x: number,
        y: number,
    },
    _id: string,
    name: string,
    minerals: number,
    __v: number,
    miners: number;
    icon?: any;
}