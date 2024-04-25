'use strict'
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
    
    if ((prova1 < 0 || prova1 > 8) || (prova2 < 0 || prova2 > 8) ||
        (aep1 < 0 || aep1 > 1) || (aep2 < 0 || aep2 > 1) ||
        (integrada1 < 0 || integrada1 > 1) || (integrada2 < 0 || integrada2 > 1)) {
        alert("Por favor, verifique se as notas estão dentro dos limites permitidos.");
        return false;
    }

    let media1 = (prova1 * 0.8) + (aep1 * 0.1) + (integrada1 * 0.1);
    let media2 = (prova2 * 0.8) + (aep2 * 0.1) + (integrada2 * 0.1);
    let mediaTotal = (media1 + media2) / 2;
    
    let tabela = document.getElementById('tabela');
    let tamanho_tabela = tabela.rows.length;
    let linha = tabela.insertRow(tamanho_tabela);

    let botao_editar = document.createElement("button");
    botao_editar.id = "botao_editar_" + tamanho_tabela;
    botao_editar.innerText = "Editar";
    botao_editar.style.padding = "15px 20px";
    botao_editar.style.margin = "10px 10px 10px 140px";
    botao_editar.style.backgroundColor = "blue";
    botao_editar.onclick = function () {
        editarDados(linha);
    };

    let botao_deletar = document.createElement("button");
    botao_deletar.id = "botao_deletar_" + tamanho_tabela;
    botao_deletar.innerText = "Deletar";
    botao_deletar.style.padding = "15px 20px";
    botao_deletar.style.margin = "10px 10px 10px 10px";
    botao_deletar.style.backgroundColor = "red";
    botao_deletar.onclick = function () {
        deletarDados(linha)
    };

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
    let celula_botoes = linha.insertCell(11);
    celula_botoes.appendChild(botao_editar);
    celula_botoes.appendChild(botao_deletar);

    document.getElementById('input_nome').value = "";
    document.getElementById('input_prova_1').value = "";
    document.getElementById('input_aep_1').value = "";
    document.getElementById('input_prova_integrada_1').value = "";
    document.getElementById('input_prova_2').value = "";
    document.getElementById('input_aep_2').value = "";
    document.getElementById('input_prova_integrada_2').value = "";
    
    return false;
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
    
    document.getElementById('editar_formulario').onsubmit = function(event) {
        event.preventDefault(); 

        cells[1].innerHTML = document.getElementById('input_nome_edit').value;
        cells[2].innerHTML = document.getElementById('input_prova_1_edit').value;
        cells[3].innerHTML = document.getElementById('input_aep_1_edit').value;
        cells[4].innerHTML = document.getElementById('input_prova_integrada_1_edit').value;
        cells[5].innerHTML = document.getElementById('input_prova_2_edit').value;
        cells[6].innerHTML = document.getElementById('input_aep_2_edit').value;
        cells[7].innerHTML = document.getElementById('input_prova_integrada_2_edit').value;


        let prova1 = parseFloat(cells[2].innerHTML);
        let aep1 = parseFloat(cells[3].innerHTML);
        let integrada1 = parseFloat(cells[4].innerHTML);
        let prova2 = parseFloat(cells[5].innerHTML);
        let aep2 = parseFloat(cells[6].innerHTML);
        let integrada2 = parseFloat(cells[7].innerHTML);
        
        let media1 = (prova1 * 0.8) + (aep1 * 0.1) + (integrada1 * 0.1);
        let media2 = (prova2 * 0.8) + (aep2 * 0.1) + (integrada2 * 0.1);
        let mediaTotal = (media1 + media2) / 2;
        
        cells[8].innerHTML = media1.toFixed(1);
        cells[9].innerHTML = media2.toFixed(1);
        cells[10].innerHTML = mediaTotal.toFixed(1);

        fecharModal();
    };
}

function fecharModal() {
    let modal = document.getElementById('editar_modal');
    modal.style.display = 'none';
}

function deletarDados(linha) {
    linha.parentNode.removeChild(linha);
    return false;
}
