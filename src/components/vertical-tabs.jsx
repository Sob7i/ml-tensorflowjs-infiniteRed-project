import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Box } from '@material-ui/core';

import Modelnsfwjs from './tf-models/nsfwjs.jsx';
import MobileNet from './tf-models/mobileNet.jsx';
import CocoSsd from './tf-models/coco-ssd.jsx';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} style={{ minWidth: '600px' }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: '150px'
    },
}));

export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab className='test-tab' label="NSFW JS" {...a11yProps(0)} />
                <Tab className='test-tab' label="Mobile net" {...a11yProps(1)} />
                <Tab className='test-tab' label="coco-ssd" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Modelnsfwjs />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MobileNet />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CocoSsd />
            </TabPanel>
        </div>
    );
}