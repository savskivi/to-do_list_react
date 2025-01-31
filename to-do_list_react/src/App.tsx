import "./styles/App.css";
import "./styles/null.css";
import Header from "./components/Header";
import Empty from "./components/Empty";
import Modal from "./components/Modal";
import List from "./components/List";
import { useEffect, useState } from "react";
import { getStorageList } from "./utils.ts";
import Undo from "./components/Undo";
import { Filter, Theme, Todo } from "./types.ts";

function App() {
  const [list, setList] = useState<Todo[]>(getStorageList());
  const [editId, setEditId] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [search, setSearch] = useState<string>("");
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [undoVisible, setUndoVisible] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<Todo | null>(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  let filteredList;

  function handleSearchChange(e: React.SyntheticEvent) {
    const input = e.target as HTMLInputElement;
    setSearch(input.value);
  }

  function handleFilterChange(e: React.SyntheticEvent) {
    const select = e.target as HTMLSelectElement;
    setFilter(select.value as Filter);
  }

  function handleThemeChange() {
    setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  }

  if (filter === Filter.COMPLETE) {
    filteredList = list.filter((item) => item.complete);
  } else if (filter === Filter.INCOMPLETE) {
    filteredList = list.filter((item) => !item.complete);
  } else {
    filteredList = list;
  }

  filteredList = filteredList.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id: number) {
    const item = list.find((item) => item.id === id)
    if (item) {
    setDeleteItem(item);
    setUndoVisible(true);
    setList((prev) => prev.filter((item) => item.id != id));
    }
  }

  function handleComplete(id: number) {
    setList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item.complete = !item.complete;
        }
        return item;
      })
    );
  }

  function handleEdit(newText: string) {
    setList((prev) =>
      prev.map((item) => {
        if (item.id === editId) {
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
    if (deleteItem) {
      setList((prev) => [...prev, deleteItem]);
      handleCloseUndo();
    }
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
