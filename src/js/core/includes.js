import $ from 'jquery'

const loadHtmlSuccessCalbacks = []

export function onloadHtmlSuccess(callback) {
    //Vamos fazer um teste para que seja adicioando uma unica vez
    if (!loadHtmlSuccessCalbacks.includes(callback)) {
        loadHtmlSuccessCalbacks.push(callback)
    }
}

function loadIncludes(parent) {
    if (!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function (i, e) {
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data) {
                $(e).html(data)
                $(e).removeAttr('wm-include')

                //executando cada uma das callbacks
                loadHtmlSuccessCalbacks.forEach(callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()