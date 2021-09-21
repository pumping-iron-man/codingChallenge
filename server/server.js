import Express from "express";
import { getJSONdata, updateJSONdata } from './helpers.js'


const app = Express()
const PORT = process.env.port || 5000
const File = './data/reports.json'

app.get('/api/reports', (req, res) => {
    const data = getJSONdata(File).elements
    return res.send(data)
})

app.put('/api/reports/:id', (req, res) => {
    const reportID = req.params.id
    updateJSONdata(File, reportID)
    res.send(`Successfully updated report with id ${reportID}`)
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

