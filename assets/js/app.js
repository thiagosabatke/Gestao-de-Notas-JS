'use strict'

const nome = [];
const email = [];
const RA = [];

function Adicionar_informaçoes(){
    let nome_aluno = document.getElementById('input_nome').value;
    let email_aluno = document.getElementById('input_email').value;
    let RA_aluno = document.getElementById('input_ra').value;
    let formulario = document.getElementById('Formulario')
   
    if(formulario.reportValidity()) {
        window.alert('Informações do aluno adicionado');
    } else {
        return;
    }
}
