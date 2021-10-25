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
<<<<<<< HEAD
<<<<<<< HEAD

=======




>>>>>>> b09a695 (center cards and proper deck management)
=======
>>>>>>> 455fdaa (added center cards and deck management)
function Game(props) {
    const [action, setAction] = useState("")
    const [handFirst, setHandFirst] = useState("")
    const [handSecond, setHandSecond] = useState("")
    const [flopFirst, setFlopFirst] = useState("")
    const [flopSecond, setFlopSecond] = useState("")
    const [flopThird, setFlopThird] = useState("")
    const [turn, setTurn] = useState("")
    const [river, setRiver] = useState("")
    const [rulesText, setRulesText] = useState("Preflop Betting.")
<<<<<<< HEAD
<<<<<<< HEAD
=======
    console.log("setting gamephase from start")
>>>>>>> b09a695 (center cards and proper deck management)
=======
>>>>>>> 455fdaa (added center cards and deck management)
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
<<<<<<< HEAD
>>>>>>> b09a695 (center cards and proper deck management)
=======
>>>>>>> 455fdaa (added center cards and deck management)
        switch(gamePhase){
            case 1:
                setFlopFirst(getCard())
                setFlopSecond(getCard())
                setFlopThird(getCard())
                setRulesText("The flop comes down!")
                break;
            case 2:
                setTurn(getCard())
                setRulesText("Here comes the turn!")
                break;
            case 3:
                setRiver(getCard())
                setRulesText("The river! Last round of bets!")
                break;
<<<<<<< HEAD
<<<<<<< HEAD
=======
            default:
                console.log("error! gamephase: " + gamePhase)
>>>>>>> b09a695 (center cards and proper deck management)
=======
>>>>>>> 455fdaa (added center cards and deck management)
        }
    }, [gamePhase])

    const shuffleDeck = () => {
        gameDeck = [...deck]
        let currentIndex = gameDeck.length,  randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [gameDeck[currentIndex], gameDeck[randomIndex]] = [
            gameDeck[randomIndex], gameDeck[currentIndex]];
        }
<<<<<<< HEAD
<<<<<<< HEAD
=======
        
        console.log(gameDeck)
>>>>>>> b09a695 (center cards and proper deck management)
=======
>>>>>>> 455fdaa (added center cards and deck management)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
            console.log("game phase: " + gamePhase)
>>>>>>> b09a695 (center cards and proper deck management)
=======
>>>>>>> 455fdaa (added center cards and deck management)
        }
    }
    const raise = () => {
        setAction("Raised")
    }
    const fold = () => {
        setAction("Folded")
        setFlopFirst("")
        setFlopSecond("")
        setFlopThird("")
        setTurn("")
        setRiver("")
        setGamePhase(0)
        shuffleDeck()
        drawHand()
<<<<<<< HEAD
=======
        console.log("setting gamephase from fold")
        setGamePhase(0)
        shuffleDeck()
        drawHand()
        console.log(handFirst + handSecond)

>>>>>>> b09a695 (center cards and proper deck management)
=======
>>>>>>> 455fdaa (added center cards and deck management)
    }

    return (
        <div>
            <center>
                <p>
                    Center Cards: {flopFirst}, {flopSecond}, {flopThird}, {turn}, {river}
                </p>
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