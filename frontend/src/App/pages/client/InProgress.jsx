import { GrInProgress } from "react-icons/gr";
import Heading from "../../component/common/Heading";
import ClientTable from "../../component/panel/ClientTable";
import TableSkeletion from "../../component/common/TableSkeletion";
import { useTheme } from "../../../context/theme.context";
import { ticketApi } from "../../../helpers/Api";
import { useGetList } from "../../../action/_common";
import { Input } from "antd";
const InProgress = () => {
   const { theme } = useTheme();
   const { data, isLoading, error } = useGetList(`${ticketApi}/my-in-progress`);
  return (
    <>
      <Heading
        decs={""}
        title={"InProgress Tickets "}
        icon={<GrInProgress />}
      />
      {/* {JSON.stringify(list)} */}
      <div className="mb-2">
        <Input placeholder="Search inProgress Tickets" />
      </div>
      {isLoading ? <TableSkeletion /> : <ClientTable list={data?.tickets} />}
    </>
  );
}

export default InProgress
