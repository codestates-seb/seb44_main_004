import styled from "styled-components";
type Props = {
    type: string,
    title: string,
    button: Array<string>
    //환영 버튼 -> 1개, 구독 취소 버튼은 -> 2개
}
const Modal = ({type, title, button}: Props) => {
    //concept 에 따른 크기 조정 -> type 으로 state 정해야겠음!
    //type = "welcome, subscribe" 
    //welcome 일 경우 닫기 or 확인
    //subscribe 일 경우 구독 취소, 닫기
    title= "환영합니다."
    type="welcome";
    return(
        <ModalBackdrop>
            <ModalView>
                <button className="closeBtn">X</button>
                <h3>{title}</h3>
                { type === "welcome" ?
                (
                    <>
                    <button>닫기</button>
                    </>
                ) : (
                    <>
                    <button>구독취소</button>
                    <button>닫기</button>
                    </>
                )
                }
            </ModalView>
        </ModalBackdrop>
    )

}

export default Modal;

const ModalBackdrop = styled.div`
    position: fixed; //화면상 고정 => 스크롤을 해도 항상 화면에 표시
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.8);
`;
const ModalView = styled.div`
    width: 30rem;
    height: 15rem;

    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    .closeBtn {
        margin-left: auto;
        border: none;
        background: transparent;
    }
`;