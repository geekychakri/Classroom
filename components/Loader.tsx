import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loader = () => {
  return (
    <div className="flex flex-col w-3/4 tabPort:w-full sm:w-full mx-auto px-6 py-10">
      <SkeletonTheme baseColor="#202020" highlightColor="#444" height={250}>
        <Skeleton count={10} style={{ marginBottom: "1rem" }} />
      </SkeletonTheme>
    </div>
  );
};

export default Loader;
