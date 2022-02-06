const https = require('https');
const fs = require('fs');

function getNodes(){
    let os = process.platform
   
    const nlist = fs.createWriteStream("NodeList.json");
    let out = ""
    const request = https.get("https://raw.githubusercontent.com/Katterton/NodeRep/master/list.json", function(response) {
      
        response.on("data", (x)=>( out+=x.toString()))
        response.on("end", ()=> {
            let Nodes = JSON.parse(out)
console.log(Nodes)

        }
        )
    });

    
}
function installNode(){

}
getNodes()