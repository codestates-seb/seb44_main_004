import tw from "twin.macro";
import styled from "styled-components";

import {AiFillHeart, AiOutlineHeart}from "react-icons/ai";
import { CurationType } from "../type";

interface CurationProps {
    type?: CurationType,
    emoji?: string,
    title?: string,
    content?: string,
    like?: number,
    nickname?: string,
    memberId?: number,
}
const CurationCard = ({type, emoji, title, content, like, nickname, memberId}:CurationProps) => {

    //클릭시 
    return(
        <CardContainer type={type}>
            <Item>{emoji}</Item>
            <Item>{title}</Item>
            <Item>{content}</Item>
            <Item>
                <div className="likes">
                    <AiFillHeart />
                    좋아요 {like}개
                </div>
                <div className="nickname">
                    {nickname}
                </div>
            </Item>
          
               
        </CardContainer>
    )

}
const CardContainer = styled.div<CurationProps>`
    width: ${(props) => props.type === CurationType.MYPAGE ? `calc(50% - 1rem)` : `calc(33.33% - 1rem)`};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 2rem ;
    margin-bottom: 1.8rem;
    font-size: 0.8vw;
    border-radius: 0.625rem;
    background-color: #D9E1E8;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    cursor: pointer;
    
    &:hover{
        background-color: ${({theme}) => theme.colors.mainPastelBlue300};
        color: white;
        >div:nth-child(3){
            color: white;
        }
    }
`;
const Item = styled.div`
    margin: 0.5rem 0;
    
    &:first-child {
        font-size: 1.3vw;
    }
    &:nth-child(2){
        font-size: 1vw;
        font-weight: 600;
    }
    &:nth-child(3){
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        color: #595656;
    }
    &:nth-child(4){
        display: flex;
        align-items: center;
        > .likes{
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }
        > .nickname{
            font-weight: 400;
        }
    }
    &:last-child{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        
    }
   

`
export default CurationCard;


