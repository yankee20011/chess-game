import { useState, useEffect } from "react";
import {
  randomizeArray,
  knightLogic,
  randomNumber,
  bishopLogic,
  queenLogic,
} from "utils";
import { Player } from "types";
import { useAppDispatch, useAppSelector, useInterval } from "app/hooks";
import { allPositions } from "./boardPositions";
import {
  setPlayersPosition,
  selectPlayers,
  setNewMove,
  setHistory,
  resetHistory,
  selectStats,
  optimizeStats,
  kill,
  resetKills,
} from "./chessSlice";

export const Controls = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectPlayers);
  const stats = useAppSelector(selectStats);

  const [positions, setPositions] = useState<string[]>([]);
  const [playerA, setPlayerA] = useState<Player | null>(null);
  const [playerB, setPlayerB] = useState<Player | null>(null);
  const [movingPlayer, setMovingPlayer] = useState<string>();
  const [isGame, setIsGame] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setPositions(randomizeArray(allPositions, 6));
  }, []);

  const newSimulation = () => {
    dispatch(setPlayersPosition(positions));
    dispatch(resetHistory());
    dispatch(resetKills());
    setIsGame(true);
    setIsRunning(false);
    setPositions(randomizeArray(allPositions, 6));
    setMovingPlayer("A");
  };

  const chessSimulation = () => {
    if (stats.length >= 5) {
      dispatch(optimizeStats());
    }

    if (movingPlayer === "A") {
      setPlayerA(players![randomNumber(0, 2)]);

      if (stats && stats[stats.length - 1]?.player === "A") {
        setMovingPlayer("B");
      } else {
        if (playerA?.name === "knight") {
          const availablePositions = knightLogic(playerA.position);
          const randomMove = randomizeArray(availablePositions, 1)[0];
          if (playerA?.position === playerB?.position) {
            dispatch(kill(playerB.index));
          }
          dispatch(
            setHistory({
              id: new Date().getTime(),
              player: playerA.player,
              name: `${playerA.color} ${playerA.name}`,
              lastPosition: playerA.position,
              nextPosition: randomMove,
              oldHistory: players,
              oldStats: stats,
            })
          );
          dispatch(setNewMove({ index: 0, position: randomMove }));
          setMovingPlayer("B");
        } else if (playerA?.name === "bishop") {
          const availablePositions = bishopLogic(playerA.position);
          const randomMove = randomizeArray(availablePositions, 1)[0];
          if (playerA?.position === playerB?.position) {
            dispatch(kill(playerB.index));
          }
          dispatch(
            setHistory({
              id: new Date().getTime(),
              player: playerA.player,
              name: `${playerA.color} ${playerA.name}`,
              lastPosition: playerA.position,
              nextPosition: randomMove,
              oldHistory: players,
              oldStats: stats,
            })
          );
          dispatch(setNewMove({ index: 2, position: randomMove }));
          setMovingPlayer("B");
        } else if (playerA?.name === "queen") {
          const availablePositions = queenLogic(playerA.position);
          const randomMove = randomizeArray(availablePositions, 1)[0];
          if (playerA?.position === playerB?.position) {
            dispatch(kill(playerB.index));
          }
          dispatch(
            setHistory({
              id: new Date().getTime(),
              player: playerA.player,
              name: `${playerA.color} ${playerA.name}`,
              lastPosition: playerA.position,
              nextPosition: randomMove,
              oldHistory: players,
              oldStats: stats,
            })
          );
          dispatch(setNewMove({ index: 1, position: randomMove }));
          setMovingPlayer("B");
        }
      }
    } else if (movingPlayer === "B") {
      setPlayerB(players![randomNumber(2, 5)]);

      if (stats && stats[stats.length - 1]?.player === "B") {
        setMovingPlayer("A");
      } else {
        if (playerB?.name === "knight") {
          const availablePositions = knightLogic(playerB.position);
          const randomMove = randomizeArray(availablePositions, 1)[0];
          if (playerB?.position === playerA?.position) {
            dispatch(kill(playerA.index));
          }

          dispatch(
            setHistory({
              id: new Date().getTime(),
              player: playerB.player,
              name: `${playerB.color} ${playerB.name}`,
              lastPosition: playerB.position,
              nextPosition: randomMove,
              oldHistory: players,
              oldStats: stats,
            })
          );
          dispatch(setNewMove({ index: 3, position: randomMove }));
          setMovingPlayer("A");
        } else if (playerB?.name === "bishop") {
          const availablePositions = bishopLogic(playerB.position);
          const randomMove = randomizeArray(availablePositions, 1)[0];
          if (playerB?.position === playerA?.position) {
            dispatch(kill(playerA.index));
          }

          dispatch(
            setHistory({
              id: new Date().getTime(),
              player: playerB.player,
              name: `${playerB.color} ${playerB.name}`,
              lastPosition: playerB.position,
              nextPosition: randomMove,
              oldHistory: players,
              oldStats: stats,
            })
          );
          dispatch(setNewMove({ index: 5, position: randomMove }));
          setMovingPlayer("A");
        } else if (playerB?.name === "queen") {
          const availablePositions = queenLogic(playerB.position);
          const randomMove = randomizeArray(availablePositions, 1)[0];
          if (playerB?.position === playerA?.position) {
            dispatch(kill(playerA.index));
          }

          dispatch(
            setHistory({
              id: new Date().getTime(),
              player: playerB.player,
              name: `${playerB.color} ${playerB.name}`,
              lastPosition: playerB.position,
              nextPosition: randomMove,
              oldHistory: players,
              oldStats: stats,
            })
          );
          dispatch(setNewMove({ index: 4, position: randomMove }));
          setMovingPlayer("A");
        }
      }
    }
  };
  useInterval(chessSimulation, isRunning ? 1000 : null);

  return (
    <div className="controls">
      <button onClick={newSimulation}>New Simulation</button>
      <button
        disabled={isGame ? false : true}
        onClick={() => setIsRunning(false)}
      >
        Pause
      </button>
      <button
        disabled={isGame ? false : true}
        onClick={() => setIsRunning(true)}
      >
        Start
      </button>
    </div>
  );
};
