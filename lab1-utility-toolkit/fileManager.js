const fs = require("fs");

console.log("File Manager Started");

// CREATE
fs.writeFile("data.txt", "Hello from Smart Utility Toolkit!", (err) => {

    if (err) {
        console.log("Error creating file:", err);
        return;
    }

    console.log("File created successfully.");

    // READ
    fs.readFile("data.txt", "utf8", (err, data) => {

        if (err) {
            console.log("Error reading file:", err);
            return;
        }

        console.log("File content:", data);

        // UPDATE
        fs.appendFile("data.txt", "\nFile updated successfully.", (err) => {

            if (err) {
                console.log("Error updating file:", err);
                return;
            }

            console.log("File updated successfully.");

            // DELETE
            fs.unlink("data.txt", (err) => {

                if (err) {
                    console.log("Error deleting file:", err);
                    return;
                }

                console.log("File deleted successfully.");
            });
        });
    });
});