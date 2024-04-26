'use strict';

function adicionaDadosAlunos() {
    let nome = document.getElementById('input_nome').value;
    let ra = document.getElementById('input_ra').value;
    let email = document.getElementById('input_email').value;
    let prova1 = parseFloat(document.getElementById('input_prova_1').value);
    let aep1 = parseFloat(document.getElementById('input_aep_1').value);
    let integrada1 = parseFloat(document.getElementById('input_prova_integrada_1').value);
    let prova2 = parseFloat(document.getElementById('input_prova_2').value);
    let aep2 = parseFloat(document.getElementById('input_aep_2').value);
    let integrada2 = parseFloat(document.getElementById('input_prova_integrada_2').value);

    if ((isNaN(prova1)) || (isNaN(prova2)) ||
        (isNaN(aep1)) || (isNaN(aep2)) ||
        (isNaN(integrada1)) || (isNaN(integrada2)) || nome == '') {
        return false;
    }

    if ((prova1 < 0 || prova1 > 8) || (prova2 < 0 || prova2 > 8) ||
    (aep1 < 0 || aep1 > 1) || (aep2 < 0 || aep2 > 1) ||
    (integrada1 < 0 || integrada1 > 1) || (integrada2 < 0 || integrada2 > 1) ||
    nome == '') {
    alert("verifique as notas inseridas. As notas de prova devem estar entre 0 e 8, enquanto as notas de AEP e integrada devem estar entre 0 e 1.");
    return false;
}

    let media1 = (prova1 * 0.8) + (aep1 * 0.1) + (integrada1 * 0.1);
    let media2 = (prova2 * 0.8) + (aep2 * 0.1) + (integrada2 * 0.1);
    let mediaTotal = (media1 + media2) / 2;

    let situacao;
    if (mediaTotal >= 6) {
        situacao = "Aprovado";
    } else if (mediaTotal >= 3) {
        situacao = "Recuperação";
    } else {
        situacao = "Reprovado";
    }

    let tabela = document.getElementById('tabela');
    let tamanho_tabela = tabela.rows.length;
    let linha = tabela.insertRow(tamanho_tabela);

    linha.id = "linha_" + tamanho_tabela;
    linha.insertCell(0).innerHTML = tamanho_tabela;
    linha.insertCell(1).innerHTML = nome;
    linha.insertCell(2).innerHTML = prova1;
    linha.insertCell(3).innerHTML = aep1;
    linha.insertCell(4).innerHTML = integrada1;
    linha.insertCell(5).innerHTML = prova2;
    linha.insertCell(6).innerHTML = aep2;
    linha.insertCell(7).innerHTML = integrada2;
    linha.insertCell(8).innerHTML = media1.toFixed(1);
    linha.insertCell(9).innerHTML = media2.toFixed(1);
    linha.insertCell(10).innerHTML = mediaTotal.toFixed(1);
    linha.insertCell(11).innerHTML = situacao;

    let celula_botoes = linha.insertCell(12);
    let botao_editar = document.createElement("button");
    botao_editar.id = "botao_editar_" + tamanho_tabela;
    botao_editar.innerText = "Editar";
    botao_editar.classList.add("botao");
    botao_editar.classList.add("editar");
    botao_editar.onclick = function () {
        editarDados(linha);
    };
    
    let botao_deletar = document.createElement("button");
    botao_deletar.id = "botao_deletar_" + tamanho_tabela;
    botao_deletar.innerText = "Deletar";
    botao_deletar.classList.add("botao");
    botao_deletar.classList.add("deletar");
    botao_deletar.onclick = function () {
        deletarDados(linha)
    };

    celula_botoes.appendChild(botao_editar);
    celula_botoes.appendChild(botao_deletar);

    salvarDadosLocalStorage();

    limparDados();

    return false;
}

function limparDados(){
    document.getElementById('input_nome').value = "";
    document.getElementById('input_prova_1').value = "";
    document.getElementById('input_aep_1').value = "";
    document.getElementById('input_prova_integrada_1').value = "";
    document.getElementById('input_prova_2').value = "";
    document.getElementById('input_aep_2').value = "";
    document.getElementById('input_prova_integrada_2').value = "";
}

function salvarDadosLocalStorage(){
    let tabela = document.getElementById('tabela');
    let dados = [];

    for (let i = 1; i < tabela.rows.length; i++) {
        let linha = tabela.rows[i];
        let aluno = {
            "nome": linha.cells[1].innerHTML,
            "prova1": linha.cells[2].innerHTML,
            "aep1": linha.cells[3].innerHTML,
            "integrada1": linha.cells[4].innerHTML,
            "prova2": linha.cells[5].innerHTML,
            "aep2": linha.cells[6].innerHTML,
            "integrada2": linha.cells[7].innerHTML,
            "media1": linha.cells[8].innerHTML,
            "media2": linha.cells[9].innerHTML,
            "mediaTotal": linha.cells[10].innerHTML,
            "situacao": linha.cells[11].innerHTML
        };
        dados.push(aluno);
    }

    localStorage.setItem("dados_alunos", JSON.stringify(dados));
}

function carregarDadosLocalStorage() {
    let dados = localStorage.getItem("dados_alunos");

    if (dados !== null) {
        dados = JSON.parse(dados);

        for (let aluno of dados) {
            let tabela = document.getElementById('tabela');
            let tamanho_tabela = tabela.rows.length;
            let linha = tabela.insertRow(tamanho_tabela);

            linha.id = "linha_" + tamanho_tabela;
            linha.insertCell(0).innerHTML = tamanho_tabela;
            linha.insertCell(1).innerHTML = aluno.nome;
            linha.insertCell(2).innerHTML = aluno.prova1;
            linha.insertCell(3).innerHTML = aluno.aep1;
            linha.insertCell(4).innerHTML = aluno.integrada1;
            linha.insertCell(5).innerHTML = aluno.prova2;
            linha.insertCell(6).innerHTML = aluno.aep2;
            linha.insertCell(7).innerHTML = aluno.integrada2;
            linha.insertCell(8).innerHTML = aluno.media1;
            linha.insertCell(9).innerHTML = aluno.media2;
            linha.insertCell(10).innerHTML = aluno.mediaTotal;
            linha.insertCell(11).innerHTML = aluno.situacao;

            let celula_botoes = linha.insertCell(12);
            let botao_editar = document.createElement("button");
            botao_editar.id = "botao_editar_" + tamanho_tabela;
            botao_editar.innerText = "Editar";
            botao_editar.classList.add("botao");
            botao_editar.classList.add("editar");
            botao_editar.onclick = function () {
                editarDados(linha);
            };
            
            let botao_deletar = document.createElement("button");
            botao_deletar.id = "botao_deletar_" + tamanho_tabela;
            botao_deletar.innerText = "Deletar";
            botao_deletar.classList.add("botao");
            botao_deletar.classList.add("deletar");
            botao_deletar.onclick = function () {
                deletarDados(linha)
            };

            celula_botoes.appendChild(botao_editar);
            celula_botoes.appendChild(botao_deletar);
        }
    }
}

function editarDados(linha) {
    let modal = document.getElementById('editar_modal');
    modal.style.display = 'block';

    let cells = linha.cells;
    document.getElementById('input_nome_edit').value = cells[1].innerHTML;
    document.getElementById('input_prova_1_edit').value = cells[2].innerHTML;
    document.getElementById('input_aep_1_edit').value = cells[3].innerHTML;
    document.getElementById('input_prova_integrada_1_edit').value = cells[4].innerHTML;
    document.getElementById('input_prova_2_edit').value = cells[5].innerHTML;
    document.getElementById('input_aep_2_edit').value = cells[6].innerHTML;
    document.getElementById('input_prova_integrada_2_edit').value = cells[7].innerHTML;

    document.getElementById('editar_formulario').onsubmit = function() {
        let nome = document.getElementById('input_nome_edit').value;
        let prova1 = parseFloat(document.getElementById('input_prova_1_edit').value);
        let aep1 = parseFloat(document.getElementById('input_aep_1_edit').value);
        let integrada1 = parseFloat(document.getElementById('input_prova_integrada_1_edit').value);
        let prova2 = parseFloat(document.getElementById('input_prova_2_edit').value);
        let aep2 = parseFloat(document.getElementById('input_aep_2_edit').value);
        let integrada2 = parseFloat(document.getElementById('input_prova_integrada_2_edit').value);

        if ((isNaN(prova1)) || (isNaN(prova2)) ||
            (isNaN(aep1)) || (isNaN(aep2)) ||
            (isNaN(integrada1)) || (isNaN(integrada2)) || nome == '') {
            return false;
        }

        let media1 = (prova1 * 0.8) + (aep1 * 0.1) + (integrada1 * 0.1);
        let media2 = (prova2 * 0.8) + (aep2 * 0.1) + (integrada2 * 0.1);
        let mediaTotal = (media1 + media2) / 2;

        let situacao;
        if (mediaTotal >= 6) {
            situacao = "Aprovado";
        } else if (mediaTotal >= 3) {
            situacao = "Recuperação";
        } else {
            situacao = "Reprovado";
        }

        cells[1].innerHTML = nome;
        cells[2].innerHTML = prova1;
        cells[3].innerHTML = aep1;
        cells[4].innerHTML = integrada1;
        cells[5].innerHTML = prova2;
        cells[6].innerHTML = aep2;
        cells[7].innerHTML = integrada2;
        cells[8].innerHTML = media1.toFixed(1);
        cells[9].innerHTML = media2.toFixed(1);
        cells[10].innerHTML = mediaTotal.toFixed(1);
        cells[11].innerHTML = situacao;

        salvarDadosLocalStorage();

        modal.style.display = 'none';

        return false;
    };
}

function fecharModal() {
    document.getElementById('editar_modal').style.display = 'none';
}

function deletarDados(linha) {
        let index = linha.rowIndex;
        let tabela = document.getElementById('tabela');
        tabela.deleteRow(index);

        salvarDadosLocalStorage();
}

window.onload = function() {
    carregarDadosLocalStorage();
};