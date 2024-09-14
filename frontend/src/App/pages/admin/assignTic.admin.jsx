import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useGetList } from '../../../action/_common';
import { ticketApi } from '../../../helpers/Api';
import { fetAllUsers, useAssignTicket } from '../../../action/admin';
import { MdAssignmentAdd,  } from 'react-icons/md';
import Heading from '../../component/common/Heading';
import { useTheme } from '../../../context/theme.context';

const AssignTickets = () => {
 const {theme} = useTheme()
  const { data, isLoading } = useGetList(`${ticketApi}/all-tickets`);
  const { users: allAgents, fetchUsers } = fetAllUsers("/all-agents");
  const { AssignTicket ,form,  setTicketId,setNewAgentId, setReason} = useAssignTicket()


  return (
    <div>
      <Heading
        icon={<MdAssignmentAdd />}
        title="Assign Ticket"
        desc=""
        style={{ color: theme.primary }}
      />
      <Form form={form} layout="vertical" onFinish={AssignTicket}>
        <p>Assign Ticket To Other New Agent</p>
        <Form.Item
          label="Ticket ID"
          name="ticketId"
          rules={[{ required: true, message: 'Please select a ticket' }]}
        >
          <Select onChange={(value) => setTicketId(value)}>
            {data?.tickets.map((ticket) => (
              <Select.Option key={ticket._id} value={ticket._id}>
                {ticket.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="New Agent ID"
          name="newAgentId"
          rules={[{ required: true, message: 'Please input new agent ID' }]}
        >
          <Select onChange={(value) => setNewAgentId(value)}>
            {allAgents?.map((agent) => (
              <Select.Option key={agent._id} value={agent._id}>
                {agent.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Reason"
          name="reason"
          rules={[{ required: true, message: 'Please input reason' }]}
        >
          <Input onChange={(e) => setReason(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Assign Ticket</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AssignTickets;
