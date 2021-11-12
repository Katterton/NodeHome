const chroma = require("chroma-js")
class StaticLedColor{
    constructor(node) {
        this.node = node
        this.interval=setInterval(()=> {
            this.node.output[0].update( {data: chroma.scale([[this.node.r, this.node.g, this.node.b]]).mode('lrgb').domain([0, 100]),brightness:1})},100)

}
}


module.exports=StaticLedColor