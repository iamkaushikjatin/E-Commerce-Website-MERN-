import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { Fragment } from "react";
import { RiAdminFill } from "react-icons/ri";
import { Sheet, SheetHeader, SheetTitle, SheetContent } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <MdProductionQuantityLimits />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <MdOutlineShoppingBag />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen(false);
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle
                className="flex cursor-pointer items-center gap-2 mt-5" 
                onClick={() => {
                  navigate("/admin/dashboard");
                  setOpen(false);
                }}
              >
                <RiAdminFill size={30} />{" "}
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <RiAdminFill size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
