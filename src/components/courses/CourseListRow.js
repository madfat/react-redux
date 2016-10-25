import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course}) => {
    const author = course.author;
    return (
        <tr>
            <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
            <td>{author.firstName+' '+author.lastName}</td>
            <td>{course.category}</td>
            <td>{course.length}</td>
        </tr>
    );
};

CourseListRow.propTypes = {
    course: PropTypes.object.isRequired
};

export default CourseListRow;