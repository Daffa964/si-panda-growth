import { MedicalCard } from "@/components/medical-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Phone, MapPin, User, Weight, Ruler, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { getParentByToken } from "@/data/authData";
import { getChildById, getRecordsByChildId, getRecommendationsByChildId, formatAge } from "@/data/seedData";

const ParentView = () => {
  const { token } = useParams<{ token: string }>();
  
  const parentCredential = getParentByToken(token || "");
  const child = parentCredential ? getChildById(parentCredential.childId) : null;
  const growthRecords = child ? getRecordsByChildId(child.id) : [];
  const recommendations = child ? getRecommendationsByChildId(child.id) : [];

  if (!parentCredential || !child) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-warning" />
          <h1 className="text-2xl font-bold mb-4">Akses Tidak Valid</h1>
          <p className="text-muted-foreground mb-6">
            Link yang Anda gunakan tidak valid atau sudah kadaluarsa.
          </p>
          <p className="text-sm text-muted-foreground">
            Hubungi kader kesehatan untuk mendapatkan link yang benar.
          </p>
        </div>
      </div>
    );
  }

  const latestRecord = growthRecords[growthRecords.length - 1];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-medical">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">SI-PANDA+</h1>
                <p className="text-primary-foreground/80">Dashboard Orang Tua</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{parentCredential.parentName}</div>
              <div className="text-xs text-primary-foreground/70">Orang Tua</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Welcome Message */}
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-primary" />
            <div>
              <h2 className="font-semibold text-primary">Selamat Datang, {parentCredential.parentName}!</h2>
              <p className="text-sm text-muted-foreground">
                Berikut adalah informasi tumbuh kembang {child.name}
              </p>
            </div>
          </div>
        </div>

        {/* Child Profile */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <MedicalCard title="Profil Anak" gradient>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-lg">{child.name}</div>
                  <div className="text-muted-foreground">
                    {child.gender === "L" ? "Laki-laki" : "Perempuan"} • {formatAge(child.birthDate)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <Calendar className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-sm font-medium">Tanggal Lahir</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(child.birthDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <Activity className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-sm font-medium">Status Gizi</div>
                  <div className="mt-1">
                    <StatusBadge status={child.currentStatus} />
                  </div>
                </div>
              </div>
            </div>
          </MedicalCard>

          <MedicalCard title="Pengukuran Terakhir" gradient>
            {latestRecord ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {new Date(latestRecord.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-success/10 border border-success/20 rounded-lg">
                    <Weight className="h-6 w-6 mx-auto mb-2 text-success" />
                    <div className="text-xl font-bold text-success">{latestRecord.weight} kg</div>
                    <div className="text-xs text-muted-foreground">Berat Badan</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-primary/10 border border-primary/20 rounded-lg">
                    <Ruler className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xl font-bold text-primary">{latestRecord.height} cm</div>
                    <div className="text-xs text-muted-foreground">Tinggi Badan</div>
                  </div>
                </div>
                
                {latestRecord.muac && (
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <div className="text-lg font-bold">{latestRecord.muac} cm</div>
                    <div className="text-xs text-muted-foreground">Lingkar Lengan Atas</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Belum ada data pengukuran</p>
              </div>
            )}
          </MedicalCard>
        </div>

        {/* Status Information */}
        <MedicalCard title="Informasi Status Gizi" className="mb-6" gradient>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <StatusBadge status={child.currentStatus} />
              <span className="text-sm font-medium">Status Gizi Saat Ini</span>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              {child.currentStatus === "normal" ? (
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium text-success">Alhamdulillah, {child.name} dalam kondisi gizi normal!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pertahankan pola makan sehat, aktivitas fisik yang cukup, dan kontrol rutin ke posyandu.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-warning">
                      {child.name} memerlukan perhatian khusus dalam hal gizi.
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Silakan ikuti rekomendasi dari kader kesehatan dan lakukan kontrol rutin ke posyandu.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </MedicalCard>

        {/* Growth History */}
        <MedicalCard title="Riwayat Pertumbuhan (3 Bulan Terakhir)" className="mb-6">
          {growthRecords.length > 0 ? (
            <div className="space-y-3">
              {growthRecords.slice(-3).reverse().map((record, index) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <Calendar className="h-4 w-4 mx-auto text-muted-foreground" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(record.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium">{record.weight} kg</div>
                        <div className="text-xs text-muted-foreground">BB</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{record.height} cm</div>
                        <div className="text-xs text-muted-foreground">TB</div>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={record.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Belum ada riwayat pengukuran</p>
            </div>
          )}
        </MedicalCard>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <MedicalCard title="Rekomendasi untuk Orang Tua" gradient>
            <div className="space-y-4">
              {recommendations.filter(rec => !rec.completed).map((rec) => (
                <div key={rec.id} className="p-4 border rounded-lg bg-gradient-card">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      rec.priority === "high" ? "bg-destructive" :
                      rec.priority === "medium" ? "bg-warning" : "bg-success"
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-muted/50 rounded text-xs">
                          {rec.type === "nutrition" ? "Nutrisi" :
                           rec.type === "medical" ? "Medis" : "Aktivitas"}
                        </span>
                        <span>•</span>
                        <span>
                          Prioritas: {rec.priority === "high" ? "Tinggi" :
                                    rec.priority === "medium" ? "Sedang" : "Rendah"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MedicalCard>
        )}

        {/* Contact Information */}
        <MedicalCard title="Informasi Kontak" className="mt-6">
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Jika Anda memiliki pertanyaan atau memerlukan konsultasi lebih lanjut:
            </p>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>Hubungi Kader Kesehatan: <strong>Bu Siti Nurhaliza</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Posyandu Desa {child.village}</span>
            </div>
            <div className="mt-4 p-3 bg-primary/5 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Catatan:</strong> Data ini adalah informasi resmi dari sistem SI-PANDA+. 
                Untuk informasi lebih detail atau konsultasi medis, silakan datang langsung ke posyandu.
              </p>
            </div>
          </div>
        </MedicalCard>
      </div>
    </div>
  );
};

export default ParentView;