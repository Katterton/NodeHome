class OutputNode //Class Name
{
    constructor(node) {
        this.node = node
        //Optional: Insert Code for Node Startup
    }
    start(){
        //Required: Insert start Code
            this.node.send({}) //required: send data to next node
    }
    stop(){
        //Required: Insert stop Code
    }
    //you can add other functions here
}
//or here

module.exports=OutputNode