const fs = require("fs");

// read files

/* fs.readFile("./docs/blog.html", (err, data) => {
	if (err) {
		console.error(err);
	}
	console.log(data.toLocaleString());
});
 */
// write files
/* fs.writeFile("./docs/bog.txt", "Hellor World!", (err, data) => {
	console.log("file was written");
});
 */

// Directories
if (!fs.existsSync("./assets")) {
	fs.mkdir("./assets", (err) => {
		if (err) {
			console.log(err);
		}
		console.log("folder created");
	});
} else {
	fs.rmdir("./assets", (err) => {
		if (err) {
			console.log(err);
		}

		console.log("folder deleted");
	});
}

// rm files
if (fs.existsSync("./docs/bog.txt")) {
	fs.unlink("./docs/bog.txt", (err) => {
		if (err) {
			console.log(err);
		}
		console.log("file deleted");
	});
} else {
	fs.writeFile("./docs/bog.txt", "", (err) => {
		if (err) {
			console.log(err);
		}
		console.log("file created");
	});
}
