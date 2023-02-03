var formResult = {
  setor: null,
  texto: null,
  arquivos: [],
}

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
