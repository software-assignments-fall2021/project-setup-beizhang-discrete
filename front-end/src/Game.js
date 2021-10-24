import React, {useEffect} from 'react';
import './Game.css';
import Chat from './chat/Chat'

function Game(props) {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    return (
        <div>
            <Chat />
        </div>
    )
}

export default Game;