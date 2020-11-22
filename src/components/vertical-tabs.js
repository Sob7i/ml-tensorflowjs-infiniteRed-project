import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Box } from '@material-ui/core';

import Modelnsfwjs from './nsfwjs-model/nsfwjs';
import MobileNet from './mobileNet-model/mobileNet';

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
                <Box p={3}>
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
                <Tab label="NSFW JS" {...a11yProps(0)} />
                <Tab label="Mobile net" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Modelnsfwjs />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MobileNet />
            </TabPanel>
        </div>
    );
}