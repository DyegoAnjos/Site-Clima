const apiWeather = "342e32bd32967d90200bf5047fe85280"
const apiCountryURL = "https://countryflagsapi.com/png/"

const climaInfo = document.querySelector("#climaInfo")
const cidadeInput = document.querySelector("#cidadeInput")
const pesquisaBtn = document.querySelector("#pesquisa")
const main =document.querySelector("main")

const cidadeElemento = document.querySelector("#cidade")
const bandeiraElemento = document.querySelector("#bandeiras")
const tempElemento = document.querySelector("#temperatura span")
const tempMinElemento = document.querySelector("#temperaturaMin span")
const tempMaxElemento = document.querySelector("#temperaturaMax span")
const climaElemento = document.querySelector("#descricao")
const climaIconElemento = document.querySelector("#climaIcone")
const umidadeElemento = document.querySelector("#umidade span")
const ventosElemento = document.querySelector("#ventos span")

const bgDia = "linear-gradient(33deg, hsla(33, 100%, 53%, 1) 0%, hsla(58, 100%, 68%, 1) 100%)"
const bgNoite = "linear-gradient(33deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%)"

//Funções
const pegarInfosClima = async(cidade) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiWeather}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data =  await res.json()
    console.log(data)
    return data
}

const mudarInfosClima = async(cidade) =>{
    const data =await pegarInfosClima(cidade)
    
    cidadeElemento.innerText = data.name

    bandeiraElemento.setAttribute("src", apiCountryURL + data.sys.country)
    bandeiraElemento.setAttribute("alt", `Bandeira do ${data.sys.country}`)

    tempElemento.innerText = "Temperatura: "+parseInt(data.main.temp)
    tempMinElemento.innerText = "Minima: "+parseInt(data.main.temp_min)
    tempMaxElemento.innerText = "Maxima: "+parseInt(data.main.temp_max)

    climaElemento.innerHTML = data.weather[0].description
    climaIconElemento.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    climaIconElemento.setAttribute("alt",`Clima ${data.weather[0].description}`)

    umidadeElemento.innerText = data.main.humidity+"%"
    ventosElemento.innerText = data.wind.speed+"km/h"

    climaInfo.classList.remove("hide")

    if(data.weather[0].icon[2] == "d"){
        document.body.style.background = bgDia
        main.style.background = bgNoite
    }

    else{
        document.body.style.background = bgNoite
        main.style.color = "#000000"
        main.style.background = bgDia
    }

}

//Eventos
pesquisaBtn.addEventListener("click", (e) =>{
    e.preventDefault

    const cidade = cidadeInput.value
    mudarInfosClima(cidade)
})

cidadeInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const cidade = e.target.value
        mudarInfosClima(cidade)
    }
})
