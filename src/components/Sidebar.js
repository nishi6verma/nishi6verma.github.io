import styles from "./css/sidebar.module.css";

import closeSidebarIcon from "../assets/images/Closing Icon.svg";
import homeIcon from "../assets/images/Home.svg";
import section1Icon from "../assets/images/Section 1.svg";
import section2Icon from "../assets/images/Section 2.svg";
import section8IconInactive from "../assets/images/Section 8 Inactive.svg";
import section8Icon from "../assets/images/Section 8.svg";
import languageIcon from "../assets/images/Language.svg";
import darkIcon from "../assets/images/Night.svg";

function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.nameBar}>
          <div className={styles.nameGrp}>
            <div className={styles.dp}>N</div>
            <div className={styles.name}>Name</div>
          </div>

          <div className={styles.closeSidebar}>
            <img
              src={closeSidebarIcon}
              alt="Close Sidebar"
              className={styles.closeSidebarIcon}
            />
          </div>
        </div>

        <div className={styles.sidebarSections}>
          <div className={styles.sidebarSection}>
            <div className={styles.sectionIconDiv}>
              <img src={homeIcon} alt="Home" className={styles.sectionIcon} />
            </div>
            <div className={styles.sectionName}>Home</div>
          </div>

          <div className={styles.sidebarSection}>
            <div className={styles.sectionIconDiv}>
              <img
                src={section1Icon}
                alt="Section 1"
                className={styles.sectionIcon}
              />
            </div>
            <div className={styles.sectionName}>Section 1</div>
          </div>

          <div className={styles.sidebarSection}>
            <div className={styles.sectionIconDiv}>
              <img
                src={section2Icon}
                alt="Section 2"
                className={styles.sectionIcon}
              />
            </div>
            <div className={styles.sectionName}>Section 2</div>
          </div>

          <div className={styles.sidebarSection}>
            <div className={styles.sectionIconDiv}>
              <img
                src={section8IconInactive}
                alt="Section 8"
                className={styles.sectionIcon}
              />
            </div>
            <div className={styles.sectionName}>Section 8</div>
          </div>

          <div
            className={`${styles.sidebarSection} ${styles.sidebarSectionActive}`}
          >
            <div className={styles.sectionIconDiv}>
              <img
                src={section8Icon}
                alt="Section 8"
                className={styles.sectionIcon}
              />
            </div>
            <div className={styles.sectionName}>Section 8</div>
          </div>
        </div>
      </div>
      <div className={styles.lower}>
        <div className={styles.accInfo}>
          <div className={styles.userInfo}>
            <div className={styles.userInitial}>N</div>
            <div className={styles.accBalance}>$0.90</div>
          </div>
          <div className={styles.buy}>Buy $XYZ</div>
        </div>

        <div className={styles.lowerLast}>
          <div className={styles.languageIconDiv}>
            <img
              src={languageIcon}
              alt="Language"
              className={styles.languageIcon}
            />
          </div>
          <div className={styles.toggle}>
            <div className={styles.dark}>
              <img src={darkIcon} alt="Dark" className={styles.themeIcon} />
            </div>
            <div className={styles.light}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;