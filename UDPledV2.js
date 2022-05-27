const dgram = require('dgram');
const chroma = require("chroma-js")




class Udp  {


    constructor(node){
this.node=node

        this.client = dgram.createSocket('udp4');
        this.frames = Math.ceil(this.node.num_leds*3/128)


    }
    update() {
        this.frames = Math.ceil(this.node.num_leds*3/128)
        this.node.num_leds=parseInt(this.node.num_leds)
        this.msg_parse(this.node.data.data.domain([0, this.node.num_leds]), this.node.data.brightness).then(async (msg) => {

         for(let i = 0; i < this.frames; i++) {
            msg[i].unshift(i)
            msg[i].unshift(this.frames)
            setTimeout(()=>{
                this.client.send(Buffer.from(msg[i]), this.node.port, this.node.ip)
      
                console.log(msg[i])
      
            },i*2)
        }    
    }
    )
    }
    msg_parse (scale, brightness=1) {
        let out = []
        return new Promise((resolve) => {

            for(let k = 0; k < this.frames; k++) {
            out[k]=[]
                for (let i = k; i < this.node.num_leds; i+=this.frames) {
                let c = scale(this.node.num_leds - i)
                for (let j = 0; j < 3; j++) {
                    out[k].push(Math.floor(chroma(c)._rgb[j]*brightness))

                }
                
             
                    } 
                    if ( k + 1 === this.frames) {

                        resolve(out)
                    }
                }
        })
    

    }

}

module.exports=Udp