import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MedicalCard } from "@/components/medical-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Shield, Users, AlertCircle, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authenticateAdmin, authenticateParent, demoCredentials } from "@/data/authData";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"admin" | "parent">("admin");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (userType === "admin") {
        const adminUser = authenticateAdmin(username, password);
        if (adminUser) {
          login(adminUser, "admin");
          toast({
            title: "Login Berhasil",
            description: `Selamat datang, ${adminUser.name}`,
          });
          navigate("/dashboard");
        } else {
          toast({
            title: "Login Gagal",
            description: "Username atau password admin salah",
            variant: "destructive",
          });
        }
      } else {
        const parentUser = authenticateParent(username, password);
        if (parentUser) {
          login(parentUser, "parent");
          toast({
            title: "Login Berhasil", 
            description: `Selamat datang, ${parentUser.parentName}`,
          });
          navigate(`/view/${parentUser.accessToken}`);
        } else {
          toast({
            title: "Login Gagal",
            description: "Username atau password orang tua salah",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (type: "admin" | "parent") => {
    if (type === "admin") {
      setUsername(demoCredentials.admin.username);
      setPassword(demoCredentials.admin.password);
      setUserType("admin");
    } else {
      setUsername(demoCredentials.parent.username);
      setPassword(demoCredentials.parent.password);
      setUserType("parent");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-card flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-medical">
            <Heart className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">SI-PANDA+</h1>
          <p className="text-muted-foreground mt-1">Sistem Pemantauan Tumbuh Kembang Anak</p>
        </div>

        {/* Demo Credentials Info */}
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-medium">Kredensial Demo:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials("admin")}
                  className="text-left justify-start"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Kader Demo
                </Button>
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={() => fillDemoCredentials("parent")}
                  className="text-left justify-start"
                >
                  <Users className="h-3 w-3 mr-1" />
                  Ortu Demo
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Login Form */}
        <MedicalCard title="Login Sistem" description="Pilih jenis akun dan masukkan kredensial Anda" gradient>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label>Jenis Akun</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={userType === "admin" ? "default" : "outline"}
                  onClick={() => setUserType("admin")}
                  className="justify-start"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Kader/Admin
                </Button>
                <Button
                  type="button"
                  variant={userType === "parent" ? "default" : "outline"}
                  onClick={() => setUserType("parent")}
                  className="justify-start"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Orang Tua
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                type="text"
                placeholder={userType === "admin" ? "Username kader/admin" : "Username orang tua"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:bg-primary-hover mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Masuk ke Sistem
                </>
              )}
            </Button>
          </form>
        </MedicalCard>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Multi User</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>Aman</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>Terpercaya</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;