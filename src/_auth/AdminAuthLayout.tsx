import { Outlet } from "react-router-dom";

const AdminAuthLayout = () => {
  return (
    <>
      <div className="w-full flex">
        <section className="hidden justify-center items-center w-1/2  lg:block auth-form">
          <img
            src={`/public/adminSign.svg`}
            alt="ADMIN-illustration"
            className="h-full w-full object-cover bg-no-repeat "
          />
        </section>
        <section className="flex flex-1 justify-center items-center flex-col auth-form">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default AdminAuthLayout;
