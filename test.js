const dlRedgif = require("./index");
const fs = require("fs")

dlRedgif("https://www.redgifs.com/watch/newdrearyblackwidowspider", "riley reid blow job", "", true)
    .then((video) => {
        console.log(`High quality downloaded video: ${video.HQ}`);
        console.log(`Low quality downloaded video: ${video.LQ}`);

        console.assert(fs.existsSync(video.LQ), "The high quality video does not exist");
        console.assert(fs.existsSync(video.HQ), "The low quality video does not exist")
    })
    .catch((reason) => {
        console.log(`Failed to download the video due to ${reason}`)
    });