const chroma = require("chroma-js")
class StaticLedColor{
    constructor(node) {
        this.node = node

}
    start(){
        this.interval=setInterval(()=> {
            this.node.output[0].update( {data: chroma.scale([[this.node.r, this.node.g, this.node.b]]).mode('lrgb'),brightness:1})},100)


    }
stop(){
        clearInterval(this.interval)
}
}


module.exports=StaticLedColor