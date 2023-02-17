





export function servicoDetailCard(labelName, textId, value) {

    var container = document.createElement('div')
    var labelContainer = document.createElement('div')
    var label = document.createElement('span')
    var text = document.createElement('p')

    labelContainer.insertAdjacentElement('beforeend', label)
    container.insertAdjacentElement('beforeend', labelContainer)
    container.insertAdjacentElement('beforeend', text)

    container.className = 'data_container'
    container.style.marginBottom = '25px'
    if (textId == 'criado') {
        container.id = 'created_container'
    }
    label.innerHTML = labelName + ':'


    labelContainer.style.float = 'left'
    label.style.marginRight = '10px'
    label.style.fontWeight = 'bold'
    label.style.color = '#F8931E'
    label.style.fontSize = '18px'
    // text.style.textOverflow = ''


    text.id = textId
    text.style.fontSize = '18px'
    text.style.textAlign = 'justify'
    text.style.overflowWrap = 'break-word'

    if (value) {
        text.innerHTML = value
    }



    return container
}