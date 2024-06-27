// const axios = require('axios')
const url = "http://localhost:3000/";

const button = document.getElementById('formButton');

const throwTostifyAccepted = () => {
    Toastify({
        text: `Perfil criado com sucesso!`,
        className: "",
        position: "center",
        stopOnFocus: true,
        offset: {
            y:70
        },
        style: {
            borderRadius: "6px",
            fontFamily: "Roboto",
            fontSize: "20px",
          background: "linear-gradient(to right, #007300, #329932)",
        }
      }).showToast();
}

const throwTostifyError = (name) => {
    Toastify({
        text: `${name} inválido`,
        className: "",
        position: "center",
        stopOnFocus: true,
        offset: {
            y:70
        },
        style: {
            borderRadius: "6px",
            fontFamily: "Roboto",
            fontSize: "20px",
          background: "linear-gradient(to right, #e50000, #ff1919)",
        }
      }).showToast();
}

const ResetInputValue = () => {

    console.log('entrei')

    const resetName = document.getElementById('profile_name')
    const Resetfile_path = document.getElementById('file_path')
    const Resetad_link = document.getElementById('ad_link')

    resetName.value = ''
    Resetfile_path.value = ''
    Resetad_link.value = ''
} 


const sendJsonToAPI = async (formData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if(!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()

        ResetInputValue()

        throwTostifyAccepted()

    } catch (error) {
        console.log('Error creating profile: ', error)
    }
}

const validateData = (name, arquivo, link, choice) => {

    if(name.trim() === '') {
        throwTostifyError('Nome')
        return false
    }

    if(arquivo.trim() === '') {
        throwTostifyError('Nome do Arquivo')
        return false
    }

    if(link.trim() === '') {
        throwTostifyError('Link')
        return false
    }

    return true

}



const PostFormData = () => {
    
    const name = document.getElementById('profile_name').value;
    const arquivo = document.getElementById('file_path').value;
    const link = document.getElementById('ad_link').value;
    const choice = 'pause'

    if(validateData(name, arquivo, link, choice)) {
        
        const formData = {
            name: name,
            arquivo: `C:/Users/Kayky/OneDrive/Desktop/projeto-agencia-js/src/profiles/${arquivo}.lnk`,
            link: link,
            choice: choice
        }

        sendJsonToAPI(formData)
    }
}

button.addEventListener('click', function(e) {
    e.preventDefault();
    PostFormData()
})