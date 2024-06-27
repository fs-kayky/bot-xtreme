const populateSelect = () => {
    const url = "../../../profiles/profiles.JSON";
  
    fetch(url).then((response) => {
      response.json().then((data) => {
        let select = document.getElementById("select_profile");
  
        for (const obj of data) {
          const select_option = new Option(obj.name);
          select.appendChild(select_option);
        }
      });
    });
  };

  populateSelect()
  

  const throwTostifyError = (message) => {
    Toastify({
        text: `${message}`,
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

const throwTostifyAccepted = (message) => {
  Toastify({
      text: `${message}`,
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

const url = "../../../profiles/profiles.JSON";

const CallAPItoEditProfile = async (id, formData) => {

  try {
    const response = await fetch(`http://localhost:3000/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
    });
  }catch (error) {
    console.log(error)
  }
}
  
  const CallAPItoDeleteProfile = async (id) => {

      try {
        const response = await fetch(`http://localhost:3000/${id}`, {method: "DELETE"})
        location.reload()

      } catch(error) {
        throwTostifyError('Erro ao deletar perfil!')
      }

  }
 
  
  const OnClickDeleteHandler = () => {
    const select_profile = document.getElementById('select_profile').value
    
  fetch(url).then((response) => {
    response.json().then((data) => {

      for(const obj of data) {
      if(obj.name === select_profile) {
          CallAPItoDeleteProfile(obj.id)
        }
      }

    });
  });
};

const OnClickEditHandler = () => {

  const select_profile = document.getElementById('select_profile').value.trim()
  const new_name = document.getElementById('profile_name').value.trim()
  const new_path = document.getElementById('file_path').value.trim()
  const new_link = document.getElementById('ad_link').value.trim()

  if(new_name === '' && new_path === '' && new_link === '') {
    throwTostifyError('Insira informações validas!')
  } else {

    const formData = {}

    if(new_name != '') {
      formData.name = `${new_name}`
    }

    if(new_path != '') {
      formData.arquivo = `C:/Users/Kayky/OneDrive/Desktop/projeto-agencia-js/src/profiles/${new_path}.lnk`
    }

    if(new_link != '') {
      formData.link = `${new_link}`
    }

    const JSONForm = JSON.stringify(formData)

    fetch(url).then((response) => {
      response.json().then((data) => {
        for(const obj of data) {
        if(obj.name === select_profile) {
            CallAPItoEditProfile(obj.id, JSONForm)
            throwTostifyAccepted('Perfil Editado com sucesso!')
          }
        }
  
      });
    });

  }
  

}