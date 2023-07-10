import styled from "styled-components";

const createdDate = new Date().toLocaleString('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

const ReplyCreatedDate = () => {
  return (
    <CreatedDate>
      {createdDate.replace(',', '')}
    </CreatedDate>
  )
}

export default ReplyCreatedDate;

const CreatedDate = styled.div`
  margin: .4rem 0rem;
  color: #ADACAC;
`;