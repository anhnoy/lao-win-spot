import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import LotteryCard from "@/components/LotteryCard";
import { Sparkles, Shield, Zap, Award } from "lucide-react";
import heroImage from "@/assets/hero-lottery.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">ระบบซื้อหวยออนไลน์ที่ทันสมัยที่สุด</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-thai leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                หวยลาวออนไลน์
              </span>
              <br />
              <span className="text-foreground">ซื้อง่าย จ่ายจริง</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-thai max-w-2xl mx-auto">
              แพลตฟอร์มซื้อหวยลาวที่ปลอดภัย รองรับหวยทุกประเภท พร้อมระบบตรวจผลอัตโนมัติ
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8" asChild>
                <Link to="/buy">
                  <Zap className="mr-2 h-5 w-5" />
                  เริ่มซื้อหวย
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link to="/results">
                  ดูผลหวย
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3 p-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold font-thai">ปลอดภัย 100%</h3>
              <p className="text-muted-foreground">
                ระบบรักษาความปลอดภัยระดับสากล ข้อมูลเข้ารหัส
              </p>
            </div>

            <div className="text-center space-y-3 p-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold">
                <Zap className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold font-thai">จ่ายเร็ว</h3>
              <p className="text-muted-foreground">
                ถูกรางวัลโอนเข้าบัญชีทันที ไม่มีค่าธรรมเนียม
              </p>
            </div>

            <div className="text-center space-y-3 p-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-win">
                <Award className="h-8 w-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-bold font-thai">อัตราจ่ายสูง</h3>
              <p className="text-muted-foreground">
                อัตราการจ่ายรางวัลสูงที่สุด คุ้มค่าทุกการเสี่ยงโชค
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lottery Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-thai mb-4">
              หวยลาวทุกประเภท
            </h2>
            <p className="text-muted-foreground text-lg">
              เลือกซื้อหวยลาวที่คุณชื่นชอบ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <LotteryCard
              title="หวยลาวพัฒนา"
              type="รางวัลใหญ่"
              closingTime="15:30 น."
              prize="3,500,000 ฿"
              status="open"
            />
            <LotteryCard
              title="หวยลาว VIP"
              type="รางวัลพิเศษ"
              closingTime="16:00 น."
              prize="5,000,000 ฿"
              status="open"
            />
            <LotteryCard
              title="หวยลาว TV"
              type="รางวัลยอดนิยม"
              closingTime="17:30 น."
              prize="2,800,000 ฿"
              status="closed"
            />
            <LotteryCard
              title="หวยลาวสตาร์"
              type="รางวัลดาว"
              closingTime="14:00 น."
              prize="4,200,000 ฿"
              status="open"
            />
            <LotteryCard
              title="หวยลาวพิเศษ"
              type="รางวัลพรีเมี่ยม"
              closingTime="18:00 น."
              prize="6,000,000 ฿"
              status="open"
            />
            <LotteryCard
              title="หวยลาวเช้า"
              type="รางวัลเช้า"
              closingTime="10:30 น."
              prize="1,500,000 ฿"
              status="closed"
            />
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/buy">
                ดูหวยทั้งหมด
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-royal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground font-thai">
              พร้อมเสี่ยงโชคแล้วหรือยัง?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              สมัครสมาชิกวันนี้ รับโบนัสทันที 100 บาท
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8" asChild>
                <Link to="/register">
                  สมัครสมาชิก
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/login">
                  เข้าสู่ระบบ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 หวยลาวออนไลน์ - ระบบซื้อหวยออนไลน์ที่ปลอดภัยและน่าเชื่อถือ</p>
            <p className="mt-2">การพนันอาจเสพติดและเป็นอันตราย โปรดเล่นอย่างมีสติ</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
