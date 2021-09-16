import React from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";

import { selectStats, changeHistory } from "./chessSlice";

export const Stats = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectStats);

  return (
    <table className="stats">
      <thead>
        <tr>
          <th>Piece</th>
          <th>from</th>
          <th>to</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((item) => (
          <tr
            className="stats__line"
            key={item.id}
            onClick={() => dispatch(changeHistory(item.id))}
          >
            <td>{item.name}</td>
            <td>{item.lastPosition}</td>
            <td>{item.nextPosition}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
