import styled from "styled-components";

const createdDate = new Date().toLocaleString('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

const CurationCreatedDate = () => {
  return (
    <CreatedDate>
      업로드: {createdDate.replace(',', '')}
    </CreatedDate>
  )
}

export default CurationCreatedDate;

const CreatedDate = styled.div`
  margin: -0.1rem -1rem;
  color: #ADACAC;
`;