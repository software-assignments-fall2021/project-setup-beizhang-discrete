import React, {useState, useEffect} from 'react';
import './Game.css';
import Chat from './Chat'

function Game(props) {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const [action, setAction] = useState("")
    const [handFirst, setHandFirst] = useState("")
    const [handSecond, setHandSecond] = useState("")
    const [flopFirst, setFlopFirst] = useState("")
    const [flopSecond, setFlopSecond] = useState("")
    const [flopThird, setFlopThird] = useState("")
    const [turn, setTurn] = useState("")
    const [river, setRiver] = useState("")

    const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    const cardSuits = ['Hearts', 'Diamonds', 'Spades', 'Clubs']

    const deck = []
    for (const val of cardValues){
        for (const suit of cardSuits){
            deck.push(val + " of " + suit)
        }

    }

    const getCard = () => {
        let r = deck.shift()
        console.log("r = " + deck[0])
        return r
    }

    const drawHand = () => {
        setHandFirst(getCard())
        setHandSecond(getCard())
    }

    const call = () => {
        setAction("Called")
    }
    const raise = () => {
        setAction("Raised")
    }
    const fold = () => {
        setAction("Folded")
        drawHand()
        console.log(handFirst + handSecond)
    }

    return (
        <div>
            <center>
                <p>
                    Your Hand has: {handFirst} {handSecond}
                </p>
            <button onClick={call}>Call</button>
            <button onClick={raise}>Raise</button>
            <button onClick={fold}>Fold</button>
            <p>
                {action}
            </p>
            
            </center>
            <Chat />
        </div>
    )
}

export default Game;