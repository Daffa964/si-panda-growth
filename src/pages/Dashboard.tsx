import { MedicalCard } from "@/components/medical-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Activity, Users, TrendingUp, Heart, Calendar } from "lucide-react";
import { seedChildren, formatAge, getStatsFromChildren } from "@/data/seedData";
import { useState } from "react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter children based on search term
  const filteredChildren = seedChildren.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get statistics from current data
  const stats = getStatsFromChildren(seedChildren);
  
  // Calculate today's scheduled checkups (mock data)
  const todayCheckups = seedChildren.filter(child => {
    const lastCheck = new Date(child.lastCheckDate);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - lastCheck.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff >= 28; // Due for monthly checkup
  }).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-medical">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard SI-PANDA+</h1>
              <p className="text-primary-foreground/80">Sistem Pemantauan Tumbuh Kembang Anak</p>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Kader: Bu Siti Nurhaliza</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <MedicalCard title="Total Anak" gradient>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">Terdaftar</p>
              </div>
            </div>
          </MedicalCard>
          
          <MedicalCard title="Status Normal" gradient>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">{stats.normal}</div>
                <p className="text-xs text-muted-foreground">{stats.normalPercentage}%</p>
              </div>
            </div>
          </MedicalCard>
          
          <MedicalCard title="Perlu Perhatian" gradient>
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold text-warning">{stats.needAttention}</div>
                <p className="text-xs text-muted-foreground">{stats.needAttentionPercentage}%</p>
              </div>
            </div>
          </MedicalCard>
          
          <MedicalCard title="Jadwal Hari Ini" gradient>
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-accent" />
              <div>
                <div className="text-2xl font-bold text-accent">{todayCheckups}</div>
                <p className="text-xs text-muted-foreground">Perlu Kontrol</p>
              </div>
            </div>
          </MedicalCard>
        </div>

        {/* Main Content */}
        <MedicalCard 
          title={`Daftar Anak (${filteredChildren.length} dari ${stats.total})`}
          description="Kelola data pertumbuhan dan perkembangan anak di wilayah Anda"
          className="w-full"
        >
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Cari nama anak atau orang tua..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-gradient-primary hover:bg-primary-hover gap-2">
              <Plus className="h-4 w-4" />
              Tambah Anak Baru
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Anak</TableHead>
                  <TableHead>Usia</TableHead>
                  <TableHead>Orang Tua</TableHead>
                  <TableHead>Status Gizi</TableHead>
                  <TableHead>Pemeriksaan Terakhir</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChildren.map((child) => (
                  <TableRow key={child.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{child.name}</div>
                        <div className="text-xs text-muted-foreground">{child.gender === "L" ? "Laki-laki" : "Perempuan"}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatAge(child.birthDate)}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{child.parentName}</div>
                        <div className="text-xs text-muted-foreground">{child.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={child.currentStatus} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(child.lastCheckDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short', 
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm">
                          Lihat Detail
                        </Button>
                        <Button variant="outline" size="sm" className="text-accent">
                          Link Ortu
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredChildren.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Tidak ada data anak yang sesuai dengan pencarian.</p>
            </div>
          )}
        </MedicalCard>
      </div>
    </div>
  );
};

export default Dashboard;