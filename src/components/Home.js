import { useDispatch } from "react-redux";

import { getTodoLists } from "./redux/reducers/getTodoListsPage";

import styles from "./css/home.module.css";
import Sidebar from "./Sidebar";
import Section from "./Section";

function Home() {
  const dispatch = useDispatch();

  dispatch(getTodoLists());

  return (
    <div className={styles.container}>
      <Sidebar />
      <Section />
    </div>
  );
}

export default Home;