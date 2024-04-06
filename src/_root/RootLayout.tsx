import { Outlet } from "react-router-dom";
import { Bottombar, Topbar } from "./root_pages";

/* Use conditional rendering To check if the user is logged in Or not By using the hook Called 
Require auth. Use outlet If the user is logged in, Only then rendered the rest of the root pages  
 */ 
/* 
also make sure to use Navigate directly, and user staate prop inside that.
if a user was headed towards a secure route and is was not logged in then we redirect them 
to login page, afetr login make sure to send them to location where they were originally headed
by remembering it 
*/

const RootLayout = () => {
  return (
    <div className="w-full flex-col">
    <header>
      <Topbar/>
    </header>
      <section>
        <Outlet />
      </section>
      <footer>
        <Bottombar/>
      </footer>
    </div>
  );
};

export default RootLayout;
