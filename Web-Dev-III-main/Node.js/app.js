// const cities = require('./data/mydata');
// // console.log(cities);
// const chalk = require('chalk');
// console.log(chalk.blue('hello,world'))
// import chalk from 'chalk';
// console.log(chalk.yellowBright('hello,world'))

// const os = require('os')
// const userinfo = os.userInfo();
// const platform = os.platform();
// const architecture = os.arch();
// const uptime = os.uptime();
// console.log(userinfo);
// console.log(platform);
// console.log(architecture);
// console.log(uptime);

// const fs = require('fs');
// fs.writeFileSync('data/data.txt','hello world',);


// const path = require('path');
// const filePath = path.join(__dirname,'data','data.txt',);
// console.log(filePath)
0
// const process =require('process');
// console.log(process.argv[2])

//require('dotenv').config();
//onsole.log(process.env.PORT);
const students =[
    {id:1,name:'tisha',age:16},
    {id:2,name:'ram',age:17},
    {id:3,name:'sham',age:18},
    {id:4,name:'isha',age:19},
]
const http = require('http');
require('dotenv').config();
const process =require ('process');
const port =process.env.PORT || 3000;
const server =http.createServer((req,res)=>{
    if(req.method=== 'GET' && req.url ==='/api/students'){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(
            JSON.stringify({count: students.length, students}));
    }
    else if(req.method === 'GET' && req.url ==='/api/students/count'){
        res.writeHead(200, {'Content-Type':'content/JSON'});
        res.end(
            JSON.stringify({count: students.length}));
    }
});

server.listen(port, () =>{
    console.log("Server is running on port ${port} ")
});

