class Timer //Class Name
{
    constructor(node) {
        this.node = node
        //Optional: Insert Code for Node Startup
    this.timeout
    }
    start(){
        let now = new Date()
        let t=this.node.time.split(":")

let dif =parseInt(t[0])- now.getHours()

        if(dif<0){
            dif+=24
        }
        dif*=60
        dif+=parseInt(t[1])- now.getMinutes()
        dif*=60000

        const d = new Date();
        d.setMilliseconds(dif);
        console.log(d,t)
        //Required: Insert start Code
        this.timeout=setTimeout(()=>{
            this.node.send(true)
this.stop()
                this.node.stop()
        },
            dif)

            //required: send data to next node
    }
    stop(){
        if(this.timeout) {
            clearInterval(this.timeout)
            //Required: Insert stop Code
        this.timeout=undefined
        }

        }
    //you can add other functions here
}
//or here

module.exports=Timer