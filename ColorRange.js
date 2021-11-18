const chroma = require("chroma-js")
class ColorRange{
    constructor(node) {
        this.node = node;

    }
    start(){

        this.interval=setInterval(()=> {

            this.node.send( {data: chroma.scale([...JSON.parse(this.node.data),...JSON.parse(this.node.data)]).mode('lrgb'),brightness:1})},100)


    }
    stop(){
        clearInterval(this.interval)
    }



}
module.exports=ColorRange