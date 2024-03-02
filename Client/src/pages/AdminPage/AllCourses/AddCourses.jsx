import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Table = styled.table`
    /* Add your table styling here */
`;

const Button = styled.button`
    /* Add your button styling here */
`;

const AddCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/E-Grantha/admin/course')
          .then(response => response.json())
          .then(data => {
            if (data.status === 'ok') {
              // Map over the data to create a new array where the videoLink is the embed URL
              const newCourses = data.message.map(course => ({
                ...course,
                videoLink: `https://www.youtube.com/embed/${course.videoId}`
              }));
              setCourses(newCourses);
            }
          })
          .catch(error => {
            console.error('Error fetching courses:', error);
          });
      }, []);
    const handleAddVideo = () => {
        // Add logic to handle adding a new video from local file
        // and updating the table and database
        const handleAddVideo = (event) => {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('video', file);

            fetch('http://localhost:3000/E-Grantha/admin/course', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'ok') {
                        const newCourse = {
                            id: data.message.id,
                            title: data.message.title,
                            videoLink: `https://www.youtube.com/embed/${data.message.videoId}`
                        };
                        setCourses(prevCourses => [...prevCourses, newCourse]);
                    }
                })
                .catch(error => {
                    console.error('Error adding video:', error);
                });
        };

    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleAddVideo} />
                <Button onClick={handleAddVideo}>+ Add</Button>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>VideoLink</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.title}</td>
                        <td>{course.videoLink}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AddCourses;