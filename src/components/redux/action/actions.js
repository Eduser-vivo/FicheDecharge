
import {
    FETCH_SCAN_REQUEST, 
    FETCH_SCAN_SUCCESS, 
    FETCH_SCAN_FAILURE,
    FETCH_SCAN_SET_PAGE,
 } from '../constants';
import { request } from '../request';
import AuthService from '../../../auth/auth';

export const fetchScanRequest = () =>{
    return {
        type : FETCH_SCAN_REQUEST 
    }
}

export const fetchScanSuccess = (data) =>{
    return {
        type : FETCH_SCAN_SUCCESS,
        payload : data["hydra:member"],
        pageCompte : data["hydra:totalItems"]
    }
}

export const fetchScanFailure = (error) =>{
    return {
        type : FETCH_SCAN_FAILURE,
        payload : error.response
    }
}

export const fetchScanSetPage = (page) =>{
    return  {
        type: FETCH_SCAN_SET_PAGE,
        page
    }
}


export const fetchScan = (search, page=1 ) =>{
    return(dispatch) =>{
            dispatch(fetchScanRequest())
        return request.get(`/scans?search=${search}&page=${page}&itemsPerPage=2`, AuthService.getAuthHeader())
            .then(response => dispatch(fetchScanSuccess(response)))
            .catch(error =>{
                dispatch(fetchScanFailure(error))});
    }
}

export const fetchScanH = (page = 1)=>{
    return(dispatch) =>{
        dispatch(fetchScanRequest())
    return request.get(`/scans?page=${page}&itemsPerPage=2`, AuthService.getAuthHeader())
        .then(response => dispatch(fetchScanSuccess(response)))
        .catch(error => dispatch(fetchScanFailure(error)))
    }
}

