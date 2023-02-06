

export function handleButton(id, value, type, disabled){
    var button = document.createElement('button')
    button.id = id
    var style = button.style



    button.innerHTML = value

    button.disabled = disabled


    if(type === 'submit'){
        style.padding = '10px'
        style.border = '1px solid #F8931E'
        style.borderRadius = '8px'
        style.backgroundColor = 'transparent'
        style.transition = 'ease-in-out 0.1s'

        button.onmouseover = function (){
            style.cursor = 'pointer'
            style.color = '#344e91'
            style.backgroundColor = ' #F8931E'
            style.transform = 'scale(1.3)'
            style.fontWeight = 'bold'
            style.fontWeight = 'bold'
            style.transition = 'ease-in-out 0.1s'
        }

        button.onmouseleave = function (){
            style.cursor = 'unset'
            style.color = 'unset'
            style.backgroundColor = 'transparent'
            style.transform = 'unset'
            style.fontWeight = 'usnet'
            style.fontWeight = 'unset'
        }
    }

    if(type === 'issue'){
        var link = document.createElement('a')
        var icon = document.createElement('i')

        button.insertAdjacentElement('afterbegin', icon)
        link.insertAdjacentElement('afterbegin', button)

        link.href = 'http://intranet/'


        icon.className = 'fa-solid fa-headset'

        icon.style.fontSize = '30px'
        icon.style.color = 'white'
        icon.style.marginRight = '10px'
        icon.style.content = '\f590'



        style.textAlign = 'center'
        style.color = 'white'
        style.fontFamily = 'Roboto'
        style.fontSize = '16px'
        style.fontWeight = 'normal'

        style.display = 'flex'
        style.alignItems = 'center'
        style.justifyContent = 'center'
        style.width = '90%'
        style.marginLeft = '5%'
        style.marginTop = '25px'
        style.marginBottom = '25px'
        style.padding = '15px'
        style.borderRadius = '25px'
        style.backgroundColor = '#ff5544'
        style.boxShadow = '0 0 15px gray'


        button.onmouseover = function (){
            style.cursor = 'pointer'
            style.color = '#ff5544'
            style.backgroundColor = 'white'

            icon.style.color = '#ff5544'
        }

        button.onmouseleave = function (){
            style.cursor = 'unset'
            style.color = 'white'
            style.backgroundColor = '#ff5544'

            icon.style.color = 'white'
        }

        return link

    }

    return button
}
