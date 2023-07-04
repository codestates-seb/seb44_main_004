import { useState } from "react";
import { ButtonHTMLAttributes } from 'react';
import styled  from "styled-components";

import "../index.css";

type ButtonProps = {
    sub: boolean;
  } & ButtonHTMLAttributes<HTMLButtonElement>;
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

    //구독 버튼 클릭 핸들러
    const handleSubscribe = () => {
        setIsSubscribe(!isSubscribe);
    }

    return(
        
        <ProfileInfoContainer>
            <ProfileInfoLeft>
                <div className="user-info">
                    <h2>{user.nickName}</h2>
                    {isSubscribe ? 
                    (<Button sub={isSubscribe} onClick={handleSubscribe}>구독중</Button>) : 
                    (<Button sub={isSubscribe} onClick={handleSubscribe}>구독하기</Button>)}
                </div>
               
                <div> {user.introduce}</div>
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
`
const ProfileInfoLeft = styled.div`

    .user-info{
        display: flex;
        align-items: center;
        h2{ 
            margin-right: 1rem;
        }
        
    }
    >div{
        margin: 1rem 0;
        width: 20rem;
    }   
`
const ProfileInfoRight = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;

`
const MyButton = styled.div`
    background-color: #1f4e5f;
    color: white;

    padding: 1.2rem;
    border-radius: 1rem;
    text-align: center;
    
    width: 8rem;
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
const Button = styled.button<ButtonProps>`
    border-radius: 1.25rem;
    padding: 0.3rem 0.5rem;
    border: 0.1rem solid var(--main-skyBlue-500);
    background-color: ${(props) => props.sub ? `var(--main-skyBlue-500)` : `white`};
    color: ${(props) => props.sub ? `white` : `var(--main-skyBlue-500)` };

    cursor: pointer;
`;