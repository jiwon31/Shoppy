import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { useAuthContext } from "context/AuthContext";
import Avatar from "./Avatar";
import CartStatus from "./CartStatus";
import Button from "./ui/Button";

export default function Header() {
  const { user, authService } = useAuthContext();

  return (
    <header className="flex justify-between items-center p-3 border-b border-gray-300">
      <Link to="/" className="flex items-center text-2xl">
        <FiShoppingBag className=" text-indigo-400" />
        <h1 className="ml-1 font-bold">Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-3 font-semibold">
        <Link to="/products">Products</Link>
        {user && (
          <Link to="/carts">
            <CartStatus />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to="/products/new">
            <BsFillPencilFill className="text-xl" />
          </Link>
        )}
        {user && <Avatar user={user} />}
        {!user ? (
          <Button text="Login" onClick={authService.login} />
        ) : (
          <Button text="Logout" onClick={authService.logout} />
        )}
      </nav>
    </header>
  );
}
