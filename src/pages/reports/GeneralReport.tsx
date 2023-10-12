import { useEffect, useState } from "react";
import { requests } from "../../api";
import ReportBox from "../../components/ReportBox";
import { getGeneralData } from "../../utils/getDataToGeneralReport";
import { IGeneralData } from "../../contracts/generatalData";

function GeneralReport() {
    const [renderData, setRenderData] = useState<any>();
    const [sendData, setSendData] = useState<IGeneralData>();
  
    async function getData() {
      const response = await getGeneralData()
      const dataToRender = {
        'Total gasto': response.totalBuilding.f,
        'Orçamento estimado': response.estimatedTotal.f,
        'Orçamento comprometido': response.tax + ' %',
        'Total de mão de obra': response.totalMdo.f,
        'Orçamento estimado com mão de obra': response.estimatedMdo.f,
        'Orçamento comprometido com mão de obra': response.taxMdo + ' %',
        'Valor do metro quadrado': response.valueMeters.f,
        ...response.associations,
      };
      setRenderData(dataToRender);
      setSendData(response)
    }

    useEffect(() => {
        getData();
    }, []);
  return (
  <ReportBox legend='Relatório Geral' renderData={renderData} sendData={sendData}/>
  );
}
export default GeneralReport;
