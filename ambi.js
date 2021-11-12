const {DesktopDuplication} = require('windows-desktop-duplication');
const chroma = require("chroma-js")
const sharp = require('sharp');
var palette = require('get-rgba-palette')

class Ambi{
    constructor(node) {
        this.node = node
    }

    start(){
        if(this.dd===undefined) {
            this.dd = new DesktopDuplication(this.node.display);

            try {
                this.dd.initialize();
            } catch (err) {
                console.log("An error occured:", err.message);
                process.exit(0);
            }

            this.dd.on("frame", frame => {

                const width = Math.floor(frame.width / this.node.num_panel)
                this.extract_panel_col(frame, width).then(async (col) => {




                            this.node.output[0].update({data:chroma.scale(col).mode('lrgb').domain([0, 100]),brightness:1});





                })

            })
        }
        this.dd.startAutoCapture(Math.ceil(1000/this.fps))
        this.started=true;
    }
    stop(data){
        this.dd.stopAutoCapture(true)
        this.started=false
    }


    extract_panel_col( frame,width) {

        return new Promise((resolve) => {
            let col = []
            let j = 0;

            for (let i = 0; i < this.node.num_panel; i++) {

                sharp(frame.data, {
                    // because the input does not contain its dimensions or how many channels it has
                    // we need to specify it in the constructor options
                    raw: {
                        width: frame.width,
                        height: frame.height,
                        channels: 4
                    }
                })
                    .extract({
                        left: width * i,
                        top: 0,
                        width: width,
                        height: frame.height
                    }).toColorspace('rgba').toBuffer(async (err, data, info) => {

                    let c = await palette(data, 1)

                    col[i] = c[0]


                    ++j;


                    if (j === this.node.num_panel) {

                        resolve(col)
                    }
                })
            }

        })


    }





}
module.exports=Ambi