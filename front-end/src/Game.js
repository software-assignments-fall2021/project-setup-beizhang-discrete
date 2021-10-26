import React, {useState, useEffect} from 'react';
import './Game.css';
import Chat from './Chat'

const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const cardSuits = ['Hearts', 'Diamonds', 'Spades', 'Clubs']

const deck = []
for (const val of cardValues){
    for (const suit of cardSuits){
        deck.push(val + " of " + suit)
    }
}
let gameDeck = [...deck]
function Game(props) {
    const [action, setAction] = useState(null)
    const [handFirst, setHandFirst] = useState(null)
    const [handSecond, setHandSecond] = useState(null)
    const [flopFirst, setFlopFirst] = useState(null)
    const [flopSecond, setFlopSecond] = useState(null)
    const [flopThird, setFlopThird] = useState(null)
    const [turn, setTurn] = useState(null)
    const [river, setRiver] = useState(null)
    const [gamePhase, setGamePhase] = useState(0)
    //Game Phases:
    // 0: Preflop betting (2 cards in hand)
    // 1: Flop (3 cards in center)
    // 2: Turn (4 cards in center)
    // 3: River (5 cards in center. Last round of betting.)

    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    useEffect(() => {
        shuffleDeck()
        drawHand()
    }, []);

    useEffect(() => {
        switch(gamePhase){
            case 1:
                setFlopFirst(getCard())
                setFlopSecond(getCard())
                setFlopThird(getCard())
                break;
            case 2:
                setTurn(getCard())
                break;
            case 3:
                setRiver(getCard())
                break;
        }
    }, [gamePhase])

    const shuffleDeck = () => {
        gameDeck = [...deck]
        let currentIndex = gameDeck.length,  randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [gameDeck[currentIndex], gameDeck[randomIndex]] = [
            gameDeck[randomIndex], gameDeck[currentIndex]];
        }
    }

    const getCard = () => {
        let r = gameDeck.shift()
        return r
    }

    const drawHand = () => {
        setHandFirst(getCard())
        setHandSecond(getCard())
    }

    const call = () => {
        setAction("Called")
        if (gamePhase < 3){
            setGamePhase(gamePhase+1)
        }
    }
    const raise = () => {
        setAction("Raised")
    }
    const fold = () => {
        setAction("Folded")
        setFlopFirst(null)
        setFlopSecond(null)
        setFlopThird(null)
        setTurn(null)
        setRiver(null)
        setGamePhase(0)
        shuffleDeck()
        drawHand()
    }

    return (
        <div>
            <div>
                <center>
                    <div className="pot"><br />pot goes here</div>
                    <p>
                        <div className="centerCards">{flopFirst}</div>
                        <div className="centerCards">{flopSecond}</div>
                        <div className="centerCards">{flopThird}</div>
                        <div className="centerCards">{turn}</div>
                        <div className="centerCards">{river}</div>
                    </p>
                </center>
            </div>
        <div className="playerElements">
            <center>
                <button className="playerOption" onClick={call}>Call</button>
                <button className="playerOption" onClick={raise}>Raise</button>
                <button className="playerOption" onClick={fold}>Fold</button>
                <p className="playerAction">
                    {action}
                </p>
                <p>
                    <div className="playerCards">{handFirst}</div>
                    <div className="playerCards">{handSecond}</div> 
                </p>
                
                <div className="playerChips">
                    Chips here
                </div>
                <div className="playerID">
                    Username here
                </div>
            </center>
            <Chat />
        </div>
        </div>
    )
}

export default Game;