const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5050

let log = []
let grandTotalHours = [0]
let grandTotalEarnings = [0]

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.get("/styles", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.css"))
})

app.get("/js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.css"))
})

app.get("/grandtotalhours", (req, res) => {
    res.status(200).send(grandTotalHours)
})

app.get("/log", (req, res) => {
    res.status(200).send(log)
})

app.get("/grandtotalearnings", (req, res) => {
    res.status(200).send(grandTotalEarnings)
})

app.post("/log", (req, res) => {
    let { body }  = req
    log.push(body.log)
    res.sendStatus(200)
})

app.post("/addgrandtotalhours", (req, res) => {
    let { body } = req
    grandTotalHours[0] = grandTotalHours[0] + body.log
    res.sendStatus(200)
})

app.post("/addgrandtotalearnings", (req, res) => {
    let { body } = req
    grandTotalEarnings[0] = grandTotalEarnings[0] + body.log
    res.sendStatus(200)
})

app.listen(port, () => console.log(`Server running on port: ${port}`))