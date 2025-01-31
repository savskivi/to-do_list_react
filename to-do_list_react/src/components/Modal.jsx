import { useEffect, useState } from "react";
import Button from "./Button";

export default function Modal({
  setList,
  editId,
  handleEdit,
  setEditId,
  list,
}) {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    if (editId) {
      handleOpen();
      const editItem = list.find((item) => item.id == editId);
      setInputText(editItem.text);
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
