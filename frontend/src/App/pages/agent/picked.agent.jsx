import React from "react";
import Heading from "../../component/common/Heading";
import { CgColorPicker } from "react-icons/cg";

import AgentPickedRow from "../../component/panel/agent/AgentPickedRow";
import { usePickTickets } from "../../../action/agent";

const AgentPickTickets = () => {
  
  const { list, loading } = usePickTickets();
  return (
    <>
      <Heading
        desc={""}
        title={"Picked Tickets"}
        icon={<CgColorPicker size={20} />}
      />

      <div className="table-responsive">
        <table className="table mt-3 agent-table">
          <thead>
            <tr>
              <th scope="col"># {loading && "loading"}</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Priority</th>
              <th scope="col">Created At</th>
              {/* {from !== "reopen-agent-ticket" &&
              <>
                <th scope="col ">1st SLA</th>
                <th scope="col ">2nd SLA</th>
              </>
               }  */}
              <th scope="col"></th>
              <th scope="col"> Status </th>
            </tr>
          </thead>

          <tbody>
            {list?.map((x, index) => (
              <AgentPickedRow x={x} index={index} from={""} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AgentPickTickets;
