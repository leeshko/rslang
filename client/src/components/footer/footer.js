import s from "./style.module.css";

const Footer = () => {
  return (
    <>
      <footer className={s.root}>
        <div className={s.container}>
          <div className={s.logo_block}>
            <a
              href="https://rs.school/"
              className={s.logo_link}
              target="_blank"
              rel="noreferrer"
            </a>
             <div className={s.RS_link_block}>
                   <div className={s.line} />
                   <div className={s.cursor} />
                   <a href='https://rs.school/' target="_blank" rel='noreferrer'
                       className={s.RS_link}>
                  rs.school
                   </a>
             </div>
                    </div>
                    <div className={s.git_links_copyright}>
                        <div className={s.git_link}>
                            <a  href='https://github.com/AlekRing' target='_blank' rel='noreferrer'>
                                @AlekRing  
                            </a>
                            <a href='https://github.com/leeshko' target='_blank' rel='noreferrer'>  
                                @leeshko  
                            </a>
                            <a href='https://github.com/moonbek007' target='_blank' rel='noreferrer'>
                                @moonbek007  
                            </a>
                            <a href='https://github.com/NagievR' target='_blank' rel='noreferrer'>
                                @NagievR  
                            </a>
                            <a  href='https://www.behance.net/svetatomchenko' target='_blank' rel='noreferrer'>
                                @design
                            </a>
                        </div>
                        <div className={s.line} />
                        <div className={s.year} >
                            2021
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;


