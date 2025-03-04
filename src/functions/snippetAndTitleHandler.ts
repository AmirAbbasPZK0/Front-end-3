export function snippetAndTitleHandler(sources){
    let data = {}
    sources?.map(item => {
        data = {...data , [item?.[2]] : item}
    })

    return data

}