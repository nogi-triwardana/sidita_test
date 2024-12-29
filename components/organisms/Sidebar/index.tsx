import { Button } from "@/components/atoms";
import { MENUS } from "@/constants/menu";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const [menus, setMenus] = useState<{ label: string; route: string; roles: string[] }[]>([]);
  const router = useRouter();
  const { data } = useSession();


  useEffect(() => {
    if(data?.user?.role) {
      const filteredMenuByRole = MENUS
        .filter(menu => menu.roles.includes(data?.user?.role));
      setMenus(filteredMenuByRole);
    }
  }, [data]);

  return (
    <div className="w-[250px] bg-white p-8 shadow-xl">
      <ul className="">
        {menus
          .map((menu, key) => (
            <Link key={'link-sidebar-' + key} href={menu.route}>
              <li
                className={classNames(
                  "py-4 px-2 font-bold rounded-lg text-xl text-[#585858] hover:bg-gray-100 hover:cursor-pointer transition duration-100 ease-in",
                  {
                    "bg-gray-300": Boolean(router.pathname === menu.route)
                  }
                )}
              >
                <Button 
                  textColor="secondary"
                  classnames="text-left"
                  // onClick={() => startTransition(() => { navigation.push(menu.route) })}
                >
                  {menu.label}
                </Button>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;