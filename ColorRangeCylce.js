const chroma = require("chroma-js")
class ColorRangeCycle{
    constructor(node) {
        this.node = node;
        this.offset = 0
    }
    update(){

         this.node.send( {data: this.node.data.data.padding([this.offset, 0.5-this.offset]),brightness:1})
if(this.interval===undefined){
    this.interval=setInterval(()=> {
        console.log(this.node.data)
        if (this.offset < 0.5) {
            this.offset += 0.0001
        } else {
            this.offset = 0;
        }

    },this.node.Updates)}
}






}
module.exports=ColorRangeCycle