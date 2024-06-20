const express = require('express')
const server = express()
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4} = require('uuid')


server.use(express.json({extends: true}))

const readFile = () => {
    const content = fs.readFileSync('./src/profiles/profiles.JSON', 'utf-8')
    return JSON.parse(content)
}

const writeFile = (content) => {
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('./src/profiles/profiles.JSON', updateFile, 'utf-8')
}

router.get('/', (req, res) => {
    const content = readFile()
    res.send(content)
})

router.post('/', (req, res) => {
    console.log('POST')
    const {name, arquivo, link, choice} = req.body
    const currentContent = readFile() 
    const id = uuidv4()    
    currentContent.push({id, name, arquivo, link, choice})
    writeFile(currentContent)
    res.send({id, name, arquivo, link, choice})
})

router.put('/:id', (req, res) => {
    const {id} = req.params

    const {name, arquivo, link, choice} = req.body

    const currentContent = readFile()

    const selectedItem = currentContent.findIndex((i) => i.id === id)
    
    const {id: cId, name: cName, arquivo: cArquivo, link: cLink, choice: cChoice} = currentContent[selectedItem]
    
    const newObject = {
        id: cId,
        name: name ? name: cName,
        arquivo: arquivo ? arquivo: cArquivo,
        link: link ? link: cLink,
        choice: choice ? choice: cChoice
        
    }
    
    currentContent[selectedItem] = newObject
    writeFile(currentContent)

    res.send(newObject)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const currentContent  = readFile()
    
    const selectedItem = currentContent.findIndex((i) => i.id === id)
    currentContent.splice(selectedItem, 1)
    writeFile(currentContent)
    res.send(currentContent)

})

server.use(router)

server.listen(3000, () => {
    console.log('Running Server')
})
