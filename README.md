# redgif-dl
Rip any video from redgif with sound asyncrnously
# Documentation

## `function dlRedGif(url, file_name, ?output_path)`

 * **Parameters:**
   * `url` — The redgif video you want too download
   * `file_name` — The output file name (automatically append .mp4)
   * `output_path` — The output path (optional, if none is provided the current working directory is going to be used)
 * **Example:** 
 ```js
 const dlRedGif = require("redgif-dl")

 dlRedGif("https://www.redgifs.com/watch/newdrearyblackwidowspider", "riley reid blow job", "./downloads")
     .then((path) => {
         console.log(`The high quality video is located at ${path.HQ}`);
         console.log(`The low quality video is located at ${path.LQ}`);
     })
     .catch((reason) => console.error(reason));
```
 * **Returns:** An promise containing the low quality and high quality video path
 