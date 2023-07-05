import tw from "twin.macro";
import styled from "styled-components";

import {BsPersonCircle} from "react-icons/bs"
import {RxDividerVertical} from "react-icons/rx";

const SubCuratorCard = () => {

    return(
        <CuratorContainer>
            <CuratorLeft>
               
                    <BsPersonCircle size="3rem"/>
            </CuratorLeft>
                
            <CuratorRight>
               <CuratorInfo>
                   
                    <UserNickname>
                        앙꼬
                    </UserNickname>
                    <UserInfo>
                        구독자 10명
                    </UserInfo>
                    <RxDividerVertical size="1.2rem"/>
                    <UserInfo>
                        작성한 큐레이션 5개
                    </UserInfo>
                    
                </CuratorInfo>
               <CuratorIntro>
                    안녕하세요. 앙꼬 입니다. 팥앙꼬를 좋아합니다.
                    안녕하세요. 앙꼬 입니다. 팥앙꼬를 좋아합니다.
                </CuratorIntro>
                
            </CuratorRight>
        </CuratorContainer>
    )
}

const CuratorContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1.3rem 2rem ;
    margin: 1rem;
    
    font-size: 1.2vw;
    border-radius: 0.625rem;
    background-color: #D9E1E8;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    cursor: pointer;

    &:hover{
        background-color: ${({theme}) => theme.colors.mainPastelBlue300};
        color: white;
    }   
    svg{
        display:flex;
        align-items: center;
    }

`;
const CuratorLeft = tw.div`
    mr-8
`;
const CuratorRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    >div:last-child{
        margin-right: auto;
    }
`;
const CuratorInfo = tw.div`
    flex
    items-center
    gap-2
`;
const UserNickname = tw.p`
    text-lg
`;
const UserInfo = tw.p`
    
`;
const CuratorIntro = tw.div`
    
`;

export default SubCuratorCard;