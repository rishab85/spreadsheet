export function modifiedData(data){
  return{
    type : "MODIFIED_DATA",
    data
  }
}

export function modifiedStyle(data){
  return{
    type:"MODIFIED_STYLE",
    data
  }
}

export function buttonClicked(bool){
  return{
    type: "BUTTON_CLICKED",
    buttonClicked : bool
  }
}

export function buttonName(value){
  return{
    type:"BUTTON_NAME",
    buttonName: value
  }
}

export function currentSelection(value){
  return{
    type : "CURRENT_SELECTION",
    value
  }
}
