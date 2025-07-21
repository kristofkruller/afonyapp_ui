import {
  // Link,
  Outlet,
} from "react-router-dom";

const RouteLayout = () => {
  return (
    <>
      <Outlet />
      {/* <footer className={`${(window.innerHeight > 680 && window.innerWidth > 768) && "absolute"} 
          bottom-0 h-5 w-full bg-neutral-50/50 dark:bg-black flex justify-center items-center 
          text-gray-500/70 dark:text-gray-700/80 text-xs cursor-default uppercase whitespace-nowrap`}>

            <Link to={"https://github.com/kristofkruller"}>made by https://github.com/kristofkruller</Link> 
        
        </footer> */}
    </>
  );
};

export default RouteLayout;
