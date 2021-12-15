const chroma = require("chroma-js")
class ColorRangeCycle{
    constructor(node) {
        this.node = node;
        this.offset = 0
    }
    update(){
        let data =this.node.data.data.colors(50)

         this.node.send( {data:chroma.scale(data).mode('lch').padding([0.1+this.offset, 0.6-this.offset]),brightness:1})
if(this.interval===undefined){
    this.interval=setInterval(()=> {

        if(this.node.invert){
            if (this.offset > 0) {

                this.offset -= 0.0001
            } else {
                this.offset = 0.6;
            }
        }
        else {
            if (this.offset < 0.6) {

                this.offset += 0.0001
            } else {
                this.offset = 0;
            }
        }
    },this.node.Updates)}
}






}
module.exports=ColorRangeCycle