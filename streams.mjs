import fs from "fs";
import fetch from "node-fetch";
import mime from "mime-types";
import path from "path";

/* const readStream = fs.createReadStream("./docs/bog.txt");
const writeStream = fs.createWriteStream("./docs/bog3.txt");
 */
/* readStream.on("data", (chunk) => {
	console.log("---New Chunk---");
	console.log(chunk + " \n \n");

	writeStream.write("\n\n---New Chunk---\n");
	writeStream.write(chunk);
});
 */
console.log("./assets");
if (!fs.existsSync("./assets")) {
	fs.mkdir("./assets", () => {});
}

const getFilenameFromContentDisposition = (contentDisposition) => {
	const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
	const matches = filenameRegex.exec(contentDisposition);
	if (matches != null && matches[1]) {
		return matches[1].replace(/['"]/g, "");
	}
	return null;
};
// readStream.pipe(writeStream);

await fetch(
	"https://drive.google.com/file/d/1B0dBegVoQpJwiV4SDIYpnQfxT5v7YgLV/view?usp=sharing"
)
	.then((res) => {
		console.log(res);
		const contentType = res.headers.contentType;
		const extension = mime.extension(contentType);

		let filename;
		const contentDisposition = res.headers.get("content-disposition");
		if (contentDisposition) {
			filename = getFilenameFromContentDisposition(contentDisposition);
		}
		if (!filename) {
			const contentType = res.headers.get("content-type");
			const extension = mime.extension(contentType);
			if (!extension) throw new Error(`Unsupported MIME type: ${contentType}`);
			filename = `downloadedFile.${extension}`;
		}

		const localFilePath = path.join("./assets", filename);
		const writeStream = fs.createWriteStream(localFilePath);
		res.body.pipe(writeStream);

		writeStream.on("finish", () => {
			console.log("File completed and downloaded successfuly");
		});

		writeStream.on("error", (err) => {
			console.error("Error writing to file", err);
		});
	})
	.catch((err) => {
		console.error(err);
	});

// files keep downloading only html
