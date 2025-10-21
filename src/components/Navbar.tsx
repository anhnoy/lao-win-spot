import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, User, LogOut, Menu, Ticket } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import WalletComponent from "@/components/Wallet";

const Navbar = () => {
  const userBalance = 12500; // Mock data

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-12 w-12 rounded-lg overflow-hidden">
              <img
                src="https://imgur.com/S3NjKt4.png"
                alt="WIN-LOTTERY"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="bg-gradient-primary bg-clip-text text-transparent font-thai">
              WIN-LOTTERY
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              หน้าแรก
            </Link>
            <Link
              to="/buy"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              ซื้อหวย
            </Link>
            <Link
              to="/results"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              ผลหวย
            </Link>
            <Link
              to="/history"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              ประวัติ
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Wallet Display */}
            <div className="hidden sm:flex">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-gold">
                    <Wallet className="h-4 w-4 text-accent-foreground" />
                    <span className="font-semibold text-accent-foreground">{userBalance.toLocaleString()} ฿</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px]">
                  <WalletComponent balance={userBalance} />
                </SheetContent>
              </Sheet>
            </div>

            {/* User Menu - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Wallet */}
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-gold">
                    <Wallet className="h-5 w-5 text-accent-foreground" />
                    <span className="font-semibold text-accent-foreground">
                      {userBalance.toLocaleString()} ฿
                    </span>
                  </div>

                  {/* Mobile Links */}
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/"
                      className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      หน้าแรก
                    </Link>
                    <Link
                      to="/buy"
                      className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      ซื้อหวย
                    </Link>
                    <Link
                      to="/results"
                      className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      ผลหวย
                    </Link>
                    <Link
                      to="/history"
                      className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      ประวัติ
                    </Link>
                    <Link
                      to="/profile"
                      className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      โปรไฟล์
                    </Link>
                  </div>

                  <Button variant="destructive" className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    ออกจากระบบ
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
