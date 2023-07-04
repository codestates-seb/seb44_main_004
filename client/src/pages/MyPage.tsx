import styled from "styled-components";

import ProfileInfo from "../components/ProfileInfo";
import ProfileDetail from "../components/ProfileDetail";

const MyPage = () => {


    return(
        <MyPageContainer>
        <ProfileInfo />
        <ProfileDetail />
        </MyPageContainer>
    )
}

export default MyPage;

export const MyPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5rem 10%;
    width: 100%;
    background-color: #FDFDFD;
`