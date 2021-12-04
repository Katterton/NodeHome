const SerialPort = require('serialport')
const chroma = require("chroma-js")
class SerialLed //Class Name
{

    constructor(node){
        this.node=node
this.sending=false;

        this.serial = new SerialPort(this.node.port,{baudRate:this.node.baudRate})
    }
    update() {
        this.msg_parse(this.node.data.data.domain([0, this.node.num_leds]), this.node.data.brightness).then(async (msg) => {

if(!this.sending){

this.sending=true
for(let i = 0; i<Math.ceil(msg.length/20);i++){

    let tmp = '<'+i*20+","+ msg.slice(i*60,i*60+60).toString()+'>'
    console.log(tmp)
    setTimeout(
        ()=>{this.serial.write(tmp, function (err) {

        if (err) {
            return console.log('Error on write: ', err.message)
        }

    })
            if(i+1===Math.ceil(msg.length/20)){
                this.sending=false
            }
        },i*50)
}



        }
    })
}
    updateArgs(){
        this.serial.close(function (err) {
            if (err) {
                return console.log('Error on write: ', err.message)
            }
    })
        this.serial=new SerialPort(this.node.port,{baudRate:parseInt(this.node.baudRate)})
}

    msg_parse (scale, brightness=1) {
        let out = []
        return new Promise((resolve) => {


            for (let i = 0; i < this.node.num_leds; i++) {
                let c = scale(this.node.num_leds - i)
                for (let j = 0; j < 3; j++) {
                    out.push(Math.floor(chroma(c)._rgb[j]*brightness))

                }
                if (i + 1 === this.node.num_leds) {

                    resolve(out)
                }
            }
        })

    }



    //you can add other functions here
}
//or here

module.exports=SerialLed