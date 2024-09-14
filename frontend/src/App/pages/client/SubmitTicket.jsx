import React from "react";
import { Form, Input, Button, Select, Upload, message, Space } from "antd";
import { useTicketCreate } from "../../../action/_ticket";
import useCategories from "../../../action/_useCats";
import Heading from "../../component/common/Heading";
import { MdCreate } from "react-icons/md";

const { Option } = Select;

const CreateTicketForm = () => {

  const { ticketCreation, loading } = useTicketCreate();
 const {categories ,loading: categoriesLoading } = useCategories()


  return (
    <>
      <Heading decs={""} title={"Create Ticket"} icon={<MdCreate />} />


      <Form
        name="create-ticket"
        layout="vertical"
        onFinish={ticketCreation}
        className=" mx-auto rounded border p-2"
        style={{ width: "100%", boxSizing: "border-box" }}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input the description!" },
          ]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}>
          <Select loading={categoriesLoading}>
            {categories?.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please select a priority!" }]}>
          <Select>
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
            <Option value="Critical">Critical</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Ticket
          </Button>
        </Form.Item>
      </Form>
  


    </>
  );
};

export default CreateTicketForm;
