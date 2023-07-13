import tw from 'twin.macro';
import styled  from "styled-components";

import ProfileImg from '../../img/profile_img2.png';

const ReplyProfileInfo = () => {
    return(
        <ProfileInfoContainer>
            <UserInfo>
                <ProfileImage>
                    <DefaultImg src={ProfileImg} alt="profileImg" />
                </ProfileImage>
                <Nickname>
                    최연수
                </Nickname>
            </UserInfo>
        </ProfileInfoContainer>
    )
}
export default ReplyProfileInfo;


const ProfileInfoContainer = tw.section`
    w-full
    flex
    justify-between
`;

const UserInfo = tw.div`
    flex
    items-center
`;

const ProfileImage = styled.div`
    ${tw`
        rounded-full
        w-8
        h-8
        mr-3
        mb-2
    `}  
`;

const DefaultImg = styled.img`
    height: inherit;
    padding-left: 0.2rem;
`;

const Nickname = tw.p`
    text-xl
    font-thin
    mb-2
`;