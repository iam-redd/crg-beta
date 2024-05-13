import React from 'react';

import { YMaps, Map, Placemark } from 'react-yandex-maps';

const YMap = () => {
    return (
        
        <div>
        <YMaps>
        <Map defaultState={{ center: [41.316327, 69.217190], zoom: 16 }}>
          <Placemark geometry={[41.316327, 69.217190]} />
        </Map>
      </YMaps>
        </div>
    
    );
};

export default YMap;