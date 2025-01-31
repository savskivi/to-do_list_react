export function getStorageList(){
    let savedList = localStorage.getItem('list');
    if(savedList){
        return JSON.parse(savedList)
    } else {
        return []
    }
}