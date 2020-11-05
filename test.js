const dlRedgif = require("./index");

dlRedgif("https://www.redgifs.com/watch/newdrearyblackwidowspider", "riley reid blow job")
    .then((video) => {
        console.log(`High quality downloaded video: ${video.HQ}`);
        console.log(`Low quality downloaded video: ${video.LQ}`);
    })
    .catch((reason) => {
        console.log(`Failed to download the video due to ${reason}`)
    });