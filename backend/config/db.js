
const db_password = process.env.DB_PASSWORD;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ethanelliott50:"+db_password+"@cluster0.fh1jr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(error) {
    // Ensures that the client will close when you finish/error
    console.error("MongoDB connection error: ", error);
    process.exit(1);
    //await client.close();
  }
}
//run().catch(console.dir);

module.exports = { connectDB, client };