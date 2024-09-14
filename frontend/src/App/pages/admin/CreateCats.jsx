import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { MdCategory } from "react-icons/md";
import Heading from "../../component/common/Heading";
import { useTheme } from "../../../context/theme.context";
import { createCategory } from "../../../action/admin";
import { useGetList } from "../../../action/_common";
import { catsApi } from "../../../helpers/Api";

const CreateCategory = () => {
  const { theme } = useTheme();
   const {name , setName , handleSubmit} = createCategory()
   const { data, isLoading: categoriesLoading } = useGetList(catsApi);
 

  return (
    <>
      <Heading
        icon={<MdCategory />}
        title="Create Category"
        desc=""
        style={{ color: theme.primary }}
      />
      <div>
      <Form.Item label="Allready Available Category">
            <Select loading={categoriesLoading}>
              {data?.categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
      </div>
      <Form layout="vertical" onFinish={handleSubmit}>

        <label className="m-2 fs-5" style={{color : theme.primary}} htmlFor="name">Category Name</label>
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}>
          <Input
            id="name"
            name="name"
            className="p-1 px-2 fs-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add New Category"
          />
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateCategory;
