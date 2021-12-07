const SerialPort = require('serialport')
const chroma = require("chroma-js")
class SerialLed //Class Name
{

    constructor(node) {
        this.node = node
        this.sending = false;



this.serial=undefined
     //   this.serial = new SerialPort(this.node.port, {baudRate: this.node.baudRate, autoOpen: false})

        setTimeout(()=>(this.serial = new SerialPort(this.node.port, {baudRate: this.node.baudRate, autoOpen: true})),1000)

    }
    update() {
        this.msg_parse(this.node.data.data.domain([0, this.node.num_leds]), this.node.data.brightness).then(async (msg) => {


if(!this.sending && this.serial!==undefined) {
this.sending=true

    for (let j = -8; j < this.node.num_leds; j++) {

        let tmp = ""
        if(j>0) {
            tmp += "/" + j
            for (let k = 0; k < 3; k++) {
                tmp += ("," + msg[3 * j + k])
            }
        }
        else{
            tmp += "/" + j+",0,0,0"
        }

            this.serial.write(tmp, function (err) {

                if (err) {
                    return console.log('Error on write: ', err.message)
                }

            })


    }
    this.serial.drain(()=>this.sending=false)
}










    })
}
    updateArgs() {
        if (this.serial !== undefined) {
            this.serial.close(function (err) {
                if (err) {
                    return console.log('Error on write: ', err.message)
                }
            })
            this.serial = new SerialPort(this.node.port, {baudRate: parseInt(this.node.baudRate)})
        }
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