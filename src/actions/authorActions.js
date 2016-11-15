import * as types from './actionTypes';
import courseAPI from '../api/mockAuthorApi';
import {beginAjaxCall} from './ajaxStatusActions';
import axios from 'axios';

export function loadAuthorsSuccess(authors) {
    return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors(){
    return function(dispatch){
        dispatch(beginAjaxCall());
        return axios.get('http://localhost:8080/api/authors')
        .then(function(response){
          dispatch(loadAuthorsSuccess(response));
        })
        .catch(function(error){
          console.log(error);
          throw(error);
        });


        // return courseAPI.getAllAuthors().then(authors =>{
        //     dispatch(loadAuthorsSuccess(authors));
        // }).catch(error => {
        //     throw(error);
        // });
    };
}