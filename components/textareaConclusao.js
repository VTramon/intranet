



export function textareaConclusao(isDisabled, value = '') {
    const textContainer = document.createElement('div')
    const textLabel = document.createElement('label')
    const textarea = document.createElement('textarea')


    textContainer.insertAdjacentElement('beforeend', textLabel)
    textContainer.insertAdjacentElement('beforeend', textarea)

    textContainer.className = 'input_container'

    textLabel.htmlFor = 'texto'
    textLabel.innerHTML = 'Solução'

    textarea.name = 'texto'
    textarea.id = 'textoConclusao'


    textarea.innerHTML = value
    textarea.disabled = isDisabled
    textarea.value = value



    return textContainer

}