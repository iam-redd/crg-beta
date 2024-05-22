import React from 'react';

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const YMap = () => {
    return (
        
        <div>
        <YMaps query={{apikey:'fa6bc5ec-914a-4379-b074-10029f971e20'}}>
          <Map defaultState={{ center: [41.316327, 69.217190], zoom: 14 }}>
            <Placemark geometry={[41.316327, 69.217190]} />
          </Map>
        </YMaps>
        </div>
    
    );
};

export default YMap;