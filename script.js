const form = document.querySelector("#formAluno");
const tabela = document.querySelector("#tabelaAlunos");
const campoPesquisa = document.querySelector("#pesquisa");

// Elementos de Contagem
const elTotal = document.querySelector("#totalAlunos");
const elAprovados = document.querySelector("#totalAprovados");
const elReprovados = document.querySelector("#totalReprovados");

let alunos = [];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const ra = document.querySelector("#ra").value;
    const curso = document.querySelector("#curso").value;
    const nota1 = Number(document.querySelector("#nota1").value);
    const nota2 = Number(document.querySelector("#nota2").value);

    const media = (nota1 + nota2) / 2;
    let situacao = "Aprovado";

    if (media < 4) {
        situacao = "Reprovado";
    } else if (media < 6) {
        situacao = "Recuperação";
    }

    const aluno = { id: Date.now(), nome, ra, curso, media, situacao };
    alunos.push(aluno);

    form.reset();
    atualizarTela();
});

function atualizarTela() {
    renderizarTabela(alunos);
    atualizarContadores();
}

function renderizarTabela(lista) {
    tabela.innerHTML = "";

    lista.forEach(aluno => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.ra}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.media.toFixed(1)}</td>
            <td class="${aluno.situacao.toLowerCase()}">${aluno.situacao}</td>
            <td><button onclick="removerAluno(${aluno.id})">Excluir</button></td>
        `;

        tabela.appendChild(tr);
    });
}

function removerAluno(id) {
    alunos = alunos.filter(a => a.id !== id);
    atualizarTela();
}

function atualizarContadores() {
    elTotal.textContent = alunos.length;
    elAprovados.textContent = alunos.filter(a => a.situacao === "Aprovado").length;
    elReprovados.textContent = alunos.filter(a => a.situacao === "Reprovado").length;
}

campoPesquisa.addEventListener("input", function() {
    const termo = campoPesquisa.value.toLowerCase();
    const alunosFiltrados = alunos.filter(a => a.nome.toLowerCase().includes(termo));
    renderizarTabela(alunosFiltrados);
});