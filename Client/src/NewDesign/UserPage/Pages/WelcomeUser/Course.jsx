import React from 'react';
import NavBar from '../../../../components/NavBar/NavBar_Welcome/NavBar';
import SearchBox from '../../../../components/Search_Course/Search_Box';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Course_Section from '../../../../components/Course_Section/Course_Section';
const Course = () => {
    return (
        <>
            <NavBar />
            <div style={{ marginTop: "50px" }}>
            <SearchBox size="large" iconName={faSearch} />
            </div>
            <Course_Section />
            <Course_Section />
            <Course_Section />
            <Course_Section />

        </>
    )
}

export default Course;

