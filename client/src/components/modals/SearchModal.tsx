import { useState , Dispatch, SetStateAction} from "react";

import tw from "twin.macro";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";

import Input from "../input/Input";
import Button from "../buttons/Button";

import { Book, SelectedBook } from "../../pages/Curation/CurationWritePage";

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
                                        publisher: e.publisher,
                                        thumbnail: e.thumbnail,
                                        url: e.url,
                                    }
                                    
                                    handleClick && handleClick(event);
                                    setBook && setBook(newData);
                                }}
                            >
                                <ItemDiv>{idx + 1}</ItemDiv>
                                <ItemDiv>{e.title}</ItemDiv>
                                <ItemDiv>{e.authors.toString()}</ItemDiv>
                                <ItemDiv>
                                    {e.thumbnail ? (
                                        <BookImg
                                            src={e.thumbnail}
                                            alt={e.thumbnail}
                                        />
                                    ) : (
                                       <SpaceDiv></SpaceDiv>
                                    )}
                                </ItemDiv>
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
const ModalBackdrop = tw.div`
    z-20
    fixed
    inset-x-0
    inset-y-0

    flex
    justify-center
    items-center
    bg-black/50
`
const ModalView = tw.div`
    w-1/3
    h-4/5

    bg-white
    rounded-lg
    p-6
    overflow-y-auto

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
`;
const ModalTitle = tw.div`
    text-xl
    text-center
    mb-3
`;
const SearchZone = tw.div`
    w-full
    flex
    gap-2
    px-0
    py-[0.3rem]
    mb-2
`
const ListZone = tw.div`
    px-0
    py-[0.3rem]
    w-full
    grow
    overflow-y-auto
    
`
const BookItem = styled.div`
     border-bottom: 0.0625rem solid lightgray;
    &.selected{
        background-color: lightgray;
    }
    &:last-child {
        border-bottom: none;
    }
    ${tw`
        p-[0.3rem]
        flex
        justify-between
        items-center
    `}
`
const ItemDiv = styled.div`
    font-size: 0.5rem;
    text-align: left;

    &:nth-child(2) {
        width: 40%;
    }
    &:nth-child(3){
        width: 20%;
    }
`
const BookImg = tw.img`
    w-[1.8rem]
`
const SpaceDiv = tw.div`
    w-[1.8rem]
    h-[2.7rem]
`
const ButtonZone = tw.div`
    mt-[0.5rem]
    flex
    w-full
    justify-evenly
`
export default SearchModal;