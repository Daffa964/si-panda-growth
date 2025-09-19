import { MedicalCard } from "@/components/medical-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Activity, Users, TrendingUp, Heart } from "lucide-react";

// Mock data for demonstration
const mockChildren = [
  { id: 1, name: "Andi Pratama", age: "2 tahun 3 bulan", status: "normal" as const, lastCheck: "15 Mar 2024" },
  { id: 2, name: "Sari Indah", age: "1 tahun 8 bulan", status: "berisiko" as const, lastCheck: "12 Mar 2024" },
  { id: 3, name: "Budi Santoso", age: "3 tahun 1 bulan", status: "gizi-kurang" as const, lastCheck: "10 Mar 2024" },
  { id: 4, name: "Maya Putri", age: "2 tahun 6 bulan", status: "normal" as const, lastCheck: "14 Mar 2024" },
];

const Dashboard = () => {
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
              <span className="text-sm">Kader: Bu Siti</span>
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
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">Terdaftar</p>
              </div>
            </div>
          </MedicalCard>
          
          <MedicalCard title="Status Normal" gradient>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">124</div>
                <p className="text-xs text-muted-foreground">87%</p>
              </div>
            </div>
          </MedicalCard>
          
          <MedicalCard title="Perlu Perhatian" gradient>
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold text-warning">18</div>
                <p className="text-xs text-muted-foreground">13%</p>
              </div>
            </div>
          </MedicalCard>
          
          <MedicalCard title="Pemeriksaan Hari Ini" gradient>
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-accent" />
              <div>
                <div className="text-2xl font-bold text-accent">8</div>
                <p className="text-xs text-muted-foreground">Dijadwalkan</p>
              </div>
            </div>
          </MedicalCard>
        </div>

        {/* Main Content */}
        <MedicalCard 
          title="Daftar Anak" 
          description="Kelola data pertumbuhan dan perkembangan anak"
          className="w-full"
        >
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Cari nama anak..." 
                className="pl-10"
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
                  <TableHead>Status Gizi</TableHead>
                  <TableHead>Pemeriksaan Terakhir</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockChildren.map((child) => (
                  <TableRow key={child.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{child.name}</TableCell>
                    <TableCell>{child.age}</TableCell>
                    <TableCell>
                      <StatusBadge status={child.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{child.lastCheck}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Lihat Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </MedicalCard>
      </div>
    </div>
  );
};

export default Dashboard;