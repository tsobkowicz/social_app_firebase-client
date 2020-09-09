import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      const index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      // check and upadte scream state while open scream details
      if (state.scream.screamId === action.payload.screamId) {
        state.scream.likeCount = action.payload.likeCount;
      }
      return {
        ...state,
      };
    }
    case DELETE_SCREAM: {
      // action.payload === screamId; it's pased from the dataActions
      const deleteScreamIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(deleteScreamIndex, 1);
      return {
        ...state,
      };
    }
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case SUBMIT_COMMENT: {
      const currentScreamIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      // eslint-disable-next-line no-plusplus
      state.screams[currentScreamIndex].commentCount++;
      return {
        ...state,
        screams: [...state.screams],
        scream: {
          ...state.scream,
          commentCount: state.scream.commentCount + 1,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    }
    default:
      return state;
  }
}
