import React, {useState, useEffect} from 'react';
import '../css/Game.css';
import Chat from './Chat'

const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const cardSuits = ['../hearts.png','../diamonds.png','../spades.png','../clubs.png']

//to be passed in from table making screen
const startingChips = 1000
const bigBlind = 10
const smallBlind = 5

const deck = []
for (const val of cardValues){
    for (const suit of cardSuits){
        deck.push({
            "val": val,
            "suit": suit
        })
    }
}
let gameDeck = [...deck]
function Game(props) {

    const [action, setAction] = useState(null)
    const [numPlayers, setNumPlayers] = useState(7)
    const [handFirst, setHandFirst] = useState({"val": null, "suit": null})
    const [handSecond, setHandSecond] = useState({"val": null, "suit": null})
    const [flopFirst, setFlopFirst] = useState({"val": null, "suit": null})
    const [flopSecond, setFlopSecond] = useState({"val": null, "suit": null})
    const [flopThird, setFlopThird] = useState({"val": null, "suit": null})
    const [turn, setTurn] = useState({"val": null, "suit": null})
    const [river, setRiver] = useState({"val": null, "suit": null})
    const [gamePhase, setGamePhase] = useState(0)
    //Game Phases:
    // 0: Preflop betting (2 cards in hand)
    // 1: Flop (3 cards in center)
    // 2: Turn (4 cards in center)
    // 3: River (5 cards in center. Last round of betting.)

    const[player2First, setPlayer2First] = useState({"val": null, "suit": null})
    const[player2Second, setPlayer2Second] = useState({"val": null, "suit": null})

    const[player3First, setPlayer3First] = useState({"val": null, "suit": null})
    const[player3Second, setPlayer3Second] = useState({"val": null, "suit": null})

    const[player4First, setPlayer4First] = useState({"val": null, "suit": null})
    const[player4Second, setPlayer4Second] = useState({"val": null, "suit": null})

    const[player5First, setPlayer5First] = useState({"val": null, "suit": null})
    const[player5Second, setPlayer5Second] = useState({"val": null, "suit": null})

    const[player6First, setPlayer6First] = useState({"val": null, "suit": null})
    const[player6Second, setPlayer6Second] = useState({"val": null, "suit": null})

    const[player7First, setPlayer7First] = useState({"val": null, "suit": null})
    const[player7Second, setPlayer7Second] = useState({"val": null, "suit": null})

    const[player1Chips, setPlayer1Chips] = useState(startingChips)
    const[player2Chips, setPlayer2Chips] = useState(startingChips)
    const[player3Chips, setPlayer3Chips] = useState(startingChips)
    const[player4Chips, setPlayer4Chips] = useState(startingChips)
    const[player5Chips, setPlayer5Chips] = useState(startingChips)
    const[player6Chips, setPlayer6Chips] = useState(startingChips)
    const[player7Chips, setPlayer7Chips] = useState(startingChips)

    const[pot, setPot] = useState(0)
    const[formHolder, setFormHolder] = useState()
    const[bet, setBet] = useState(bigBlind)

    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    useEffect(() => {
        shuffleDeck()
        setHandFirst(gameDeck.shift())
        setHandSecond(gameDeck.shift())
    }, []);

    useEffect(() => {
        setPlayer1Chips(player1Chips - bet)
        setPlayer2Chips(player2Chips - bet)
        setPlayer3Chips(player3Chips - bet)
        setPlayer4Chips(player4Chips - bet)
        setPlayer5Chips(player5Chips - bet)
        setPlayer6Chips(player6Chips - bet)
        setPlayer7Chips(player7Chips - bet)
        setPot(bet * numPlayers)

        switch(gamePhase){
            case 1:
                setFlopFirst(gameDeck.shift())
                setFlopSecond(gameDeck.shift())
                setFlopThird(gameDeck.shift())
                setBet(0)
                break;
            case 2:
                setTurn(gameDeck.shift())
                setBet(0)
                break;
            case 3:
                setRiver(gameDeck.shift())
                setBet(0)
                break;
            case 4:
                setPlayer2First(gameDeck.shift())
                setPlayer2Second(gameDeck.shift())

                setPlayer3First(gameDeck.shift())
                setPlayer3Second(gameDeck.shift())

                setPlayer4First(gameDeck.shift())
                setPlayer4Second(gameDeck.shift())

                setPlayer5First(gameDeck.shift())
                setPlayer5Second(gameDeck.shift())

                setPlayer6First(gameDeck.shift())
                setPlayer6Second(gameDeck.shift())

                setPlayer7First(gameDeck.shift())
                setPlayer7Second(gameDeck.shift())
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



    const call = () => {
        setAction("Called")
        if (gamePhase < 4){
            setGamePhase(gamePhase+1)
        }
    }
    const raise = () => {
        setAction("Raised")
        setBet(formHolder)
        if (gamePhase < 4){
            setGamePhase(gamePhase+1)
        }
    }
    const fold = () => {
        setAction("Folded")
        setFlopFirst({"val": null, "suit": null})
        setFlopSecond({"val": null, "suit": null})
        setFlopThird({"val": null, "suit": null})
        setTurn({"val": null, "suit": null})
        setRiver({"val": null, "suit": null})
        setPot(0)
        setGamePhase(0)
        shuffleDeck()
        setHandFirst(gameDeck.shift())
        setHandSecond(gameDeck.shift())

        setPlayer2First({"val": null, "suit": null})
        setPlayer2Second({"val": null, "suit": null})

        setPlayer3First({"val": null, "suit": null})
        setPlayer3Second({"val": null, "suit": null})

        setPlayer4First({"val": null, "suit": null})
        setPlayer4Second({"val": null, "suit": null})

        setPlayer5First({"val": null, "suit": null})
        setPlayer5Second({"val": null, "suit": null})

        setPlayer6First({"val": null, "suit": null})
        setPlayer6Second({"val": null, "suit": null})

        setPlayer7First({"val": null, "suit": null})
        setPlayer7Second({"val": null, "suit": null})
    }

    useEffect(() => {
        props.updateUserProfileButton(false);
    }, [props]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setBet(formHolder)
        console.log(bet)
    }
    
    return (
        
        <div>
            <div className="bet">Current Bet: {bet}</div>

            <div className="player2">
                
                <div className="opponentName">p2 UName</div>
                <div className="opponentChips">{player2Chips}</div>
                
                <div className="opponentFirstCard">{player2First.val}
                <img className='suit' src={player2First.suit} onerror="this.style.display='none'"/></div>
                <div className="opponentSecondCard">{player2Second.val}
                <img className='suit' src={player2Second.suit} onerror="this.style.display='none'"/></div>
                
            </div>

            <div className="player3">
                
                <div className="opponentName">p3 UName</div>
                <div className="opponentChips">{player3Chips}</div>
                <div className="opponentFirstCard">{player3First.val}
                <img className='suit' src={player3First.suit} onerror="this.style.display='none'"/></div>
                <div className="opponentSecondCard">{player3Second.val}
                <img className='suit' src={player3Second.suit} onerror="this.style.display='none'"/></div>
                
            </div>

            <div className="player4">
                
                <div className="opponentName">p4 UName</div>
                <div className="opponentChips">{player4Chips}</div>
                <div className="opponentFirstCard">{player4First.val}
                <img className='suit' src={player4First.suit} onerror="this.style.display='none'"/></div>
                <div className="opponentSecondCard">{player4Second.val}
                <img className='suit' src={player4Second.suit} onerror="this.style.display='none'"/></div>
                
            </div>

            <div className="player5">
                
                <div className="opponentName">p5 UName</div>
                <div className="opponentChips">{player5Chips}</div>
                <div className="opponentFirstCard">{player5First.val}
                <img className='suit' src={player5First.suit} onerror="this.style.display='none'"/></div>
                <div className="opponentSecondCard">{player5Second.val}
                <img className='suit' src={player5Second.suit} onerror="this.style.display='none'"/></div>
                
            </div>

            <div className="player6">
                
                <div className="opponentName">p6 UName</div>
                <div className="opponentChips">{player6Chips}</div>
                <div className="opponentFirstCard">{player6First.val}
                <img className='suit' src={player6First.suit} onerror="this.style.display='none'"/></div>
                <div className="opponentSecondCard">{player6Second.val}
                <img className='suit' src={player6Second.suit} onerror="this.style.display='none'"/></div>
                
            </div>

            <div className="player7">
                
                <div className="opponentName">p7 UName</div>
                <div className="opponentChips">{player7Chips}</div>
                <div className="opponentFirstCard">{player7First.val}
                <img className='suit' src={player7First.suit} onerror="this.style.display='none'"/></div>
                <div className="opponentSecondCard">{player7Second.val}
                <img className='suit' src={player7Second.suit} onerror="this.style.display='none'"/></div>
                
            </div>
            <div>
                <center>
                    <div className="pot"><br />{pot}</div>
                    <div>
                        <div className="centerCards">{flopFirst.val}
                            <img className='suit' src={flopFirst.suit} onerror="this.style.display='none'"/></div>
                        <div className="centerCards">{flopSecond.val}
                            <img className='suit' src={flopSecond.suit} onerror="this.style.display='none'"/></div>
                        <div className="centerCards">{flopThird.val}
                            <img className='suit' src={flopThird.suit} onerror="this.style.display='none'"/></div>
                        <div className="centerCards">{turn.val}
                            <img className='suit' src={turn.suit} onerror="this.style.display='none'"/></div>
                        <div className="centerCards">{river.val}
                            <img className='suit' src={river.suit} onerror="this.style.display='none'"/></div>
                    </div>
                </center>
            </div>
        <div className="playerElements">
            <center>
                <button className="playerOption" onClick={call}>Call</button>
                <button className="playerOption" onClick={raise}>Raise</button>
                <button className="playerOption" onClick={fold}>Fold</button>
                <form onSubmit={handleSubmit}>
                <input className="raiseForm"
                type="text" 
                onChange={(e) => setFormHolder(e.target.value)}
                />
                </form>
                <div>
                    <div className="playerCards">
                        {handFirst.val} 
                        <img className='suit' src={handFirst.suit}/>
                    </div>
                    <div className="playerCards">
                        {handSecond.val} 
                        <img className='suit' src={handSecond.suit}/>
                    </div> 
                </div>
                
                <div className="playerChips">
                    {player1Chips}
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