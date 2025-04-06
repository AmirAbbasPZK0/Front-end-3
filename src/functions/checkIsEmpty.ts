export function checkIsEmpty(text : string){

    let newText = text.split("").filter(item => {
        if(item !== " "){
            return item
        }
    })

    let textArray = newText.filter(item => {
        if(item !== "\n"){
            return item
        }
    })

    if(textArray.length > 0){
        return true
    }else{
        return false
    }
}