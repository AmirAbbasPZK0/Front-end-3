type Source = Array<Array<string>>


export function snippetAndTitleHandler(sources : Source){
    let data = {}
    sources?.map((item) => {
        data = {...data , [item?.[2] as string] : item}
    })
    return data
}