import React, { useState, useEffect } from "react";
import Userstable from "../Components/Userstable";
import { getUsers } from "../Pagesactions/usersactions";
import Chart from "react-apexcharts";
import { Row, Col, Card } from "react-bootstrap";
import amountSpent from "../Components/charts/analytics-amount-spent";
import amountProcessed from "../Components/charts/analytics-amount-processed";
import profitProcessed from "../Components/charts/analytics-profit-processed";
import View from "../Components/Userview";
import "../Styles/adminpages.css";
import "../Styles/adminuser.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [viewData, setViewData] = useState();

  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      let allUsers;
      allUsers = await getUsers();
      console.log(allUsers);
      setUsers(allUsers);
    };

    fetchUsers();
    setUpdateData(false);
  }, [updateData]);

  const handleUpdateData = () => {
    console.log("i am yoooo");
    setUpdateData(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = (data) => {
    setViewData(data);
    handleClickOpen();
  };

  return (
    <div className="main user">
      {console.log(users)}
      <div className="conatiner">
        <div className="row">
          <div className="col-1 col-md-2"></div>
          <div className="col-10 col-md-8">
            <Row>
              {users ? (
                <Col className="mb-4" md={6} xl={4}>
                  <Card className="amount-card overflow-hidden">
                    <Card.Body>
                      <h2 className="f-w-400">{users.length}</h2>
                      <p className="text-muted f-w-600 f-16">
                        <span className="text-c-blue">Registered</span> Users
                      </p>
                    </Card.Body>
                    <Chart {...amountProcessed} />
                  </Card>
                </Col>
              ) : null}

              <Col className="mb-4" md={6} xl={4}>
                <Card className="amount-card overflow-hidden">
                  <Card.Body>
                    <h2 className="f-w-400">2</h2>
                    <p className="text-muted f-w-600 f-16">
                      <span className="text-c-green">Active</span> Users
                    </p>
                  </Card.Body>
                  <Chart {...amountSpent} />
                </Card>
              </Col>
              <Col className="mb-4" md={12} xl={4}>
                <Card className="amount-card overflow-hidden">
                  <Card.Body>
                    <h2 className="f-w-400">31</h2>
                    <p className="text-muted f-w-600 f-16">
                      <span className="text-c-yellow"></span> Processed till now
                    </p>
                  </Card.Body>
                  <Chart {...profitProcessed} />
                </Card>
              </Col>
            </Row>

            {users ? (
              <Userstable
                className="mb-4"
                data={users}
                handleUpdateData={handleUpdateData}
                handleView={handleView}
              />
            ) : null}
            {open ? (
              <View open={open} handleClose={handleClose} data={viewData} />
            ) : null}
          </div>
          <div className="col-1 col-md-2 mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default User;
