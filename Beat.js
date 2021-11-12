const portAudio = require('naudiodon');
const {MusicBeatDetector, MusicBeatScheduler, MusicGraph} = require('music-beat-detector')
class Beat{
    constructor(node) {
        console.log(portAudio.getDevices());
        this.node = node
    }
    start(){
        if(this.ai===undefined) {
            console.log(this.node.audio_device)
            this. ai = new portAudio.AudioIO({
                inOptions: {
                    channelCount: 2,
                    sampleFormat: portAudio.SampleFormat16Bit,
                    sampleRate: 48000,
                    deviceId:30, // Use -1 or omit the deviceId to select the default device
                    closeOnError: true // Close the stream if an audio error is detected, if set false then just log the error
                }
            });
            this. musicBeatScheduler = new MusicBeatScheduler(pos => {

            })
            this. musicBeatDetector = new MusicBeatDetector({
                scheduler: this.musicBeatScheduler.getScheduler(),
                sensitivity: 0.6 //dont know how this changes anything
            })
            this.ai.pipe(this.musicBeatDetector.getAnalyzer()).on('peak-detected', (pos, bpm) =>   {this.node.output[0].update([pos, bpm]);console.log([pos, bpm])}).on('end', () => {

            }).once('data', () => this.musicBeatScheduler.start())
        }
    }
    stop(){

        this.ai=undefined
    }
}
module.exports=Beat