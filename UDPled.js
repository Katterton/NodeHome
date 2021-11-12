const dgram = require('dgram');
const chroma = require("chroma-js")




class Udp  {

    constructor(node){
this.node=node

        this.client = dgram.createSocket('udp4');

    }
    update() {
        this.msg_parse(this.node.data.data, this.node.data.brightness).then(async (msg) => {

         //   console.log(Buffer.from(msg), this.node.data.brightness)
        this.client.send(Buffer.from(msg), this.node.port, this.node.ip)
    })
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

}

module.exports=Udp