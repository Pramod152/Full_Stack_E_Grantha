
import Video_Card from '../Card_Video/Video_Card/Video_Card'
import './Course_Section.css'
import { Link } from 'react-router-dom';

const Course_Section = () => {
    const description = " elit. Quisquam, voluptatum."

    return (
        <>
        <div className="courses">
        <div className="course_header">
        <h1>Courses</h1>
        <Link to="#">See All</Link>
        </div>
            <div className="card-wrapper">
                <Video_Card description={description}/>
                <Video_Card description={description}/>
                <Video_Card description={description}/>
                <Video_Card description={description}/>
        </div>
        </div>
        </>
    )
}

export default Course_Section