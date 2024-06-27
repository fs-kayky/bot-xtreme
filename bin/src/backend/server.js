const express = require('express')
const server = express()
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4} = require('uuid')
const { spawn } = require('child_process');

server.use(express.json({extends: true}))

function pythonProcess(profile) {
    console.log(profile)

    return new Promise((resolve, reject) => {
  
      const pyProcess = spawn('python', ['src\\backend\\script.py', profile]);
  
      pyProcess.stdout.on('data', (data) => {
        console.log('Dados recebidos do python:', data.toString());
      });
  
      pyProcess.stderr.on('data', (data) => {
        console.error('Erro do python:', data.toString());
        reject(new Error('Erro no script'));
      });
  
      pyProcess.on('close', (code) => {
        if (code === 0) {
          resolve('Script Python executado com sucesso');
        } else {
          reject(new Error('Script Python saiu com código:', code));
        }
      });
    });
  }

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

router.post('/exec', async (req, res) => {
    if (req.method === 'POST') {
        const profile = req.body.profile
        if(!profile) {
          res.status(400).send('Parametro "Profile" ausente')
          return
        }
      try {  
        const result = await pythonProcess(profile);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro durante a execução do script Python');
      }
    } else {
      res.status(405).send('Método não permitido');
    }
  });

router.post('/', (req, res) => {
    const {name, arquivo, link, choice} = req.body
    const currentContent = readFile() 
    const id = uuidv4()    
    currentContent.push({id, name, arquivo, link, choice})
    writeFile(currentContent)
    res.send({id, name, arquivo, link, choice})
})

router.put('/:id', (req, res) => {

  console.log(req.body)

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
