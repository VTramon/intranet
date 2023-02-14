

export function handleNavButton(value, iconName, iconColor, current, href) {
    var outer = document.createElement('div')
    var link = document.createElement('a')
    var inner = document.createElement('div')
    var icon = document.createElement('i')
    var text = document.createElement('p')

    // button.className = classname
    // outer.innerHTML = inner
    outer.insertAdjacentElement('beforeend', link)
    link.insertAdjacentElement('beforeend', inner)
    inner.insertAdjacentElement('beforeend', icon)
    inner.insertAdjacentElement('beforeend', text)

    // inner.innerHTML = icon + text
    text.innerHTML = value
    link.href = href

    icon.ariaHidden = 'true'
    icon.className = iconName


    var inStyle = inner.style



    outer.style.marginBottom = '20px'

    link.style.display = 'block'
    link.style.width = 'fit-content'



    inStyle.display = 'flex'
    inStyle.alignItems = 'center'
    inStyle.justifyContent = 'flex-start'
    inStyle.padding = '10px'
    inStyle.width = 'fit-content'



    icon.style.width = '25px'
    icon.style.color = iconColor

    text.style.color = '#54595f'

    inner.onmouseover = function () {
        inStyle.cursor = 'pointer'
        icon.style.color = '#f8931e'
        text.style.color = '#f8931e'
    }

    inner.onmouseleave = function () {
        inStyle.cursor = 'pointer'
        icon.style.color = iconColor
        text.style.color = '#54595f'
    }


    if (current) {

        text.disabled = true

        inStyle.width = '100%'
        inStyle.borderRadius = '0 25px 25px 0'
        inStyle.backgroundColor = '#54595f'
        inStyle.cursor = 'unset'

        text.style.color = 'white'
        text.style.cursor = 'default'
        link.style.pointerEvents = 'none'

        inner.onmouseover = function () { }
        inner.onmouseleave = function () { }

    }


    return outer
}
