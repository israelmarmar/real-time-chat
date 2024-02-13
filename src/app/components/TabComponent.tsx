import React, { useState } from 'react';
import './TabComponent.css';
import Link from 'next/link';
import axios from 'axios';

interface TabProps {
    id: number;
    username?: string;
    topic: string;
    subsBtn?: boolean;
    isText?: boolean;
}

const TabComponent: React.FC<TabProps> = ({ id, username, topic, subsBtn, isText }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);


    const handleButtonClick = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/topics/subscribe`, { topicId: id }, { headers: { Authorization: `Bearer ${token}` } });
            setIsSubscribed(!isSubscribed);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="tab-container">
            <div className="tab-content">
                {username && <span className="username">{`${username}\b`}</span>}
                {!isText ? <Link href={`/topic/${id}`} className="topic-name">{topic}</Link> : <span className="topic-name">{topic}</span>}
            </div>
            {subsBtn && <button className="subscribe-button" onClick={handleButtonClick}>
                {isSubscribed ? (
                    <>
                        <span>Inscrito</span>
                        <span className="check-icon">&#10003;</span>
                    </>
                ) : (
                    <span>Inscrever</span>
                )}
            </button>}
        </div>
    );
};

export default TabComponent;
