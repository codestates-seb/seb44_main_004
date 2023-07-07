import tw from 'twin.macro';
import styled  from "styled-components";

import Button from "../buttons/Button";
import {AiFillHeart}from 'react-icons/ai';

const CurationDetailInfo = () => {

    return(
        <DetailInfoContainer>
                <UserInfo>
                    <Category>
                    <Button type="category" content="시/에세이" />
                    </Category >
                    <AiFillHeart /> 좋아요 20개
                </UserInfo>
        </DetailInfoContainer>
    )
};

export default CurationDetailInfo;

const DetailInfoContainer = tw.section`
    w-full
    flex
    justify-between
`;

const UserInfo = tw.div`
    flex
    items-center
`;

const Category = styled.div`
    ${tw`
        rounded-full
        w-10
        h-10
        mr-24
    `}  
`;