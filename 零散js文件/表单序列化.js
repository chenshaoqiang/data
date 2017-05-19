
function serialize(){
    var eles=form.element;
    var a=[];
    var str="";
    for(var i=0;i<eles.length;i++){
        var ele=eles[i];
        if(ele.name){
            switch (ele.type){
                case "select-one":
                case "select-multiple":

                case "radio":
                case "checkbox":
                //处理单选按钮和多选按钮
                    if(!ele.checked){break;}
                    break;
                default :
                   str=encodeURIComponent(ele.name)+"="
                       +encodeURIComponent(ele.value);
                    a.push(str);
            }
        }
    }


}