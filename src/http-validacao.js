import chalk from "chalk"

function extrailinks (arrLinks) {
    return arrLinks.map ((objectLink) => Object.values(objectLink).join())
}

async function checaStatus (listaUrls){
    const arrStatus = await Promise.all(
        listaUrls.map(async(url) => {
            try {
                const response = await fetch(url)
                return response.status
            } catch (erro) {
                return manejaErros(erro)
            }
        })
    )
    return arrStatus
}

function manejaErros(erro){
    if (erro.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado'
    } else {
        return 'Ocorreu algum erro'
    }
}

export default async function listaValidada (listaDeLinks) {
    const links = extrailinks(listaDeLinks)
    const status = await checaStatus(links)
    return listaDeLinks.map((object, index) => ({
        ...object, // '...' operador de espalhamento para pegar todas as propriedades originais do objeto que está sendo recebido
        status: status[index]
    }))
}  

