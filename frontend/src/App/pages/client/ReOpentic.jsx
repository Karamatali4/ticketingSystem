import { GrInProgress } from "react-icons/gr";
import Heading from "../../component/common/Heading";
import ClientTable from "../../component/panel/ClientTable";
import TableSkeletion from "../../component/common/TableSkeletion";
import { useTheme } from "../../../context/theme.context";
import { ticketApi } from "../../../helpers/Api";
import { useGetList } from "../../../action/_common";
import { Input } from "antd";
import { IoFolderOpen } from "react-icons/io5";


const ReOpentic = () => {
  const { theme } = useTheme();
  const { data, isLoading, error } = useGetList(`${ticketApi}/reopen-ticket`);
  return (
    <>
      <Heading
        decs={""}
        title={"ReOpen Tickets "}
        icon={<IoFolderOpen />}
      />
      {/* {JSON.stringify(list)} */}
      <div className="mb-2">
        <Input placeholder="Search ReOpen Tickets" />
      </div>
      {isLoading ? <TableSkeletion /> : <ClientTable list={data?.tickets} />}
    </>
  );
};

export default ReOpentic;







