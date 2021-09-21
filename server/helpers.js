import { readFileSync, writeFileSync } from "fs"

export const getJSONdata = (file) => {
    try{
        const data = readFileSync(file)
        const dataObj = JSON.parse(data)
        return dataObj
        
    } catch (err) {
        console.log(err)
    }
} 

export const updateJSONdata = (file, objID) => {

    const dataObj = getJSONdata(file)    
    let updatedObjArr = []
    const objArray = Object.entries(dataObj)
    
    updatedObjArr.push(objArray[0])
    updatedObjArr.push(objArray[1])

    const updatedElements = objArray[2][1].map(element => {
        if(element.id && element.id == objID) {
            element.state = "CLOSED"
        }
        return element
    })

    updatedObjArr.push([objArray[2][0], updatedElements])
    const updatedObjects = JSON.stringify(Object.fromEntries(updatedObjArr), null, 2)

    try {
        writeFileSync(file, updatedObjects)
    } catch (err) {
        console.log(err)
    }
}