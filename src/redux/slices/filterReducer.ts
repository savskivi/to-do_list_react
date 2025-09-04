import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "../../types";

interface InitialState {
    filter: Filter;
    search: string;
}

const initialState: InitialState = {
    filter: Filter.ALL,
    search: '',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },

        setFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload
        }
    }
})

export const {setSearch, setFilter} = filterSlice.actions

export default filterSlice.reducer