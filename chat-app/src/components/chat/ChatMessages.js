import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { forEach, get } from 'lodash-es';
import cookie from 'js-cookie';
import { useQuery, gql, useSubscription } from '@apollo/client';
import styles from './ChatMessages.modules.css';

import { GET_NEW_MESSAGE } from '../../queries/newMessage';

const NewMessages = ({ group_id }) => {
    const user_id = cookie.get('user-id');
    const { data } = useSubscription(GET_NEW_MESSAGE);
    console.log('subscription data-------------------->', data);
    if (!data) return null;
    const new_message = {
        content: get(data, 'get_new_message.content', ''),
        createdAt: get(data, 'get_new_message.createdAt', 0),
        sender: get(data, 'get_new_message.sender', {}),
    };
    // console.log('new_message------->', newMessages);
    return (
        <div
            className={`${styles.messageRow} ${
                get(new_message, 'sender.id', null) === user_id ? styles.sender : styles.reciever
            }`}
        >
            <div className={styles.messageContainer}>{get(new_message, 'content', '')}</div>
        </div>
    );
    // })
};

const ChatDisplay = (props) => {
    const { groups } = useStoreState((state) => state.groups);
    const { sendMessage } = useStoreActions((state) => state.chat);
    const user_id = cookie.get('user-id');
    const [messages, setMessages] = useState([]);
    const [newMessageContent, setNewMessageContent] = useState('');
    // console.log('props----------->', props.match.params);
    const group_id = get(props, 'match.params.id', null);
    cookie.set('group_id', group_id);
    useEffect(() => {
        if (group_id && groups) {
            const messages = get(
                groups.filter((group) => {
                    return group.id === group_id;
                }),
                '0.messages',
                []
            );
            setMessages(messages);
            // console.log('messages---->', messages);
        }
    }, [groups, messages, group_id]);
    const handleInputChange = (event) => {
        setNewMessageContent(event.target.value);
        // console.log('this is event',event.target.value);
    };

    const sendMsg = () => {
        if (!newMessageContent || !group_id) return;
        sendMessage({ content: newMessageContent, group_id });
        setNewMessageContent('');
    };
    return (
        <div className={styles.chatMessageContainer}>
            {/* <div className={styles.chatDescription}> Name & Description goes here</div> */}
            <div className={styles.chatMessages}>
                {messages.map((message) => {
                    return (
                        <div
                            className={`${styles.messageRow} ${
                                get(message, 'sender.id', null) === user_id ? styles.sender : styles.reciever
                            }`}
                        >
                            <div className={styles.messageContainer}>{get(message, 'content', '')}</div>
                            {/* {get(message, 'sender.id','')} */}
                            {/* {get(message, 'sender.user_name','')} */}
                            {/* {get(message, 'createdAt', '')} */}
                        </div>
                    );
                })}
                <NewMessages group_id={group_id} />
            </div>

            {/* <div className={styles.userMessages}>
                <div className={styles.reciever}>Hey i am sunil</div>
                <div className={styles.sender}> Hey I am aniket</div>
            </div> */}
            <div className={styles.chatSendInput}>
                <input
                    placeholder="send messages here"
                    value={newMessageContent}
                    type="text"
                    onChange={(ev) => handleInputChange(ev)}
                    className={styles.inputBox}
                />
                <button
                    className={styles.button}
                    disabled={newMessageContent.length > 0 ? false : true}
                    onClick={() => sendMsg()}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatDisplay;
