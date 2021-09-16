import React from "react";
import { useAppSelector } from "app/hooks";

import { boardPositionsX, boardPositionsY } from "./boardPositions";
import { selectPlayers } from "./chessSlice";

export const Table = () => {
  const players = useAppSelector(selectPlayers);

  return (
    <div className="table-wrapper">
      <div className="table-x">
        {boardPositionsX.map((item) => (
          <span>{item}</span>
        ))}
      </div>
      <table className="table">
        <tbody>
          {boardPositionsX.map((x) => (
            <tr key={x}>
              {boardPositionsY.map((y) => (
                <td key={x + y} id={x + y} className="table__cell">
                  {players.find((item) => item.position === x + y) ? (
                    <span
                      style={{
                        color: `${
                          players.find((item) => item.position === x + y)?.color
                        }`,
                        display: `${
                          players.find((item) => item.position === x + y)
                            ?.alive === true
                            ? "block"
                            : "none"
                        }`,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: players.find((item) => item.position === x + y)
                          ?.code!,
                      }}
                    ></span>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-y">
        <span></span>
        {boardPositionsY.map((item) => (
          <span>{item}</span>
        ))}
      </div>
    </div>
  );
};
