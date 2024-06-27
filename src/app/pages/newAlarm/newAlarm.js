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

const throwTostifyAccepted = () => {
    Toastify({
        text: `Alarme criado com sucesso!`,
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
        text: `Erro na criação do Alarme`,
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


const SetTriggerHour = (hora, minuto) => {
    const triggerHour = new Date();
    triggerHour.setHours(hora, minuto, 0);
    
    return triggerHour;
};

const DifferenceWaitTime = (triggerHour) => {
    const now = new Date();
    const diffTime = triggerHour.getTime() - now.getTime();
    
    return diffTime >= 0 ? diffTime : diffTime + 24 * 60 * 60 * 1000;
};

const url = "http://localhost:3000/exec";

const queue = [];

const ExecScriptInAPI = async () => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                profile: `${queue[0]}`,
            }),
        });

        queue.shift();
    } catch (error) {
        throwTostifyError()
    }
};

const TriggerFunction = (func, hora, minuto) => {
    const Trigger = SetTriggerHour(hora, minuto);
    
    const awaitTime = DifferenceWaitTime(Trigger);
    
    const selected_profile = document.getElementById("select_profile").value;
    
    queue.push(selected_profile);
    
    throwTostifyAccepted()

    setTimeout(func, awaitTime);
};

const ButtonClickHandler = () => {
    const timeInputElement = document.getElementById("select_time");
    const selectedTime = timeInputElement.value;
    
    const [hours, minutes] = selectedTime.split(":");
    
    TriggerFunction(ExecScriptInAPI, hours, minutes);
};

populateSelect();