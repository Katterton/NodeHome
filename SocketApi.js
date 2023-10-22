const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");








function SocketApi(HTMLNodeGen) {
    this.nodeManager={}

    const io = new Server(server);
    app.use(express.static('public'));
    app.use(express.static('node_modules/bootstrap-colorpicker/'));
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });
    io.on('connection', (socket) => {
        //add new Node
        socket.emit("setConfig", this.nodeManager.getConfig())
this.update()

socket.on("startNode", (msg)=>{
    this.nodeManager.startNode(msg.id)
})
        socket.on("addNode",(msg)=>{
            this.nodeManager.addNode(msg)
        })
socket.on("connectNodes",(msg)=>{
            nodeManager.addConnection(msg)
        })
socket.on("renameNode",(msg)=>{
    nodeManager.renameNode(msg)
})
        socket.on("NodePositionChange",(msg)=>{
            this.nodeManager.nodes[msg.id].x=msg.x
            this.nodeManager.nodes[msg.id].y=msg.y

            io.emit("NodePositionChange",msg)
        })
        socket.on("ArgChange",(msg)=>{

           let n =  this.nodeManager.nodes[msg.id].args.find(x=>x.var===msg.ioid)
            if(n!==undefined){
            if(n.type==="boolean"){

                n.update((msg.value))
            }
            else{

                n.update(msg.value)
            }

            this.nodeManager.save()
            io.emit("ArgChange",msg)
        }})
        socket.on("removeConnection",(msg)=>{
this.nodeManager.removeConnection(msg.con)
        })
        socket.on("removeNode",(msg)=>{
            this.nodeManager.deleteNode(msg.node)
        })
        socket.on("createNewNode",(msg)=>{
           socket.emit("VSLink", this.nodeManager.createNode(msg))
        })
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
        this.addConnection(this.nodeManager.connections)
    }





    server.listen(3000, () => {
        console.log('listening on *:3000');
    });
    return this
}
module.exports=SocketApi