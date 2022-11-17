import {
 IMAGE_CLICKED
} from '../actions/types';


const initialState = {
  imageModal: {
    isOpen: false,
    imageURL: '',
  }
}


const ImageModalReducer = (state = initialState, action) => {
    switch(action.type){
      case IMAGE_CLICKED:
        return { ...state, imageURL: action.payload, isOpen: !state.isOpen };
      default:
        return state;
    }
}

export default ImageModalReducer;
