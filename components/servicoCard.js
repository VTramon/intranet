
var urgency = 'red'


export function servicoCard(data) {
    var cardLink = document.createElement('a')
    cardLink.href = '/servico/index.php?id=' + data['Idrequisicao']

    var card = document.createElement('li')
    card.id = 'card' + data['Idrequisicao']
    card.className = 'card'

    var user = document.createElement('p')
    user.className = 'usuario'
    user.innerHTML = data['Usuario']

    // var setor = document.createElement('p')
    // setor.id = 'setor'
    // setor.innerHTML = 'para: ' + data['Setor']

    // var setorContainer = document.createElement('div')
    // setorContainer.className = 'setor_container'

    // var texto = document.createElement('p')
    // texto.className = 'texto'
    // texto.innerHTML = data['Textorequisicao']

    var statusContainer = document.createElement('div')
    statusContainer.className = 'status_container ' + handleStatusClass(data['Status'])

    // var statusClass = document.createElement('div')
    // statusClass.className = handleStatusClass(data['Status'])

    var status = document.createElement('p')
    status.innerHTML = handleStatusSpan(data['Status'])

    var timeContainer = document.createElement('div')
    var time = document.createElement('p')
    time.className = 'created_at'
    const timeDiff = handleTime(data['Createdat'].date)
    time.innerHTML = timeDiff

    cardLink.insertAdjacentElement('afterbegin', card)
    card.insertAdjacentElement('beforeend', user)
    // card.insertAdjacentElement('beforeend', setorContainer)
    // setorContainer.insertAdjacentElement('beforeend', setor)
    // card.insertAdjacentElement('beforeend', texto)
    card.insertAdjacentElement('beforeend', statusContainer)
    card.insertAdjacentElement('beforeend', timeContainer)
    timeContainer.insertAdjacentElement('beforeend', time)

    // statusContainer.insertAdjacentElement('beforeend', statusClass)
    statusContainer.insertAdjacentElement('beforeend', status)

    //////////////// card styles ////////////////

    cardLink.style.width = '100%'
    // cardLink.style.width = 'calc(100% + 1px)'

    var styleC = card.style

    styleC.display = 'flex'
    styleC.justifyContent = 'space-between'
    styleC.alignItems = 'center'
    styleC.width = '100%'
    styleC.height = '60px'
    // styleC.border = '1px solid #004b9e'
    // styleC.borderRadius = '8px'
    styleC.border = '1px solid #004b9e'
    styleC.borderTop = 'none'
    styleC.backgroundColor = 'inherit'
    styleC.marginBottom = '-1px'

    for (var i = 0; i < card.children.length; i++) {
        card.children[i].style.margin = '0 15px'
        card.children[i].style.display = 'flex'
        card.children[i].style.flex = '1'
    }

    card.onmouseover = function () {
        styleC.backgroundColor = '#fa922298'
        styleC.cursor = 'pointer'
        // styleC.width = 'calc(80vw + 5px)'
    }
    card.onmouseleave = function () {
        styleC.backgroundColor = 'unset'
        styleC.cursor = 'unset'
        // styleC.width = '80vw'
    }


    //////////////// user styles ////////////////


    user.style.flex = '1'
    user.style.textAlign = 'center'
    user.style.display = 'inline'



    // var styleT = texto.style

    // styleT.flex = '3'
    // styleT.whiteSpace = 'nowrap'
    // styleT.textOverflow = 'ellipsis'
    // styleT.overflow = 'hidden'


    //////////////// status styles ////////////////

    var styleS = statusContainer.style

    styleS.borderRadius = '8px'
    styleS.padding = '5px'
    styleS.flex = 'unset'

    if (data['Status'] === 'A revisar') {
        styleS.border = '1px solid rgb(255, 94, 0)'
    }

    if (data['Status'] === 'Revisado') {
        styleS.border = '1px solid green'
    }

    if (data['Status'] === 'Concluido') {
        styleS.border = '1px solid rgb(0, 89, 255)'
    }


    //////////////// date styles ////////////////

    timeContainer.style.display = 'flex'
    timeContainer.style.justifyContent = 'center'


    time.style.backgroundColor = urgency
    if (urgency == 'yellow') {
        time.style.color = 'black'
    } else {
        time.style.color = 'white'
    }
    // time.style.backgroundColor = 'red'
    time.style.padding = '8px'
    time.style.borderRadius = '8px'
    time.style.border = '1px solid rgb(255, 94, 0)'
    time.style.display = 'unset'
    time.style.textAlign = 'center'

    return cardLink
}


function handleTime(date) {
    const now = new Date()
    const then = new Date(date)

    var diff = Math.abs(now - then)

    const sec = Math.floor(diff / (1000))
    const min = Math.floor(diff / (1000 * 60))
    const hour = Math.floor(diff / (1000 * 60 * 60))
    const day = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (day == 1) {
        urgency = 'red'
        return day + ' dia'
    }

    if (day > 1) {
        urgency = 'black'
        return day + ' dias'
    }

    if (hour >= 1) {
        urgency = 'yellow'
        return hour + ' H'
    }

    if (hour <= 1) {
        urgency = 'green'
    }

    if (min >= 1) {
        return min + ' min'
    }

    if (sec >= 1) {
        return sec + ' sec'
    }

    // console.log(Math.floor(diff / (1000 * 60 * 60)))
    // console.log(Math.floor(diff / (1000 * 60 * 60 * 24)))

    return day + ' dia'
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

