const fs = require("fs");
const fetch = require("node-fetch");

const readStream = fs.createReadStream("./docs/bog.txt");
const writeStream = fs.createWriteStream("./docs/bog3.txt");

/* readStream.on("data", (chunk) => {
	console.log("---New Chunk---");
	console.log(chunk + " \n \n");

	writeStream.write("\n\n---New Chunk---\n");
	writeStream.write(chunk);
});
 */
if (!fs.existsSync("./assets")) {
	fs.mkdir("./assets");
}
console.log("./assets");

// readStream.pipe(writeStream);

fetch(
	"https://drive.google.com/file/d/1B0dBegVoQpJwiV4SDIYpnQfxT5v7YgLV/view?usp=sharing"
)
	.then((res) => {
		const writeStream = fs.createWriteStream("./assets/Building.m4a");
		res.body.pipe(writeStream);

		writeStream.on("finish", () => {
			"File completed and downloaded successfuly";
		});
	})
	.catch((err) => {
		console.error(err);
	});
