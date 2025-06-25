const numeroSenha = document.querySelector('.contador');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const botoes = document.querySelectorAll('.btn-menor, .btn-maior');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.check');
const forcaSenha = document.querySelector('.forca');
const btnGerar = document.querySelector('#btn-gerar');
const btnCopiar = document.querySelector('#btn-copiar');

botoes[0].onclick = () => ajustarTamanho(-1);
botoes[1].onclick = () => ajustarTamanho(1);
btnGerar.onclick = geraSenha;
btnCopiar.onclick = copiarSenha;

checkbox.forEach(chk => chk.addEventListener('click', geraSenha));

geraSenha();

function ajustarTamanho(valor) {
  tamanhoSenha = Math.min(20, Math.max(1, tamanhoSenha + valor));
  numeroSenha.textContent = tamanhoSenha;
  geraSenha();
}

function geraSenha() {
  let alfabeto = '';
  if (checkbox[0].checked) alfabeto += letrasMaiusculas;
  if (checkbox[1].checked) alfabeto += letrasMinusculas;
  if (checkbox[2].checked) alfabeto += numeros;
  if (checkbox[3].checked) alfabeto += simbolos;

  let senha = '';
  for (let i = 0; i < tamanhoSenha; i++) {
    let aleatorio = Math.floor(Math.random() * alfabeto.length);
    senha += alfabeto.charAt(aleatorio);
  }
  campoSenha.value = senha;
  classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
  let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
  forcaSenha.className = 'forca';
  if (entropia > 57) forcaSenha.classList.add('forte');
  else if (entropia > 35) forcaSenha.classList.add('media');
  else forcaSenha.classList.add('fraca');

  const dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
  document.querySelector('.entropia').textContent = `Pode levar até ${dias} dias para descobrir esta senha.`;
}

function copiarSenha() {
  navigator.clipboard.writeText(campoSenha.value)
    .then(() => alert("Senha copiada!"))
    .catch(() => alert("Erro ao copiar senha."));
}
