class BeatMixer {

        constructor(node) {
            this.node = node
            let self = this
            this.brightness=255
            this.intervall = setInterval(()=>{
                if(self.brightness>100){
                    self.brightness--
                    self.update()
                }
                }
            )
        }
        update(node) {
            if (this.node.data !== undefined) {
                if (node !== undefined) {
                    if (node.name === "beat") {
                        this.brightness = 255;
                    }
                }
                this.node.output[0].update({
                    data: this.node.data.data,
                    brightness: this.node.data.brightness * (this.brightness / 255)
                })
            }
        }
}
module.exports=BeatMixer