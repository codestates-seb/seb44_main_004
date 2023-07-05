import styled from "styled-components";
import Button from './buttons/Button';
import tw from "twin.macro";
type ModalProps = {
    type?: string, //welcome , subscribe
    title?: string,
    handleModal?: () => void,
}
const Modal = ({type, title, handleModal}: ModalProps) => {
    return(
        <ModalBackdrop>
            <ModalView>
                <CloseBtn onClick={handleModal}>X</CloseBtn>
                <ModalTitle>{title}</ModalTitle>
                
                { type === "welcome" ?
                (
                    <>
                    <Button type="primary" content="확인" onClick={handleModal}/>
                    </>
                ) : (
                    <>
                   
                    <ButtonZone>
                        <Button type="cancel" content="구독취소"  onClick={handleModal}/>
                        <Button type="cancel" content="닫기" onClick={handleModal}/>
                    </ButtonZone>
                    </>
                )
                }
            </ModalView>
        </ModalBackdrop>
    )

}

export default Modal;

const ModalBackdrop = tw.div`
    fixed
    inset-x-0
    inset-y-0
    flex
    justify-center
    items-center
    bg-black/40
`
// const ModalView = styled.div`
//     width: 30rem;
//     height: 15rem;

//     background: white;
//     border-radius: 0.5rem;
//     padding: 1.5rem;
//     padding-bottom: 2.5rem;
//     overflow-y: auto;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     align-items: center;
//     margin: 0 auto;
// `;
const ModalView = tw.div`
    w-1/3
    h-1/3

    bg-white
    rounded-lg
    p-6

    flex
    flex-col
    justify-between
    items-center

    mx-auto
    my-0
`;

const CloseBtn = tw.button`
    ml-auto
    bg-transparent
`

const ModalTitle = tw.div`
    text-xl
    text-center
    mb-5
`
const ButtonZone = tw.div`
    flex
    gap-12
    justify-center
`