
import { 
    FETCH_SCAN_REQUEST, 
    FETCH_SCAN_SUCCESS, 
    FETCH_SCAN_FAILURE, 
    FETCH_SCAN_SET_PAGE 
} from '../constants';

const initialState = {
    loading: false,
    scanData : [], 
    errorStatus : '',
    currentPage: 1,
    pageCount : 2,
    totalItemsCount : 10,
}

export const scanReducer  = (state = initialState, action) =>{
    switch (action.type) {
        case FETCH_SCAN_REQUEST: return{
            ...state,
            loading : true,
            scanData : [], 
            errorStatus : '',
        }

        case FETCH_SCAN_SUCCESS: return{
            ...state,
            loading: false,
            scanData: action.payload,
            errorStatus : '',
            totalItemsCount: action.pageCompte
        }

        case FETCH_SCAN_FAILURE: return{
            ...state, 
            loading: false,
            scanData:[],
            errorStatus : action.payload.status,
        }

        case FETCH_SCAN_SET_PAGE: return{
            ...state,
            currentPage: action.page
        }
         
        default: return state;
    }
}