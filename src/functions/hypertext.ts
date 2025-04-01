export const hyperTextForMarkDown = (markdown : string , sources : any) => {

    const main_reg = /\[(\d+)\]/g
        
        let number_of_array : (number)[] = []

        let newMarkDown: string
    
        function removeDuplicates(arr: number[]) : number[] {

            let newArr = arr.filter((item, pos) => {
                return arr.indexOf(item) == pos;
            })
            
            return newArr
        }
    
        markdown.split(main_reg).map(item => {
            
            let newItem = Number(item)
    
            if(!Number.isNaN(newItem)){
                number_of_array = [...number_of_array , newItem]
            }
    
        })
    
        function cd(){
            
            removeDuplicates(number_of_array).map((item : number , index : number) => {
    
                let newRegex = new RegExp(`\\[(${item})\\]` , "g")
    
                if(index === 0){
                    if(item){
                        newMarkDown = markdown?.replace(newRegex , `[${sources[item - 1]?.[0]}](${sources[item - 1]?.[2]})`)
                    }
                }else{
                    if(item){
                        newMarkDown = newMarkDown?.replace(newRegex , `[${sources[item - 1]?.[0]}](${sources[item - 1]?.[2]})`)
                    }
                }
    
            })
    
            return newMarkDown
    
        }

    return cd()
}