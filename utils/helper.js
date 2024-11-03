function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

module.exports = {
  formatDate
}