import React from 'react';
import Input from '../../widgets/InputBox';
import styles from './ChatMessages.modules.css';

const ChatDisplay = () => {
    return (
        <div className={styles.chatMessageContainer}>
            <div className={styles.chatDescription}> Name & Description goes here</div>
            <div className={styles.userMessages}>
                <div className={styles.reciever}>Hey i am sunil</div>
                <div className={styles.sender}> Hey I am aniket</div>
            </div>
            <div className={styles.chatSendInput}>
                <Input label="send messages here" />
            </div>
        </div>
    );
};

export default ChatDisplay;
