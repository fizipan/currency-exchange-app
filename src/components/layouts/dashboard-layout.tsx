import React from "react";

import { useTheme } from "@/components/theme-provider";
import {
  IconBell,
  IconBrandJustd,
  IconChevronLgDown,
  IconCurrencyDollar,
  IconDashboard,
  IconLogout,
  IconMoon,
  IconPeople,
  IconPersonFill,
  IconSearch,
  IconSun,
} from "justd-icons";
import { Aside } from "@/components/ui/aside";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Menu } from "@/components/ui/menu";
import { useLogout, useUser } from "@/lib/auth";
import { Modal } from "../ui/modal";
import { Loader } from "../ui/loader";
import { useLocation } from "react-router-dom";
import { useAuthorization } from "@/lib/authorization";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { checkAccess } = useAuthorization();

  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const user = useUser();

  const logoutMutation = useLogout();
  return (
    <Aside.Layout
      navbar={
        <Aside.Responsive>
          <Button
            aria-label="Inbox"
            appearance="plain"
            shape="circle"
            size="square-petite"
          >
            <IconBell />
          </Button>
          <Button
            aria-label="Search"
            appearance="plain"
            shape="circle"
            size="square-petite"
          >
            <IconSearch />
          </Button>
          <Menu>
            <Button
              appearance="plain"
              size="square-petite"
              shape="circle"
              aria-label="Profile"
              className="group"
            >
              <Avatar size="medium" src="https://github.com/irsyadadl.png" />
            </Button>
            <Menu.Content placement="top" className="min-w-[--trigger-width]">
              <Menu.Item
                onAction={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <IconMoon /> : <IconSun />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item onAction={() => setIsModalOpen(true)}>
                <IconLogout />
                Log out
              </Menu.Item>
            </Menu.Content>
          </Menu>
        </Aside.Responsive>
      }
      aside={
        <>
          <Aside.Header>
            <Link className="flex items-center gap-x-2" href="/">
              <IconBrandJustd />
              <strong>Currency Exchange</strong>
            </Link>
          </Aside.Header>
          <Aside.Content>
            <Aside.Section>
              <Aside.Item
                icon={IconDashboard}
                href="/dashboard"
                isCurrent={pathname === "/dashboard"}
              >
                Dashboard
              </Aside.Item>
              {checkAccess({ allowedRoles: "admin" }) && (
                <Aside.Item
                  icon={IconPeople}
                  href="/users"
                  isCurrent={pathname === "/users"}
                >
                  Users
                </Aside.Item>
              )}
              <Aside.Item
                icon={IconCurrencyDollar}
                href="/currency-exchange"
                isCurrent={pathname === "/currency-exchange"}
              >
                Currency Exchange
              </Aside.Item>
            </Aside.Section>
          </Aside.Content>
          <Aside.Footer className="lg:flex lg:flex-row hidden items-center">
            <Menu>
              <Button
                appearance="plain"
                aria-label="Profile"
                className="group w-full justify-start flex"
              >
                <IconPersonFill className="mr-2" />
                {user.data?.name}
                <IconChevronLgDown className="right-3 absolute group-pressed:rotate-180 transition-transform" />
              </Button>
              <Menu.Content placement="top" className="min-w-[--trigger-width]">
                <Menu.Item
                  onAction={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                  }
                >
                  {theme === "light" ? <IconMoon /> : <IconSun />}
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item onAction={() => setIsModalOpen(true)}>
                  <IconLogout />
                  Log out
                </Menu.Item>
              </Menu.Content>
            </Menu>
          </Aside.Footer>
          <Modal.Content
            isOpen={isModalOpen}
            onOpenChange={() => setIsModalOpen(false)}
          >
            <Modal.Header>
              <Modal.Title>Log out</Modal.Title>
              <Modal.Description>
                Are you sure you want to log out?
              </Modal.Description>
            </Modal.Header>
            <Modal.Footer>
              <Modal.Close appearance="outline">Cancel</Modal.Close>
              <Modal.Close
                appearance="solid"
                intent="danger"
                isDisabled={logoutMutation.isPending}
                onPress={async () => await logoutMutation.mutateAsync({})}
              >
                {logoutMutation.isPending && <Loader variant="spin" />}
                Log out
              </Modal.Close>
            </Modal.Footer>
          </Modal.Content>
        </>
      }
    >
      <main className="relative">{children}</main>
    </Aside.Layout>
  );
}
