import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CoffeBeans from './CoffeBeans/CoffeBeans';
import Tea from './Tea/Tea'
import Other from './Other/Other';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const [value, setValue] = React.useState(0);
  const userInfo = useSelector(state => state.user.userInfo)
  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    userInfo !== null && userInfo.role !== 'admin' && navigate(-1)
  })
  return (
    <Box sx={{ width: '100%' }}>
      <h2>Добавить</h2>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Кофе в зёрнах" {...a11yProps(0)} />
          <Tab label="Чай" {...a11yProps(1)} />
          <Tab label="Другое" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CoffeBeans />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Tea />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Other />
      </CustomTabPanel>
    </Box>
  );
}