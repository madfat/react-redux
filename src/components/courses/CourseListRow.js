import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import{connect} from 'react-redux';
import toastr from 'toastr';

class CourseListRow extends React.Component {
    constructor(props, context){
        super(props, context);
        this.handleDelete = this.handleDelete.bind(this);
    }

	handleDelete(e){
        e.preventDefault();
        this.props.action.deleteCourse(this.props.course.id)
            .then(() => {
                toastr.success('Course deleted');
            })
            .catch((error) => {
                toastr.error(error);
            });
	}

    render(){
        const course = this.props.course;
        return (
            <tr>
                <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
                <td>{course.authorId}</td>
                <td>{course.category}</td>
                <td>{course.length}</td>
                <td><button onClick={this.handleDelete} type="button" className="btn btn-success">Delete</button></td>
            </tr>            
        );
    }
}

CourseListRow.propTypes = {
    course: PropTypes.object.isRequired,
    action: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProp){
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch){
    return {
        action: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseListRow);