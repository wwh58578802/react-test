import SvgIcon from '../svgIcon/svgIcon'
import './map.scss'

export const Map = ({ minersData }: any) => {
    return (
        <div className="map-container">
            <ul>
                {
                    minersData.length > 0 && minersData.map((item: any) => (
                        <li className='icon-item' key={item._id}>
                            <i style={{
                                left: item.x, top: item.y, transform: `rotate(${item.angle}deg)`
                            }} className='icon-pos'>
                                <SvgIcon name="Vector-miner" size={32}></SvgIcon>
                            </i>
                            <span className='second-icon-pos' style={{ left: item.planet?.position?.x, top: item.planet?.position?.y }}>
                                <i>
                                    {
                                        item.planet.miners == 1 ? (
                                            <SvgIcon name="planet-2" size={92}></SvgIcon>
                                        ) : item.planet.miners == 2 ? (
                                            <SvgIcon name="planet-3" size={120}></SvgIcon>
                                        ) : item.planet.miners == 3 ? (
                                            <SvgIcon name="planet-4" size={150}></SvgIcon>
                                        ) : (
                                            <SvgIcon name="planet-4" size={150}></SvgIcon>
                                        )
                                    }
                                </i>
                                <span className={item.planet.minerals > 1000 ? 'font-green' : ''}>
                                    {item.planet?.minerals}/1000
                                </span>
                            </span>
                            <span className='second-icon-pos' style={{ left: item.target?.position?.x, top: item.target?.position?.y }}>
                                <i>
                                    {<SvgIcon name="planet-1" size={50}></SvgIcon>}
                                </i>
                            </span>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
