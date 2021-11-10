const dgram = require('dgram');





class Udp  {

    constructor(){


        this.client = dgram.createSocket('udp4');

    }
    update() {

        this.client.send(Buffer.from(this.node.data), this.node.port, this.node.ip)
    }


}

module.exports=Udp