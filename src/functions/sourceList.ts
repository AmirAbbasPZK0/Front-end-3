export function sourceList(sources : any){
    let listedSources = sources.map((item : any , index : number) => {
        return `[${index + 1}] ${item[0]} : ${item[2]} \n`
    })
    return listedSources
}