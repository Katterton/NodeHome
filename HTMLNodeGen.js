function parseHTML(node){
    let out = '<div class="card node" id="'+node.id+node.name+'"  style="width: 18rem;left: '+node.x+'px;top: '+node.y+'px"><div class="card-body"><h5 class="card-title">'+node.name+'</h5>'
    for(let arg of node.args){


                out+='<span class="input-group-text" id="'+node.id+arg.var+'a">'+arg.name+'</span> <input  type="'+arg.type+'" class="form-control '+arg.var+'" placeholder="'+arg.value+'" aria-label="'+arg.name+'" aria-describedby="'+node.id+arg.name+'a">'


    }
    out+='<div class="container"><div class="row"><div class="col-sm">'
    for(let input of node.input){

        out+=' <div class="input">  <svg class="insvg" id="svg'+node.id+input.name+'" width="22" height="22">'
        out+="<circle class='in' id='"+node.id+input.name+"'  cx='10'  cy='10' r='6' stroke='black'  fill='white'></svg><p class='intext'>"+input.name+"</p></div>"
    }

    out+=' </div><div class="col-sm">'
    for(let output of node.output){

        out+='  <p class="outText">'+output.name+'</p><svg class="outsvg" id="svg'+node.id+output.name+'" width="22" height="22">'
        out+="<circle class='output' id='"+node.id+output.name+"' 'cx='6' cy='6' r='5' stroke='black', fill='white></svg>"
    }

    out +='</div></div></div></div></div>'
    return out
}
module.exports=parseHTML