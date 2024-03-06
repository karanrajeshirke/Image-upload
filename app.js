import express from "express";
import mongoose from "mongoose";
import formidable from "express-formidable";
import fs from "fs";
import cors from "cors"
const app = express();


app.use(cors())
app.use(express.json())
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

const userModel = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send({ message: "working" });
});

app.post("/add", formidable(), async (req, res) => {
  try {
    const { name, age } = req.fields;

    const { photo } = req.files;

    if (photo) {
      photo.data = fs.readFileSync(photo.path);
      photo.contentType = photo.type;
    }

    const user = new userModel({
      name,
      age,
      photo,
    });

    await user.save();

    console.log(user);
    res.send({
      message: "User saved",
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/getdata',async(req,res)=>
{
  try {
    
    const allUsers=await userModel.find({}).select("-photo");
    res.send({allUsers});
  } catch (error) {
    console.log(error);
  }
})

app.put("/update",async(req,res)=>
{
  try {
   
    let name="SAMOSAISMYFAVOURITE",age=123;
    let id="65d71960814d1af5d1880a35"
    const data=await userModel.findByIdAndUpdate(id,{name,age},{new:true})
    res.send({data})
  } catch (error) {
    console.log(error);
  }
})
app.get('/getuser/:id',async(req,res)=>
{
  try {
    let {id}=req.params;
    const user=await userModel.findById(id).select("photo");
    console.log(user);
    res.send({user});
  } catch (error) {
    console.log(error);
  }
})

app.get("/photo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user=await userModel.findById(id).select("photo");

    res.set('Content-type',user.photo.contentType)
    res.send(user.photo.data)
  } catch (error) {
    console.log(error);
  }
});


app.post('/temproute',formidable(),(req,res)=>
{
  console.log(req.files);
  console.log(req.fields);
})


const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://karanrajeshirke11:XRdI5RQTj5obA3WE@cluster0.hp2citi.mongodb.net/IMAGE-UPLOAD-PROJECT"
    );
    console.log("connected to DB");
  } catch (error) {
    handleError(error);
  }
};

connectDb();

app.listen(8080, () => console.log("started on port 8080"));
