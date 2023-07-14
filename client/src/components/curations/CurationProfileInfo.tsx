import { useState } from "react";
import tw from 'twin.macro';
import styled  from "styled-components";

import Button from "../buttons/Button";
import ProfileImg from '../../img/profile_img2.png';

interface CuratorProps {
    curator?: string;
}

const CurationProfileInfo: React.FC<CuratorProps> = ({ curator }) => {

    //false : 구독하기 , true : 구독중
    const [isSubscribe, setIsSubscribe] = useState<boolean>(true);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    //구독 버튼 클릭 핸들러
    const handleSubscribe = () => {
        setIsSubscribe(!isSubscribe); //구독 상태 변경 (구독중 -> 구독하기)
    }

    //구독중 클릭 핸들러
    const handleModal = () => {
        setIsOpenModal(!isOpenModal); //모달창 오픈
        setIsSubscribe(!isSubscribe); //구독 상태 변경 (구독하기 -> 구독중)
    }
    return(
        <ProfileInfoContainer>
            <ProfileInfoLeft>
                <UserInfo>
                    <ProfileImage>
                        <DefaultImg src={ProfileImg} alt="profileImg" />
                    </ProfileImage >
                    <Nickname>
                        {curator}
                    </Nickname>
                        {isSubscribe ? 
                            (<Button type="subscribe" content="구독중" width="5rem" isSubscribed onClick={handleModal}/> ):
                            (<Button type="subscribe" content="구독하기" width="5rem" onClick={handleSubscribe}/>)
                        }
                </UserInfo>
            </ProfileInfoLeft>
        </ProfileInfoContainer>
    )
}
export default CurationProfileInfo;


const ProfileInfoContainer = tw.section`
    w-full
    flex
    justify-between
`;

const ProfileInfoLeft = styled.div`
    > div {
        margin: 1rem 0;
    }   
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
        mr-5
    `}  
`;

const DefaultImg = styled.img`
    height: inherit;
    padding-left: 1rem;
`;

const Nickname = tw.p`
    text-lg
    font-thin
    mr-3
`;