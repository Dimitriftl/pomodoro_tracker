import Loader from "../../components/loader/Loader";
import "./loading.scss";
const Loading = () => {
  return (
    <div id="loadingContainer">
      <Loader strokeWidth="3" />
    </div>
  );
};

export default Loading;
