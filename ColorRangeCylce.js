const chroma = require("chroma-js")
class ColorRangeCycle{
    constructor(node) {
        this.node = node;
        this.offset=0
    }
    start(){
        this.interval=setInterval(()=> {
            console.log(this.node.data)
            if(this.offset<0.5){
                this.offset+=0.01
            }
            else{
                this.offset=0;
            }
            this.node.output[0].update( {data: this.node.data.data.padding([this.offset, 0.5-this.offset]),brightness:1})},this.node.Updates)


    }
    stop(){
        clearInterval(this.interval)
    }



}
module.exports=ColorRangeCycle