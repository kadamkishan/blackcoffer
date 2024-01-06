import  {MongoClient}  from "mongodb";
import express from 'express';
import cors from "cors";


const app = express();
const PORT=8000;
app.use(express.json());

app.use(cors());

app.listen(PORT,()=>{
    console.log(`Server started sucessfully at ${PORT}`);
})


const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    
    const database = client.db("companyData");
    const movies = database.collection("data");

    const cursor =await movies.find();

    var allData=new Array();
     for await (const doc of cursor) {
        // console.dir(doc);
       allData.push(doc);
    }

    app.get('/getCompanyData',(req,res)=>{

        res.send(allData);
    })
      

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
