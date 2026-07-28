// Mesmo projeto Supabase do app — login feito aqui já autentica pro app
// também, porque a sessão fica salva no navegador pro domínio inteiro.
const SUPABASE_URL = 'https://qmvfsgwzbrhbxyonntgh.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_JjiXWFQTcOrUf5RXjsfeVw_5cwLPHf3';
const landingSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

function toggleLoginDropdown() {
  document.getElementById('loginDropdown').classList.toggle('open');
}
document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.login-dropdown-wrap');
  if (wrap && !wrap.contains(e.target)) document.getElementById('loginDropdown').classList.remove('open');
});

async function landingLogin() {
  const email = document.getElementById('ld-email').value.trim().toLowerCase();
  const senha = document.getElementById('ld-senha').value;
  const errBox = document.getElementById('loginDropdownError');
  const okBox = document.getElementById('loginDropdownOk');
  errBox.style.display = 'none';
  okBox.style.display = 'none';

  const { error } = await landingSupabase.auth.signInWithPassword({ email, password: senha });
  if (error) {
    errBox.textContent = 'E-mail ou senha inválidos.';
    errBox.style.display = 'block';
    return;
  }
  // Sessão já fica salva pro app também (mesmo domínio) — só leva pra lá.
  window.location.href = 'app/index.html';
}

async function landingEsqueciSenha() {
  const email = document.getElementById('ld-email').value.trim().toLowerCase();
  const errBox = document.getElementById('loginDropdownError');
  const okBox = document.getElementById('loginDropdownOk');
  errBox.style.display = 'none';
  okBox.style.display = 'none';

  if (!email) { errBox.textContent = 'Digite seu e-mail no campo acima primeiro.'; errBox.style.display = 'block'; return; }

  await landingSupabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/app/index.html',
  });
  // Mesma mensagem sempre, exista ou não o e-mail (por segurança).
  okBox.textContent = 'Se esse e-mail estiver cadastrado, enviamos um link de redefinição pra ele.';
  okBox.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  // Envio do Formulário de Demonstração (Lead)
  const leadForm = document.getElementById('leadForm');
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Obrigado! Recebemos suas informações e entraremos em contato para apresentar o HomologPro.');
    leadForm.reset();
  });
});