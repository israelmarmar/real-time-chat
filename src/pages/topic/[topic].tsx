import React, { useEffect, useState } from 'react';
import '../home.css'
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
import axios from 'axios';

const Topic = () => {
    const [title, setTitle] = useState();
    const { query } = useRouter();
    const { topic } = query;
    const [tab, setTab] = useState('1');

    useEffect(() => {
        (async () => {
            if (!title && topic) {
                try {
                    const token = localStorage.getItem('token');
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/topics/${topic}`, { headers: { Authorization: `Bearer ${token}` } });
                    setTitle(data.title);
                } catch (e) {
                    console.log(e)
                }
            }
        })();
    })

    const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
        setTab(newValue);
    };


    return (
        <main className='home-container'>
            <TabContext value={tab}>
                <AppBar position="static">
                    <TabList onChange={handleChange} aria-label="simple tabs example">
                        <Tab label={title} value="1" />
                        <Tab label={''} value="2" disabled />
                    </TabList>
                </AppBar>
                <TabPanel value="1">
                    <Notifications topicId={topic} />
                </TabPanel>
            </TabContext>
        </main>
    );
};

export default Topic;
