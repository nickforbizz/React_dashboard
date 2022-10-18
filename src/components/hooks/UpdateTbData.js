
function UpdateTbData(obj, objs, del=false) {
    if(objs && objs.length > 0){
        let my_obj =  objs.filter(item => {
            return item._id != obj._id;
        });
        
        return del ? my_obj : [...my_obj,obj];
    }
  return objs
}

export default UpdateTbData