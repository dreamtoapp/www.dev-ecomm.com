"use client";
import {
  useEffect,
  useState,
} from 'react'

import {
  BadgeAlert,
  ChevronRight,
  Loader2,
  Lock,
  LogIn,
  LogOut,
  Settings,
  User as UserIcon,
  Wallet,
} from 'lucide-react'
import Link from 'next/link'

import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

import { userLogOut } from '../../../app/(e-comm)/auth/action'
import { Button } from '../../ui/button'

interface UserMenuProps {
  session: any;
}

export default function UserMenu({ session }: UserMenuProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!session) {
    return (
      <Button
        variant="outline"
        asChild
        className="group border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200 ease-in-out"
      >
        <Link href="/auth/login" className="flex items-center gap-2 px-4 py-2">
          <LogIn size={16} className="text-primary transition-transform group-hover:scale-110" />
          <span className="font-medium text-primary">دخول</span>
        </Link>
      </Button>
    );
  }

  const logOut = async () => {
    try {
      setIsLoggingOut(true);
      await userLogOut();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={`قائمة المستخدم - ${session.user.name}`}
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg hover:bg-accent/20 transition-all duration-200 group",
            "relative ring-offset-background focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "hover:scale-[1.02] transform"
          )}
        >
          <div className="relative">
            <Avatar className="border-2 border-primary/10 group-hover:border-primary/50 group-hover:shadow-md transition-all w-10 h-10">
              <AvatarFallback className="bg-gradient-to-br from-primary/10 to-muted/10 font-medium text-primary">
                {session.user.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {session.user.role === "admin" && (
              <BadgeAlert className="absolute -bottom-1 -right-1 w-4 h-4 text-destructive fill-destructive/20" />
            )}
          </div>
          <span
            title={session.user.name}
            className="text-sm font-semibold text-foreground/90 truncate hidden sm:inline"
          >
            {session.user.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-60 bg-background border-border shadow-xl rounded-xl p-1"
        sideOffset={10}
      >
        <DropdownMenuLabel className="flex items-center justify-between px-4 py-2 bg-muted/20 rounded-t-lg">
          <span className="text-sm font-semibold text-foreground">الحساب</span>
          {session.user.role === "admin" && (
            <span className="flex items-center gap-1 text-xs text-destructive bg-destructive/10 px-2 py-1 rounded-full">
              <BadgeAlert size={12} />
              مدير النظام
            </span>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-border/50 my-1" />

        {/* Profile Link */}
        <DropdownMenuItem asChild>
          <Link
            href={`/user/profile?id=${session.user.id}`}
            className="flex items-center justify-between px-4 py-2 hover:bg-accent/20 rounded-md transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <UserIcon size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium">الملف الشخصي</span>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </Link>
        </DropdownMenuItem>

        {/* Financial Transactions */}
        <DropdownMenuItem asChild>
          <Link
            href={`/user/statement?id=${session.user.id}`}
            className="flex items-center justify-between px-4 py-2 hover:bg-accent/20 rounded-md transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-md">
                <Wallet size={16} className="text-emerald-500" />
              </div>
              <span className="text-sm font-medium">الحركات المالية</span>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </Link>
        </DropdownMenuItem>

        {/* Setting */}
        <DropdownMenuItem asChild>
          <Link
            href={`/user/setting`}
            className="flex items-center justify-between px-4 py-2 hover:bg-accent/20 rounded-md transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-md">
                <Settings size={16} className="text-secondary" />
              </div>
              <span className="text-sm font-medium">الاعدادات</span>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </Link>
        </DropdownMenuItem>


        {/* Admin Dashboard */}
        {session.user.role === "admin" && (
          <>
            <DropdownMenuSeparator className="bg-border/50 my-1" />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard"
                className="flex items-center justify-between px-4 py-2 hover:bg-accent/20 rounded-md transition-all duration-150"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-md">
                    <Lock size={16} className="text-purple-500" />
                  </div>
                  <span className="text-sm font-medium">لوحة التحكم</span>
                </div>
                <ChevronRight size={14} className="text-muted-foreground" />
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="bg-border/50 my-1" />

        {/* Logout Button */}
        <DropdownMenuItem
          onClick={logOut}
          disabled={isLoggingOut}
          className="flex items-center justify-between px-4 py-2 text-destructive hover:bg-destructive/10 rounded-md transition-all duration-150 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-md">
              {isLoggingOut ? (
                <Loader2 className="animate-spin text-destructive" size={16} />
              ) : (
                <LogOut size={16} className="text-destructive" />
              )}
            </div>
            <span className="text-sm font-medium">
              {isLoggingOut ? "جاري الخروج..." : "تسجيل الخروج"}
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}