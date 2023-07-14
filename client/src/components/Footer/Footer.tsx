import tw from 'twin.macro';

const Footer = () => {
  return (
    <Container>
      <FooterWrapper>
        <div>
          <h5 className="footer-title">Whose Book</h5>
          <p>저희 '후즈북'은요</p>
          <p>시간은 별로 없는데 '좋은' 책을 읽고 싶은 분들을 위한 서비스입니다.</p>
        </div>
        <div>
          <ul>
            <li>API 문서</li>
            <li>화면 정의서</li>
            <li>사용자 요구사항 정의서</li>
            <li>서비스 메뉴얼</li>
          </ul>
        </div>
      </FooterWrapper>
    </Container>
  );
};

const Container = tw.div`
  bg-blue-500
  mt-10
  bottom-0
`;

const FooterWrapper = tw.footer`
 
`;

export default Footer;
