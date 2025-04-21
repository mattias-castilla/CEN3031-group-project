const db_password = process.env.DB_PASSWORD;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ethanelliott50:"+db_password+"@cluster0.fh1jr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbName = "db"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
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

// Collections: "students", "researchers", "posts"
async function insert(document, collection) {
  if (collection === "posts") {
    if (!await validUser(document.email))
      throw new Error("User does not exist.");
  }
  else if (collection === "students" || collection === "researchers") {
    if (await validUser(document.email))
      throw new Error("Duplicate user.");
  }
  if (collection !== "application") {
    throw new Error("Invalid collection.")
  }

  const db = client.db(dbName);
  await db.collection(collection).insertOne(document, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
}

async function del(query, collection) {
  if (!["posts", "students", "researchers"].includes(collection)) {
    throw new Error("Invalid collection.");
  }

  const db = client.db(dbName);
  await db.collection(collection).deleteOne(query, function (err, res) {
    if (err) throw err;
    console.log("1 document deleted");
  });
}

async function search(query, path, project, collection) {
  const db = client.db(dbName);
  let result = db.collection(collection).aggregate([
    {
      $search: {
        index: "default",
        text: {
          query: query,
          path: path
        }
      }
    },
    {
      $project: project
    }
  ]);
  return result;
}

async function update(query, set, collection) {
  if (!["posts", "students", "researchers"].includes(collection)) {
    throw new Error("Invalid collection.");
  }

  const db = client.db(dbName);
  await db.collection(collection).updateOne(query, set, {upsert: false});

}

async function getPassword(email) {
  const db = client.db(dbName);
  let user = await db.collection("students").findOne({email: email});
  if (user == null) {
    user = await db.collection("researchers").findOne({email: email});
  }
  return user.password;
}

async function getPostings() {
  const db = client.db(dbName);

  return await db.collection("posts").find().toArray();

}

// return if true or false whether email is researcher
async function isResearcher(email) {
  const db = client.db(dbName);

  let user = await db.collection("researchers").findOne({email: email});

  if(user != null){
    return true;
  }else{
    return false;
  }
}

// return if true or false whether email is student
async function isStudent(email) {
  const db = client.db(dbName);

  let user = await db.collection("students").findOne({email: email});

  if(user != null){
    return true;
  }else{
    return false;
  }
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

module.exports = { connectDB, getPassword, validUser, getPostings, isStudent, isResearcher, insert, del, update, search, client };