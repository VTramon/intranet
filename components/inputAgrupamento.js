



export function inputAgrupamento(options, isDisabled, value) {
    const inputContainer = document.createElement('div')
    const inputLabel = document.createElement('label')
    const input = document.createElement('input')
    const datalist = document.createElement('datalist')
    // const option = document.createElement('option')

    inputContainer.insertAdjacentElement('beforeend', inputLabel)
    inputContainer.insertAdjacentElement('beforeend', input)
    inputContainer.insertAdjacentElement('beforeend', datalist)


    for (var i = 0; i < options.length; i++) {
        const option = document.createElement('option')
        option.innerHTML = options[i]
        option.value = options[i]

        datalist.insertAdjacentElement('beforeend', option)
    }

    inputContainer.className = 'input_container'

    inputLabel.innerHTML = 'Agrupamento'
    inputLabel.htmlFor = 'input'

    input.autocomplete = 'off'
    input.role = 'combobox'
    // input.list = 'li'
    input.id = 'input'
    input.name = 'input'
    input.disabled = isDisabled
    input.value = value

    datalist.id = 'datalist'
    datalist.role = 'listbox'

    return inputContainer

}