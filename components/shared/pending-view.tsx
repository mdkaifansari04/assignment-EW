import { Skeleton } from "../ui/skeleton";

export const UserCardPendingView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Skeleton className="h-[226px] w-full rounded-xl" />
      <Skeleton className="h-[226px] w-full rounded-xl" />
      <Skeleton className="h-[226px] w-full rounded-xl" />
      <Skeleton className="h-[226px] w-full rounded-xl" />
      <Skeleton className="h-[226px] w-full rounded-xl" />
      <Skeleton className="h-[226px] w-full rounded-xl" />
    </div>
  );
};
