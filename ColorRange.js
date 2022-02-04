const chroma = require("chroma-js")
class ColorRange{
    constructor(node) {
        this.node = node;

    }
    start(){

        this.interval=setInterval(()=> {

            this.node.send( {data: chroma.scale([...JSON.parse(this.node.data)]).mode('lch'),brightness:1})},10)


    }
    stop(){
        clearInterval(this.interval)
        this.node.send( {data: chroma.scale([[0,0,0]]).mode('lch'),brightness:1})
    }



}
module.exports=ColorRange