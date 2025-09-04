import { createSlice } from "@reduxjs/toolkit"
import { Theme } from "../../types"

interface InitialState{
    theme: Theme,
}

const initialState: InitialState = {
    theme: Theme.LIGHT,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        handleThemeChange: (state) => {
            state.theme = state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        }
    }
})

export const { handleThemeChange} = themeSlice.actions;

export default themeSlice.reducer