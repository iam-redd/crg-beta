import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllOrders from './AllOrders/AllOrders';
import axios from '../../../store/axios'
import PendingOrders from './PendingOrders/PendingOrders';
import IssuedOrders from './IssuedOrders/IssuedOrders';
import OnTheWayOrders from './OnTheWayOrders/OnTheWayOrders';
import DeliveredOrders from './DeliveredOrders/DeliveredOrders';
import DeniedOrders from './DeniedOrders/DeniedOrders';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [data, setData] = React.useState(null)
  async function getAllOrders() {
    try {
      const data = await axios.get('/get-all-orders')
      if (data.status === 200) {
        setData(data.data)
      } else throw new Error('Что-то пошло не так')
    } catch (error) {
      console.log(error.message)
    }
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    data === null && getAllOrders()
  });
  return (
    <Box sx={{ width: '100%' }}>
      <h2>Мониторинг</h2>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Новые" {...a11yProps(1)} />
          <Tab label="оформленные" {...a11yProps(1)} />
          <Tab label="в пути" {...a11yProps(2)} />
          <Tab label="доставленные" {...a11yProps(3)} />
          <Tab label="отказанные" {...a11yProps(4)} />
          <Tab label="Все заказы" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PendingOrders data={data} getAllOrders={getAllOrders}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <IssuedOrders data={data} getAllOrders={getAllOrders}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <OnTheWayOrders data={data} getAllOrders={getAllOrders}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <DeliveredOrders data={data} getAllOrders={getAllOrders}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <DeniedOrders data={data} getAllOrders={getAllOrders}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <AllOrders data={data} getAllOrders={getAllOrders}/>
      </CustomTabPanel>
    </Box>
  );
}