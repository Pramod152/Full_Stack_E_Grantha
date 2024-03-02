import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 20px;
`;

const CourseCard = styled.div`
width: 400px;
margin-bottom: 20px;
padding: 20px;
border: 1px solid #ccc;
border-radius: 5px;
`;

const Title = styled.h2`
font-size: 20px;
margin-bottom: 10px;
`;

const Description = styled.p`
font-size: 16px;
margin-bottom: 10px;
`;

const Video = styled.iframe`
width: 100%;
height: 200px;
border: none;
border-radius: 5px;
`;

const Allcourses = () => {
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

 

    return (
      <>
      <Container>
        {courses.map(course => (
          <CourseCard key={course._id}>
            <Title>{course.title}</Title>
            <Description>{course.description}</Description>
            <Video
              src={`${course.videoLink}?rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></Video>
          </CourseCard>
        ))}
      </Container>
      </>
    );
  }

  export default Allcourses
