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

const fs = require('fs');
//create a file 
fs.writeFileSync('example.txt', 'Hello World!', (err) =>{
    if (err) throw err;
    console.log('File created successfully.');
});

//Delete the file
// fs.unlink('example.txt', (err) => {
//     if (err) throw err;
//     console.log('File deleted successfully.');
// });

//delete the file after 5 sec
setTimeout(() => {
    fs.unlink('example.txt', (err) => {
        if (err) throw err;
        console.log('File deleted successfully after 5 seconds.');

    });
}, 5000);