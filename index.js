const fetch = require("node-fetch");
const fs = require("fs/promises");
const xor = require("alegrify-xor");
/**
 * @description An gif that is from red gif
 */
class RedGifGIF {
    constructor(gifName) {
        this.GifName = gifName;

        this.HQLink = `https://thcf3.redgifs.com/${this.GifName}.webm`;
        this.LQLink = `https://thcf2.redgifs.com/${this.GifName}-mobile.mp4`;
    }
}

/**
 * 
 * @param {string} url The redgif video you want too download
 * @param {string} file_name The output file name
 * @param {string} output_path The output path
 * @example dl_redgif("https://www.redgifs.com/watch/newdrearyblackwidowspider", "blow job", "./downloads")
 * /.then((path) => console.log(path))
 * /.catch((reason) => console.error(reason));
 * @returns {Promise<string>} An promise of the downloaded file
 */
function dlRedGif(url, file_name, output_path = ".") {
    return new Promise((resolve, reject) => {
        if (!xor(url.search("redgif") < 1, url.search("gfycat") < 1))
            reject("Not a redgif URL");
        fetch(url)
            .then(res => res.text())
            .then(res => {
                // find the red gif url
                const regex = /https:\/\/redgifs\.com\/ifr\/(\w+)/;
                if (!regex.test(res))
                    reject("Could not find the redgif gif title");
                let matching;
                do {
                    matching = regex.exec(res);
                } while (matching == null);

                let gif = new RedGifGIF(matching[1]);
                // downloads the videos
                let DownloadThread = [];
                DownloadThread.push(fetch(gif.HQLink));
                DownloadThread.push(fetch(gif.LQLink));
                Promise.all(DownloadThread)
                    .then((DownloadedFile) => {
                        let BufferCreationThread = [DownloadedFile[0].buffer(), DownloadedFile[1].buffer()];
                        Promise.all(BufferCreationThread)
                            .then((FileBuffer) => {
                                let FileCreationThreads;
                                if (output_path == ".") {
                                    FileCreationThreads = [
                                        fs.writeFile(`${file_name}_hq.mp4`, FileBuffer[0], { encoding: "binary" }),
                                        fs.writeFile(`${file_name}_lq.mp4`, FileBuffer[1], { encoding: "binary" })
                                    ];
                                }
                                else {
                                    FileCreationThreads = [
                                        fs.writeFile(`${output_path}${file_name}_hq.mp4`, FileBuffer[0], { encoding: "binary" }),
                                        fs.writeFile(`${output_path}${file_name}_lq.mp4`, FileBuffer[1], { encoding: "binary" })
                                    ];
                                }

                                Promise.all(FileCreationThreads)
                                    .then(() => {
                                        resolve({
                                            HQ: `${output_path}${file_name}_lq.mp4`,
                                            LQ: `${output_path}${file_name}_lq.mp4`
                                        });
                                    })
                                    .catch((reason) => reject(`${reason[0] ?? ""}\n${reason[1] ?? ""}`));
                            })
                            .catch((reason) => {
                                reject(`${reason[0] ?? ""}\n${reason[1] ?? ""}`);
                            });

                    })
                    .catch((reason) => reject(reason));
            })
            .catch(reason => reject(reason));
    });
}
module.exports = dlRedGif;