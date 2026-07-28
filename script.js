document.addEventListener('DOMContentLoaded', () => {
  // Envio do Formulário de Demonstração (Lead)
  const leadForm = document.getElementById('leadForm');
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Obrigado! Recebemos suas informações e entraremos em contato para apresentar o HomologPro.');
    leadForm.reset();
  });
});