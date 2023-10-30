import { useEffect, useState } from "react";
import { getGeneralData } from "../../utils/getDataToGeneralReport";
import ListPage from "../../components/ListPage";

function ContactsPage() {
  const [data, setData] = useState<any>();

  async function getData() {
    const result = await getGeneralData();
    setData(result.contactsList);
    return result;
  }
      
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <ListPage legend = 'Lista de contatos' renderData={data}/>
  );
}
export default ContactsPage;