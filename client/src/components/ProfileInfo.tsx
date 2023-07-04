import styled from "styled-components";


const ProfileInfo = () => {

    // 필요한 데이터
    // 닉네임 , 소개글, 구독자 수, 큐레이션 수
    
    // width 지정 필요!
    
    return(
        
        <ProfileInfoContainer>
            <ProfileInfoLeft>
                <h2>정지원</h2>
                <div> 안녕하세요. 저는 책을 좋아하는 책벌레입니다.안녕하세요. 저는 책을 좋아하는 책벌레입니다.안녕하세요. 저는 책을 좋아하는 책벌레입니다.안녕하세요. 저는 책을 좋아하는 책벌레입니다.</div>
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

export const ProfileInfoContainer = styled.section`
    display: flex;
    /* justify-content: center;
    gap: 2rem; */
    justify-content: space-between;
    padding: 2rem 0;
    border-bottom: 0.05rem solid black;

`
export const ProfileInfoLeft = styled.div`
    >div{
        width: 20rem;
    }   
`
export const ProfileInfoRight = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;

`
export const MyButton = styled.div`
    background-color: #1f4e5f;
    color: white;

    padding: 1.2rem;
    border-radius: 1rem;
    text-align: center;
    
    >p:first-child{
        
    }
    >p:last-child{
        font-size: 0.8rem;

    }
    &:hover{

    }
`