import Heading from "../../component/common/Heading";
import React, { useEffect, useState } from "react";
import { Button, Input, Upload, Form, Avatar } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { GrUserSettings } from "react-icons/gr";
import { useTheme } from "../../../context/theme.context";
import { useAuth } from "../../../context/auth.context";

const UserProfile = () => {
  const { theme } = useTheme();
    const [auth] = useAuth();
    const role = auth?.user?.role;


  const sampleUserData = {
    fullname: auth?.user?.name,
    email: auth?.user?.email,
    age: 27,
    img: (
      <Avatar
        size={70}
        style={{
          backgroundColor: theme.primary,
        }}
        icon={<UserOutlined />}
      />
    ),
  };
  const [userData, setUserData] = useState(sampleUserData);

  const handleSaveChanges = () => {
    console.log("Saved:", userData);
  };

  return (
    <>
      <Heading decs={""} title={"User Settings"} icon={<GrUserSettings />} />
      <div className="container-fuild">
        <div className="Profile-container row ">
          <div className="Profile col-12">
            <Avatar size={100} src={userData.img} />
            <Upload name="file" action="/upload">
              <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
            </Upload>
            <p className="mx-2">Profile Photo</p>
          </div>
          <Form className="col-12" layout="vertical">
            <Form.Item label="Name">
              <Input
                value={userData.fullname}
                onChange={(e) =>
                  setUserData({ ...userData, fullname: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Email">
              <Input
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Age">
              <Input
                value={userData.age}
                onChange={(e) =>
                  setUserData({ ...userData, age: e.target.value })
                }
              />
            </Form.Item>
            <Button type="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Form>
        </div>
      </div>
      
    </>
  );
};

export default UserProfile;
