class InOutNode //Class Name
{
    constructor(attr) {
        this.attr = attr
        $args$
        //Optional: Insert Code for Node Startup
    }
    update(){
        //required: Gets called when new data is available
        this.node.send({}) //optional: send data to next node
    }
    //you can add other functions here

}
//or here

module.exports=InOutNode