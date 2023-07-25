import styled from 'styled-components';

const convertDateTimeFormat = (dateTime?: string) => {
  if (!dateTime) return '';

  const dateTimeParts = dateTime.split('T');
  const datePart = dateTimeParts[0] + '.';
  const timePart = dateTimeParts[1].split(':')[0] + ':' + dateTimeParts[1].split(':')[1];
  const formattedDateTime = datePart.replace(/-/g, '. ') + ' ' + timePart;

  return formattedDateTime;
};

interface CurationCreatedDateProps {
  createdAt?: string;
}

const CurationCreatedDate: React.FC<CurationCreatedDateProps> = ({ createdAt }) => {
  const formattedDateTime = convertDateTimeFormat(createdAt);

  return <CreatedDate>업로드 : {formattedDateTime}</CreatedDate>;
};

const CreatedDate = styled.div`
  margin: -0.2rem 0rem;
  color: #adacac;
  text-align: right;
`;

export default CurationCreatedDate;
