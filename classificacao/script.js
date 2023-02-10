import { servicoCard } from "../components/servicoCard.js"


async function getData() {
    return await fetch('/classificacao/server.php').
        then((res) => res.json())

}


async function printData() {
    var data = await getData()
    var list = document.getElementById('dataList')

    // console.log(data[0])
    for (var index = 0; index < data.length; index++) {
        console.log(data[index])
        list.insertAdjacentElement('beforeend', servicoCard(data[index]))
    }

    // console.log(data)
    // document.getElementById('dataList').insertAdjacentElement('afterbegin', servicoCard(data))

}


printData()