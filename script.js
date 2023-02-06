// var formResult = {
//   setor: null,
//   texto: null,
//   arquivos: [],
// }

import { handleButton } from './components/button.js'
import { handleNavButton } from './components/navButton.js'

  // ------------------------------components------------------------------//


const intranet = 'http://intranet/'
const sidebarIcons=[
  {
    icon: 'fas fa-home',
    iconColor: 'black',
    value: 'Home',
    link: intranet + 'sobre-a-tecal/',
    current: null
  },
  {
    icon: 'fas fa-building',
    iconColor: '#8f6ee5',
    value: 'Sobre a Tecal',
    link: intranet + 'politicas-2/',
    current: null
  },
  {
    icon: 'fas fa-globe',
    iconColor: '#6bbbe0',
    value: 'Políticas',
    link: intranet + 'procedimentos_01/',
    current: null
  },
  {
    icon: 'fas fa-book-reader',
    iconColor: '#d1628e',
    value: 'Procedimentos',
    link: intranet + 'manuais/',
    current: null
  },
  {
    icon: 'fas fa-clipboard-check',
    iconColor: '#23a455',
    value: 'Manuais',
    link: intranet + 'formularios/',
    current: null
  },
  {
    icon: 'fas fa-clipboard-list',
    iconColor: '#23a4a4',
    value: 'Formulários',
    link: intranet + 'contatos/',
    current: null
  },
  {
    icon: 'far fa-address-book',
    iconColor: '#024ea2',
    value: 'Contatos',
    link: intranet + 'aniversarios/',
    current: null
  },
  {
    icon: 'fas fa-birthday-cake',
    iconColor: '#e5021c',
    value: 'Aniversários',
    link: intranet + 'leis-normas/',
    current: null
  },
  {
    icon: 'fas fa-exclamation-circle',
    iconColor: '#842de99e',
    value: 'Leis & Normas',
    link: intranet + 'convenios/',
    current: null
  },
  {
    icon: 'fas fa-hands-helping',
    iconColor: '#f2ca02',
    value: 'Convênios & Parcerias',
    link: intranet + '_blank',
    current: null
  },
  {
    icon: 'fab fa-servicestack',
    iconColor: null,
    value: 'Solicitação de Serviço',
    link: intranet+'',
    current: true
  },

]



const setores = [
  'Administração',
  'Facilities',
  'TI',
  'RH',
  'Financeiro',
  'DP',
  'Comercial',
  'Projetos',
  'Suprimentos',
  'Engenharia',
  'SESMET',
]

document.getElementById('form').appendChild(handleButton('submit_button', 'Enviar', 'submit'))
document.getElementById('logo_container').insertAdjacentElement('afterend', handleButton('issue_button_container', 'Críticas & Sugestões', 'issue'))
var navbar = document.getElementById('buttons_nav')

for (var i = 0; i < sidebarIcons.length; i++) {
  // sidebarIcons.array.map((data) => {
    navbar.insertAdjacentElement('beforeend', handleNavButton(sidebarIcons[i].value, sidebarIcons[i].icon, sidebarIcons[i].iconColor, sidebarIcons[i].current, sidebarIcons[i].link))
  // });
}

  // ------------------------------submit button------------------------------//


document
  .getElementById('submit_button')
  .addEventListener('click', function (e) {
    e.preventDefault()

    const texto = document.getElementById('texto').value


    if (texto === '') {
      alert('Por favor insira uma breve descrição do ocorido.')
      return 0
    }

    const setor = document.getElementById('input').value

    var isSetorValid = false

    for (var i = 0; i < setores.length; i++) {
      if (setor === setores[i]) {
        isSetorValid = true
        break
      }
    }


    if (isSetorValid == false) {
      alert(
        'O setor informado não existe ou foi escrito de forma incorreta, por favor verifique os dados inseridos'
      )
    } else {
      document.getElementById("form").submit()
    }
  })



  // ------------------------------form------------------------------//



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
  
  
  input.onkeydown = function (e) {
    if (e.keyCode == 40) {
      currentFocus++
      if(maxFocus<currentFocus) maxFocus = currentFocus
      if(currentFocus-minFocus>3) {
        minFocus += 1
        datalist.scrollBy(0, 32)
      }
      addActive(datalist.options)
      input.value = datalist.options[currentFocus].value
      
    } else if (e.keyCode == 38) {
      currentFocus--
      if(minFocus>currentFocus) minFocus = currentFocus
      if(maxFocus-currentFocus>3) {
        maxFocus -= 1
        datalist.scrollBy(0, -32)
      }
      addActive(datalist.options)
      input.value = datalist.options[currentFocus].value

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
      datalist.scrollTo(0,0)
    }
    if (currentFocus < 0) {
      currentFocus = x.length - 1
      minFocus = x.length - 1
      maxFocus = x.length - 1
      datalist.scrollTo(0,(x.length - 1)*32)
    }
    x[currentFocus].classList.add('active')
  }
  
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove('active')
    }
  }
  

