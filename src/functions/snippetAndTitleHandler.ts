export function snippetAndTitleHandler(sources : any){
    let data = {}
    sources?.map((item : any) => {
        data = {...data , [item?.[2]] : item}
    })

    return data

}