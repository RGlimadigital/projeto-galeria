import $ from 'jquery'
import { onloadHtmlSuccess } from '../core/includes'

//duracao da animacao
const duration = 300;

function filterByCity(city) {
    console.log("filterByCity")
    $('[wm-city]').each(function (i, e) {

        const isTarget = $(this).attr('wm-city') === city || city === null
        if (isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}


$.fn.cityButtons = function () {


    const cities = new Set;
    $('[wm-city]').each(function (i, e) {
        cities.add($(e).attr('wm-city'))
    })

    //Vamos transformar o set em um array

    const btns = Array.from(cities).map(city => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info']).html(city)
        btn.click(e => {
            filterByCity(city)
        })
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(e => {
        filterByCity(null)
    })
    //Adicionando ao array de botoes
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])

    //Vamos adicionar ao grupo de botoes , todos os botoes que estao no array
    btnGroup.append(btns)

    $(this).html(btnGroup)

    return this
}

//chamando a funcao importada de includes


//So vai chamar essa linha se o html for carregado de forma bem sucedida
onloadHtmlSuccess(function () {
    $('[wm-city-buttons]').cityButtons()

})
