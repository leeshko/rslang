// import { useState } from 'react';
// import { useHistory } from 'react-router-dom';

import s from "./style.module.css";

const AboutApp = () => {
  return (
    <>
      <div className={s.about}>
        <div className={s.bg_blur}>
          <div className={s.content_block}>
            <div className={s.about_title}>
              <div className={s.about_title}>
                Преимущества и возможности приложения
              </div>
            </div>
            <div className={s.pros_block}>
              <div className={s.pros}>
                <div className={`${s.icon} ${s.icon_1}`}></div>
                <p className={s.breakBar}>---</p>
                <p className={s.descr}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus
                  eget velit quisque accumsan amet tortor. Velit, volutpat
                  egestas fringilla mi porttitor tempus. Placerat dui .
                </p>
              </div>
              <div className={s.pros}>
                <div className={`${s.icon} ${s.icon_2}`}></div>
                <p className={s.breakBar}>---</p>
                <p className={s.descr}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus
                  eget velit quisque accumsan amet tortor. Velit, volutpat
                  egestas fringilla mi porttitor tempus. Placerat dui.
                </p>
              </div>
              <div className={`${s.pros} ${s.prosLast}`}>
                <div className={`${s.icon} ${s.icon_3}`}></div>
                <p className={s.breakBar}>---</p>
                <p className={s.descr}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus
                  eget velit quisque accumsan amet tortor. Velit, volutpat
                  egestas fringilla mi porttitor tempus. Placerat dui.
                </p>
              </div>
            </div>
            <div className={s.video_block}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutApp;
