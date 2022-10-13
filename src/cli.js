import chalk from 'chalk'
import fs from 'fs'
import pegaArquivo from './index.js'
import listaValidada from './http-validacao.js'

const caminho = process.argv

async function imprimeLista(valida, resultados, identificador = '') {

    if (valida) {
        console.log(
            chalk.yellow('Lista validada'), 
            chalk.black.bgGreen(identificador),
            await listaValidada(resultados))
    } else {
        console.log(
            chalk.yellow('Lista de Links'), 
            chalk.black.bgGreen(identificador),
            resultados)
    }

}

async function processaTexto(argumentos) {
    const caminho = argumentos[2]
    const valida = argumentos[3] === '--valida'

    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log('Arquivo ou diretório não existe')
            return
        }
        
    }

    if (fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(argumentos[2])
        imprimeLista(valida, resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach( async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo)
        })
    }
}

processaTexto(caminho)