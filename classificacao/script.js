import { servicoCard } from "../components/servicoCard.js"
import { servicoContainer } from "../components/servicoContainer.js"

var data = {
    Administração: Array(),
    Facilities: Array(),
    TI: Array(),
    RH: Array(),
    Financeiro: Array(),
    DP: Array(),
    Comercial: Array(),
    Projetos: Array(),
    Suprimento: Array(),
    Engenharia: Array(),
    SESMET: Array()
}

async function getData() {
    const response = await fetch('/server/servico/all').then((res) => res.json())

    for(var i = 0 ; i< response.length ; i++){
        const setor = response[i]['Setor']
        data[setor]?.push(response[i])
    }
}


async function printData() {
    await getData()
    // var data = await getData()
    var main= document.getElementById('main')
    for(const setor of Object.entries(data)){
        main.insertAdjacentElement('beforeend', servicoContainer(setor[0]))
        var containerList = document.getElementById(setor[0]+'ContainerList')
        for (var index = 0; index < data[setor[0]].length; index++) {
            // console.log(datasetor[0][index])
            containerList.insertAdjacentElement('beforeend', servicoCard(data[setor[0]][index]))
        }
    }
    // var lists = document.getElementsByClassName('dataList')

    // console.log(data[0])

    // console.log(data)
    // document.getElementById('dataList').insertAdjacentElement('afterbegin', servicoCard(data))

}


printData()