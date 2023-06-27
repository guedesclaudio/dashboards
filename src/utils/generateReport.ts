export function generateReport(data: any, phone: string): Window | null {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const report = `
    Relatório gerado em ${day}/${month}/${year} 📅\nHorário ${hour}:${minutes} ✅\nTotal gasto até o momento: ${data?.totalBuilding?.f}\nOrçamento estimado: ${data?.estimatedTotal?.f}\nOrçamento comprometido: ${data?.tax} %\n-----------------------------------------------\nTotal gasto com mão de obra: ${data?.totalMdo?.f}\nOrçamento estimado: ${data?.estimatedMdo?.f}\nOrçamento comprometido: ${data?.taxMdo} %\n-----------------------------------------------\nValor do metro quadrado: ${data?.valueMeters?.f}\n-----------------------------------------------\nDistribuição das despesas:\n${data?.associationsDescription}
    `
    const formatReport = encodeURIComponent(report);
    const url = 'https://api.whatsapp.com/send?phone=' + `+55${phone}` + '&text=' + formatReport;
    return window.open(url);
}