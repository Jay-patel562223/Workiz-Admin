import "./list.scss";
import Datatable from "../../components/datatable/Datatable";
import Search from "../../components/Search";

const List = () => {
  return (
    <div className="list">
      <div className="listContainer">
        <div className="search-data">
          <Search />
        </div>
        <Datatable  />
      </div>
    </div>
  );
};

export default List;
