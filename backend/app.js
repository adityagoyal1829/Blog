// c9cInXDyQQv9dSjz
// 6eHReHzZeCmGvs53
import  express  from "express";  
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);

mongoose.connect(
    'mongodb+srv://admin:c9cInXDyQQv9dSjz@cluster0.uahktmx.mongodb.net/Blog?retryWrites=true&w=majority'
)
.then(()=>app.listen(port))
.then(()=>console.log(`Connected to Database and listening to LocalHost ${port}`))
.catch((err)=>console.log(err));



