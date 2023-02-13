


import { handleButton } from '../components/button.js'

const servicoId = window.location.href.split('id=')[1]


// ----------------------Pega todos os dados do BD----------------------//


async function getServicoData() {
  return await fetch('./script.php?id=' + servicoId).then((res) => res.json())
}



const servicoData = await getServicoData()



// ----------------------Exibi a imagem do serviço----------------------//

var imgContainer = document.getElementById('image_container')
console.log(servicoData)
if (servicoData['Imagem']) {
  var imagem = document.createElement('img')
  imagem.src = '/image/index.php?id=' + servicoData['Imagem']
  imagem.alt = 'imagem da requisição'

  imgContainer.insertAdjacentElement('afterbegin', imagem)
}




// ----------------------Exibi dados da requisição----------------------//




document.getElementById('usuario').innerHTML = servicoData['Usuario']
document.getElementById('setor').innerHTML = servicoData['Setor']
document.getElementById('criado').innerHTML = new Date(servicoData['Createdat']['date']).toLocaleString()
document.getElementById('texto_requisicao').innerHTML = servicoData['Textorequisicao']

if (servicoData['Updatedat']) {
  var container = document.createElement('div')
  var text = document.createElement('p')

  document.getElementById('created_container').insertAdjacentElement('afterend', container)

  container.insertAdjacentElement('afterbegin', text)

  container.className = 'data_container'
  container.id = 'updated_container'

  text.innerHTML = 'Atualizado: ' + new Date(servicoData['Updatedat']['date']).toLocaleString()
}


if (servicoData['Completedat']) {
  var container = document.createElement('div')
  var text = document.createElement('p')

  document.getElementById('created_container').insertAdjacentElement('afterend', container)

  container.insertAdjacentElement('afterbegin', text)

  container.className = 'data_container'
  container.id = 'completed_container'

  text.innerHTML = 'Completo: ' + new Date(servicoData['Completedat']['date']).toLocaleString()
}


if (servicoData['Agrupamento']) {
  document.getElementById('input').value = servicoData['Agrupamento']
}

if (servicoData['Textoconclusao']) {
  document.getElementById('texto').innerHTML = servicoData['Textoconclusao']
}



// ----------------------Exibe o botões dos formulários----------------------//


if (document.getElementById('conclude_hidden_id_input')) {
  document.getElementById('conclude_form').appendChild(handleButton('conclude_form_button', 'Finalizar Requisição', 'submit', false))
}

if (document.getElementById('hidden_id')) {
  document.getElementById('hidden_id').insertAdjacentElement('afterend', handleButton('enviar', 'Enviar', 'submit', false))
}

if (document.getElementById('hidden_editable')) {
  document.getElementById('enviar').disabled = true
}



// ----------------------Habilitar/desabilitar----------------------//

var button = document.getElementById('edit_button')
var input = document.getElementById('input')
var texto = document.getElementById('texto')
var submitButton = document.getElementById('enviar')

if (button != null && input != null) {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    if (button.innerHTML == 'Habilitar') {
      button.innerHTML = 'Desabilitar'

      input.disabled = false
      texto.disabled = false
      submitButton.disabled = false
    } else {
      button.innerHTML = 'Habilitar'
      input.disabled = true
      texto.disabled = true
      submitButton.disabled = true
    }
  })
}


// ----------------------Formulário----------------------//

var input = document.getElementById('input')


if (input != null) {
  input.addEventListener('focusout', () => {
    setTimeout(() => {
      datalist.style.display = 'none'
      input.style.borderRadius = '5px'
    }, 100)
  })

  input.onfocus = function () {
    datalist.style.display = 'block'
    input.style.borderRadius = '5px 5px 0 0'
  }

  for (let option of datalist.options) {
    option.addEventListener('click', () => {
      input.value = option.value
      datalist.style.display = 'none'
      input.style.borderRadius = '5px'
    })
  }

  input.oninput = function () {
    currentFocus = -1
    var text = input.value.toUpperCase()
    for (let option of datalist.options) {
      if (option.value.toUpperCase().indexOf(text) > -1) {
        option.style.display = 'block'
      } else {
        option.style.display = 'none'
      }
    }
  }

  var currentFocus = -1
  var maxFocus = currentFocus
  var minFocus = 0

  datalist.onscroll = function () {
    console.log(datalist.scrollTop)
  }

  input.onkeydown = function (e) {
    if (e.keyCode == 40) {
      currentFocus++
      if (maxFocus < currentFocus) maxFocus = currentFocus
      if (currentFocus - minFocus > 3) {
        minFocus += 1
        datalist.scrollBy(0, 32)
      }
      addActive(datalist.options)

    } else if (e.keyCode == 38) {
      currentFocus--
      if (minFocus > currentFocus) minFocus = currentFocus
      if (maxFocus - currentFocus > 3) {
        maxFocus -= 1
        datalist.scrollBy(0, -32)
      }
      addActive(datalist.options)

    } else if (e.keyCode == 13) {
      e.preventDefault()
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (datalist.options) datalist.options[currentFocus].click()
      }
    }
  }

  function addActive(x) {
    if (!x) return false
    removeActive(x)
    if (currentFocus >= x.length) {
      currentFocus = 0
      minFocus = 0
      maxFocus = 0
      datalist.scrollTo(0, 0)
    }
    if (currentFocus < 0) {
      currentFocus = x.length - 1
      minFocus = x.length - 1
      maxFocus = x.length - 1
      datalist.scrollTo(0, (x.length - 1) * 32)
    }
    x[currentFocus].classList.add('active')
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove('active')
    }
  }
}


// ----------------------Finalizar Requisição----------------------//
var concludeButton = document.getElementById('conclude_form_button')

if (concludeButton) {
  concludeButton.addEventListener('click', (e) => {
    e.preventDefault()
    var r = confirm("Temcerteza de que deseja finalizar essa requisição?");
    if (r == true) {
      document.getElementById('conclude_form').submit()
    }
  })
}

