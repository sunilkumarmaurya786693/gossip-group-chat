import React, { useEffect, lazy, Suspense } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Switch, Route } from 'react-router-dom';
import styles from './Chat.modules.css';

const ChatList = lazy(() => import('../components/chat/ChatList'));
const ChatMessages = lazy(() => import('../components/chat/ChatMessages'));

const Chat = () => {
    const { getGroups } = useStoreActions((action) => action.groups);
    useEffect(() => {
        getGroups();
    }, [window.location]);

    return (
        <div className={styles.homeContainer}>
            <div className={styles.chatContainer}>
                <ChatList />
                <Suspense fallback={<div> loding chat component </div>}>
                    <Switch>
                        <Route path="/group/:id" component={ChatMessages} />
                    </Switch>
                </Suspense>
            </div>
        </div>
    );
};

export default Chat;
