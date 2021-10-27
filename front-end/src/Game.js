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

    const[player2First, setPlayer2First] = useState("???")
    const[player2Second, setPlayer2Second] = useState("???")

    const[player3First, setPlayer3First] = useState("???")
    const[player3Second, setPlayer3Second] = useState("???")

    const[player4First, setPlayer4First] = useState("???")
    const[player4Second, setPlayer4Second] = useState("???")

    const[player5First, setPlayer5First] = useState("???")
    const[player5Second, setPlayer5Second] = useState("???")

    const[player6First, setPlayer6First] = useState("???")
    const[player6Second, setPlayer6Second] = useState("???")

    const[player7First, setPlayer7First] = useState("???")
    const[player7Second, setPlayer7Second] = useState("???")

    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    useEffect(() => {
        shuffleDeck()
        setHandFirst(getCard())
        setHandSecond(getCard())
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
            case 4:
                setPlayer2First(getCard())
                setPlayer2Second(getCard())

                setPlayer3First(getCard())
                setPlayer3Second(getCard())

                setPlayer4First(getCard())
                setPlayer4Second(getCard())

                setPlayer5First(getCard())
                setPlayer5Second(getCard())

                setPlayer6First(getCard())
                setPlayer6Second(getCard())

                setPlayer7First(getCard())
                setPlayer7Second(getCard())
                break;
            default:
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

    const call = () => {
        setAction("Called")
        if (gamePhase < 4){
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
        setHandFirst(getCard())
        setHandSecond(getCard())
    }

    useEffect(() => {
        props.updateUserProfileButton(false);
    }, [props]);
    
    return (
        <div>
            <div className="player2">
                
                <div className="opponentName">p2 UName</div>
                <div className="opponentChips">p2 Chips</div>
                <div className="opponentFirstCard">{player2First}</div>
                <div className="opponentSecondCard">{player2Second}</div>
                
            </div>

            <div className="player3">
                
                <div className="opponentName">p3 UName</div>
                <div className="opponentChips">p3 Chips</div>
                <div className="opponentFirstCard">{player3First}</div>
                <div className="opponentSecondCard">{player3Second}</div>
                
            </div>

            <div className="player4">
                
                <div className="opponentName">p4 UName</div>
                <div className="opponentChips">p4 Chips</div>
                <div className="opponentFirstCard">{player4First}</div>
                <div className="opponentSecondCard">{player4Second}</div>
                
            </div>

            <div className="player5">
                
                <div className="opponentName">p5 UName</div>
                <div className="opponentChips">p5 Chips</div>
                <div className="opponentFirstCard">{player5First}</div>
                <div className="opponentSecondCard">{player5Second}</div>
                
            </div>

            <div className="player6">
                
                <div className="opponentName">p6 UName</div>
                <div className="opponentChips">p6 Chips</div>
                <div className="opponentFirstCard">{player6First}</div>
                <div className="opponentSecondCard">{player6Second}</div>
                
            </div>

            <div className="player7">
                
                <div className="opponentName">p7 UName</div>
                <div className="opponentChips">p7 Chips</div>
                <div className="opponentFirstCard">{player7First}</div>
                <div className="opponentSecondCard">{player7Second}</div>
                
            </div>
            <div>
                <center>
                    <div className="pot"><br />0</div>
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