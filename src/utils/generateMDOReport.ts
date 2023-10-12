export function generateMDOReport(data: any, phone: string, legend: string) {
    console.log(data)
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    let report = `Relatório gerado em ${day}/${month}/${year} 📅\nHorário ${hour}:${minutes} ✅`;
    report += `\n${legend}\n-----------------------------------------------\n`
    report +=`${Object.keys(data).map((value: any) => value + ': ' + data[value] + '\n-----------------------------------------------\n')}`;
    const formatReport = encodeURIComponent(report);
    const url = 'https://api.whatsapp.com/send?phone=' + `+55${phone}` + '&text=' + formatReport;
    return window.open(url);
}
