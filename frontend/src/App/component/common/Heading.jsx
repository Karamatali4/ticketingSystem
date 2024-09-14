import React from "react";
import { useTheme } from "../../../context/theme.context";
import {Button} from 'antd'
const Heading = ({ desc, title, icon }) => {

  const { theme } = useTheme()
  return (
    <div
      className="mx-auto rounded-3 d-flex justify-content-between align-items-center p-3 mb-4"
      style={{
        height: "100px",
        width: "100%",
        color: "white",
        background: `linear-gradient(to right, #343945, ${theme.primary})`,
      }}>
      <div className="row d-flex flex-column justify-content-center align-items-start">
        <div className="row flex-column align-items-start">
          <div className="row flex-column align-items-start justify-content-start">
            <div className="row flex-column justify-content-start">
              <div className="d-flex align-items-center">
                <h3 className="fs-2 mx-2 mt-1">{icon}</h3>
                <h1 style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {title}
                </h1>
              </div>
              <small style={{fontSize:"13px" ,color:"white"}}>
                { desc } 
              </small>
            </div>
          </div>
        </div>
      </div>
      <Button
        type="dashed"
        style={{ backgroundColor: "transparent", color: "white" }}>
        Export Data In CSV
      </Button>
    </div>
  );
};

export default Heading;
