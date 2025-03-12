import React from "react";
import SkeletonLoader from "@/components/SkeletonLoader";

const classNameImageBannerLoader =
  "h-[200px] sm:h-[300px] md:h-[300px] lg:h-[300px] xl:h-[300px]";
const classNameGridEventDetails =
  "w-full grid md:grid-cols-3 grid-cols-1 gap-3 mt-4";

interface SkeletonLoaderEventDetailsProps {
  isLoading: boolean;
  classNameImageBannerLoader?: string;
  classNameGridEventDetails?: string;
  itemCount?: number; // Number of repeated skeleton items
}

const SkeletonLoaderEventDetails: React.FC<SkeletonLoaderEventDetailsProps> = ({
  isLoading,
  itemCount = 2,
}) => {
  if (!isLoading) return null;

  return (
    <>
      <SkeletonLoader
        count={1}
        className={`w-full flex justify-between ${classNameImageBannerLoader} rounded-md`}
      />
      <SkeletonLoader
        count={1}
        className="w-full flex justify-between h-[30px] rounded-md"
      />

      <div className={classNameGridEventDetails}>
        <SkeletonLoader count={6} className="md:w-1/3 h-[60px] rounded-md mt-4" />
      </div>

      {[...Array(itemCount)].map((_, index) => (
        <SkeletonLoader
          key={index}
          count={1}
          className="md:w-1/3 h-[60px] rounded-md mt-4"
        />
      ))}
    </>
  );
};

export default SkeletonLoaderEventDetails;
