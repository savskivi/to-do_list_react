import { useEffect, useState } from "react";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addTodo, handleEdit, setEditId } from "../redux/slices/todoReducer";

export default function Modal() {
  const [open, setOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const { list, editId } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

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
    dispatch(setEditId(null));
    setInputText("");
  }

  function handleSubmit() {
    if (editId) {
      dispatch(handleEdit(inputText));
    } else {
      dispatch(addTodo(inputText));
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
