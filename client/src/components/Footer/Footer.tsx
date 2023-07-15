import tw from 'twin.macro';
import { v4 as uuid4 } from 'uuid';

const projectInfo = [
  {
    id: uuid4(),
    href: 'https://www.notion.so/codestates/4-d7dbd17f234d4d27898663cf3349183f?p=c9f9f926adaa4137bb854e1bcc8081ee&pm=s',
    title: 'API 문서',
  },
  {
    id: uuid4(),
    href: 'https://www.notion.so/codestates/4-d7dbd17f234d4d27898663cf3349183f?p=c9f9f926adaa4137bb854e1bcc8081ee&pm=s',
    title: '화면 정의서',
  },
  {
    id: uuid4(),
    href: 'https://www.notion.so/codestates/4-d7dbd17f234d4d27898663cf3349183f?p=c9f9f926adaa4137bb854e1bcc8081ee&pm=s',
    title: ' 사용자 요구사항 정의서',
  },
  {
    id: uuid4(),
    href: 'https://www.notion.so/codestates/4-d7dbd17f234d4d27898663cf3349183f?p=c9f9f926adaa4137bb854e1bcc8081ee&pm=s',
    title: '  서비스 메뉴얼',
  },
];

const imgs = [
  {
    id: uuid4(),
    imgUrl: '../../../src/img/github_icon.png',
    title: '프로젝트 깃허브로 가기',
    href: 'https://github.com/codestates-seb/seb44_main_004/tree/main',
  },
  {
    id: uuid4(),
    imgUrl: '../../../src/img/notion_icon.png',
    title: '프로젝트 노션 문서보러가기',
    href: 'https://www.notion.so/codestates/4-d7dbd17f234d4d27898663cf3349183f',
  },
  {
    id: uuid4(),
    imgUrl: '../../../src/img/jy.png',
    title: 'jiye-7',
    href: 'https://github.com/jiye-7',
  },
  {
    id: uuid4(),
    imgUrl: '../../../src/img/jeongjwon.png',
    title: 'jeongjwon',
    href: 'https://github.com/jeongjwon',
  },
  {
    id: uuid4(),
    imgUrl: '../../../src/img/yschoi.png',
    title: 'ella-yschoi',
    href: 'https://github.com/ella-yschoi',
  },
  {
    id: uuid4(),
    imgUrl: '../../../src/img/wook0112.png',
    title: 'WOOK0112',
    href: 'https://github.com/WOOK0112',
  },
  {
    id: uuid4(),
    imgUrl: '../../../src/img/yungju.png',
    title: 'Kyunju',
    href: 'https://github.com/Kyunju',
  },
  {
    id: uuid4(),
    imgUrl: '../../../src/img/juyoung.png',
    title: 'HanJuYoung309',
    href: 'https://github.com/HanJuYoung309',
  },
];

const Footer = () => {
  return (
    <Container>
      <FooterWrapper>
        <ServiceTitle>
          <h5 className="footer-title">Whose Book</h5>
          <p>저희 '후즈북'은요</p>
          <p>'좋은 책'을 읽고 싶은 분들을 위한 서비스입니다.</p>
        </ServiceTitle>
        <ServiceInfo>
          <ProjectInfoList>
            {projectInfo.map(({ id, href, title }) => (
              <li key={id}>
                <a href={href} target="_blank">
                  {title}
                </a>
              </li>
            ))}
          </ProjectInfoList>
          <TeamMemberInfo>
            {imgs.map(({ id, imgUrl, title, href }) => (
              <li key={id}>
                <a href={href} target="_blank">
                  <img src={imgUrl} title={title} alt={title} />
                </a>
              </li>
            ))}
          </TeamMemberInfo>
        </ServiceInfo>
      </FooterWrapper>
      <CopyLight>© 책 4냥꾼 | All Rights Reserved 2023</CopyLight>
    </Container>
  );
};

const Container = tw.div`
  bg-blue-500
  mt-10
  py-10
  px-5
`;

const FooterWrapper = tw.footer`
  flex
  justify-between
`;

const ServiceTitle = tw.div`
  [> h5]:mb-10
  [> p]:text-white
  [> p]:mt-2
`;

const ServiceInfo = tw.div`
  flex
  flex-col
  [> ul]:flex
`;

const ProjectInfoList = tw.ul`
  mt-4
  mb-4
  [> li]:mr-7
  text-white
`;

const TeamMemberInfo = tw.ul`
  [> li > a > img]:w-10
  [> li]:mr-4
`;

const CopyLight = tw.p`
  text-right
  text-white
  mt-7
  pr-7
`;

export default Footer;
