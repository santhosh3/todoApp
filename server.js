const express = require('express');
const { default: mongoose } = require('mongoose');
const TaskSchema = require('./todoModel')
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*'
}))

mongoose.connect("mongodb+srv://santhosh:12345@backend.sx1ylzc.mongodb.net/test", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.post('/addtask', async (req, res) => {
    try {
        let data = req.body
        if (!data.todo) {
            return res.send("activity is missing")
        }
        let create = await TaskSchema.create(data);
        return res.json(await TaskSchema.find())
    } catch (err) {
        console.log(err)
    }
})

app.get('/gettask', async (req, res) => {
    try {
        return res.json(await TaskSchema.find())
    } catch (error) {
        console.log(error)
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        await TaskSchema.findByIdAndDelete(req.params.id)
        return res.json(await TaskSchema.find())
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});