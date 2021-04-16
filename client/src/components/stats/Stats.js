import React from "react";
import styles from "./stats.module.css";
import RSLangContext from "../context/context";
function Stats() {
  const { statistics } = React.useContext(RSLangContext);
  return (
    <div className={styles.stats_wrapper}>
      <div className={styles.stats}>
        <h1>Статистика</h1>
        <table style={{ width: "100%" }}>
          <tr>
            <th>Количество изученных слов</th>
            <th>Процент правильно найденных слов</th>
            <th>Абсолютный результат во всех играх</th>
          </tr>
          <tr>
            <td>{statistics.wordsLearnt}</td>
            <td>
              {statistics.correctFound === 0 && statistics.wrongFound === 0
                ? statistics.correctFound
                : (
                    (statistics.correctFound * 100) /
                    (statistics.correctFound + statistics.wrongFound)
                  ).toFixed(2)}
              %{" "}
            </td>
            <td>
              {Math.max(
                statistics.savanna.record,
                statistics.sprint.record,
                statistics.audioCall.record,
                statistics.customGame.record
              )}
            </td>
          </tr>
        </table>
        <h2>Рекорды в Играх</h2>
        <table style={{ width: "100%" }}>
          <tr>
            <td>Саванна</td>
            <td>Спринт</td>
            <td>Аудио Вызов</td>
            <td>Мэтч</td>
          </tr>
          <tr>
            <td>{statistics.savanna.record}</td>
            <td>{statistics.sprint.record}</td>
            <td>{statistics.audioCall.record}</td>
            <td>{statistics.customGame.record}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Stats;
