import React from 'react'
import './ComponentCSS/Testimonials.css'

const Testimonials = ({name, testimonial}) => {

  //Get the initials of name
  const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  }

  const initials = getInitials(name);
  return (
    <>
    <div className="testimonial_card">
                <div id="avatar"><span>{initials}</span></div>
                <div className="testimonial_text">
                    <h3>{name}</h3>
                    <p><q>{testimonial}</q></p>
                </div>
            </div>
    </>
    )
  
}

export default Testimonials
