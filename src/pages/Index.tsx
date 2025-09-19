import { Button } from "@/components/ui/button";
import { MedicalCard } from "@/components/medical-card";
import { Heart, Activity, Users, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/medical-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-10 w-10 text-accent" />
                <h1 className="text-4xl md:text-5xl font-bold">SI-PANDA+</h1>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
                Sistem Cerdas Pemantauan Tumbuh Kembang Anak
              </h2>
              
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                Platform terpadu untuk monitoring pertumbuhan dan perkembangan anak dengan 
                teknologi modern, analisis standar WHO, dan sistem peringatan dini.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
                >
                  <Link to="/login">
                    <Shield className="h-5 w-5 mr-2" />
                    Masuk sebagai Kader
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Pelajari Lebih Lanjut
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="lg:justify-self-end">
              <img 
                src={heroImage} 
                alt="Monitoring kesehatan anak dengan teknologi modern"
                className="rounded-2xl shadow-2xl max-w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Fitur Unggulan SI-PANDA+
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Solusi komprehensif untuk pemantauan kesehatan anak dengan teknologi terdepan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <MedicalCard title="Dashboard Terpadu" gradient>
              <div className="space-y-3">
                <Users className="h-8 w-8 text-primary" />
                <p className="text-muted-foreground">
                  Kelola data semua anak dalam satu dashboard yang mudah digunakan dengan 
                  filter dan pencarian canggih.
                </p>
              </div>
            </MedicalCard>

            <MedicalCard title="Analisis Standar WHO" gradient>
              <div className="space-y-3">
                <TrendingUp className="h-8 w-8 text-success" />
                <p className="text-muted-foreground">
                  Evaluasi pertumbuhan berdasarkan standar WHO dengan perhitungan Z-score 
                  otomatis dan akurat.
                </p>
              </div>
            </MedicalCard>

            <MedicalCard title="Sistem Peringatan Dini" gradient>
              <div className="space-y-3">
                <Activity className="h-8 w-8 text-warning" />
                <p className="text-muted-foreground">
                  Deteksi dini masalah pertumbuhan dengan notifikasi otomatis dan 
                  rekomendasi tindakan.
                </p>
              </div>
            </MedicalCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Mulai Monitoring Kesehatan Anak Sekarang
          </h3>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ratusan kader kesehatan yang sudah menggunakan SI-PANDA+ 
            untuk memantau tumbuh kembang anak.
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
          >
            <Link to="/login">
              Akses Dashboard
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
