import React from 'react';

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { motion } from 'framer-motion';

const YMap = () => {
  const textAnimationRe = {
    hidden: {
      x: 100,
      opacity: 0
    },
    visible: custom => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 }
    })
  }
  return (

    <motion.div 
    initial="hidden"
    whileInView={"visible"}
    variants={textAnimationRe}
    custom={3}
    className="w-full overflow-x-auto">
      <YMaps query={{ apikey: 'fa6bc5ec-914a-4379-b074-10029f971e20' }}>
        <Map defaultState={{ center: [41.316327, 69.217190], zoom: 14 }}>
          <Placemark geometry={[41.316327, 69.217190]} />
        </Map>
      </YMaps>
    </motion.div>

  );
};

export default YMap;