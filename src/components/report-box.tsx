import { styled } from "styled-components";
import { Content } from "../commom/styles/content";

function ReportBox(props: any) {
  const { legend, data } = props.value;
  console.log(data)
  const keys = Object.keys(data || {}) || [];
  const values: any = Object.values(data || {}) || [];
  return (
    <ReportPage>
      <Content>
        <Legend>{legend}</Legend>
        {keys?.map((key: any, index: number) => <Item key={index}>
          <Key>{key}</Key>
          <Value style={{color: values[index].split(" ").some((value: any) => value === "R$") ? "#5cf15c": "grey"}}>{values[index]}</Value>
        </Item>)}
      </Content>
    </ReportPage>
  );
}
export default ReportBox;

const Legend = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
  color: grey;
`;
const ReportPage = styled.div`
  margin: 0px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
  }
`;
const Key = styled.p`
    font-family: Arial, Helvetica, sans-serif;
    color: grey;
`;
const Value = styled(Key)``;
const Item = styled.div`
  margin: 5px auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: white;
`;