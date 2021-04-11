import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import styles from './ChatList.modules.css';

const dummyData = [
    {
        id: 1,
        recieverName: 'Aniket Batabyal',
        lastSeen: 'yesterday',
    },
    {
        id: 2,
        recieverName: 'Sunil Maurya',
        lastSeen: 'today',
    },
    {
        id: 3,
        recieverName: 'Isha Gulati',
        lastSeen: 'yesterday',
    },
    {
        id: 4,
        recieverName: 'Prithu Singh',
        lastSeen: 'today',
    },
];

const ChatList = () => {
    const history = useHistory();
    const [activeChatId, setActiveChatId] = useState(null);
    const handleChatGroupClick = (id) => {
        console.log('id is', id);
        setActiveChatId(id);
        history.push(`/chat/${id}`);
    };
    return (
        <div className={styles.chatListContainer}>
            <div className={styles.chatTitle}>Chats</div>
            {dummyData.map((listItem) => (
                <div
                    className={cx(styles.listItem, { [styles.activeChat]: listItem.id === activeChatId })}
                    onClick={() => handleChatGroupClick(listItem.id)}
                    key={listItem.id}
                >
                    <div className={styles.name}>{listItem.recieverName}</div>
                    <div className={styles.name}>{listItem.lastSeen}</div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
