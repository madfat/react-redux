import * as types from './actionTypes';
import courseAPI from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import axios from 'axios';

export function loadCoursesSuccess(courses) {
    return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course) {
    return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
    return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function loadCourses(){
    return function(dispatch){
        dispatch(beginAjaxCall());
        return axios.get('http://localhost:8080/api/courses')
          .then(function(response){
            console.log(response);
            const extracted_courses = response["data"];
            dispatch(loadCoursesSuccess(extracted_courses));
          })
          .catch(function(error){
            console.log(error);
            throw(error);
          });
    };
}

export function saveCourse(course){
    console.log(course);
    
    // remove unnecessary key on course object
    const removeKey = ['author'];
    removeKey.forEach(function(value){
      delete course[value];
    });

    return function(dispatch, getState){
        dispatch(beginAjaxCall());
        return axios.post('http://localhost:8080/api/courses', course)
          .then((savedCourse) => {
              console.log(savedCourse["data"]["result"]);
              const extracted_savedCourse = savedCourse["data"]["result"];
              course.id == "" ? dispatch(createCourseSuccess(extracted_savedCourse)) : dispatch(updateCourseSuccess(extracted_savedCourse));
          })
          .catch((error) =>{
              dispatch(ajaxCallError(error));
          });

        // return courseAPI.saveCourse(course).then(savedCourse =>{
        //     console.log('dua ' + savedCourse.id);
        //     course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
        //     console.log('tiga ' + savedCourse.id);
        // }).catch(error => {
        //     dispatch(ajaxCallError(error));
        //     throw(error);
        // });
    };
}