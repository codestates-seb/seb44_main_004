import tw from "twin.macro";
import styled from "styled-components";

import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileDetail from "../components/profile/ProfileDetail";

const MyPage = () => {
    //구독상태 판별

    return(
        <MyPageContainer>
            <ProfileInfo />
            <ProfileDetail />
        </MyPageContainer>
    )
}

export default MyPage;

const MyPageContainer = styled.div`
    padding: 5rem 10%;
    background-color: ${({theme}) => theme.colors.mainLightGray100};
    ${tw`
        w-full
        flex
        flex-col
        justify-center
        items-center
    `} 
`
