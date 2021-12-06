const chroma = require("chroma-js")
class ColorRangeCrop //Class Name
{
    constructor(node) {
        this.node = node
        //Optional: Insert Code for Node Startup
    }
    update(){

let data =this.node.data.data.colors(10)
        if(this.node.invert){
            data.reverse();
        }
        this.node.send( {data: chroma.scale(data).mode('lch').padding([this.node.offset/100, (this.node.width/100)+(this.node.offset/100)]),brightness:1})
    }
    //you can add other functions here

}
//or here

module.exports=ColorRangeCrop