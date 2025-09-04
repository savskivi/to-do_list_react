import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types";

interface InitialState {
  list: Todo[];
  undoVisible: boolean;
  deleteItem: Todo | null;
  editId: number | null;
}

const initialState: InitialState = {
  list: [],
  undoVisible: false,
  deleteItem: null,
  editId: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    handleDelete: (state, action: PayloadAction<number>) => {
      const item = state.list.find((item) => item.id === action.payload);
      if (item) {
        state.deleteItem = item;
        state.undoVisible = true;
        state.list = state.list.filter((item) => item.id != action.payload);
      }
    },
    handleComplete: (state, action: PayloadAction<number>) => {
      state.list = state.list.map((item) => {
        if (item.id === action.payload) {
          item.complete = !item.complete;
        }
        return item;
      });
    },
    handleEdit: (state, action: PayloadAction<string>) => {
      state.list = state.list.map((item) => {
        if (item.id === state.editId) {
          item.text = action.payload;
        }
        return item;
      });
    },
    handleCloseUndo: (state) => {
      state.undoVisible = false;
      state.deleteItem = null;
    },
    undoItem: (state) => {
      if (state.deleteItem) {
        state.list.push(state.deleteItem);
        state.undoVisible = false;
        state.deleteItem = null;
      }
    },
    setEditId: (state, action: PayloadAction<number | null>) => {
        state.editId = action.payload
    },
    addTodo: (state, action: PayloadAction<string>) => {
        state.list.push({ id: Date.now(), text: action.payload, complete: false })
    }
  },
});

export const {handleDelete,handleComplete,handleEdit,handleCloseUndo,undoItem,setEditId,addTodo} = todoSlice.actions;

export default todoSlice.reducer;
