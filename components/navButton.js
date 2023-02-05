

export function handleNavButton(value, iconName, iconColor, current, href){
    var outer = document.createElement('div')
    var inner = document.createElement('div')
    var icon = document.createElement('i')
    var link = document.createElement('a')

    // button.className = classname
    // outer.innerHTML = inner
    outer.insertAdjacentElement('beforeend', inner)
    inner.insertAdjacentElement('beforeend', icon)
    inner.insertAdjacentElement('beforeend', link)

    // inner.innerHTML = icon + link
    link.innerHTML = value
    link.href = href

    icon.ariaHidden = 'true'
    icon.className = iconName


    var inStyle = inner.style

    

    outer.style.marginBottom = '20px'



    inStyle.display = 'flex'
    inStyle.alignItems = 'center'
    inStyle.justifyContent = 'flex-start'
    inStyle.padding = '10px'
    inStyle.width = 'fit-content'



    icon.style.width = '25px'
    icon.style.color = iconColor

    link.style.color = '#54595f'

    inner.onmouseover = function (){
        inStyle.cursor = 'pointer'
        icon.style.color = '#f8931e'
        link.style.color = '#f8931e'
    }

    inner.onmouseleave = function (){
        inStyle.cursor = 'pointer'
        icon.style.color = iconColor
        link.style.color = '#54595f'
    }


    if(current){
        
        link.disabled = true

        inStyle.width = '80%'
        inStyle.borderRadius = '0 25px 25px 0'
        inStyle.backgroundColor = '#54595f'
        inStyle.cursor = 'unset'

        link.style.color = 'white'
        link.style.cursor = 'default'
        link.style.pointerEvents = 'none'

        inner.onmouseover = function (){}
        inner.onmouseleave = function (){}
        
    }


    return outer
}
