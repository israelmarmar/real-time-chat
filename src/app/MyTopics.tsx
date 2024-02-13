import React, { useEffect, useState } from 'react';
import TabComponent from './components/TabComponent';
import axios from 'axios';
import { useRouter } from 'next/router';

interface TabData {
    id: number;
    creator: any;
    title: string;
}

const MyTopics = () => {
    const router = useRouter();
    const [newTopic, setNewTopic] = useState<string>();
    const [tabs, setTabs] = useState<TabData[]>([]);

    const handleButtonClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/topics/create`, { title: newTopic }, { headers: { Authorization: `Bearer ${token}` } });
            console.log(data)
            setTabs([...tabs, data]);
            setNewTopic('')
        } catch (e) {
            console.log(e);
            alert('Erro, tente novamente');
        }
    };

    useEffect(() => {
        (async () => {
            try {
                if (tabs.length === 0) {
                    const token = localStorage.getItem('token');
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/topics/me`, { headers: { Authorization: `Bearer ${token}` } });
                    setTabs(data);
                }
            } catch (e) {
                console.log(e);
                //router.push('login');
            }
        })();
    },[])

    return (
        <div>
            <div className='row'>
                <input type="text" value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)} placeholder='digite um novo tópico' />
                <button className="topic-button" onClick={handleButtonClick}>
                    criar tópico
                </button>
            </div>
            {tabs.map((tab) => (
                <TabComponent key={tab.id} id={tab.id} topic={tab.title} />
            ))}
        </div>
    );
};

export default MyTopics;
