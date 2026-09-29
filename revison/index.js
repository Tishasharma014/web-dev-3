// const os = require('os');

// console.log('Operating System Information:');
// console.log('Platform: ${os.platform()}');
// console.log('Architecture: ${os.arch()}');
// console.log('CPU Cores: ${os.cpus().length}');
// console.log('Total Memory: ${os.totalmem()} bytes');
// console.log('Free Memory: ${os.freemen()} bytes');
// console.log('Home Directory: ${os.homedir()}');
// console.log('Path Information:');
// console.log('Current Directory: ${__dirname}');
// const filepath = Path.join(__dirname, 'example.txt}');
// console.log('File Path: ${filePath}');

// const fs = require('fs');
// //create a file 
// fs.writeFileSync('example.txt', 'Hello World!', (err) =>{
//     if (err) throw err;
//     console.log('File created successfully.');
// });

//Delete the file
// fs.unlink('example.txt', (err) => {
//     if (err) throw err;
//     console.log('File deleted successfully.');
// });

//delete the file after 5 sec
// setTimeout(() => {
//     fs.unlink('example.txt', (err) => {
//         if (err) throw err;
//         console.log('File deleted successfully after 5 seconds.');

//     });
// }, 5000);

// const fs =require('fs');
// fs.readFile('file.txt','utf8', (err, data) =>{
//     if (err) {
//         console.error('Error reading file:',err);
//         return;
//     }
//     console.log('File Content:');
//     console.log(data);
// });

// const fsP = require('fs/promises');

// async function readFileAsync() {
//     try {
//         const data = await fsP.readFile('file.txt', 'utf-8');
//         console.log('File content');
//         console.log(data);
    
//     } catch (error) {
//         console.error('Error reading files:', error);
//     }
// }
// readFileAsync();


//SHA-256 hash use
// const crypto = require('crypto');
// const hash = crypto.createHash('sha256');
// hash.update('Hello World!');
// const digest = hash.digest('hex');
// console.log(`SHA-256 Hash: ${digest}`);

//UUID-like random ID
// console.log(crypto.randomUUID());

