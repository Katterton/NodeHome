const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
function FrontendApi() {
    this.nodeManager={}
    const io = new Server(server);
    app.use(express.static('public'));
    app.use(express.static('node_modules/bootstrap-colorpicker/'));
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/front.html');
    });
    io.on('connection', (socket) => {
     let out = Object.values(this.nodeManager.nodes).filter(x=>x.input.some(y=>y.name==="Start")).map(x=>({id: x.id, name:x.name, state:x.started}))
 
    console.log(out)
    if(out.length>0){
       socket.emit("init", out)
    }
       socket.on("startNode", (msg)=>{
        this.nodeManager.startNode(msg.id)
        
  
     
 
    })

   
    })
  
    
    server.listen(3001, () => {
        console.log('Frontend Api listening on *:3001');
    });

    this.updat=function(){
        let out = Object.values(this.nodeManager.nodes).filter(x=>x.input.some(y=>y.name==="Start")).map(x=>({id: x.id, name:x.name, state:x.started}))
        if(out.length>0){
        io.emit("init", out)
    }
}

    return this
}


module.exports=FrontendApi