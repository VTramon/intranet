


import { handleButton } from '../components/button.js'
import { inputAgrupamento } from '../components/inputAgrupamento.js'
import { textareaConclusao } from '../components/textareaConclusao.js'

const servicoId = window.location.href.split('id=')[1]


// ----------------------Pega todos os dados do BD----------------------//


async function getServicoData() {
  return await fetch('/server/servico?id=' + servicoId).then((res) => res.json())
}



const servicoData = await getServicoData()



// ----------------------Exibi a imagem do serviço----------------------//

var imgContainer = document.getElementById('image_container')
// console.log(servicoData)
if (servicoData['Imagem']) {
  var imagem = document.createElement('img')
  imagem.src = '/server/imagem?id=' + servicoData['Imagem']
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

var input = document.getElementById('input')
var texto = document.getElementById('texto')


if (servicoData['Agrupamento'] && input != null) {
  input.value = servicoData['Agrupamento']
}

if (servicoData['Textoconclusao'] && texto != null) {
  texto.innerHTML = servicoData['Textoconclusao']
}



// ----------------------Exibe o botões dos formulários----------------------//

const hiddenUsername = document.getElementById('username_hidden_input')
const regex = new RegExp('vitor\\.lemos|fasmj|francisco\\.junior|luccas\\.moragas|rafael\\.moraes').test(hiddenUsername.value)

if (regex && (servicoData['Status'] == 'A revisar' || servicoData['Status'] == 'Revisado')) {
  document.getElementById('conclude_form').appendChild(handleButton('conclude_form_button', 'Finalizar Requisição', 'submit', false))
}


// if (document.getElementById('conclude_hidden_id_input')) {
//   document.getElementById('conclude_form').appendChild(handleButton('conclude_form_button', 'Finalizar Requisição', 'submit', false))
// }

// if (document.getElementById('update_form')) {
document.getElementById('update_form').insertAdjacentElement('beforeend', handleButton('enviar', 'Enviar', 'submit', false))
// }

if (document.getElementById('hidden_editable')) {
  document.getElementById('enviar').disabled = true
}



// ----------------------Habilitar/desabilitar----------------------//

// as variáveis "input" e "texto" já foram declardas anteriormente //

// var input = document.getElementById('input')
// var texto = document.getElementById('texto')
var button = document.getElementById('edit_button')
var submitButton = document.getElementById('enviar')

if (button != null) {
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


// ---------------------- Exibi Formulário ----------------------//

const agrupamentos = ['Software', 'Hardware', 'RM', 'Operacional']

// As variáveis "hiddenUsername" e "regex" já foram declaradas anteriormente //

const updateForm = document.getElementById('update_form')
if (servicoData['Agrupamento'] && regex) {
  const activateButton = document.createElement('button')
  activateButton.id = 'edit_button'
  activateButton.innerHTML = 'Habilitar'

  updateForm.insertAdjacentElement('afterbegin', activateButton)
  updateForm.insertAdjacentElement('afterbegin', textareaConclusao(agrupamentos, false))
  updateForm.insertAdjacentElement('afterbegin', inputAgrupamento(agrupamentos, false))
}

if (servicoData['Agrupamento'] && !regex) {
  // updateForm.insertAdjacentElement('beforeend', imputAgrupamento(agrupamentos, false))
}

if (!servicoData['Agrupamento'] && regex) {
  updateForm.insertAdjacentElement('afterbegin', textareaConclusao(agrupamentos, true))
  updateForm.insertAdjacentElement('afterbegin', inputAgrupamento(agrupamentos, true))


}

if (!servicoData['Agrupamento'] && !regex) {
  // retornar nada
}





// ---------------------- Script Formulário ----------------------//
// A variável "input" já foi declarda anteriormente //

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
    // console.log(datalist.scrollTop)
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
    input.value = x[currentFocus].value
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

// // ---------------------- Exibir "Finalizar Requisição" ----------------------//
// const hiddenUsername = document.getElementById('usernameHiddenInput')
// const regexp = 'vitor\\.lemos|fasmj|francisco\\.junior|luccas\\.moragas|rafael\\.moraes'

// if(hiddenUsername.value.match(regexp) == '' && (servicoData[Status] == 'A revisar' || servicoData[Status] == 'Revisado')){
//   var concInput = document.createElement('input')
//   concInput.id =
//   document.getElementById('conclude_form').insertAdjacentElement('afterbegin', )
// }