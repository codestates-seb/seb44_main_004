import { useState } from "react";
import styled from "styled-components";

import "../index.css";

const ProfileDetail = () => {

    const [selected, setSelected] = useState<number|null>(0);
    const [nickName ,setNickName] = useState<string|undefined>("");
    const [password ,setPassword] = useState<string|undefined>("");
    const [introduce ,setIntroduce] = useState<string|undefined>("");

    const myList:Array<string> = ["회원정보 수정", "작성한 큐레이션", "좋아요한 큐레이션", "구독하는 큐레이터"] ;
    const anotherList:Array<string> = ["작성한 큐레이션", "좋아요한 큐레이션"] ;

    //받아올 데이터
    const user:{ email:string, nickName: string, password:string, introduce:string} = {
        email: "BOOK@gmail.com",
        nickName: "보라돌이",
        password: "12345678",
        introduce: "안녕하세요. 저는 뿡뿡이입니다."
        // 프로필 이미지, 이모지
    }
    

    return(
        <ProfileDetailContainer>
            <ProfileAside>
            <ul>
            {/* 본인 페이지일 경우 */}
            {myList.map((e, idx) => (
                    <ProfileList
                        key={`my ${idx}`}
                        className={`list ${
                                selected === idx ? "selected" : ""
                        }`}
                        onClick={() => {
                            setSelected(idx);}}>

                        {e}</ProfileList>
                ))}   
            {/* {anotherList.map((e,idx) => (
                <ProfileList 
                    key={`another ${idx}`}
                    className={`list ${
                        selected === idx ? "selected" : ""
                    }`}
                    onClick={() => {
                        setSelected(idx);}}>
                            
                        {e}</ProfileList>
            ))} */}
            </ul>
            </ProfileAside>
            <ProfileDetailMain>
                {/* selected 에 따른 화면 구성  */}
                { selected === 0 ? 

                    (<MainContainer>
                        {/* 지예님 공통 컴포넌트 적용 전 */}
                <div className="user_id">
                        <label>아이디(이메일)</label>
                        <div>{user.email}</div>
                    </div>
                    <div className="user_id">
                        <label>닉네임</label>
                        <input 
                            type="text"
                            value={nickName} 
                            onChange={ (e:React.ChangeEvent<HTMLInputElement>) => 
                                setNickName(e.target.value)}  
                            placeholder="닉네임은 2글자 이상 15글자 미만, 영어. 한글, 숫자만 입력가능합니다"/>
                    </div>
                    <div className="user_id">
                        <label>비밀번호</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={ (e:React.ChangeEvent<HTMLInputElement>) => 
                                setPassword(e.target.value)}  
                            placeholder="비밀번호는 영대, 영소, 숫자, 특수문자 포함"/>
                    </div>
                    <div className="user_id">
                        <label>소개글</label>
                        <textarea 
                            value={introduce}  
                            onChange={ (e:React.ChangeEvent<HTMLTextAreaElement>) => 
                                setIntroduce(e.target.value)}  
                            placeholder="자신을 소개하는 글을 써보세요"/>
                    </div>
                    <div className="user_id">
                        <label>프로필 이미지</label>
                        <input type="file"/>
                    </div>
                    <div className="user_id">
                        <label>이모지</label>
                        <input type="text" placeholder="자신을 나타낼 수 있는 이모지를 써보세요."/>
                    </div>
                    <div>
                        <Button>변경</Button>
                    </div>
            

                    </MainContainer>): 
                        
                        (selected === 1 ? 
                        
                            (<MainContainer>
                                    작성한 큐레이션
                            </MainContainer>) : 
                                
                            ( selected === 2 ? 
                                    
                                    (<MainContainer>
                                        좋아요한 큐레이션
                                    </MainContainer>) : 
                                    
                                        (<MainContainer>
                                            구독하는 큐레이터
                                        </MainContainer>)))}
            </ProfileDetailMain>
        </ProfileDetailContainer>

    )

}

export default ProfileDetail;

 const ProfileDetailContainer = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 3rem;

    @media (max-width: 1000px) {
      flex-direction: column;
    }

`
const ProfileAside = styled.aside`
    flex-grow: 1;
    ul{
      display: flex;
      flex-direction: column;
      list-style: none;
      @media (max-width: 1000px) {
          flex-direction: row;
          justify-content: space-between;
      }
    }   
`
const ProfileList = styled.li`
    padding:  0.5rem 1.5rem 0.5rem 0.5rem;
    text-align: left;
    margin: 0.3rem 0;
    cursor: pointer;
    
    @media (max-width: 1000px) {
        padding: 0.5rem;
    }

    &.selected{
        color: var(--main-skyBlue-500);
        border-right: 0.3rem solid var(--main-skyBlue-500);
        font-weight: 500;

        @media (max-width: 1000px) {
           border-bottom: 0.3rem solid var(--main-skyBlue-500);
           border-right: 0;
        }
    }
 
`

const ProfileDetailMain = styled.main`
    flex-grow: 4;
    padding: 0 4rem;
    
    @media (max-width: 1000px) {
        padding: 2rem 0.5rem;
    }
`
const MainContainer = styled.div`
    label{
        text-align:left;
        margin-bottom: 0.3rem;
    }
    >div:first-child{
        >div{
            font-weight: 500;
        }
    }
    > div{
       
        margin-bottom: 1.2rem;
        display: flex;
        flex-direction: column;
        
        input:not([type="file"]), textarea{
            width: 100%;
            height: 2rem;
            padding: 1rem;
            
            background-color: #F8F7F7;
            border: none;
            border-radius: 0.625rem;
            color: #ACA2A2;
        }
        textarea{
            height: 10rem;
        }
    }
    >div:last-child{
        align-items: flex-end;
    }
`
const Button = styled.button`
    
    border-radius: 0.625rem;
    padding: 0.5rem 1rem;
    border: 0.1rem solid var(--main-skyBlue-500);
    background-color: var(--main-skyBlue-500);
    color: white;

    cursor: pointer;

    &:hover{
        background-color: white;
        color: var(--main-skyBlue-500);
    }
`