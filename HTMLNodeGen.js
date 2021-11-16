function parseHTML(node){
    let out = '<div class="card node" id="'+node.id+node.name+'"  style="width: 18rem;left: '+node.x+'px;top: '+node.y+'px"><div class="card-body"><h5 class="card-title">'+node.name+'</h5><div class="delete"  id="'+node.id+node.name+'del" >X</div>'
    for(let arg of node.args){


                out+='<span class="input-group-text" id="'+node.id+arg.var+'a">'+arg.name+'</span> <input  type="'+arg.type+'" class="form-control '+arg.var+'" value="'+arg.value+'" aria-label="'+arg.name+'" aria-describedby="'+node.id+arg.name+'a">'


    }

    out+='<div class="container">'
    let offset = 30
    for(let i = 0; i < Math.max(node.input.length, node.output.length);i++){
        let input= node.input[i];
        let output= node.output[i];
      out+='<div class="row"><div class="col-sm">'
        if(input!==undefined) {
            if (input.name !== "Start") {


                out += ' <div class="input" style="margin-top: '+(i*offset)+'px">  <svg class="insvg" id="svg' + node.id + input.name + '" width="22" height="22">'
                out += "<circle class='in' id='" + node.id + input.name + "'  cx='10'  cy='10' r='6' stroke='black'  fill='white'></svg><p class='intext'>" + input.name + "</p></div>"
            } else {
                out += ' <div class="input" style="margin-top: '+(i*offset)+'px">  <svg class="insvg" id="svg' + node.id + input.name + '" width="22" height="22">'
                out += "<circle class='in' id='" + node.id + input.name + "'  cx='10'  cy='10' r='6' stroke='black'  fill='white'></svg><button type='button' id='" + node.id + node.name + "start' class='btn btn-outline-success st " + (node.started ? "btn-outline-success" : "btn-outline-danger") + "'>" + input.name + "</button></div>"
            }
        }
        out+=' </div><div class="col-sm">'
        if(output!==undefined) {
            out += '  <div class="output" style="margin-top: '+(i*offset)+'px"><p class="outText">' + output.name + '</p><svg class="outsvg" id="svg' + node.id + output.name + '" width="22" height="22">'
            out += "<circle class='out' id='" + node.id + output.name + "'  cx='10'  cy='10' r='6' stroke='black'  fill='white'></svg></div>"
        }
        out+=' </div></div>';
    }




    out +='</div></div></div></div>'
    return out
}
module.exports=parseHTML