import { useEffect, useState } from "react";
import Button from "./Button";
import { Todo } from "../types";

type Props = {
  setList: React.Dispatch<React.SetStateAction<Todo[]>>,
  editId: number | null,
  handleEdit: (newText: string) => void,
  setEditId: React.Dispatch<React.SetStateAction<number | null>>,
  list: Todo[]
}

export default function Modal({
  setList,
  editId,
  handleEdit,
  setEditId,
  list,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  useEffect(() => {
    if (editId) {
      handleOpen();
      const editItem = list.find((item) => item.id == editId);
      if (editItem) {
        setInputText(editItem.text);
      }
    }
  }, [editId]);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setEditId(null);
    setInputText("");
  }

  function handleSubmit() {
    if (editId) {
      handleEdit(inputText);
    } else {
      setList((prev) => [
        ...prev,
        { id: Date.now(), text: inputText, complete: false },
      ]);
    }
    handleClose();
  }

  return (
    <div>
      <Button className="btn__add-task" onClick={handleOpen} text={"+"} />
      <div className={open ? "modal modal__active" : "modal"}>
        <div className="modal__container">
          <p className="modal__heading">{editId ? "EDIT NOTE" : "NEW NOTE"}</p>

          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="modal__input"
            type="text"
            placeholder="Input your note..."
          />

          <div className="modal__btn-container">
            <Button
              className="btn__cancel"
              onClick={handleClose}
              text={"CANCEL"}
            />
            <Button
              className="btn__apply"
              onClick={handleSubmit}
              text={"APPLY"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
