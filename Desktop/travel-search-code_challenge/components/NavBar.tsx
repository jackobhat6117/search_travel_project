import { signOut, useSession } from "next-auth/react"; 
import { MdTravelExplore } from "react-icons/md";

const Navbar = () => {
    const {data: session} = useSession()
    const username = session?.user?.email
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <MdTravelExplore  className="text-4xl text-blue-700"/>
      </div>
      <div className="flex gap-4 items-center">
        <p className="">{username}</p>
        <button
          onClick={() => signOut()}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
