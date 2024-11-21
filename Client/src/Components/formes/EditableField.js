import React, { useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { MDBRow, MDBCol, MDBCardText } from "mdb-react-ui-kit";

const EditableField = ({ label, fieldName, value, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEditClick = () => {
    if (isEditing) {
      onEdit(fieldName, editedValue);
    }
    setIsEditing(!isEditing);
  };

  return (
    <MDBRow style={{ alignItems: "center" }}>
      <MDBCol sm="3">
        <MDBCardText>{label}</MDBCardText>
      </MDBCol>
      <MDBCol sm="9">
        {isEditing ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
            <FaCheck
              style={{
                cursor: "pointer",
                fontSize: "1.2rem",
                color: "green",
                marginLeft: "5px",
              }}
              onClick={handleEditClick}
            />
          </div>
        ) : (
          <MDBCol sm="9">
            <MDBCardText
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              className="text-muted"
            >
              {value}
              <FaEdit
                style={{
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: "blue",
                }}
                onClick={handleEditClick}
              />
            </MDBCardText>
          </MDBCol>
        )}
      </MDBCol>
      <MDBCol sm="1"></MDBCol>
    </MDBRow>
  );
};

export default EditableField;
