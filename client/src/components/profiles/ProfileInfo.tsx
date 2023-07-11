import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";

import tw from 'twin.macro';
import styled  from "styled-components";

import axios from "axios";
import Button from "../buttons/Button";
import Modal from "../modals/Modal";
import { modalActions } from "../../store/modalSlice";
import { ModalType, UserPageType } from "../type";
import ProfileImg from '../../img/profile_img2.png';
import { getUserInfoAPI } from "../../api/profileApi";
import { User } from "../../types/profile";
import { ProfileTypeProps } from "../../types/profile";


const ProfileInfo = ({type}: ProfileTypeProps) => {
    const [user, setUser] = useState<User>();
    
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
        handleOpenModal();
        setIsSubscribe(!isSubscribe); //구독 상태 변경 (구독하기 -> 구독중)
        
    }
    const handleGetUserInfo = async () => {
        const response = await getUserInfoAPI();
        if(response){
            console.log(response);
            const userInfo = {
                email: response.data.email,
                introduction: response.data.introduction,
                memberId: response.data.memberId,
                memberStatus: response.data.memberStatus,
                nickname: response.data.nickname,
                curations: response.data.curations.length,
            }
            setUser(userInfo);
        }
    };
    const checkMyPage = (data:number):boolean => {
        if(Number(localStorage.getItem('memberId')) === data) return true;
        else return false;
    }

    useEffect(() => {
        handleGetUserInfo();
    },[]);
    return(
        
        <ProfileInfoContainer>
            <ProfileInfoLeft>
                <UserInfo>

                    {/* 프로필 이미지가 있는 경우 */}
                    <ProfileImage>
                        <DefaultImg src={ProfileImg} alt="profileImg" />
                    </ProfileImage >
                    

                    <Nickname>{user?.nickname}</Nickname>

                        {/* 타 유저일 경우 */}
                        {type === UserPageType.USERPAGE &&
                            <>
                                 {isSubscribe ? 
                                    (<Button type="subscribe" content="구독중" width="5rem" isSubscribed onClick={handleModal}/> ):
                                    (<Button type="subscribe" content="구독하기" width="5rem" onClick={handleSubscribe}/>)
                                }
                                { isModal &&
                                    <Modal type={ModalType.SUBSCRIBE}/>
                                }
                            </>
                        
                        }
                            
                        
                       
                </UserInfo>

                <UserIntroduce>{user?.introduction || "아직 소개글이 없습니다." }</UserIntroduce>

            </ProfileInfoLeft>

            <ProfileInfoRight>
                <MyButton>
                    <p>MY 구독자</p>
                    <p>50명</p>
                </MyButton>
                <MyButton>
                   <p>MY 큐레이션</p>
                    <p>{user?.curations}개</p>
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
    gap-[3rem]
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
    leading-6
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

