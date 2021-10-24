import React, { useState } from 'react';
import './Chat.css';
import {Launcher} from 'react-chat-window';

/*https://www.npmjs.com/package/react-chat-window*/

function Chat(props) {
    const [messageList, addMessage] = useState([]);
    function _onMessageWasSent(message) {
        addMessage(messageList => [...messageList, message]);
    }
    /*
    function _sendMessage(text) {
        addMessage(messageList => 
            [...messageList, {
                author: "them",
                type: "text",
                data: { text }
            }]
        );
    }
    */
    return (
        <div>
            <Launcher agentProfile={{
                    teamName: 'Game Chat',
                    /*imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'*/
                }}
                onMessageWasSent={_onMessageWasSent}
                messageList={messageList}
                showEmoji
            />
        </div>
    );
}

export default Chat;