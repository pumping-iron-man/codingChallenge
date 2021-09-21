import Express from "express";
import { getJSONdata, updateJSONdata } from './helpers.js'


const app = Express()
const PORT = process.env.port || 5000
const File = './data/reports.json'

// get data from file
app.get('/api/reports', (req, res) => {
    const data = getJSONdata(File).elements
    return res.send(data)
})

// update data in file
app.put('/api/reports/:id', (req, res) => {
    const reportID = req.params.id
    updateJSONdata(File, reportID)
    res.send(`Successfully updated report with id ${reportID}`)
})

// set server to listen on port 5000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

