import React, { useState, useEffect } from 'react';
import '../css/Chat.css';
import {Launcher} from 'react-chat-window';
import io from 'socket.io-client';

/*https://www.npmjs.com/package/react-chat-window*/

function Chat(props) {
    const user = props.user;
    const [messageList, addMessage] = useState([]);

    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(`http://localhost:4000/`, { query: `id=${props.id}` });
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if(socket) {
            socket.on("newMessage", message => {
                addMessage(messageList => [...messageList, message]);
            });
        }
    }, [socket]);

    function _onMessageWasSent(message) {
        console.log(message)
        socket.emit("sendMessage", {...message, data: { text: `${user.username}: ${message.data.text}` }});
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