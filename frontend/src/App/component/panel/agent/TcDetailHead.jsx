import { Grid , Tag} from "antd";
import { priorityColor } from "../../../../helpers//constants/Colors";
const { useBreakpoint } = Grid;

const TcDetailHead = ({ singleItem, from = "agent" }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            {useBreakpoint().md && <th scope="col">Description</th>}
            <th scope="col">Priority</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            {/* {from === 'admin' && <th>Escalated From</th>} */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Account Management</td>
            {useBreakpoint().md && (
              <td style={{ maxWidth: "400px" }}>{singleItem?.description}</td>
            )}
            <td>
              <Tag color={priorityColor[singleItem.priority]}>
                {singleItem?.priority}
              </Tag>
            </td>
            <td>Personal Tax Return</td>
            <td>{singleItem?.status}</td>
            {/* {from === 'admin' && <td>{singleItem}</td>} */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TcDetailHead;
