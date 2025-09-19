import { MedicalCard } from "@/components/medical-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Calendar, Phone, MapPin, User, Weight, Ruler, Activity, Save, Plus } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { getChildById, getRecordsByChildId, getRecommendationsByChildId, formatAge } from "@/data/seedData";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ChildDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userType } = useAuth();
  const { toast } = useToast();
  
  // Form states for new measurement
  const [newWeight, setNewWeight] = useState("");
  const [newHeight, setNewHeight] = useState("");
  const [newMuac, setNewMuac] = useState("");
  const [notes, setNotes] = useState("");

  // Redirect if not admin
  if (userType !== "admin") {
    navigate("/login");
    return null;
  }

  const child = getChildById(id || "");
  const growthRecords = getRecordsByChildId(id || "");
  const recommendations = getRecommendationsByChildId(id || "");

  if (!child) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Anak Tidak Ditemukan</h1>
          <Button onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const latestRecord = growthRecords[growthRecords.length - 1];

  const handleSubmitMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newWeight || !newHeight) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Berat badan dan tinggi badan harus diisi",
        variant: "destructive"
      });
      return;
    }

    // In real app, this would save to database
    toast({
      title: "Pengukuran Berhasil Disimpan",
      description: `Data pengukuran ${child.name} telah ditambahkan`,
    });

    // Reset form
    setNewWeight("");
    setNewHeight("");
    setNewMuac("");
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-medical">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Detail Anak - {child.name}</h1>
              <p className="text-primary-foreground/80">Monitoring Tumbuh Kembang</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Child Profile */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <MedicalCard title="Profil Anak" gradient>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-semibold">{child.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {child.gender === "L" ? "Laki-laki" : "Perempuan"} • {formatAge(child.birthDate)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{child.parentName}</div>
                  <div className="text-sm text-muted-foreground">{child.phone}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <div>{child.address}</div>
                  <div className="text-muted-foreground">{child.village}</div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Status Saat Ini</span>
                </div>
                <StatusBadge status={child.currentStatus} />
              </div>
            </div>
          </MedicalCard>

          <MedicalCard title="Pengukuran Terakhir" gradient>
            {latestRecord ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(latestRecord.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <Weight className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-lg font-bold">{latestRecord.weight} kg</div>
                    <div className="text-xs text-muted-foreground">Berat Badan</div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <Ruler className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-lg font-bold">{latestRecord.height} cm</div>
                    <div className="text-xs text-muted-foreground">Tinggi Badan</div>
                  </div>
                </div>
                
                {latestRecord.muac && (
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="text-sm font-medium">{latestRecord.muac} cm</div>
                    <div className="text-xs text-muted-foreground">Lingkar Lengan Atas</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-4">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Belum ada data pengukuran</p>
              </div>
            )}
          </MedicalCard>

          <MedicalCard title="Input Pengukuran Baru" gradient>
            <form onSubmit={handleSubmitMeasurement} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="weight" className="text-xs">Berat Badan (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="12.5"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="height" className="text-xs">Tinggi Badan (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    placeholder="85.0"
                    value={newHeight}
                    onChange={(e) => setNewHeight(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="muac" className="text-xs">Lingkar Lengan Atas (cm)</Label>
                <Input
                  id="muac"
                  type="number"
                  step="0.1"
                  placeholder="15.2"
                  value={newMuac}
                  onChange={(e) => setNewMuac(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="notes" className="text-xs">Catatan (opsional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Catatan tambahan..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />
              </div>
              
              <Button type="submit" className="w-full bg-gradient-primary hover:bg-primary-hover">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengukuran
              </Button>
            </form>
          </MedicalCard>
        </div>

        {/* Growth History */}
        <div className="grid lg:grid-cols-2 gap-6">
          <MedicalCard title="Riwayat Pengukuran" className="lg:col-span-2">
            {growthRecords.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Usia</TableHead>
                      <TableHead>BB (kg)</TableHead>
                      <TableHead>TB (cm)</TableHead>
                      <TableHead>LiLA (cm)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Catatan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {growthRecords.reverse().map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          {new Date(record.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>{record.ageMonths} bulan</TableCell>
                        <TableCell className="font-medium">{record.weight}</TableCell>
                        <TableCell className="font-medium">{record.height}</TableCell>
                        <TableCell>{record.muac || "-"}</TableCell>
                        <TableCell>
                          <StatusBadge status={record.status} />
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-xs">
                          {record.notes || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Belum ada riwayat pengukuran</p>
              </div>
            )}
          </MedicalCard>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <MedicalCard title="Rekomendasi Tindakan" className="lg:col-span-2">
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          rec.priority === "high" ? "bg-destructive" :
                          rec.priority === "medium" ? "bg-warning" : "bg-success"
                        }`}></div>
                        <h4 className="font-semibold">{rec.title}</h4>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {rec.type === "nutrition" ? "Nutrisi" :
                         rec.type === "medical" ? "Medis" : "Aktivitas"}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                    <div className="text-xs text-muted-foreground">
                      Dibuat: {new Date(rec.dateCreated).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildDetail;