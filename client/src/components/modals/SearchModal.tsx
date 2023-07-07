import { useState ,  Dispatch, SetStateAction} from "react";

import tw from "twin.macro";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";

import Input from "../input/Input";
import Button from "../buttons/Button";

import { Book, SelectedBook } from "../../pages/MainPage";

interface SearchModalProps {
    title?: string;
    list?: Book[];
    setBook?: Dispatch<SetStateAction<SelectedBook | null>>;
    handleModal?: () => void;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch?: () => void;
    handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleCancel?: () => void;
    handleComplete?: () => void;
}
const SearchModal = ({
    title,
    list,
    setBook,
    handleModal,
    handleChange,
    handleSearch,
    handleClick,
    handleCancel,
    handleComplete,
}: SearchModalProps) => {
    const [selected, setSelected] = useState<number|null>(null);
    return(
        <ModalBackdrop onClick={handleModal}>
            <ModalView onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <CloseBtn onClick={handleCancel}>
                    <MdOutlineClose size="1.2rem"/>
                </CloseBtn>
                <ModalTitle onClick={handleSearch}>책 검색하기</ModalTitle>

                <SearchZone>
                    <Input value={title} type="text" id="book" onChange={handleChange} focusMode="true" placeholder="책 제목이나 저자를 입력하여 원하는 책을 찾아보세요."/>
                    <Button type="primary" content="검색" padding="0.5rem 0" onClick={handleSearch}/>
                </SearchZone>
                
                <ListZone>
                {list &&
                        list.map((e, idx) => (
                            <BookItem
                                key={idx}
                                className={`item ${
                                    selected === idx ? "selected" : ""
                                }`}
                                onClick={(event: React.MouseEvent<HTMLDivElement>)=> {
                                    setSelected(idx);
                                    const newData = {
                                        title: e.title,
                                        authors: e.authors.toString(),
                                        thumbnail: e.thumbnail,
                                        url: e.url,
                                    }
                                    
                                    handleClick && handleClick(event);
                                    setBook && setBook(newData);
                                }}
                            >
                                <div>{idx + 1}</div>
                                <div>{e.title}</div>
                                <div>{e.authors.toString()}</div>
                                <div>
                                    {e.thumbnail ? (
                                        <img
                                            src={e.thumbnail}
                                            alt={e.thumbnail}
                                        />
                                    ) : (
                                        <div className="space"></div>
                                    )}
                                </div>
                            </BookItem>
                        ))}
                </ListZone>

                <ButtonZone>
                    <Button type="primary" content="선택완료" padding="0.5rem 0" onClick={handleComplete} />
                    <Button type="cancel" content="취소" padding="0.5rem 0" onClick={handleCancel} />
                </ButtonZone>
            </ModalView>
        </ModalBackdrop>
    )

}
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
    height: 40rem;

    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
`;
const CloseBtn = tw.button`
    ml-auto
    bg-transparent
`;
const ModalTitle = tw.div`
    text-xl
    text-center
    mb-5
`;
const SearchZone = styled.div`
    width: 100%;
    display: flex;
    gap: 0.5rem;
    padding: 0.3rem 0;
`
const ListZone = styled.div`

    padding: 0.3rem 0;
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
`
const BookItem = styled.div`
    padding: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.0625rem solid lightgray;

    &.selected{
        background-color: lightgray;
    }
    &:last-child {
            border-bottom: none;
        }
    > div {
        font-size: 0.5rem;
        text-align: left;
    }
    > div:nth-child(2) {
        width: 15rem;
    }
    img {
        width: 30px;
    }
    div.space {
        width: 30px;
        height: 43.5px;
    }
`;
const ButtonZone = styled.div`
    margin-top: 0.5rem;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
`
export default SearchModal;