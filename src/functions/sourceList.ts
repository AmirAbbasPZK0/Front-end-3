export function sourceList(sources){
    let listedSources = sources.map((item , index) => {
        return `[${index + 1}] ${item[0]} : ${item[2]} \n`
    })
    return listedSources
}