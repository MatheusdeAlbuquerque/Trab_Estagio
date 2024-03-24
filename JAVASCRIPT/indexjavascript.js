var nome = $("#nomeProduto");
var descricao = $("#nomeCat");
var preco = $("#precoProd");
var quantidade = $("#qntdProdutos");
var codigo = $("#codProduto");

//nome e categoria
function verificacaoLetras(letras) {
    return new RegExp(/[a-zA-Z]/i).test(letras);
}

function validaCampo(id, iderro) {
    if (($("#" + id).val()) == "") {
        $("#" + iderro).html("Campo obrigatório");
        return;
    }
    if (verificacaoLetras($("#" + id).val())) {
        $("#" + iderro).html("");
    } else {
        $("#" + iderro).html("Nome, somente pode ter letras");
    }
}


//Preco, quantidade, codigo
function verificacaoNumero(numeros) {
    return new RegExp(/[0-9]/i).test(numeros);
}

function verificacaoCampoNumero(id, iderronum) {
    if (($("#" + id).val()) == "") {
        $("#" + iderronum).html("Campo obrigatório");
        return;
    }
    if (verificacaoNumero($("#" + id).val())) {
        $("#" + iderronum).html("");
    } else {
        $("#" + iderronum).html("Nao pode contar letras");
    }
}


function salvar() {
    var arrayPessoas=[];
    if(JSON.parse(localStorage.getItem("pessoas")) != null){
        arrayPessoas = JSON.parse(localStorage.getItem("pessoas"));
    }

    var pessoa = {
        "nome": nome.val(),
        "descricao": descricao.val(),
        "preco": preco.val(),
        "quantidade": quantidade.val(),
        "codigo": codigo.val(),
    };
    arrayPessoas.push(pessoa);

    //stringy ele transforma o objeto em texto.
    var pessoaJson = JSON.stringify(arrayPessoas);
    localStorage.setItem("pessoas", pessoaJson);

    carregar();
}

//printar na tela
function carregar() {
    var arrayPessoas=[];
    if(JSON.parse(localStorage.getItem("pessoas")) != null){
        arrayPessoas = JSON.parse(localStorage.getItem("pessoas"));
    }
    
    var html = "";
    for(var posicao = 0; posicao < arrayPessoas.length; posicao++) {
        console.log(arrayPessoas[posicao]);
        html += "<tr><td>"+arrayPessoas[posicao]["codigo"]+"</td><td>"+arrayPessoas[posicao]["nome"]+"</td><td>"+arrayPessoas[posicao]["descricao"]+"</td><td>" + arrayPessoas[posicao]["quantidade"]+"</td><td>"+arrayPessoas[posicao]["preco"]+"</td><td><button class='btn btn-secondary' onclick='editar("+posicao+")'>Editar</button> | <button class='btn btn-secondary' onclick='excluir("+posicao+")'>Excluir</button></td></tr>";
    }

    $(".salvos tbody").html(html);
}


//editar
function editar(posicao) {
    var arrayPessoas=[];
    if(JSON.parse(localStorage.getItem("pessoas")) != null){
        arrayPessoas = JSON.parse(localStorage.getItem("pessoas"));
    }

    var pessoa = arrayPessoas[posicao];

    nome.val(pessoa["nome"]);
    descricao.val(pessoa["descricao"]);
    preco.val(pessoa["preco"]);
    quantidade.val(pessoa["quantidade"]);
    codigo.val(pessoa["codigo"]);

    $(".buttonCadastro").html("Salvar").attr('onclick', "salvarEdicao("+posicao+")");
}

function salvarEdicao(posicao) {
    var arrayPessoas=[];
    if(JSON.parse(localStorage.getItem("pessoas")) != null){
        arrayPessoas = JSON.parse(localStorage.getItem("pessoas"));
    }

    var pessoa = {
        "nome": nome.val(),
        "descricao": descricao.val(),
        "preco": preco.val(),
        "quantidade": quantidade.val(),
        "codigo": codigo.val(),
    };
    arrayPessoas[posicao] = pessoa;

    //stringy ele transforma o objeto em texto.
    var pessoaJson = JSON.stringify(arrayPessoas);
    localStorage.setItem("pessoas", pessoaJson);

    $(".buttonCadastro").html("Cadastrar").attr('onclick',"salvar()");
    carregar();
}


//exclir
function excluir(posicao) {
    var arrayPessoas=[];
    if(JSON.parse(localStorage.getItem("pessoas")) != null){
        arrayPessoas = JSON.parse(localStorage.getItem("pessoas"));
    }

    arrayPessoas.splice(posicao, 1);

    //stringy ele transforma o objeto em texto.
    var pessoaJson = JSON.stringify(arrayPessoas);
    localStorage.setItem("pessoas", pessoaJson);

    carregar();
}