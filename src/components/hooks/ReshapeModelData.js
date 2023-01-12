
function ReshapeModelData(data, extractiondata) {
    
    if(data && data.length > 0){
        let new_data = data.map((item,i) => {
            // console.log(item)
            if(extractiondata.length>0){
                let inner_obj = extractiondata.map((inner_item, j) => {
                    let obj = item[extractiondata[j]];
                    for (let key in obj) {
                        let newKey = inner_item+'_'+key
                        Object.defineProperty(obj, newKey,
                            Object.getOwnPropertyDescriptor(obj, key));
                        delete obj[key];
                    }
                    // console.log(obj)
                    return obj
                });

                item = Object.assign({}, item, ...inner_obj);
            }
                return item;
        })
        
        return new_data;
    }
  return data
}

export default ReshapeModelData