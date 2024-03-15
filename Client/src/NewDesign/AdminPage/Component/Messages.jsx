import React, { useState, useEffect } from "react";
import "./ComponentCSS/Messages.css";
import { AiFillDelete } from 'react-icons/ai';

const Table = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/E-Grantha/admin/contact"
      );
      if (response.ok) {
        const data = await response.json();
        setContacts(data.message);
      } else {
        console.error("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleDeleteMessage = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3000/E-Grantha/admin/contact/${_id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status === "ok") {
          // Delete contact from the state
          setContacts(contacts.filter(contact => contact._id !== _id));
          // Show success message
          alert("Contact deleted successfully");
        } else {
          console.error("Failed to delete contact");
        }
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="table_container">
      <table className="messages_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Created At</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.createdAt).toLocaleString()}</td>
              <td>
                <AiFillDelete
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDeleteMessage(contact._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
