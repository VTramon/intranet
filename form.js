
input.addEventListener('focusout', () => {
  setTimeout(() => {
    datalist.style.display = 'none'
    input.style.borderRadius = '5px'
  }, 100)
})

input.onfocus = function () {
  datalist.style.display = 'block'
  input.style.borderRadius = '5px 5px 0 0'
}

for (let option of datalist.options) {
  option.addEventListener('click', () => {
    input.value = option.value
    datalist.style.display = 'none'
    input.style.borderRadius = '5px'
  })
}

input.oninput = function () {
  currentFocus = -1
  var text = input.value.toUpperCase()
  for (let option of datalist.options) {
    if (option.value.toUpperCase().indexOf(text) > -1) {
      option.style.display = 'block'
    } else {
      option.style.display = 'none'
    }
  }
}

var currentFocus = -1
var maxFocus = currentFocus
var minFocus = 0

// datalist.onscroll = function(){
//   console.log(datalist.scrollTop)
// }

input.onkeydown = function (e) {
  if (e.keyCode == 40) {
    currentFocus++
    if (maxFocus < currentFocus) maxFocus = currentFocus
    if (currentFocus - minFocus > 3) {
      minFocus += 1
      datalist.scrollBy(0, 32)
    }
    addActive(datalist.options)

  } else if (e.keyCode == 38) {
    currentFocus--
    if (minFocus > currentFocus) minFocus = currentFocus
    if (maxFocus - currentFocus > 3) {
      maxFocus -= 1
      datalist.scrollBy(0, -32)
    }
    addActive(datalist.options)

  } else if (e.keyCode == 13) {
    e.preventDefault()
    if (currentFocus > -1) {
      /*and simulate a click on the "active" item:*/
      if (datalist.options) datalist.options[currentFocus].click()
    }
  }
}

function addActive(x) {
  if (!x) return false
  removeActive(x)
  if (currentFocus >= x.length) {
    currentFocus = 0
    minFocus = 0
    maxFocus = 0
    datalist.scrollTo(0, 0)
  }
  if (currentFocus < 0) {
    currentFocus = x.length - 1
    minFocus = x.length - 1
    maxFocus = x.length - 1
    datalist.scrollTo(0, (x.length - 1) * 32)
  }
  x[currentFocus].classList.add('active')
}

function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove('active')
  }
}
