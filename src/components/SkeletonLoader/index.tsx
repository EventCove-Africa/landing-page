import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
  style?: React.CSSProperties
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 3,
  className = "w-full md:w-1/3 h-auto rounded-md",
  style,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton style={style} key={index} count={1} className={className} />
      ))}
    </>
  );
};

export default SkeletonLoader;
