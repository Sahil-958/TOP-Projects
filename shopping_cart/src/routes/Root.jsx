import { Outlet, NavLink } from "react-router-dom";
function Root() {
  return (
    <>
      <div className="flex flex-col">
        <header className="bg-red-100 p-4">
          <nav>
            <NavLink
              to="/app"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-green-50" : ""
              }
            >
              Messages
            </NavLink>
            ;
          </nav>
        </header>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
