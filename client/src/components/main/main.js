import { useHistory } from "react-router-dom";
import RSLangContext from "../context/context";
import s from "./style.module.css";
import React from "react";

const Main = () => {
  const history = useHistory();
  const handleStartGame = () => {
    history.push("/games");
  };
  const { statistics } = React.useContext(RSLangContext);
  return (
    <>
      <div className={s.main}>
        <div className={s.main_footer_block}>
          <button
            onClick={() => {
              handleStartGame();
            }}
            className={`blue_button`}
          >
            Начать игру
          </button>
          <div className={s.stats_block}>
            <div className={s.stats_daily}>
              Изучено слов сегодня: <span>{statistics.wordsLearnt}</span>
            </div>
            <div className={s.stats_general}>
              Изучено слов за всё время: <span>{statistics.wordsLearnt}</span>
            </div>
          </div>
          <div className={s.progress_block}>
            <div className={s.progress_general}>
              Прогресс:{" "}
              <span>
                {statistics.wordsLearnt === 0
                  ? statistics.wordsLearnt
                  : ((statistics.wordsLearnt * 100) / 3600).toFixed(2)}{" "}
                %
              </span>
            </div>
            <div className={s.progressbar}>
              <div className={s.progress_zero}>{statistics.wordsLearnt}</div>
              <div className={s.progress_full}>3600</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
