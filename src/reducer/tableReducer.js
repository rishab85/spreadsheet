export function modifiedData(state=[],action){
  switch (action.type) {
    case "MODIFIED_DATA":
      return action.data

    default:
      return state;
  }
}

export function modifiedStyle(state=[], action){
  switch (action.type) {
    case "MODIFIED_STYLE":
      return action.data

    default:
        return state;
  }
}

export function buttonClicked(state=false, action){
  switch (action.type) {
    case "BUTTON_CLICKED":
      return action.buttonClicked

    default:
      return state;
  }
}

export function buttonName(state="", action){
  switch (action.type) {
    case "BUTTON_NAME":
        return action.buttonName

    default:
      return state;
  }
}

export function currentSelection(state={}, action){
  switch (action.type) {
    case "CURRENT_SELECTION":
      return action.value

    default:
      return state;
  }
}

export function tableStructure(state={x:4,y:4}, action){
  switch (action.type) {
    case "TABLE_STRUCTURE":
      return action.value

    default:
        return state;
  }
}
