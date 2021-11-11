function parseHTML(node){
    let out = '<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">'+node.name+'</h5>'
    for(let arg of node.args){


                out+='<span class="input-group-text" id="'+node.id+arg.name+'">'+arg.name+'</span> <input type="'+arg.type+'" class="form-control" placeholder="'+arg.value+'" aria-label="'+arg.name+'" aria-describedby="'+node.id+arg.name+'">'


    }
    out+='<div class="container"><div class="row"><div class="col-sm">'
    for(let input of node.input){

        out+='  <p class="inText">'+input.name+'</p><svg class="insvg" id="svg'+node.id+input.name+'" width="22" height="22">'
        out+="<circle class='input' id='"+node.id+input.name+"' 'cx='6' cy='6' r='5' stroke='black', fill='white></svg>"
    }

    out+=' </div><div class="col-sm">'
    for(let output of node.output){

        out+='  <p class="outText">'+output.name+'</p><svg class="outsvg" id="svg'+node.id+output.name+'" width="22" height="22">'
        out+="<circle class='output' id='"+node.id+output.name+"' 'cx='6' cy='6' r='5' stroke='black', fill='white></svg>"
    }

    out +='</div></div></div></div>'
    return out
}
module.exports=parseHTML