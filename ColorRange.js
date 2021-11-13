const chroma = require("chroma-js")
class ColorRange{
    constructor(node) {
        this.node = node;

    }
    start(){
        this.interval=setInterval(()=> {
            console.log(this.node.data)
            this.node.output[0].update( {data: chroma.scale([...JSON.parse(this.node.data),...JSON.parse(this.node.data)]).mode('lrgb').domain([0, 200]),brightness:1})},100)


    }
    stop(){
        clearInterval(this.interval)
    }



}
module.exports=ColorRange