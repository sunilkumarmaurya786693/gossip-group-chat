import React, { useState, useEffect } from 'react';
import { get } from 'lodash-es';
import { useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import cookie from 'js-cookie';

import styles from './ChatList.modules.css';

// const dummyData = [
//     {
//         id: 1,
//         recieverName: 'Aniket Batabyal',
//         lastSeen: 'yesterday',
//     },
//     {
//         id: 2,
//         recieverName: 'Sunil Maurya',
//         lastSeen: 'today',
//     },
//     {
//         id: 3,
//         recieverName: 'Isha Gulati',
//         lastSeen: 'yesterday',
//     },
//     {
//         id: 4,
//         recieverName: 'Prithu Singh',
//         lastSeen: 'today',
//     },
// ];

const ChatList = (props) => {
    const group_id = cookie.get('group_id');
    console.log('group_id this is ------------->', props);
    const history = useHistory();
    const { groups } = useStoreState((state) => state.groups);
    const [activeChatId, setActiveChatId] = useState(null);
    const [groupsDetail, setGroupDetails] = useState([]);

    useEffect(() => {
        if (groups) {
            const data = groups.map((group) => {
                return {
                    group_id: get(group, 'id', null),
                    group_name: get(group, 'group_name', ''),
                    message_count: get(group, 'messages.length', 0),
                };
            });
            setGroupDetails(() => data);
            console.log('groupsDetail', data, groupsDetail);
            if (group_id) {
                setActiveChatId(group_id);
            }
        }
    }, [groups]);
    const handleChatGroupClick = (id) => {
        console.log('id is', id);
        setActiveChatId(id);
        history.push(`/group/${id}`);
    };
    return (
        <div className={styles.chatListContainer}>
            <div className={styles.chatTitle}>Chats</div>
            {groupsDetail &&
                groupsDetail.map((group) => (
                    <div
                        className={cx(styles.listItem, { [styles.activeChat]: group.group_id === activeChatId })}
                        onClick={() => handleChatGroupClick(group.group_id)}
                        key={group.group_id}
                    >
                        <div className={styles.name}>{group.group_name}</div>
                        <div className={styles.name}>{group.message_count}</div>
                    </div>
                ))}
        </div>
    );
};

export default ChatList;
