const pythonProcess = () => {
    const spawner = require('child_process').spawn
    const pyProcess = spawner('python', ['./script.py'])

    pyProcess.stdout.on('data', (data) => {
        console.log('Data recevied from python:' , data.toString())
    })
}

pythonProcess()


window.addEventListener("DOMContentLoaded", (event) => {
    const btn = document.getElementById('runScript')
    btn.addEventListener("click", pythonProcess)

})