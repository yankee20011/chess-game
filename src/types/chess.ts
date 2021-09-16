export interface ChessState {
  players: Player[];
  stats: Stats[];
}

export interface Player {
  index: number;
  player: string;
  name: string;
  color: string;
  code: string;
  alive: boolean;
  position: string;
}

export interface Stats {
  id: number;
  player: string;
  name: string;
  lastPosition: string;
  nextPosition: string;
  oldHistory: Player[];
  oldStats: Stats[];
}
