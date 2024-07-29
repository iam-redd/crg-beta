import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AllOrders from './AllOrders/AllOrders';
import axios from '../../../store/axios'
import PendingOrders from './PendingOrders/PendingOrders';
import IssuedOrders from './IssuedOrders/IssuedOrders';
import OnTheWayOrders from './OnTheWayOrders/OnTheWayOrders';
import DeliveredOrders from './DeliveredOrders/DeliveredOrders';
import DeniedOrders from './DeniedOrders/DeniedOrders';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Option, Select, Typography } from '@material-tailwind/react';
import { useState } from 'react';


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
  const [allOrders, setAllOrders] = useState(data)
  const [managers, setManagers] = React.useState(['Все заказы', 'Розница', 'ОПТ'])
  const userInfo = useSelector(state => state.user.userInfo)
  const navigate = useNavigate()

  async function getAllOrders() {
    try {
      const data = await axios.get('/get-all-orders')
      if (data.status === 200) {
        console.log(data.data)
        setData(data.data)
        // setAllOrders(data)
      } else throw new Error('Что-то пошло не так')
    } catch (error) {
      navigate('/')
    }
  }
  async function getAllManagers() {
    try {
      const { data } = await axios.get('/managers')
      const temp = managers
      data.map(item => temp.push(item.name))
      setManagers(temp)
      // setManagers(data)
    }
    catch (error) {
    }
  }

  function changeManager(v) {
    if (v === 'Все заказы') setAllOrders(data)
    else if (v === 'Розница') setAllOrders(data.filter(order => order.userStatus === 'user'))
    else if (v === 'ОПТ') setAllOrders(data.filter(order => order.userStatus === 'superUser'))
    else setAllOrders(data.filter(order => order.manager.name === v))
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const allGoods = useSelector(state => state.service.allProducts)
  // const navigate = useNavigate()
  allGoods == null && navigate('/user')

  React.useEffect(() => {
    data === null && getAllOrders()
    managers.length === 3 && getAllManagers()
    setAllOrders(data)
  }, [data]);
  return (<>
        {
            userInfo &&
            <Box sx={{ width: '100%' }}>
              <h2>Мониторинг</h2>
              <div className="" style={{ maxWidth: '400px' }}>
                {
                    userInfo.role === 'manager' || userInfo.role === 'admin' && <>
                      {
                          managers.length > 3 &&
                          <Select
                              // style={{maxWidth:'400px'}}
                              size="sm"
                              label="Выберите менеджера"
                              value={'Все заказы'}
                              onChange={(value) => changeManager(value)}>
                            {/* <Option value={'all'}>Все заказы</Option>
                  <Option value={'roz'}>Розница</Option>
                  <Option value={'opt'}>Опт</Option> */}
                            {
                              managers.map((name) => {
                                return (
                                    <Option
                                        value={name}
                                        key={name}>
                                      {name}
                                    </Option>
                                )
                              })
                            }
                          </Select>}</>
                }
              </div>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  {
                      userInfo.role !== 'giver' &&
                      <Tab label="Новые" {...a11yProps(1)} />
                  }
                  <Tab label="оформленные" {...a11yProps(1)} />
                  <Tab label="в пути" {...a11yProps(2)} />
                  <Tab label="доставленные" {...a11yProps(3)} />
                  <Tab label="отказанные" {...a11yProps(4)} />
                  <Tab label="Все заказы" {...a11yProps(5)} />
                </Tabs>
              </Box>
              {
                  userInfo.role !== 'giver' &&
                  <CustomTabPanel value={value} index={0}>
                    <PendingOrders data={allOrders} getAllOrders={getAllOrders} index={0} />
                  </CustomTabPanel>
              }
              <CustomTabPanel value={value} index={1}>
                <IssuedOrders data={allOrders} getAllOrders={getAllOrders} index={1} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <OnTheWayOrders data={allOrders} getAllOrders={getAllOrders} index={2} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <DeliveredOrders data={allOrders} getAllOrders={getAllOrders} index={3} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                <DeniedOrders data={allOrders} getAllOrders={getAllOrders} index={4} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={5}>
                <AllOrders data={allOrders} getAllOrders={getAllOrders} index={5} />
              </CustomTabPanel>
            </Box>
        }
      </>
  );
}