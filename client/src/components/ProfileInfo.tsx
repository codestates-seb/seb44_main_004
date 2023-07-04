import { useState } from "react";
import { ButtonHTMLAttributes } from 'react';

import styled  from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    sub?: string;
}

const ProfileInfo = () => {

    // 필요한 데이터
    // 닉네임 , 소개글, 구독자 수, 큐레이션 수
    //받아올 데이터
    const user:{ email:string, nickName: string, password:string, introduce:string} = {
        email: "BOOK@gmail.com",
        nickName: "정지원",
        password: "12345678",
        introduce: "안녕하세요. 저는 뿡뿡이입니다.안녕하세요. 저는 뿡뿡이입니다.안녕하세요. 저는 뿡뿡이입니다.안녕하세요. 저는 뿡뿡이입니다."
        // 프로필 이미지
    }

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
                    <h2>{user.nickName}</h2>
                        {/* 타 유저일 경우 */}
                        {/* <SubscribeButton sub={isSubscribe.toString()} onClick={isSubscribe ? handleModal : handleSubscribe}>
                                {isSubscribe ? '구독중' : '구독하기'}
                        </SubscribeButton> */}
                        {isSubscribe ? 
                            (<SubscribeButton sub={isSubscribe.toString()} onClick={handleModal}>구독중</SubscribeButton>) : 
                            (<SubscribeButton sub={isSubscribe.toString()} onClick={handleSubscribe}>구독하기</SubscribeButton>)}
                </UserInfo>
                <UserIntroduce>{user.introduce}</UserIntroduce>
            </ProfileInfoLeft>

            <ProfileInfoRight>
                <MyButton>
                    <p>MY 구독자</p>
                    <p>50명</p>
                </MyButton>
                <MyButton>
                   <p>MY 큐레이션</p>
                    <p>10개</p>
                </MyButton>
            </ProfileInfoRight>
        </ProfileInfoContainer>
    )
}
export default ProfileInfo;


const ProfileInfoContainer = styled.section`
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    border-bottom: 0.05rem solid black;
    width: 100%;
`;

const ProfileInfoLeft = styled.div`
    > div{
        margin: 1rem 0;
    }   
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    h2{ 
        margin-right: 1rem;
    }
`;

const UserIntroduce = styled.div`
    width: 80%;
`;

const ProfileInfoRight = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`;

const MyButton = styled.div`
    width: 8rem;
    text-align: center;
    padding: 0.8rem 1rem;
    border-radius: 1rem;
    color: white;
    background-color: ${({theme}) => theme.colors.mainBlueGreen};

    >p:first-child{
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
    }

    >p:last-child{
        font-size: 1rem;
    }
    
    &:hover{

    }
`
const SubscribeButton = styled.button<ButtonProps>`
    border-radius: 1.25rem;
    padding: 0.3rem 0.5rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.mainLogoColor};
    background-color: ${(props) => props.sub === "true" ?  props.theme.colors.mainLogoColor : 'white'};
    color: ${(props) => props.sub === "true" ? `white` : props.theme.colors.mainLogoColor  };

    cursor: pointer;
`;