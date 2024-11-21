import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import EditableField from "../Components/formes/EditableField";
import { Grid, GridItem, useToast } from "@chakra-ui/react";
import Sidebar from "../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { MDBSpinner } from "mdb-react-ui-kit";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user) navigate("/login");
  }, [navigate]);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const toast = useToast();
  const signoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  const handleEdit = async (fieldName, updatedValue) => {
    try {
      if (!user || !user.token) {
        console.error("User or token is null.");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const data = { [fieldName]: updatedValue };
      await axios.put(`/api/user/${user._id}`, data, config);

      const updatedUser = { ...user, [fieldName]: updatedValue };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast({
        title: "Updated Successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error When Updating your personal Information.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    setLoading(false);
  }, []);

  const renderEditableField = (label, fieldName, value) => {
    return (
      <EditableField
        label={label}
        fieldName={fieldName}
        value={value}
        onEdit={(fieldName, updatedValue) =>
          handleEdit(fieldName, updatedValue)
        }
      />
    );
  };

  return (
    <Grid templateColumns="repeat(6, 1fr)" bg="#b8c8de" m={0}>
      <GridItem
        as="aside"
        colSpan="1"
        bg="#DDE7FA"
        minHeight="93vh"
        p="30px"
        borderRadius={20}
        mt={22}
        mb={28}
        ml={30}
        style={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adjust the values as needed
        }}
      >
        {user && <Sidebar user={user} />}
      </GridItem>
      <GridItem as="main" colSpan={5} bg="white" m="24" borderRadius={20}>
        {loading ? (
          <div className="d-flex justify-content-center">
            <MDBSpinner role="status">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          </div>
        ) : (
          <section
            style={{
              backgroundColor: "white",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              margin: "24px",
              boxShadow: "none",
              marginRight: "20px",
              marginLeft: "20px",
            }}
          >
            <MDBContainer className="py-5">
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src={user.pic}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "150px" }}
                        fluid
                      />
                      <p className="text-muted mb-1">SCRUM Master</p>
                      <p className="text-muted mb-4">UHBC FSEI</p>
                      <div className="d-flex justify-content-center mb-2">
                        <Link to={"/dashboard"}>
                          <MDBBtn>Dashboard</MDBBtn>
                        </Link>
                        <MDBBtn
                          onClick={signoutHandler}
                          outline
                          className="ms-1"
                        >
                          Logout
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      {renderEditableField("Full Name", "name", user.name)}
                      <hr />
                      {renderEditableField("Email", "email", user.email)}
                      <hr />
                      {renderEditableField("Phone", "Phone", "+213774856079")}
                      <hr />
                      {renderEditableField("Mobile", "Mobile", "+213774856079")}
                      <hr />
                      {renderEditableField(
                        "Address",
                        "Address",
                        "Algeria Chlef"
                      )}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        )}
      </GridItem>
    </Grid>
  );
}
