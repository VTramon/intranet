





export function servicoDetailCard(labelName, textId) {

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
    // text.style.textOverflow = ''


    text.id = textId
    text.style.textAlign = 'justify'
    text.style.overflowWrap = 'break-word'



    return container
}