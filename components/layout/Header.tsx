"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store";
import { setFilters, clearFilters } from "@/lib/slices/productsSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Menu,
  X,
  ShoppingCart,
  LogOut,
  UserCircle,
  Home,
  Heart,
  Search,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

export function Header() {
  const { isAuthenticated, user, signOut } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const { filters } = useSelector((state: RootState) => state.products);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [searchInput, setSearchInput] = useState(filters.searchQuery);

  // Different navigation items based on auth status
  const unauthenticatedNavigation = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilters({ searchQuery: searchInput }));
  };

  const handleSignOut = () => {
    signOut();
    setMobileMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="dark:bg-[#111827] backdrop-blur-sm shadow dark:shadow-gray-700 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={isAuthenticated ? "/dashboard" : "/"}
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors flex items-center space-x-2"
          >
            <p>
              <span className="text-primary">Urji</span>
              <span>Store</span>
            </p>
          </Link>

          {/* Desktop Navigation or Search */}
          {isAuthenticated ? (
            <form
              onSubmit={handleSearch}
              className="hidden md:block relative w-1/2"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 bg-background"
              />
            </form>
          ) : (
            <nav className="hidden md:flex gap-16">
              {unauthenticatedNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              // Authenticated User Actions - Desktop
              <>
                {/* Search Icon - Mobile Only */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Search className="h-5 w-5" />
                </Button>

                {/* Desktop Navigation Items */}
                <div className="hidden md:flex items-center space-x-3">
                  <Link href="/dashboard/favorites" className="relative group">
                    <Button variant="ghost" size="sm" className="relative">
                      <Heart className="h-5 w-5" />
                      {favoritesCount > 0 && (
                        <Badge
                          variant="secondary"
                          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {favoritesCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  <Link href="/dashboard/cart" className="relative group">
                    <Button variant="ghost" size="sm" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItemCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {cartItemCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border"
                      >
                        <UserCircle className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">
                          {user?.name || user?.username}
                        </span>
                        <span className="sm:hidden">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-background border-border w-64"
                    >
                      {/* User Info Header */}
                      <div className="px-3 py-3 border-b border-border">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {user?.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Items */}
                      <div className="py-1">
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard"
                            className="flex items-center cursor-pointer"
                          >
                            <Home className="h-4 w-4 mr-3" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/favorites"
                            className="flex items-center cursor-pointer"
                          >
                            <Heart className="h-4 w-4 mr-3" />
                            My Favorites
                            {favoritesCount > 0 && (
                              <Badge
                                variant="secondary"
                                className="ml-2 h-5 px-1.5"
                              >
                                {favoritesCount}
                              </Badge>
                            )}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/profile"
                            className="flex items-center cursor-pointer"
                          >
                            <UserCircle className="h-4 w-4 mr-3" />
                            Profile
                          </Link>
                        </DropdownMenuItem>
                      </div>

                      {/* Theme Toggle */}
                      <div className="border-t border-border pt-1">
                        <DropdownMenuItem asChild>
                          <div className="flex items-center cursor-pointer px-2 py-1.5">
                            <ThemeToggle />
                            <span className="ml-3">Toggle Theme</span>
                          </div>
                        </DropdownMenuItem>
                      </div>

                      {/* Sign Out */}
                      <div className="border-t border-border pt-1">
                        <DropdownMenuItem
                          onClick={handleSignOut}
                          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              // Unauthenticated User Actions - Desktop
              <div className="hidden md:flex gap-3 items-center">
                <ThemeToggle />
                <Link href="/auth/signin">
                  <Button>Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    variant="outline"
                    className="text-primary hover:text-primary/80"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-">
            {isAuthenticated ? (
              <div className="space-y-4">
                <form onSubmit={handleSearch} className="relative px-4">
                  <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </form>
                <div className="pt-3 border-t border-border space-y-3">
                  <Link
                    href="/dashboard/favorites"
                    className="flex items-center justify-between text-foreground/80 hover:text-foreground transition-colors font-medium py-2 px-4 rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-3" />
                      My Favorites
                    </div>
                    {favoritesCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {favoritesCount}
                      </Badge>
                    )}
                  </Link>

                  <Link
                    href="/dashboard/cart"
                    className="flex items-center justify-between text-foreground/80 hover:text-foreground transition-colors font-medium py-2 px-4 rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-3" />
                      Shopping Cart
                    </div>
                    {cartItemCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center text-foreground/80 hover:text-foreground transition-colors font-medium py-2 px-4 rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="h-4 w-4 mr-3" />
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    className="flex items-center text-foreground/80 hover:text-foreground transition-colors font-medium py-2 px-4 rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserCircle className="h-4 w-4 mr-3" />
                    Profile
                  </Link>

                  {/* Theme Toggle in Mobile Menu */}
                  <div className="flex items-center justify-between text-foreground/80  transition-colors font-medium py-2 px-4 rounded-md ">
                    <div className="flex items-center">
                      <span className="mr-3">Theme</span>
                    </div>
                    <ThemeToggle />
                  </div>

                  <div className="px-4 py-2 bg-muted/50 rounded-md">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-medium py-2 px-4 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <nav className="flex flex-col space-y-3 px-4">
                {unauthenticatedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2 px-3 rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-3 border-t border-border space-y-3">
                  {/* Theme Toggle in Mobile Menu for Unauthenticated Users */}
                  <div className="flex items-center justify-between text-foreground/80 hover:text-foreground transition-colors font-medium py-2 px-3 rounded-md hover:bg-accent">
                    <div className="flex items-center">
                      <span className="mr-3">Theme</span>
                    </div>
                    <ThemeToggle />
                  </div>
                  <Link
                    href="/auth/signin"
                    className="block text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium py-3 px-4 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block text-center border border-primary text-primary hover:bg-primary/10 transition-colors font-medium py-3 px-4 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
