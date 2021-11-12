const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");








function SocketApi(HTMLNodeGen) {
    this.nodeManager={}

    const io = new Server(server);
    app.use(express.static('public'));
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });
    io.on('connection', (socket) => {
        //add new Node
        socket.emit("setConfig", this.nodeManager.getConfig())
this.update()


        socket.on("addNode",(msg)=>{
            this.nodeManager.addNode(msg)
        })
socket.on("connectNodes",(msg)=>{
            nodeManager.addConnection(msg)
        })
        socket.on("NodePositionChange",(msg)=>{
            this.nodeManager.nodes[msg.id].x=msg.x
            this.nodeManager.nodes[msg.id].y=msg.y
            console.log(this.nodeManager.nodes[msg.id].x)
            io.emit("NodePositionChange",msg)
        })
        socket.on("ArgChange",(msg)=>{

            this.nodeManager.nodes[msg.id].args.find(x=>x.var===msg.ioid).value=msg.value
            io.emit("ArgChange",msg)
        })

        console.log('a user connected');
    });

    this.addConnection=function(cons){
        io.emit("connectNodes",cons)
    }


    this.update=function(){
        let out = []
        for(let key in this.nodeManager.nodes){
            out.push({html:HTMLNodeGen(this.nodeManager.nodes[key]), id :key})
        }
        io.emit("update", out)
    }




    server.listen(3000, () => {
        console.log('listening on *:3000');
    });
    return this
}
module.exports=SocketApi