console.log("Hello World!");
console.log("🚀 Sistema de Monitoramento de Gás Iniciado!");

// simulando loop de serviço rodando
setInterval(() => {
    const dataHora = new Date().toLocaleTimeString();
    console.log(`[STATUS] Backend operando: ${dataHora}`);
}, 5000);