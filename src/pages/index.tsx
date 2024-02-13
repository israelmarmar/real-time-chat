import React, { useState } from 'react';
import './home.css'
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import OpenTopics from '@/app/OpenTopics';
import MyTopics from '@/app/MyTopics';
import MySubscriptions from '@/app/MySubscriptions';
import Notifications from '@/app/Notifications';

const Home = () => {
    const router = useRouter();
    const [tab, setTab] = useState('1');

    const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
        setTab(newValue);
    };


    return (
            <main className='home-container'>
                <TabContext value={tab}>
                    <AppBar position="static">
                        <TabList onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Tópicos abertos" value="1" />
                            <Tab label="Meus tópicos" value="2" />
                            <Tab label="Inscritos" value="3" />
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
                        <OpenTopics />
                    </TabPanel>
                    <TabPanel value="2">
                        <MyTopics />
                    </TabPanel>
                    <TabPanel value="3">
                        <MySubscriptions />
                    </TabPanel>
                </TabContext>
            </main>
    );
};

export default Home;
