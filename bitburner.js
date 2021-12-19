/** @param {NS} ns **/

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export async function main(ns) {
    let name = ns.getHostname()
    let hacklvl = ns.getHackingLevel()
    const map = (n = "home", tmp = []) => {
        let out = []

        let nodes = ns.scan(n, true)




        for (let node of nodes) {
            if (tmp.find((x) => x[0] === node) === undefined) {
                if (ns.hasRootAccess(node)) {
                    tmp.push([node, false])

                }
                else {

                    if (hacklvl - ns.getServerRequiredHackingLevel(node) >= 0) {

                        if (ns.getServerNumPortsRequired(node) < [ns.fileExists("BruteSSH.exe"), ns.fileExists("FTPCrack.exe"), ns.fileExists("relaySMTP.exe"), ns.fileExists("HTTPWorm.exe"), ns.fileExists("SQLInject.exe")].filter(x => x === true).length + 1) {
                            if (ns.fileExists("BruteSSH.exe")) {
                                ns.brutessh(node)
                            }
                            if (ns.fileExists("FTPCrack.exe")) {
                                ns.ftpcrack(node)
                            }
                            if (ns.fileExists("relaySMTP.exe")) {
                                ns.relaysmtp(node)
                            }
                            if (ns.fileExists("HTTPWorm.exe")) {
                                ns.httpworm(node)
                            }
                            if (ns.fileExists("SQLInject.exe")) {
                                ns.sqlinject(node)
                            }
                            ns.nuke(node)
                            //	ns.installBackdoor(node)
                            tmp.push([node, false])

                        }
                    }
                }
            }
        }

        let op = {}

        for (let i = 0; i < tmp.length; i++) {

            if (!tmp[i][1]) {
                tmp[i][1] = true
                map(tmp[i][0], tmp)


            }
        }

        return tmp



    }

    let m


    m = map()

    let max = m[0], best = m[0], ba = []

    let val = 0, valb = 0
    for (let server of m) {
        if (server[0] !== "home") {
            ba.push({ val: (ns.getServerMaxMoney(server[0]) / (ns.getHackTime(server[0]))), max: server })
            //ns.tprint((ns.getServerMoneyAvailable(server[0])*ns.hackAnalyzeChance(server[0])*ns.hackAnalyze(server[0]))/ns.getHackTime(server[0]))
            if ((ns.getServerMaxMoney(server[0]) / (ns.getHackTime(server[0]) * (ns.getServerMinSecurityLevel(server[0]) / ns.getServerSecurityLevel(server[0])))) > valb) {
                best = server
                valb = (ns.getServerMaxMoney(server[0]) / (ns.getHackTime(server[0]) * (ns.getServerMinSecurityLevel(server[0]) / ns.getServerSecurityLevel(server[0]))))
            }
            if ((ns.getServerMaxMoney(server[0]) / (ns.getHackTime(server[0]))) > val) {
                max = server
                val = (ns.getServerMaxMoney(server[0]) / (ns.getHackTime(server[0])))

            }




            if (!(ns.scriptRunning("hacker.js", server[0]) || ns.scriptRunning("grow.js", server[0]) || ns.scriptRunning("weaken.js", server[0]) || ns.scriptRunning("weakena.js", server[0]))) {
                await ns.scp(["hacker.js", "grow.js", "weaken.js", "weakena.js"], name, server[0])



            }
        }
    }
    let homecheck = false
    if (2 > [ns.fileExists("BruteSSH.exe"), ns.fileExists("FTPCrack.exe"), ns.fileExists("relaySMTP.exe"), ns.fileExists("HTTPWorm.exe"), ns.fileExists("SQLInject.exe")].filter(x => x === true).length + 1) {
        max[0] = "foodnstuff"
        homecheck = true
    }
    ba.sort((x, y) => y.val - x.val)
    ba= ba.filter((x)=>x.val!==0)



    const getExploit = (map, max) => map.find(x => (ns.getServerMoneyAvailable(x[0]) * ns.hackAnalyze(x[0]) / (ns.getServerMinSecurityLevel(x[0])) > 0 && x[0] !== max[0] && x[0] !== "home"))
    //ns.tprint("current target: " + max[0] + ", CurrentMoney: " + ns.getServerMoneyAvailable(max[0]) + ", MaxMoney: " + ns.getServerMaxMoney(max[0]) + ", PercentMoney: " + (100 * ns.getServerMoneyAvailable(max[0]) / ns.getServerMaxMoney(max[0])) + "%, SecurityLevel: " + ns.getServerSecurityLevel(max[0]) + ", MinSecurityLevel: " + ns.getServerMinSecurityLevel(max[0]))
    //ns.tprint("current PrepTarget: " + best[0] + ", CurrentMoney: " + ns.getServerMoneyAvailable(best[0]) + ", MaxMoney: " + ns.getServerMaxMoney(best[0]) + ", PercentMoney: " + (100 * ns.getServerMoneyAvailable(best[0]) / ns.getServerMaxMoney(best[0])) + "%, SecurityLevel: " + ns.getServerSecurityLevel(best[0]) + ", MinSecurityLevel: " + ns.getServerMinSecurityLevel(best[0]))
    let check = (Math.floor(Math.random() * 10) + 1) !== 5
    for (let server of m) {
        if((homecheck && server[0]==="home") || server[0]!=="home"){

            let threads = ns.getServerMaxRam(server[0]) / ns.getScriptRam("weaken.js", "home") - 1

            //ns.exec("slave.js", server[0], threads - 0.5, max[0])
            threads = threads < 1 ? 1 : threads
            let e = getExploit(m, max)

            if (false) {
                ns.tprint("current target: " + e[0] + ", CurrentMoney: " + ns.getServerMoneyAvailable(max[0]) + ", MaxMoney: " + ns.getServerMaxMoney(e[0]))
                ns.exec("hacker.js", server[0], threads, e[0])

            }
            else {

                let tmpthack=0
                //	ns.tprint(ba)
                for (let bb of ba) {


                    let thack = ns.hackAnalyzeThreads(bb.max[0], ns.getServerMoneyAvailable(bb.max[0]) / 2)===NaN ?0: ns.hackAnalyzeThreads(bb.max[0], ns.getServerMoneyAvailable(bb.max[0]) / 2)

                    let gthread = ns.growthAnalyze(bb.max[0], 4)
                    let wthread = 2 * (ns.growthAnalyzeSecurity(gthread) + ns.hackAnalyzeSecurity(thack) + (ns.getServerSecurityLevel(bb.max[0]) - ns.getServerMinSecurityLevel(bb.max[0]))) / 0.05
                    if (gthread === Infinity) {
                        gthread = 0
                    }
                    if (thack === Infinity) {
                        thack = 0
                    }
                    if (wthread === Infinity) {
                        wthread = 0
                    }
                    if (gthread === NaN) {
                        gthread = 0
                    }
                    if (thack === NaN) {
                        thack = 0
                    }
                    if (wthread === NaN) {
                        wthread = 0
                    }





                    if ((gthread + wthread + thack) > (ns.getServerMaxRam(server[0]) - ns.getServerUsedRam(server[0])) / ns.getScriptRam("weaken.js", "home")) {

                        let rat = (ns.getServerMaxRam(server[0]) - ns.getServerUsedRam(server[0])) / (ns.getScriptRam("weaken.js", "home") * (gthread + wthread + thack + 1))
                        gthread *= rat
                        wthread *= rat

                        thack *= rat




                    }
                    //ns.tprint(thack)
                    if (ns.getServerMaxMoney(bb.max[0]) / 2 > ns.getServerMoneyAvailable(bb.max[0])) {
                        gthread += thack

                    }
                    if (server[0] === "home") {
                        gthread *= 0.5
                        thack *= 0.5
                        wthread *= 0.5
                    }
                    if (!ns.scriptRunning("weaken.js", server[0])) {
                        if (server[0] !== "home") {
                            //ns.killall(server[0])
                        }

                    }












                    let u = 0

                    if(server[0]==="1"){
                        //ns.tprint(wthread,gthread,thack)
                    }
                    if(!ns.isRunning("weaken.js" ,server[0], bb.max[0] )){
                        if (wthread > 0) {

                            ns.exec("weaken.js", server[0], wthread, bb.max[0])
                        }



                        if (gthread > 0) {
                            let t = (ns.getGrowTime(bb.max[0]) - ns.getHackTime(bb.max[0])) - 125

                            ns.exec("grow.js", server[0], gthread, bb.max[0])

                            if (thack > 0 && ns.getServerMaxMoney(bb.max[0]) / 2 < ns.getServerMoneyAvailable(bb.max[0])) {

                                ns.run("delayHack.js", 1, server[0], t, thack < 1 ? 1 : thack, bb.max[0])
                                tmpthack+=thack
                                await ns.sleep(200)
                            }



                        }


                        if((tmpthack+gthread+wthread)*ns.getScriptRam("weaken.js","home")>ns.getServerMaxRam(server[0])-ns.getServerUsedRam(server[0])){
                            break;
                        }


                    }




                    else{
                        tmpthack+=thack
                    }
                    //let wwthread=	(ns.getServerMaxRam(server[0])-ns.getServerUsedRam(server[0]))/ns.getScriptRam("weaken.js", "home")-(gthread+wthread+thack)
                    //		if(wwthread>0){
                    //		ns.exec("weakena.js", server[0], wwthread, best[0])
                    //		}



                }

            }
        }


    }
}

//
//ns.spawn("miner.js", threads, max[0])