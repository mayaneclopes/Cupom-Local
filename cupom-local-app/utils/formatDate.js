export function formatDateBR(dateString) {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('pt-BR');
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return '';
  }
}