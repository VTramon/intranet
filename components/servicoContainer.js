export function servicoContainer(name) {
    var container = document.createElement('div')
    var containerList = document.createElement('ul')
    var label = document.createElement('div')
    var text = document.createElement('h3')

    container.insertAdjacentElement('afterbegin', label)
    container.insertAdjacentElement('beforeend', containerList)
    label.insertAdjacentElement('afterbegin', text)


    text.innerHTML = name


    container.className = 'dataList ' + name
    containerList.id = name + 'ContainerList'

    var conLiStyle = containerList.style
    var conStyle = container.style


    conStyle.width = '40%'
    conStyle.maxWidth = '500px'
    conStyle.margin = '0 20px'
    conStyle.marginTop = '50px'
    conStyle.display = 'flex'
    conStyle.flexDirection = 'column'
    conStyle.justifyContent = 'flex-start'
    conStyle.alignItems = 'flex-start'
    conStyle.maxHeight = '70vh'
    conStyle.minHeight = '150px'
    // conStyle.borderBottom = '1px solid #fa922298'
    // conStyle.paddingRight = '-5px'
    // conStyle.overflowY = 'scroll'

    conLiStyle.width = 'calc(100% + 5px)'
    conLiStyle.height = '100%'
    conLiStyle.display = 'flex'
    conLiStyle.flexDirection = 'column'
    conLiStyle.justifyContent = 'flex-start'
    conLiStyle.alignItems = 'center'
    conLiStyle.overflowY = 'scroll'
    // conLiStyle.position = 'relative'
    // conLiStyle.marginRight = '-5px'


    // conStyle.borderRadius = '8px 8px 0 0'
    // conStyle.borderBottom = '1px solid gray'


    var laStyle = label.style

    laStyle.width = '100%'
    laStyle.backgroundColor = '#344e91'
    laStyle.borderRadius = '8px 8px 0 0'
    // laStyle.marginBottom = '15px'
    laStyle.padding = '8px'

    text.style.color = 'white'
    text.style.textAlign = 'center'


    return container

}