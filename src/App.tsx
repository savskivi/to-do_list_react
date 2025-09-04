import "./styles/App.css";
import "./styles/null.css";
import Header from "./components/Header";
import Empty from "./components/Empty";
import Modal from "./components/Modal";
import List from "./components/List";
import Undo from "./components/Undo";
import { useAppSelector } from "./redux/store.ts";

function App() {
  const { list, undoVisible } = useAppSelector((state) => state.todo);

  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className={theme}>
      <Header />
      {list.length == 0 ? <Empty /> : <List />}
      <Modal />
      {undoVisible && <Undo />}
    </div>
  );
}

export default App;
