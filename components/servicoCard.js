


export function servicoCard(data) {
    var cardLink = document.createElement('a')
    cardLink.href = '/servico/index.php?id=' + data['Idrequisicao']

    var card = document.createElement('li')
    card.id = 'card' + data['Idrequisicao']
    card.className = 'card'

    var user = document.createElement('p')
    user.className = 'usuario'
    user.innerHTML = data['Usuario']

    var setor = document.createElement('p')
    setor.id = 'setor'
    setor.innerHTML = 'para: ' + data['Setor']

    var setorContainer = document.createElement('div')
    setorContainer.className = 'setor_container'

    var texto = document.createElement('p')
    texto.className = 'texto'
    texto.innerHTML = data['Textorequisicao']

    var statusContainer = document.createElement('div')
    statusContainer.className = 'status_container'

    var statusClass = document.createElement('div')
    statusClass.className = handleStatusClass(data['Status'])

    var status = document.createElement('p')
    status.innerHTML = handleStatusSpan(data['Status'])

    var time = document.createElement('p')
    time.className = 'created_at'
    time.innerHTML = handleTime(data['Createdat'])

    cardLink.insertAdjacentElement('afterbegin', card)
    card.insertAdjacentElement('beforeend', user)
    card.insertAdjacentElement('beforeend', setorContainer)
    setorContainer.insertAdjacentElement('beforeend', setor)
    card.insertAdjacentElement('beforeend', texto)
    card.insertAdjacentElement('beforeend', statusContainer)
    card.insertAdjacentElement('beforeend', time)

    statusContainer.insertAdjacentElement('beforeend', statusClass)
    statusClass.insertAdjacentElement('beforeend', status)

    return cardLink
}


function handleTime(date) {
    const now = new Date()
    const then = new Date(date)

    console.log(then)

    return '0 min'
}

function handleStatusClass(status) {
    if (status == 'A revisar') {
        return 'a_revisar'
    } else {
        return status.toLowerCase()
    }
}

function handleStatusSpan(status) {
    if (status == 'A revisar') {
        return 'À revisar'
    } else {
        return status
    }
}

