


import { handleButton } from '../components/button.js'
import { inputAgrupamento } from '../components/inputAgrupamento.js'
import { textareaConclusao } from '../components/textareaConclusao.js'
import { servicoDetailCard } from '../components/servicoDetailCard.js'

const servicoId = window.location.href.split('id=')[1]


// ----------------------Pega todos os dados do BD----------------------//


async function getServicoData() {
  return await fetch('/server/index.php/servico?id=' + servicoId).then((res) => res.json())
}

async function getResponsavel(setor, user) {
  // console.log("Setor: " + setor)
  // console.log("User: " + user)
  var response = false
  var data = await fetch('/server/responsaveis.php?setor=' + setor).then(res => res.json())
  for (var i = 0; data.length; i++) {
    // console.log(data[i] == user)
    if (data[i] == user) {
      response = true
      break
    }
  }
  return response
}


const servicoData = await getServicoData()
// console.log(servicoData)



// ----------------------Exibi a imagem do serviço----------------------//

var imgContainer = document.getElementById('image_container')
if (servicoData['Imagem']) {
  var imagem = document.createElement('img')
  imagem.src = '/server/index.php/imagem?id=' + servicoData['Imagem']
  imagem.alt = 'imagem da requisição'

  imgContainer.insertAdjacentElement('afterbegin', imagem)
}




// ----------------------Insere cards da requisicao----------------------//

const details = [['usuario', 'Usuário'], ['setor', 'Setor'], ['criado', 'Criado'], ['texto_requisicao', 'Texto']]

var detailsContainer = document.getElementById('service_details')

for (var i = 0; i < details.length; i++) {
  detailsContainer.insertAdjacentElement('beforeend', servicoDetailCard(details[i][1], details[i][0]))
}




// ----------------------Exibi dados da requisição----------------------//


document.getElementById('usuario').innerHTML = servicoData['Usuario']
document.getElementById('setor').innerHTML = servicoData['Setor']
document.getElementById('criado').innerHTML = new Date(servicoData['Createdat']['date']).toLocaleString()
document.getElementById('texto_requisicao').innerHTML = servicoData['Textorequisicao']


if (servicoData['Completedat']) {

  document.getElementById('created_container').insertAdjacentElement('afterend', servicoDetailCard('Concluido', 'concluido'))

  document.getElementById('concluido').innerHTML = new Date(servicoData['Completedat']['date']).toLocaleString()
}

if (servicoData['Updatedat']) {
  document.getElementById('created_container').insertAdjacentElement('afterend', servicoDetailCard('Atualizado', 'atualizado'))

  document.getElementById('atualizado').innerHTML = new Date(servicoData['Updatedat']['date']).toLocaleString()
}



var input = document.getElementById('input')
var texto = document.getElementById('texto_requisicao')
// console.log(texto)


if (servicoData['Agrupamento'] && input != null) {
  input.value = servicoData['Agrupamento']
}

if (servicoData['Textoconclusao'] && texto != null) {
  texto.innerHTML = servicoData['Textorequisicao']
}



// ----------------------Exibe o botões dos formulários----------------------//

const hiddenUsername = document.getElementById('username_hidden_input')
const regex = new RegExp('vitor\\.lemos|fasmj|francisco\\.junior|rafael\\.moraes').test(hiddenUsername.value)

if ((await getResponsavel(servicoData['Setor'], hiddenUsername.value) && servicoData['Status'] == 'Revisado') || (regex && servicoData['Status'] == 'Revisado')) {
  document.getElementById('conclude_form').appendChild(handleButton('conclude_form_button', 'Finalizar Requisição', 'submit', false))
}

if (document.getElementById('hidden_editable')) {
  document.getElementById('enviar').disabled = true
}





// ---------------------- Exibi Formulário ----------------------//

const agrupamentos = ['Software', 'Hardware', 'RM', 'Operacional']

// As variáveis "hiddenUsername" e "regex" já foram declaradas anteriormente //

const updateForm = document.getElementById('update_form')
if (servicoData['Agrupamento'] && (regex || await getResponsavel(servicoData['Setor'], hiddenUsername.value))) {
  const activateButton = document.createElement('button')
  activateButton.id = 'edit_button'
  activateButton.innerHTML = 'Habilitar'

  var agrupamento = await fetch('/server/index.php/agrupamento?id=' + servicoData['Agrupamento']).then(res => res.json()).then(res => res['Tipoagrupamento'])

  updateForm.insertAdjacentElement('afterbegin', activateButton)
  updateForm.insertAdjacentElement('afterbegin', textareaConclusao(true, servicoData['Textoconclusao']))
  updateForm.insertAdjacentElement('afterbegin', inputAgrupamento(agrupamentos, true, agrupamento))

  document.getElementById('update_form').insertAdjacentElement('beforeend', handleButton('enviar', 'Enviar', 'submit', true))
}

if (servicoData['Agrupamento'] && !(regex || await getResponsavel(servicoData['Setor'], hiddenUsername.value))) {
  var agrupamento = await fetch('/server/index.php/agrupamento?id=' + servicoData['Agrupamento']).then(res => res.json()).then(res => res['Tipoagrupamento'])

  document.getElementById('service_details').insertAdjacentElement('beforeend', servicoDetailCard('Agrupamento', 'agrupamento', agrupamento))
  document.getElementById('service_details').insertAdjacentElement('beforeend', servicoDetailCard('Conclusão', 'conclusao', servicoData['Textoconclusao']))
}

if (!servicoData['Agrupamento'] && (regex || await getResponsavel(servicoData['Setor'], hiddenUsername.value))) {
  updateForm.insertAdjacentElement('afterbegin', textareaConclusao(false))
  updateForm.insertAdjacentElement('afterbegin', inputAgrupamento(agrupamentos, false))

  document.getElementById('update_form').insertAdjacentElement('beforeend', handleButton('enviar', 'Enviar', 'submit', false))
}

if (!servicoData['Agrupamento'] && !(regex || await getResponsavel(servicoData['Setor'], hiddenUsername.value))) {
  // retornar nada
}




// ---------------------- Script Formulário ----------------------//

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




// ----------------------Habilitar/desabilitar----------------------//

// as variáveis "input" e "texto" já foram declardas anteriormente //

// var input = document.getElementById('input')
var textoConclusao = document.getElementById('textoConclusao')
var editButton = document.getElementById('edit_button')
var submitButton = document.getElementById('enviar')

if (editButton != null) {
  editButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (editButton.innerHTML == 'Habilitar') {
      editButton.innerHTML = 'Desabilitar'

      input.disabled = false
      textoConclusao.disabled = false
      submitButton.disabled = false
    } else {
      editButton.innerHTML = 'Habilitar'
      input.disabled = true
      textoConclusao.disabled = true
      submitButton.disabled = true
    }
  })
}
