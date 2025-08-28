import {
  // Link,
  Outlet,
} from "react-router-dom";

const RouteLayout = () => {
  return (
    <>
      <Outlet />
      {/* <footer className={`flex justify-start items-center w-full h-5  
        text-gray-500/70 text-xs cursor-default uppercase whitespace-nowrap`}>

        <Link to={"https://github.com/kristofkruller"}>Készítette</Link> 
        
      </footer> */}
    </>
  );
};

export default RouteLayout;
