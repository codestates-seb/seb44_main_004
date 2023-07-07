import tw from "twin.macro";
import styled from "styled-components";

import ProfileInfo from "../components/profiles/ProfileInfo";
import ProfileDetail from "../components/profiles/ProfileDetail";

const UserPage = () => {
    //구독상태 판별
    

    return(
        <UserPageContainer>
            <ProfileInfo />
            <ProfileDetail />
        </UserPageContainer>
    )
}

export default UserPage;


const UserPageContainer = styled.div`
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
