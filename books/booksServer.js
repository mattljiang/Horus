const PROTO_PATH = '../protos/books.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const express = require('express');
const controller = require('./bookController.js');

const app = express();
app.use(express.json());

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
})



const booksProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();

  
//sample to test
        const sample= {
        title: "title1", 
        author:"author1",
        pages: 100,
        publisher: 'Random House',
        id: 0
      }
//creating createbook variable function to call
    const createDbPostTest= controller.createBook(sample)


server.addService(booksProto.BooksService.service, {
  CreateBook: (call, callback) => {
    console.log('call to CreateBook')

    // write to database
    callback(null,
      createDbPostTest)



    // callback(
    //   null,
    //   //bookmodel.create
    //   {
    //     title: "title1", 
    //     author:"author1",
    //     pages: 100,
    //     publisher: 'Random House',
    //     id: 0
    //   }
    // );
  },
  GetBooks: (call, callback) => {
    console.log('call to GetBooks');

    // read from database

    callback(
      null,
         
    )
  },
  DeleteBook: (call, callback) => {
    console.log('call to DeleteBook');

    // delete from database

    callback(
      null,
      {
        id: 'id number'
      }
    )
  }
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("booksServer.js running at http://127.0.0.1:30043");

console.log('call from books server')

server.start();