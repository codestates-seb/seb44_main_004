import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";

import tw from 'twin.macro';
import styled  from "styled-components";

import axios from "axios";
import Button from "../buttons/Button";
import Modal from "../modals/Modal";
import { modalActions } from "../../store/modalSlice";
import { ModalType } from "../type";
import ProfileImg from '../../img/profile_img2.png';

interface User {
    email?: string,
    introduction?: string | null,
    memberId?: number,
    memberStatus?: string,
    nickname?: string,
}
const ProfileInfo = () => {

    // const user:{ email:string, nickName: string, password:string, introduction:string} = {
    //     email: "BOOK@gmail.com",
    //     nickName: "정지원",
    //     password: "12345678",
    //     introduction: "안녕하세요. 저는 뿡뿡이입니다.안녕하세요. 저는 뿡뿡이입니다.안녕하세요. 저는 뿡뿡이입니다.안녕하세요. 저는 뿡뿡이입니다."
    //     // 프로필 이미지
    //     // imgUrl: ""

    // }
    const [user, setUser] = useState<User>({});

    //false : 구독하기 , true : 구독중
    const [isSubscribe, setIsSubscribe] = useState<boolean>(true);
    
    // const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const isModal = useSelector((state:RootState) => state.modal.isModalOpen);
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(modalActions.open());
    }

    //구독 버튼 클릭 핸들러
    const handleSubscribe = () => {
        setIsSubscribe(!isSubscribe); //구독 상태 변경 (구독중 -> 구독하기)
    }

    //구독중 클릭 핸들러
    const handleModal = () => {
        // setIsOpenModal(!isOpenModal); //모달창 오픈
        handleOpenModal();
        setIsSubscribe(!isSubscribe); //구독 상태 변경 (구독하기 -> 구독중)
        
    }
    const getUserInfo = () => {
        axios.get(`http://ec2-54-180-18-106.ap-northeast-2.compute.amazonaws.com:8080/members/curations`, {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJBRE1JTiIsIlVTRVIiXSwidXNlcm5hbWUiOiJ6bHpsc2tzazEyM0BuYXZlci5jb20iLCJtZW1iZXJJZCI6NSwic3ViIjoiemx6bHNrc2sxMjNAbmF2ZXIuY29tIiwiaWF0IjoxNjg4OTk5NDY5LCJleHAiOjE2ODkwMTc0Njl9.MIUUSe_UFXKLu1n0aR6FAFmWOBmQiHFO84H50U53Svb7bvG-mBVTIA-seqSbwQ_6"
            }
        }).then((res) => {
            const userInfo = {
                email: res.data.email,
                introduction: res.data.introduction,
                memberId: res.data.memberId,
                memberStatus: res.data.memberStatus,
                nickname: res.data.nickname,
            }
            setUser(userInfo);

        });
    };

    useEffect(() => {
        getUserInfo();
    },[]);

    return(
        
        <ProfileInfoContainer>
            <ProfileInfoLeft>
                <UserInfo>

                    {/* 프로필 이미지가 있는 경우 */}
                    <ProfileImage>
                        <DefaultImg src={ProfileImg} alt="profileImg" />
                    </ProfileImage >
                    

                    <Nickname>{user.nickname}</Nickname>
                        {/* 타 유저일 경우 */}
                        
                        {isSubscribe ? 
                            (<Button type="subscribe" content="구독중" width="5rem" isSubscribed onClick={handleModal}/> ):
                            (<Button type="subscribe" content="구독하기" width="5rem" onClick={handleSubscribe}/>)
                        }
                        { isModal &&
                            <Modal type={ModalType.SUBSCRIBE}/>
                        }
                </UserInfo>

                <UserIntroduce>{user.introduction || "아직 소개글이 없습니다." }</UserIntroduce>

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


const ProfileInfoContainer = tw.section`
    w-full
    flex
    justify-between
    py-10
    border-b-2
    border-solid
    border-gray-300
`;

const ProfileInfoLeft = styled.div`
    > div{
        margin: 1rem 0;
    }   
`;

const UserInfo = tw.div`
    flex
    items-center
`;
const ProfileImage = styled.div`
    ${tw`
        rounded-full
        w-10
        h-10
        mr-3
    `}  
`;
const DefaultImg = styled.img`
    height: inherit;
    padding-left: 0.2rem;
`;
const Nickname = tw.p`
    text-3xl
    font-semibold
    mr-3
`;
const UserIntroduce = tw.div`
    w-4/5
`;
const ProfileInfoRight = styled.div`
    @media (max-width: 1000px) {
        flex-direction: column;
        gap: 0.5rem;
    }
    ${tw`
        flex
        items-center
        gap-8
    `}
`;

const MyButton = styled.div`
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
    ${tw`
        w-32
        text-center
        py-3
        px-4
        rounded-2xl
        text-white
    `}
`;

