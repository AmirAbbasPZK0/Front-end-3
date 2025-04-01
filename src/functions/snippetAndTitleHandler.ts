export function snippetAndTitleHandler(sources : Array<Array<String>>){
    let data = {}
    sources?.map((item) => {
        data = {...data , [item?.[2] as string] : item}
    })

    return data

}