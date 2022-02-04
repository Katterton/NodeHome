const chroma = require("chroma-js")
class ColorRangeRandom{
    constructor(node) {
        this.node = node;
        this.node.data=[]
        for(let i = 0; i<10; i++){
            this.node.data.push(chroma.random())
        }

    }
    start(){

        this.interval=setInterval(()=> {

            this.node.send( {data: chroma.scale(this.node.data).mode('lch'),brightness:1})},100)


    }
    stop(){
        clearInterval(this.interval)
    }



}
module.exports=ColorRangeRandom