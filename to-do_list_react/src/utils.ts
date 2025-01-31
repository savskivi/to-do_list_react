import { Todo } from "./types";

export function getStorageList(): Todo[]{
    const savedList = localStorage.getItem('list');
    if(savedList){
        return JSON.parse(savedList)
    } else {
        return []
    }
}