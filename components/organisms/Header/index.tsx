import { Button } from "@/components/atoms";
import { signOut } from "next-auth/react";
import { PiSignOutFill } from "react-icons/pi";

const Header = () => {
  return (
    <header className="flex justify-end bg-white p-4 w-full">
      <Button
        theme="error"
        startIcon={<PiSignOutFill />}
        classnames="w-fit flex justify-center items-center gap-2"
        textColor="primary"
        onClick={() => signOut({ callbackUrl: '/', redirect: true })}
      >
        Logout    
      </Button>
    </header>
  );
};

export default Header;