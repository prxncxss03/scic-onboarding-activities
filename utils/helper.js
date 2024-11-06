function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatToSentenceCase(str) {
  return str
    .split(' ') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
    .join(' '); 
}

module.exports = {
  formatDate,
  formatToSentenceCase,
}