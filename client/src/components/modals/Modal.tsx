
import tw from "twin.macro";
import { MdOutlineClose } from "react-icons/md";

import Button from '../buttons/Button';

type ModalProps = {
    type?: string, //welcome , subscribe
    handleModal?: () => void,
}

const Modal = ({type, handleModal}: ModalProps) => {
    const title:Array<string> = ["후즈북의 큐레이터가 되신것을 환영합니다!", "OO 님의 큐레이션 구독을 취소하시겠어요?"]
    return(
        <ModalBackdrop>
            <ModalView>
                <CloseBtn onClick={handleModal}>
                    <MdOutlineClose size="1.2rem"/>
                </CloseBtn>
                
                
                { type === "welcome" ?
                (
                    <>
                    <ModalTitle>{title[0]}</ModalTitle>
                    <ButtonZone>
                        <Button type="primary" content="반가워요" onClick={handleModal}/>
                    </ButtonZone>
                    </>
                ) : (
                    <>

                    <ModalTitle>{title[1]}</ModalTitle>
                    <ButtonZone>
                        <Button type="cancel" content="구독취소"  onClick={handleModal} width="calc(30%-0.5rem)"/>
                        <Button type="basic" content="닫기" onClick={handleModal} width="calc(40%-0.5rem)"/>
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
    font-medium

`
const ButtonZone = tw.div`
    flex
    gap-12
    justify-center
`