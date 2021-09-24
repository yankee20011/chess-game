import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChessState, Stats } from "types";

import { RootState } from "app/store";

const initialState: ChessState = {
  players: [
    {
      index: 0,
      player: "A",
      name: "knight",
      color: "white",
      code: "&#9822;",
      alive: true,
      position: "",
    },
    {
      index: 2,
      player: "A",
      name: "queen",
      color: "white",
      code: "&#9819;",
      alive: true,
      position: "",
    },
    {
      index: 1,
      player: "A",
      name: "bishop",
      color: "white",
      code: "&#9815;",
      alive: true,
      position: "",
    },
    {
      index: 3,
      player: "B",
      name: "knight",
      color: "black",
      code: "&#9822;",
      alive: true,
      position: "",
    },
    {
      index: 5,
      player: "B",
      name: "queen",
      color: "black",
      code: "&#9819;",
      alive: true,
      position: "",
    },
    {
      index: 4,
      player: "B",
      name: "bishop",
      color: "black",
      code: "&#9815;",
      alive: true,
      position: "",
    },
  ],
  stats: [],
};

export const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    setPlayersPosition: (state, action: PayloadAction<string[]>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.players[i].position = action.payload[i];
      }
    },
    setNewMove: (
      state,
      action: PayloadAction<{ index: number; position: string }>
    ) => {
      state.players[action.payload.index] = {
        ...state.players[action.payload.index],
        position: action.payload.position,
      };
    },
    setHistory: (state, action: PayloadAction<Stats>) => {
      state.stats.push({ ...action.payload });
    },
    resetHistory: (state) => {
      state.stats = initialState.stats;
    },
    changeHistory: (state, action: PayloadAction<number>) => {
      const history = state.stats.find((item) => item.id === action.payload);
      state.players = history?.oldHistory!;
      state.stats = history?.oldStats!;
    },
    optimizeStats: (state) => {
      state.stats = state.stats.slice(1, state.stats.length - 1);
    },
    kill: (state, action: PayloadAction<number>) => {
      state.players[action.payload].alive = false;
    },
    resetKills: (state) => {
      for (let i = 0; i < state.players.length; i++) {
        state.players[i].alive = true;
      }
    },
  },
});

export const {
  setPlayersPosition,
  setNewMove,
  setHistory,
  resetHistory,
  changeHistory,
  optimizeStats,
  kill,
  resetKills,
} = chessSlice.actions;

export const selectPlayers = (state: RootState) => state.chess.players;
export const selectStats = (state: RootState) => state.chess.stats;

export default chessSlice.reducer;
