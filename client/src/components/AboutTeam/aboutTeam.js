import { useState } from "react";

import s from "./style.module.css";

const AboutTeam = () => {
    const [authors, setAuthors] = useState([
        {
            id: 1,
            imgStyle: 'alk',
            name: 'Олег Кольцов',
            git: '@AlekRing',
            gitLink: 'https://github.com/AlekRing',
            role: 'Занимался вёрсткой, коммуникацией с дизайнером, и написал 2 игры.',
            activated: false,
        },
        {
            id: 2,
            imgStyle: 'dmitry',
            name: 'Дмитрий',
            git: '@git..',
            gitLink: 'https://github.com/leeshko',
            role: 'done something',
            activated: false,
        },
        {
            id: 3,
            imgStyle: 'oybek',
            name: 'Ойбек',
            git: '@git..',
            gitLink: 'https://github.com/moonbek007',
            role: 'done something',
            activated: false,
        },
        {
            id: 4,
            imgStyle: 'ruslan',
            name: 'Руслан',
            git: '@NagievR',
            gitLink: 'https://github.com/NagievR',
            role: 'Бравый тимлид.',
            activated: false,

  const activateRole = (id) => {
    setAuthors((prevState) => {
      return prevState.map((auth) => {
        if (auth.id === id) {
          auth.activated = !auth.activated;

        }
        return auth;
      });
    });
  };

  return (
    <>
      <div className={s.about}>
        <div className={s.bg_blur}>
          <div className={s.about_logoblock}>
            <div className={s.eclips}></div>
            <div className={s.about_title}>О команде</div>
          </div>
          <div className={s.cards_block}>
            {authors.map((auth) => {
              return (
                <div key={auth.id} className={s.card}>
                  <div className={s.img_wrapper}>
                    <div className={`${s.img} ${s[auth.imgStyle]}`} />
                  </div>
                  <div className={s.name}>{auth.name}</div>
                  <div className={s.git}>
                    <a href={auth.gitLink} target={"_blank"} rel="noreferrer">
                      {auth.git}
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      activateRole(auth.id);
                    }}
                    className={s.donat_btn}
                  >
                    Вклад в проект
                  </button>
                  <div
                    className={`${s.role} ${
                      auth.activated ? s.active : s.nope
                    }`}
                  >
                    {auth.role}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutTeam;
