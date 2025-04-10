const db_password = process.env.DB_PASSWORD;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ethanelliott50:"+db_password+"@cluster0.fh1jr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbName = "db"

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
    const db = client.db(dbName);
    await db.command({ping: 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(error) {
    // Ensures that the client will close when you finish/error
    console.error("MongoDB connection error: ", error);
    process.exit(1);
    //await client.close();
  }
}

async function insertStudent(student) {
  const db = client.db(dbName);
  await db.collection("students").insertOne(student, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}

async function insertResearcher(researcher) {
  const db = client.db(dbName);
  await db.collection("researchers").insertOne(researcher, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}

async function getPassword(email) {
  const db = client.db(dbName);
  let user = await db.collection("students").findOne({email: email});
  if (user == null) {
    user = await db.collection("researchers").findOne({email: email});
  }
  return user.password;
}

// check if the user submitted email is a valid email
async function validUser(email) {
  const db = client.db(dbName);
  let user_student = await db.collection("students").findOne({email: email});
  let user_researcher = await db.collection("researchers").findOne({email: email});

  if(user_student != null || user_researcher != null){
    return true;
  }else{
    return false;
  }
  
}

module.exports = { connectDB, getPassword, validUser, insertResearcher, insertStudent, client };