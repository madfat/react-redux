import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component{
    constructor(props, context){
        super(props, context);

        this.redirecToAddCoursePage = this.redirecToAddCoursePage.bind(this);
    }

    courseRow(course, index){
        return(<div key={index}>{course.title}</div>);
    }

    redirecToAddCoursePage(){
        browserHistory.push('/course');
    }

    render(){
        const {courses} = this.props;
        return(
            <div>
                <h1>Course</h1>
                <input
                    type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirecToAddCoursePage}
                />
                <CourseList courses={courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
    return {
        courses: state.courses  //state.courses the courses refers to reducers/index.js
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(courseActions, dispatch)
    };
}


/*
alternative:
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(CoursesPage);
*/
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);