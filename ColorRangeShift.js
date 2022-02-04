const chroma = require("chroma-js")
class InOutNode //Class Name
{
    constructor(node) {
        this.node = node
        //Optional: Insert Code for Node Startup
        this.color= 0
        this.counter=0
        this.colorout=new Array(50).fill([0,0,0])
    }
    update(){
        //required: Gets called when new data is available
  
        let data =this.node.data.data.colors()
        this.node.send({data: chroma.scale(this.colorout).mode('lch'),brightness:1})  
        if(this.interval===undefined){
            this.interval=setInterval(()=> {
               
        for(let i =0; i<50;i++){
            if(i<this.counter){
                this.colorout[i]=(data[ this.color])
        }
   
        }
        this.counter++
        if(this.counter>50){
            this.counter=0
            this.color=(this.color+1)%data.length
        }
     
   //required: send data to next node
    
    //you can add other functions here
    },50)}
  
}
}
//or here

module.exports=InOutNode