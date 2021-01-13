import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { Row, Col, Card, Tabs, Tab, Dropdown, Carousel } from "react-bootstrap";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Userview({ open, handleClose, data }) {
  let { _id, name, age, gender, email, phoneNumber, image } = data;

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div style={{ width: "300px", height: "415px" }}>
          <Card className="user-card user-card-3 support-bar1">
            <Card.Body>
              <div className="text-center">
                <div className="position-relative d-inline-block">
                  <img
                    className="img-radius img-fluid wid-150"
                    src={
                      image
                        ? image
                        : "https://images.pexels.com/photos/792326/pexels-photo-792326.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    }
                    alt="User"
                    style={{
                      borderRadius: "50%",
                      width: "200px",
                      height: "200px",
                    }}
                  />
                  {console.log(name)}
                  <h3 className="mb-1 mt-3 f-w-400">{name}</h3>
                  <p className="mb-3 text-muted">{email}</p>
                  <p className="mb-3 text-muted">{phoneNumber}</p>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="bg-light">
              <Row className="text-center">
                <Col>
                  <h6 className="mb-1">{age}</h6>
                  <p className="mb-0">Age</p>
                </Col>
                <Col>
                  <h6 className="mb-1">{gender}</h6>
                  <p className="mb-0">Gender</p>
                </Col>
                {/* <Col>
                  <h6 className="mb-1">678</h6>
                  <p className="mb-0">Following</p>
                </Col> */}
              </Row>
            </Card.Footer>
          </Card>
        </div>
      </Dialog>
    </div>
  );
}
