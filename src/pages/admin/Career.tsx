import { useEffect, useState } from "react";
import CarrerTable from "../../components/tables/customTable/CarrerTable";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { ICarrerTable } from "../../interfaces/Itable";
import { carrerHeader } from "../../constants/tables";
import { careerApi } from "../../service/apis/carrer.api";
import withRole from "../withRole";
import { useLocation } from "react-router-dom";

function Career() {
  const [data, setData] = useState<ICarrerTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const limit = 10;
  const location = useLocation();
  const getCarrer = async () => {
    setLoading(true);
    try {
      const bodyData = {
        currentPage: location.state?.fromPage || 1,
        limit: limit,
      };
      const response = await careerApi(bodyData);
      if (response) {
        setData(response?.Careers);
        setTotalUser(response?.totalResults);
        setTotalPage(response?.totalPages);
        setCurrentPage(response?.page);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCarrer();
  }, []);

  return (
    <section className='team-pages'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <CarrerTable
          limit={limit}
          headData={carrerHeader}
          bodyData={data as ICarrerTable[]}
          totalData={totalUser}
          totalPage={totalPage}
          dataCurrentPage={currentPage}
        />
      )}
    </section>
  );
}
export default withRole(Career, ["admin"]);
