export function servicoContainer(name){
    var container = document.createElement('ul')
    var label = document.createElement('div')
    var text = document.createElement('h3')

    container.insertAdjacentElement('afterbegin', label)
    label.insertAdjacentElement('afterbegin', text)


    text.innerHTML = name


    container.className = 'dataList ' + name
    container.id = name + 'ContainerList'

    var conStyle = container.style

    
    conStyle.width = '40%'
    conStyle.marginTop = '50px'
    conStyle.display = 'flex'
    conStyle.flexDirection = 'column'
    conStyle.justifyContent = 'flex-start'
    conStyle.alignItems = 'center'
    conStyle.borderRadius = '8px 8px 0 0'


    var laStyle = label.style

    laStyle.width = '100%'
    laStyle.backgroundColor = '#344e91'
    laStyle.borderRadius = '8px 8px 0 0'
    laStyle.marginBottom = '50px'
    laStyle.padding = '8px'

    text.style.color = 'white'
    text.style.textAlign = 'center'


    return container

}