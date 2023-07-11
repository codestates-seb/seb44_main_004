import { useState, useEffect } from "react";

import styled from "styled-components";
import axios from "axios";

import Input from '../input/Input';
import Label from '../label/Label';
import Button from '../buttons/Button';
import ImageUpload from "../imageUpload/ImageUpload";

import CurationCard from "../cards/CurationCard";
import SubCuratorCard from "../cards/SubCuratorCard";
import { CurationType, UserPageType } from "../type";

import { getUserInfoAPI,updateUserInfoAPI } from "../../api/profileApi";
import { Curation, Curator } from "../../types/card";
import { User } from "../../types/profile";
import { ProfileTypeProps } from "../../types/profile";

const ProfileDetail = ({type}:ProfileTypeProps) => {

    const [selected, setSelected] = useState<number|null>(0);

    const [nickname ,setNickname] = useState<string>("");
    const [introduction ,setIntroduction] = useState<string>("");
    const [selectImg, setSelectImg] = useState<string>('');
    const [isInValid, setIsInValid] = useState<boolean>(false);

    const [writtenCurations, setWrittenCurations] = useState<Array<Curation>>();
    const [user, setUser] = useState<User>();

    const handleSelectImage = (imgURL: string) => {
      setSelectImg(imgURL);
    };

    const myList:Array<string> = ["회원정보 수정", "작성한 큐레이션", "좋아요한 큐레이션", "구독하는 큐레이터"] ;
    const anotherList:Array<string> = ["작성한 큐레이션", "좋아요한 큐레이션"] ;


    //큐레이션 -> writtenCuration, likeCuration
    const curations: Array<Curation> = [
        {
            emoji: "🌝",
            title: "나는 앞으로 몇 번의 보름달을 볼 수 있을까",
            content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
            like: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          {
            emoji: "🌝",
            title: "나는 앞으로 몇 번의 보름달을 볼 수 있을까",
            content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
            like: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          {
            emoji: "🌝",
            title: "나는 앞으로 몇 번의 보름달을 볼 수 있을까",
            content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
            like: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          {
            emoji: "🌝",
            title: "나는 앞으로 몇 번의 보름달을 볼 수 있을까",
            content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
            like: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          {
            emoji: "🌝",
            title: "나는 앞으로 몇 번의 보름달을 볼 수 있을까",
            content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
            like: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          {
            emoji: "🌝",
            title: "나는 앞으로 몇 번의 보름달을 볼 수 있을까",
            content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
            like: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          
    ];

    //큐레이터 
    const curators: Array<Curator> = [
        {
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduction: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.",
        },
        {
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduction: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. ",
        },{
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduction: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.",
        },{
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduction: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.",
        },{
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduction: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.",
        },{
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduction: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.",
        },
    ];

    const checkNickname = (data: string):boolean=> {
        if(data.length < 2 || data.length >= 15){
            return false;
        }else{
            return true;
        }
    };

    const handleUpdate = async () => {
        if(!checkNickname(nickname)){
           alert('닉네임을 올바르게 입력해주세요!');
        }else{
            const data = {
                nickname,
                introduction
            };
            const response = await updateUserInfoAPI(data);
            if(response){
                window.location.reload();
            }
        }
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
            setWrittenCurations(response.data.curations);
            setNickname(userInfo.nickname);
            setIntroduction(userInfo.introduction);
        }
    };

    useEffect(() => {
        handleGetUserInfo();
    },[]);

    // const getwrittenCuration = () => {
    //     axios.get(`http://ec2-54-180-18-106.ap-northeast-2.compute.amazonaws.com:8080/members/curations`, {
    //         headers: {
    //             Authorization: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJBRE1JTiIsIlVTRVIiXSwidXNlcm5hbWUiOiJ6bHpsc2tzazEyM0BuYXZlci5jb20iLCJtZW1iZXJJZCI6NSwic3ViIjoiemx6bHNrc2sxMjNAbmF2ZXIuY29tIiwiaWF0IjoxNjg5MDMzNjQ4LCJleHAiOjE2ODkwNTE2NDh9.Vhb_rSphJAiOSYIX6o1GQqYVXy1pBM0vhmxv192u9TFF7mRLmCclL68uvBHJ20Va"
    //         }
    //     }).then((res) => {
    //         console.log(res);
    //         setWrittenCurations(res.data.curations);
           
    //     });
    // };

  
    return(
        <ProfileDetailContainer>
            <ProfileAside>
            <ul>
            { type === UserPageType.MYPAGE ? 
                <>
                    {myList.map((e, idx) => (
                        <ProfileList
                            key={`my ${idx}`}
                            className={`list ${
                                    selected === idx ? "selected" : ""
                            }`}
                            onClick={() => {
                                setSelected(idx);
                                // idx === 0 ? getUserInfo() 
                                // : (idx === 1 ? getwrittenCuration() 
                                // : (idx === 2 ? () 
                                // : ()))
                            
                            }}>{e}</ProfileList>
                    ))}
                </>
                :
                <>
                    {anotherList.map((e,idx) => (
                    <ProfileList 
                        key={`another ${idx}`}
                        className={`list ${
                            selected === idx ? "selected" : ""
                        }`}
                        onClick={() => {
                            setSelected(idx);
                        }}>{e}</ProfileList>
                    ))}
                </>
            }

            </ul>
            </ProfileAside>
            <ProfileDetailMain>

                {/* selected 에 따른 화면 구성  */}
            { type === UserPageType.MYPAGE ? 
                <>
                { selected === 0 ? (
                    <MainContainer>
                        <InputForm>
                            <Label type="title" htmlFor="email" content="아이디(이메일)"/>
                            <div>{user?.email}</div>
                        </InputForm>
                        <InputForm>
                            <Label type="title" htmlFor="nickName" content="닉네임"/>
                            <Input 
                                type="text" 
                                value={nickname} 
                                id="nickname" 
                                borderRadius="0.3rem"
                                color="#000"
                                focusMode="true"
                                onChange={ (e:React.ChangeEvent<HTMLInputElement>) => 
                                    setNickname(e.target.value)}  
                                placeholder="닉네임은 2글자 이상 15글자 미만, 영어. 한글, 숫자만 입력가능합니다"
                                />
                            </InputForm>
                         <InputForm>
                            <Label type="title" htmlFor="introduction" content="소개글"/>
                             <Textarea
                                 value={introduction || ''}  
                                 maxLength={200}
                                 onChange={ (e:React.ChangeEvent<HTMLTextAreaElement>) => 
                                     setIntroduction(e.target.value)}  
                                 placeholder="자신을 소개하는 글을 200자 이하로 입력하세요."/>
                            <IntroduceLenCheck>{introduction?.length}/200</IntroduceLenCheck>
                        </InputForm>
                         <InputForm>
                            <Label type="title" htmlFor="profileImage" content="프로필 이미지"/>
                            <ImageUpload selectImg={selectImg} handleSelectImage={handleSelectImage} />
                             </InputForm>
                         <InputForm>
                            <Button type="primary" content="발행" onClick={handleUpdate}/>
                        </InputForm>
                    </MainContainer> 
                ):(
                    selected === 1 ? (
                        
                    <MainContainer>
                        {writtenCurations?.length} 개의 큐레이션
                        <CurationsDiv>
                            {writtenCurations && 
                               writtenCurations.map((e, idx) => 
                               <CurationCard 
                                   key={`my ${idx}`}
                                   type={CurationType.MYPAGE}
                                   emoji={e.emoji} 
                                   title={e.title} 
                                   content={e.content} 
                                   like={e.like} 
                                   nickname={user?.nickname} 
                                   memberId={e.memberId}
                                   curationId={e.curationId}
                                />
                               )
                           }
                        </CurationsDiv>
                    </MainContainer>
                ):(
                    selected === 2 ? (
                    
                    <MainContainer>
                        {curations.length} 개의 큐레이션
                        <CurationsDiv>
                             {curations && 
                                 curations.map((e, idx) => 
                                 <CurationCard 
                                     key={`my ${idx}`}
                                     type={CurationType.MYPAGE}
                                     emoji={e.emoji} 
                                     title={e.title} 
                                     content={e.content} 
                                     like={e.like} 
                                     nickname={e.nickname} 
                                     memberId={e.memberId}/>
                                 )
                             }
                        </CurationsDiv>
                    </MainContainer>
                ):(
                
                    <MainContainer>
                        {curators.length}명의 큐레이터
                        <CuratorDiv>
                            {curators && 
                                curators.map((e, idx) => 
                                <SubCuratorCard 
                                    key={`my sub ${idx}`}
                                    nickname={e.nickname} 
                                    subscribers={e.subscribers}
                                    curations={e.curations}
                                    introduction={e.introduction}
                                    />
                                )       
                            }
                        </CuratorDiv>
                </MainContainer>
                )))}
                </>
            :
                <>
                {/* 타 유저일 경우  */}
                { selected === 0 ? (
                    <MainContainer>
                        {curations.length} 개의 큐레이션
                        <CurationsDiv>
                            {writtenCurations && 
                               writtenCurations.map((e, idx) => 
                               <CurationCard 
                                   key={`my ${idx}`}
                                   type={CurationType.MYPAGE}
                                   emoji={e.emoji} 
                                   title={e.title} 
                                   content={e.content} 
                                   like={e.like} 
                                   nickname={user?.nickname} 
                                   memberId={e.memberId}
                                   curationId={e.curationId}
                                />
                               )
                           }
                        </CurationsDiv>
                    </MainContainer> 
                ):(
                    <MainContainer>
                        {curations.length} 개의 큐레이션
                        <CurationsDiv>
                            {curations && 
                                curations.map((e, idx) => 
                                <CurationCard 
                                    key={`my ${idx}`}
                                    type={CurationType.MYPAGE}
                                    emoji={e.emoji} 
                                    title={e.title} 
                                    content={e.content} 
                                    like={e.like} 
                                    nickname={e.nickname} 
                                    memberId={e.memberId}/>
                                )
                            }
                        </CurationsDiv>
                    </MainContainer>

                )}
                </>
            }
            </ProfileDetailMain>
        </ProfileDetailContainer>

    )

}

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
    width: 20%;
    ul{
      display: flex;
      flex-direction: column;
      @media (max-width: 1000px) {
        
          flex-direction: row;
          justify-content: space-between;
      }
    }  
    @media (max-width: 1000px) {
      width: 100%;
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
        border-right: 0.3rem solid ${({theme}) => theme.colors.mainLogoColor};
        font-weight: 500;
        /* background-color: ${({theme}) => theme.colors.mainPastelBlue100}; */
        @media (max-width: 1000px) {
           border-bottom: 0.3rem solid ${({theme}) => theme.colors.mainLogoColor};
           border-right: 0;
        }
    }
 
`

const ProfileDetailMain = styled.main`
    flex-grow: 4;
    /* padding: 0 4rem; */
    padding: 0 0.5rem 0 4rem;
    width: 80%;
    @media (max-width: 1000px) {
        padding: 2rem 0.5rem;
        width: 100%;
    }
`
const MainContainer = styled.div`
    label{
        text-align:left;
        margin-bottom: 0.3rem;
    }
`

const InputForm = styled.div`
    margin-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
   :first-child{
        >div{
            font-weight: 500;
        }
    }  
    &:nth-last-child(2){
        >div{
            label{
                text-align: center;
            }
        }
    }
    &:last-child{
        align-items: flex-end;
    }
`

const Textarea = styled.textarea`
    width: 100%;
    height: 10rem;

    background-color: #F8F7F7;
    border: none;
    border-radius: 0.3rem;
    padding: 0.7rem;
    &:focus {
        border: 1px solid #0077ff;
        box-shadow:0px 0px 5px 3px rgba(46, 139, 245, 0.3);
        outline: none;
    }
`
const IntroduceLenCheck = styled.div`
    text-align: right;
    margin-top: 0.3rem;
    font-size: 0.8rem;
    color: ${({theme}) => theme.colors.mainLightGray400};
`
const CurationsDiv = styled.div`
    display: flex;
    flex: 1 1 50%;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1rem;
`

const CuratorDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
export default ProfileDetail;