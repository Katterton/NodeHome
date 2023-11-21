class $name$ //Class Name
{
    constructor(attr, send) {
        this.send=send
        this.attr = attr
        $args$
        //Optional: Insert Code for Node Startup
    }
    start(){
        //Required: Insert start Code
            this.send({}) //required: send data to next node
    }
    stop(){
        //Required: Insert stop Code
    }
    //you can add other functions here
}
//or here
 
module.exports=$name$
