import { useEffect, useState } from "react";
import { requests } from "../../api";
import ReportBox from "../../components/ReportBox";

function MDOReport() {
  const [data, setData] = useState<any>();
  const [mdoData, setMdoData] = useState<any>();

  async function getData() {
    const result = await requests.getData();
    let mdo: any = {}
    result?.table?.rows?.map((value: any) => {
      if (!value?.c[11]?.v) return;
      const date = (value?.c[11]?.v).toString().replace(/[Date()]/gi,"");
      const dateList = date.split(",")
      const dateOk = `${dateList[2]}/${dateList[1]}/${dateList[0]}`
      return mdo[dateOk] = value?.c[12]?.f
    });
    let message = '';
    for (let i = 0; i < Object.keys(mdo).length; i++) {
      message += `- ${Object.keys(mdo)[i]}: ${Object.values(mdo)[i]}\n`;
    }
        
    setData(message);
    setMdoData(mdo);
    return result;
  }
      
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <ReportBox legend = 'Relatório de Mão de obra' renderData={mdoData} sendData={mdoData}/>
  );
}
export default MDOReport;
