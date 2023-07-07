import { useState } from "react";
import tw from 'twin.macro';
import styled  from "styled-components";

import Button from "../buttons/Button";
import ProfileImg from '../../img/profile_img2.png';

const CurationProfileInfo = () => {

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
                    <Nickname>최연수</Nickname>
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
        w-10
        h-10
        mr-3
    `}  
`;

const DefaultImg = styled.img`
    height: inherit;
    padding-left: 0.2rem;
`;

const Nickname = tw.p`
    text-2xl
    font-thin
    mr-3
`;