button = document.getElementById('edit_button')
input = document.getElementById('input')
texto = document.getElementById('texto')
submitButton = document.getElementById('enviar')


button.addEventListener('click', (e)=> {
    e.preventDefault()
    // console.log(button.innerHTML)
    if(button.innerHTML == 'Habilitar'){
        button.innerHTML = 'Desabilitar'

        input.disabled = false
        texto.disabled = false
        submitButton.disabled = false
    }else{
        button.innerHTML = 'Habilitar'
        input.disabled = true
        texto.disabled = true
        submitButton.disabled = true
    }
})

