import { storagePhoneNumber } from "./storagePhoneNumber";

export function generateReport(data: any, phone: string): Window | null {
    storagePhoneNumber.set(phone)
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const breakLine = '\n-----------------------------------------------\n';
    const report = `
    Relatório gerado em ${day}/${month}/${year} 📅\nHorário ${hour}:${minutes} ✅\nRelatório Geral ${breakLine}Total gasto até o momento: ${data?.totalBuilding?.f}\nOrçamento estimado: ${data?.estimatedTotal?.f}\nOrçamento comprometido: ${data?.tax} %${breakLine}Total gasto com mão de obra: ${data?.totalMdo?.f}\nOrçamento estimado: ${data?.estimatedMdo?.f}\nOrçamento comprometido: ${data?.taxMdo} %${breakLine}Valor do metro quadrado: ${data?.valueMeters?.f}${breakLine}Distribuição das despesas:\n${data?.associationsDescription}
    `
    const formatReport = encodeURIComponent(report);
    const url = 'https://api.whatsapp.com/send?phone=' + `+55${phone}` + '&text=' + formatReport;
    return window.open(url);
}
