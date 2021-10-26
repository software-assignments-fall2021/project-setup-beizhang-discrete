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
    const [action, setAction] = useState("")
    const [handFirst, setHandFirst] = useState("")
    const [handSecond, setHandSecond] = useState("")
    const [flopFirst, setFlopFirst] = useState("")
    const [flopSecond, setFlopSecond] = useState("")
    const [flopThird, setFlopThird] = useState("")
    const [turn, setTurn] = useState("")
    const [river, setRiver] = useState("")
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
        setFlopFirst()
        setFlopSecond()
        setFlopThird()
        setTurn()
        setRiver()
        setGamePhase(0)
        shuffleDeck()
        drawHand()
    }

    let r = (
        <div>
            <center>
                <p>
                    <div className="centerCards"> {flopFirst} </div>
                    <div className="centerCards"> {flopSecond} </div>
                    <div className="centerCards"> {flopThird} </div>
                    <div className="centerCards"> {turn} </div>
                    <div className="centerCards"> {river} </div>
                </p>
                
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
    )
    return r
}

export default Game;