import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface ModalState {
    isModalOpen: boolean,
    // showModal:
}
const initialModalState: ModalState =  {
    isModalOpen:false,
    // showModal:{},
}
export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    open: (state) => {
        state.isModalOpen = true;
    },
    close: (state) => {
        state.isModalOpen = false;
    },
    // showModal: (state, action: PayloadAction<number>) => {
    //     state.showModal = action.payload;
    // },
  },
});


export const { open, close } = modalSlice.actions;


// const modalSlice = createSlice({
//     name :'openingModal',
//     initialState:initialModalState,
//     reducers:{
//         open(state){
//             state.isModalOpen = true;
//         },
//         close(state){
//             state.isModalOpen = false;
//         },
//         // showModal(state,action){
//         //     state.showModal = action.payload;
//         // }
//     }
// })
export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
