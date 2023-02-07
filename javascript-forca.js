const frutas =[
    "laranja",
    "banana",
    "uva",
    "pera",
    "manga",
    "abacaxi"
];
//sorteia qual palavra do array vai ser selecionada
const palavraSecreta = frutas[Math.floor(Math.random() * frutas.length)];

const letrasErradas = [];
const letrasCorretas = [];

//identificar toda vez que apartar uma tecla, o evento "keydow"
//validar se oq a pessoa tá digitando é uma letra ou nao "keyCode" vê qual o código para aquela tecla 

document.addEventListener("keydown", (evento) =>{
    const codigo = evento.keyCode; // 65 - 90 (a-z intervalo)
    if(isLetra(codigo)){
        const letra = evento.key;
        //letra faz parte ou não da palavra
        //letra errada e repetida
        if (letrasErradas.includes(letra)) {
            mostrarAvisoLetraRepetida();
        }else {
            //se a letra faz parte da palavra ou não
            if (palavraSecreta.includes(letra)) {
                //armazena as letras corretas das palavras
                letrasCorretas.push(letra);
            } else{
                //armazena as letras erradas
                letrasErradas.push(letra);
            }
        }
        //atualizar jogo
        atualizarJogo()
    }
})

function atualizarJogo() {
    //mostrar as letras erradas na tela
    mostrarLetrasErradas();
    //mostrar as letras certas na tela
    mostrarLetrasCertas();
    //desenhar forca
    desenharForca();
    //checar jogo
    checarJogo();
}

function mostrarLetrasErradas(){
    //cria variável para pegar uma classe criada no html
    const div = document.querySelector(".letras-erradas-container");
    //antes de interar limpa o elemento para não ficar repetindo na tela
    div.innerHTML = "<h3>Letras erradas</h3>";
    // forEach serve para interar cada uma das letras
    letrasErradas.forEach((letra) => {
        div.innerHTML += `<span> ${letra} </span>`;
    })
}

function mostrarLetrasCertas() {
    const container = document.querySelector(".palavra-secreta-container");
    container.innerHTML = "";
    //letra ainda n revelada tem q mostrar um _
    // se a letra for revelada mostra a letra
    // divide a palavra em um array e depois um forEach p saber se faz parte das letras corretas
    palavraSecreta.split("").forEach((letra) => {
        //ver se a letra ta inclusa na palavra secreta
        if (letrasCorretas.includes(letra)) {
            //innerhtml é para mostrar na tela 
            container.innerHTML += `<span> ${letra} </span>`;
        } else{
            container.innerHTML += `<span>_</span>`
        }
    }) 
}

function checarJogo(){
    let mensagem = "";
    const container = document.querySelector(".palavra-secreta-container")
    const partesCorpo = document.querySelectorAll(".forca-parte");
    if (letrasErradas === partesCorpo.length) {
        mensagem = "Fim de jogo! Você perdeu!"
    }
    if (palavraSecreta === container.innerText) {
        mensagem = "Parabéns! Você Ganhou!"
    }
    if (mensagem) {
        document.querySelector("#mensagem").innerHTML = mensagem;
        document.querySelector(".popup-container").style.display = "flex";
    }
}

function desenharForca(){
    //para cada letra errada, revela uma parte do corpo
    const parteCorpo = document.querySelectorAll(".forca-parte")
    for (let i = 0; i < letrasErradas.length; i++){
        parteCorpo[i].style.display = "block";
    } 
}
//função letra repetida
function mostrarAvisoLetraRepetida() {
    //devolve primeiro elemento q encontrar, no caso aqui a classe
    const aviso = document.querySelector(".aviso-palavra-repetida");
    //cria uma classe só para isso
    aviso.classList.add("show");
    //remove a classe do elemento depois de 1s
    setTimeout(() => {
        aviso.classList.remove("show");
    }, 1000);
}

//funcao p ver se é uma letra

function isLetra(codigo) {
    return codigo >= 65 && codigo <= 90;
    
}

function reiniciarJogo(){
    window.location.reload();
}