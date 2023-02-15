



export function textareaConclusao(options, isDisabled) {
    const textContainer = document.createElement('div')
    const textLabel = document.createElement('label')
    const textarea = document.createElement('textarea')


    textContainer.insertAdjacentElement('beforeend', textLabel)
    textContainer.insertAdjacentElement('beforeend', textarea)

    textContainer.className = 'input_container'

    textLabel.htmlFor = 'texto'
    textLabel.innerHTML = 'Solução'

    // textarea.type = 'text'
    textarea.name = 'texto'
    textarea.id = 'texto'



    return textContainer

}