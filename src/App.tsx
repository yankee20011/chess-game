import React from "react";
import { useAppSelector } from "app/hooks";

import { selectPlayers, selectStats } from "features/chess/chessSlice";

import { Table } from "features/chess/Table";
import { Stats } from "features/chess/Stats";
import { Controls } from "features/chess/Controls";

function App() {
  const players = useAppSelector(selectPlayers);
  const stats = useAppSelector(selectStats);

  return (
    <div className="app">
      <div className="app__chess">
        <div className="app__playerA">
          <h4>PLAYER A</h4>
          <span style={{ color: `${players[0].alive ? "white" : "red"}` }}>
            &#9822;
          </span>
          <span style={{ color: `${players[2].alive ? "white" : "red"}` }}>
            &#9815;
          </span>
          <span style={{ color: `${players[1].alive ? "white" : "red"}` }}>
            &#9819;
          </span>
        </div>
        <Table />
        <div className="app__playerB">
          <h4>PLAYER B</h4>
          <span style={{ color: `${players[3].alive ? "black" : "red"}` }}>
            &#9822;
          </span>
          <span style={{ color: `${players[5].alive ? "black" : "red"}` }}>
            &#9815;
          </span>
          <span style={{ color: `${players[4].alive ? "black" : "red"}` }}>
            &#9819;
          </span>
        </div>
      </div>
      <div className="app__controls">
        <Controls />
      </div>
      <div className="app__stats">{stats.length !== 0 && <Stats />}</div>
    </div>
  );
}

export default App;
