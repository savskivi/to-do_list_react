import "./styles/App.css";
import "./styles/null.css";
import Header from "./components/Header";
import Empty from "./components/Empty";
import Modal from "./components/Modal";
import List from "./components/List";
import { useEffect, useState } from "react";
import { getStorageList } from "./utils";
import Undo from "./components/Undo";

function App() {
  const [list, setList] = useState(getStorageList());
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");
  const [undoVisible, setUndoVisible] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  let filteredList;

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  function handleThemeChange() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  if (filter == "complete") {
    filteredList = list.filter((item) => item.complete);
  } else if (filter == "incomplete") {
    filteredList = list.filter((item) => !item.complete);
  } else {
    filteredList = list;
  }

  filteredList = filteredList.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id) {
    setDeleteItem(list.find((item) => item.id === id));
    setUndoVisible(true);
    setList((prev) => prev.filter((item) => item.id != id));
  }

  function handleComplete(id) {
    setList((prev) =>
      prev.map((item) => {
        if (item.id == id) {
          item.complete = !item.complete;
        }
        return item;
      })
    );
  }

  function handleEdit(newText) {
    setList((prev) =>
      prev.map((item) => {
        if (item.id == editId) {
          item.text = newText;
        }
        return item;
      })
    );
  }

  function handleCloseUndo() {
    setUndoVisible(false);
    setDeleteItem(null);
  }

  function undoItem() {
    setList((prev) => [...prev, deleteItem]);
    handleCloseUndo();
  }

  return (
    <div className={theme}>
      <Header
        filter={filter}
        handleFilterChange={handleFilterChange}
        search={search}
        handleSearchChange={handleSearchChange}
        theme={theme}
        handleThemeChange={handleThemeChange}
      />
      {list.length == 0 ? (
        <Empty />
      ) : (
        <List
          list={filteredList}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
          setEditId={setEditId}
        />
      )}
      <Modal
        setList={setList}
        editId={editId}
        handleEdit={handleEdit}
        setEditId={setEditId}
        list={list}
      />
      {undoVisible && (
        <Undo handleCloseUndo={handleCloseUndo} undoItem={undoItem} />
      )}
    </div>
  );
}

export default App;
