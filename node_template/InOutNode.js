class InOutNode //Class Name
{
    constructor(node) {
        this.node = node
        //Optional: Insert Code for Node Startup
    }
    update(){
        //required: Gets called when new data is available
        this.node.send({}) //required: send data to next node
    }
    //you can add other functions here

}
//or here

module.exports=InOutNode