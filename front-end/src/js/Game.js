import React, { useState, useEffect } from 'react';
import '../css/Game.css';
import Chat from './Chat';
import diamonds from '../suits/diamonds.png'
import hearts from '../suits/hearts.png'
import spades from '../suits/spades.png'
import clubs from '../suits/clubs.png'
const axios = require('axios')

const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const cardSuits = [clubs, diamonds, spades, hearts]

//to be passed in from table making screen
const startingChips = 1000
const bigBlind = 10
const smallBlind = 5

const tableID = window.location.href.split('/').at(-1)
const deck = []
for (const val of cardValues) {
    for (const suit of cardSuits) {
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
    const [handFirst, setHandFirst] = useState({ "val": null, "suit": null })
    const [handSecond, setHandSecond] = useState({ "val": null, "suit": null })
    const [flopFirst, setFlopFirst] = useState({ "val": null, "suit": null })
    const [flopSecond, setFlopSecond] = useState({ "val": null, "suit": null })
    const [flopThird, setFlopThird] = useState({ "val": null, "suit": null })
    const [turn, setTurn] = useState({ "val": null, "suit": null })
    const [river, setRiver] = useState({ "val": null, "suit": null })
    const [result, setResult] = useState("")
    const [gamePhase, setGamePhase] = useState(0)
    //Game Phases:
    // 0: Preflop betting (2 cards in hand)
    // 1: Flop (3 cards in center)
    // 2: Turn (4 cards in center)
    // 3: River (5 cards in center. Last round of betting.)

    const [player2First, setPlayer2First] = useState({ "val": null, "suit": null })
    const [player2Second, setPlayer2Second] = useState({ "val": null, "suit": null })

    const [player3First, setPlayer3First] = useState({ "val": null, "suit": null })
    const [player3Second, setPlayer3Second] = useState({ "val": null, "suit": null })

    const [player4First, setPlayer4First] = useState({ "val": null, "suit": null })
    const [player4Second, setPlayer4Second] = useState({ "val": null, "suit": null })

    const [player5First, setPlayer5First] = useState({ "val": null, "suit": null })
    const [player5Second, setPlayer5Second] = useState({ "val": null, "suit": null })

    const [player6First, setPlayer6First] = useState({ "val": null, "suit": null })
    const [player6Second, setPlayer6Second] = useState({ "val": null, "suit": null })

    const [player7First, setPlayer7First] = useState({ "val": null, "suit": null })
    const [player7Second, setPlayer7Second] = useState({ "val": null, "suit": null })

    const [player1Chips, setPlayer1Chips] = useState(startingChips)
    const [player2Chips, setPlayer2Chips] = useState(startingChips)
    const [player3Chips, setPlayer3Chips] = useState(startingChips)
    const [player4Chips, setPlayer4Chips] = useState(startingChips)
    const [player5Chips, setPlayer5Chips] = useState(startingChips)
    const [player6Chips, setPlayer6Chips] = useState(startingChips)
    const [player7Chips, setPlayer7Chips] = useState(startingChips)

    const [pot, setPot] = useState(0)
    const [formHolder, setFormHolder] = useState()
    const [bet, setBet] = useState(bigBlind)

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

        switch (gamePhase) {
            case 1:
                setFlopFirst(gameDeck.shift())
                setFlopSecond(gameDeck.shift())
                setFlopThird(gameDeck.shift())
                setBet(0)
                setResult("")
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

                scoreHand(1)
                break;
            default:
                break;
        }
    }, [gamePhase]) //eslint-disable-line react-hooks/exhaustive-deps


    function scoreHand(player) {
        let allVals = [flopFirst.val, flopSecond.val, flopThird.val, turn.val, river.val]
        let allSuits = [flopFirst.suit, flopSecond.suit, flopThird.suit, turn.suit, river.suit]
        switch (player) {
            case 1:
                allVals.push(handFirst.val, handSecond.val)
                allSuits.push(handFirst.suit, handSecond.suit)
                break;
            case 2:
                allVals.push(player2First.val, player2Second.val)
                allSuits.push(player2First.suit, player2Second.suit)
                break;
            case 3:
                allVals.push(player3First.val, player3Second.val)
                allSuits.push(player3First.suit, player3Second.suit)
                break;
            case 4:
                allVals.push(player4First.val, player4Second.val)
                allSuits.push(player4First.suit, player4Second.suit)
                break;
            case 5:
                allVals.push(player5First.val, player5Second.val)
                allSuits.push(player5First.suit, player5Second.suit)
                break;
            case 6:
                allVals.push(player6First.val, player6Second.val)
                allSuits.push(player6First.suit, player6Second.suit)
                break;
            case 7:
                allVals.push(player7First.val, player7Second.val)
                allSuits.push(player7First.suit, player7Second.suit)
                break;
        }
        for (let i = 0; i < allVals.length; i++) {
            switch (allVals[i]) {
                case ('A'):
                    allVals[i] = 14
                    break;
                case ('J'):
                    allVals[i] = 13
                    break;
                case ('Q'):
                    allVals[i] = 12
                    break;
                case ('K'):
                    allVals[i] = 11
                    break;
                default:
                    allVals[i] = parseInt(allVals[i], 10)
                    break;
            }
            switch (allSuits[i]) {
                case (spades):
                    allSuits[i] = "♠"
                    break;
                case (clubs):
                    allSuits[i] = "♣"
                    break;
                case (hearts):
                    allSuits[i] = "♥"
                    break;
                case (diamonds):
                    allSuits[i] = "♦"
                    break;
            }
        }
        let hands = ["4 of a Kind", "Straight Flush", "Straight", "Flush", "High Card",
            "1 Pair", "2 Pair", "Royal Flush", "3 of a Kind", "Full House"];
        var A = 14, K = 13, Q = 12, J = 11, _ = { "♠": 1, "♣": 2, "♥": 4, "♦": 8 };

        //Calculates the Rank of a 5 card Poker hand using bit manipulations.
        //code from https://www.codeproject.com/Articles/569271/A-Poker-hand-analyzer-in-JavaScript-using-bit-math
        function rankPokerHand(cs, ss) {
            var v, i, o, s = 1 << cs[0] | 1 << cs[1] | 1 << cs[2] | 1 << cs[3] | 1 << cs[4];
            for (i = -1, v = o = 0; i < 5; i++, o = Math.pow(2, cs[i] * 4)) { v += o * ((v / o & 15) + 1); }
            v = v % 15 - ((s / (s & -s) === 31) || (s === 0x403c) ? 3 : 1);
            v -= (ss[0] === (ss[1] | ss[2] | ss[3] | ss[4])) * ((s === 0x7c00) ? -5 : 1);

            //return("Hand: "+hands[v]+((s === 0x403c)?" (Ace low)":""));
            return (hands[v] + ((s === 0x403c) ? " (Ace low)" : ""));
        }

        let results = []
        let scores = {
            "High Card": 1, "1 Pair": 2, "2 Pair": 3, "3 of a Kind": 4, "Straight": 5,
            "Flush": 6, "Full House": 7, "4 of a Kind": 8, "Straight Flush": 9, "Royal Flush": 10
        }
        let bestScore = 0;
        let scoreString = "";
        let bestHand = [0, 1, 2, 3, 4];
        for (let a = 0; a < 3; a++) {
            for (let b = a + 1; b < 4; b++) {
                for (let c = b + 1; c < 5; c++) {
                    for (let d = c + 1; d < 6; d++) {
                        for (let e = d + 1; e < 7; e++) {

                            let temp = rankPokerHand([allVals[a], allVals[b], allVals[c], allVals[d], allVals[e]],
                                [allSuits[a], allSuits[b], allSuits[c], allSuits[d], allSuits[e]])
                            if (bestScore < scores[temp]) {
                                scoreString = temp
                                bestScore = scores[scoreString]
                                bestHand = [a, b, c, d, e]
                            }
                        }
                    }
                }
            }
        }
        rankPokerHand([allVals[0], allVals[1], allVals[2], allVals[3], allVals[4]],
            [_[allSuits[0]], _[allSuits[1]], _[allSuits[2]], _[allSuits[3]], _[allSuits[4]]]);

        setResult(scoreString)

    }

    const shuffleDeck = () => {
        gameDeck = [...deck]
        let currentIndex = gameDeck.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [gameDeck[currentIndex], gameDeck[randomIndex]] = [
                gameDeck[randomIndex], gameDeck[currentIndex]];
        }
    }

    const call = () => {
        setAction("Called")
        if (gamePhase < 4) {
            setGamePhase(gamePhase + 1)
        }
    }
    const raise = () => {
        setAction("Raised")
        setBet(formHolder)
        if (gamePhase < 4) {
            setGamePhase(gamePhase + 1)
        }
    }
    const fold = () => {
        setAction("Folded")
        setFlopFirst({ "val": null, "suit": null })
        setFlopSecond({ "val": null, "suit": null })
        setFlopThird({ "val": null, "suit": null })
        setTurn({ "val": null, "suit": null })
        setRiver({ "val": null, "suit": null })
        setPot(0)
        setResult("")
        setGamePhase(0)
        shuffleDeck()
        setHandFirst(gameDeck.shift())
        setHandSecond(gameDeck.shift())

        setPlayer2First({ "val": null, "suit": null })
        setPlayer2Second({ "val": null, "suit": null })

        setPlayer3First({ "val": null, "suit": null })
        setPlayer3Second({ "val": null, "suit": null })

        setPlayer4First({ "val": null, "suit": null })
        setPlayer4Second({ "val": null, "suit": null })

        setPlayer5First({ "val": null, "suit": null })
        setPlayer5Second({ "val": null, "suit": null })

        setPlayer6First({ "val": null, "suit": null })
        setPlayer6Second({ "val": null, "suit": null })

        setPlayer7First({ "val": null, "suit": null })
        setPlayer7Second({ "val": null, "suit": null })
    }

    useEffect(() => {

        props.updateUserProfileButton(false);
    }, [props]);





    const handleSubmit = (event) => {
        event.preventDefault();
        setBet(formHolder)
    }

    useEffect(() => {

        const onClose = () => {
            leaveTable()
        }
    
        setTimeout(() => { joinTable(); }, 1000);

        window.addEventListener('beforeunload', onClose);
        return () => {
            window.addEventListener('beforeunload', onClose);
        }
    }, []);

    

    const joinTable = async e => {
        console.log("join table", tableID)

        try {
            const response = await axios.patch("/api/tableJoin/" + tableID)
            console.log(response)
        } catch (err) {
            throw new Error(err);
        }
    }

    const leaveTable = async e => {
        console.log("leaving", tableID)

        try {
            const response = await axios.patch("/api/tableLeave/" + tableID)
            console.log(response)
        } catch (err) {
            throw new Error(err);
        }

    }

    return (


        <div>
            <div>
                <div className="bet">Current Bet: {bet}</div>

                <div className="player2">

                    <div className="opponentName">p2 UName</div>
                    <div className="opponentChips">{player2Chips}</div>

                    <div className="opponentFirstCard">{player2First.val}
                        <img className='suit' src={player2First.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>
                    <div className="opponentSecondCard">{player2Second.val}
                        <img className='suit' src={player2Second.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>

                </div>

                <div className="player3">

                    <div className="opponentName">p3 UName</div>
                    <div className="opponentChips">{player3Chips}</div>
                    <div className="opponentFirstCard">{player3First.val}
                        <img className='suit' src={player3First.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>
                    <div className="opponentSecondCard">{player3Second.val}
                        <img className='suit' src={player3Second.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>

                </div>

                <div className="player4">

                    <div className="opponentName">p4 UName</div>
                    <div className="opponentChips">{player4Chips}</div>
                    <div className="opponentFirstCard">{player4First.val}
                        <img className='suit' src={player4First.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>
                    <div className="opponentSecondCard">{player4Second.val}
                        <img className='suit' src={player4Second.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>

                </div>

                <div className="player5">

                    <div className="opponentName">p5 UName</div>
                    <div className="opponentChips">{player5Chips}</div>
                    <div className="opponentFirstCard">{player5First.val}
                        <img className='suit' src={player5First.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>
                    <div className="opponentSecondCard">{player5Second.val}
                        <img className='suit' src={player5Second.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>

                </div>

                <div className="player6">

                    <div className="opponentName">p6 UName</div>
                    <div className="opponentChips">{player6Chips}</div>
                    <div className="opponentFirstCard">{player6First.val}
                        <img className='suit' src={player6First.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>
                    <div className="opponentSecondCard">{player6Second.val}
                        <img className='suit' src={player6Second.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>

                </div>

                <div className="player7">

                    <div className="opponentName">p7 UName</div>
                    <div className="opponentChips">{player7Chips}</div>
                    <div className="opponentFirstCard">{player7First.val}
                        <img className='suit' src={player7First.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>
                    <div className="opponentSecondCard">{player7Second.val}
                        <img className='suit' src={player7Second.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>

                </div>
                <div>
                    <center>
                        <div className="pot"><br />{pot}</div>
                        <div>
                            <div className="centerCards">{flopFirst.val}
                                <img className='suit' src={flopFirst.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>
                            <div className="centerCards">{flopSecond.val}
                                <img className='suit' src={flopSecond.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>
                            <div className="centerCards">{flopThird.val}
                                <img className='suit' src={flopThird.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>
                            <div className="centerCards">{turn.val}
                                <img className='suit' src={turn.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>
                            <div className="centerCards">{river.val}
                                <img className='suit' src={river.suit} alt="" onError={(event) => event.target.style.display = 'none'} /></div>
                        </div>
                    </center>
                </div>
            </div>
            <div className="result">{result}</div>
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
                            <img className='suit' src={handFirst.suit} alt="" onError={(event) => event.target.style.display = 'none'} />
                        </div>
                        <div className="playerCards">
                            {handSecond.val}
                            <img className='suit' src={handSecond.suit} alt="" onError={(event) => event.target.style.display = 'none'} />
                        </div>
                    </div>

                    <div className="playerChips">
                        {player1Chips}
                    </div>
                    <div className="playerID">
                        Username here
                    </div>
                </center>
                {/* <Chat user={props.user} id={tableID} /> */}
            </div>
        </div>
    )
}

export default Game;