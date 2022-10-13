import chalk from "chalk";
import fs from 'fs';



function extrailinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)] // ... expande o objeto que é criado pela função matchAll()
    const resultado = capturas.map(captura => ({[captura[1]]: captura [2]})) 
    return resultado.length !== 0 ? resultado : 'Não encotramos links nesse arquivo'
}



function trataErro(erro){
    throw new Error(chalk.red(erro.code, 'O arquivo procurado não existe nesse diretório'))
}

//async/await

async function pegaArquivo(caminhoDoArquivo){
    try {
        const enconding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoDoArquivo,enconding)
        return extrailinks(texto)
    } catch (erro) {
        trataErro(erro)
    } finally {
        console.log(chalk.yellow("Tarefa concluída"))
    }
}

export default pegaArquivo;

// promises com then()
// function pegaArquivo (caminhoDoArquivo) {
//     const enconding = 'utf-8'
//     fs.promises
//         .readFile(caminhoDoArquivo, enconding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(trataErro)
// }

// function pegaArquivo(caminhoDoArquivo) {
//     const enconding = 'utf-8'
//     fs.readFile(caminhoDoArquivo, enconding, (erro, texto) => {
//         if (erro){
//             trataErro(erro)
//         }
//         console.log(chalk.green(texto))
//     } )
// }
