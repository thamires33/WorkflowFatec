module.exports = function gerarProtocolo() {
  const timestamp = Date.now();
  const aleatorio = Math.floor(Math.random() * 1000);
  return `CH${timestamp}${aleatorio}`;
};
