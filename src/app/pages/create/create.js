// const axios = require('axios')
const url = "http://localhost:3000/";

const button = document.getElementById('formButton');

const sendJsonToAPI = async (formData) => {
    console.log('SENDING JSON TO API...')
    console.log(formData)
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
        console.log('Perfil Criado com sucesso: ',data)

    } catch (error) {
        console.log('Error creating profile: ', error)
    }
}



const PostFormData = () => {
    
    const name = document.getElementById('profile_name').value;
    const arquivo = document.getElementById('file_path').value;
    const link = document.getElementById('ad_link').value;
    const choice = 'stop'

    // TRATATIVA DE ERROS!

    const formData = {
        name: name,
        arquivo: `C:/Users/Kayky/OneDrive/Desktop/projeto-agencia-js/src/profiles/${arquivo}.lnk`,
        link: link,
        choice: choice
    }

    console.log(formData)

    sendJsonToAPI(formData)


}

button.addEventListener('click', function(e) {
    e.preventDefault();

    PostFormData()

})