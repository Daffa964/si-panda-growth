import { StatusType } from "@/components/ui/status-badge";

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  gender: "L" | "P";
  parentName: string;
  address: string;
  village: string;
  phone: string;
  currentStatus: StatusType;
  lastCheckDate: string;
  secureToken?: string;
}

export interface GrowthRecord {
  id: string;
  childId: string;
  date: string;
  ageMonths: number;
  weight: number; // kg
  height: number; // cm
  muac?: number; // cm (Mid-Upper Arm Circumference)
  zScoreWFA?: number; // Weight for Age
  zScoreHFA?: number; // Height for Age  
  zScoreWFH?: number; // Weight for Height
  status: StatusType;
  notes?: string;
}

export interface Recommendation {
  id: string;
  childId: string;
  type: "nutrition" | "medical" | "activity";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dateCreated: string;
  completed: boolean;
}

// Helper function to calculate age in months
const getAgeInMonths = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const now = new Date();
  return Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
};

// Helper function to format age display
export const formatAge = (birthDate: string): string => {
  const months = getAgeInMonths(birthDate);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${months} bulan`;
  } else if (remainingMonths === 0) {
    return `${years} tahun`;
  } else {
    return `${years} tahun ${remainingMonths} bulan`;
  }
};

export const seedChildren: Child[] = [
  {
    id: "child-001",
    name: "Andi Pratama",
    birthDate: "2022-01-15",
    gender: "L",
    parentName: "Budi Pratama",
    address: "Jl. Mawar No. 12",
    village: "Sumber Rejeki",
    phone: "081234567890",
    currentStatus: "normal",
    lastCheckDate: "2024-03-15",
    secureToken: "token-andi-001"
  },
  {
    id: "child-002", 
    name: "Sari Indah Permatasari",
    birthDate: "2022-07-22",
    gender: "P",
    parentName: "Siti Permatasari",
    address: "Jl. Melati No. 8",
    village: "Sumber Rejeki", 
    phone: "081234567891",
    currentStatus: "berisiko",
    lastCheckDate: "2024-03-12",
    secureToken: "token-sari-002"
  },
  {
    id: "child-003",
    name: "Budi Santoso",
    birthDate: "2021-02-10",
    gender: "L", 
    parentName: "Agus Santoso",
    address: "Jl. Anggrek No. 15",
    village: "Sumber Rejeki",
    phone: "081234567892",
    currentStatus: "gizi-kurang",
    lastCheckDate: "2024-03-10",
    secureToken: "token-budi-003"
  },
  {
    id: "child-004",
    name: "Maya Putri Salsabila", 
    birthDate: "2021-10-05",
    gender: "P",
    parentName: "Rina Salsabila",
    address: "Jl. Kenanga No. 20",
    village: "Sumber Rejeki",
    phone: "081234567893", 
    currentStatus: "normal",
    lastCheckDate: "2024-03-14",
    secureToken: "token-maya-004"
  },
  {
    id: "child-005",
    name: "Rizky Maulana",
    birthDate: "2021-06-18",
    gender: "L",
    parentName: "Ahmad Maulana", 
    address: "Jl. Dahlia No. 5",
    village: "Sumber Rejeki",
    phone: "081234567894",
    currentStatus: "gizi-lebih",
    lastCheckDate: "2024-03-13",
    secureToken: "token-rizky-005"
  },
  {
    id: "child-006",
    name: "Cantika Dewi",
    birthDate: "2022-04-30",
    gender: "P",
    parentName: "Dewi Lestari",
    address: "Jl. Cempaka No. 18",
    village: "Sumber Rejeki", 
    phone: "081234567895",
    currentStatus: "normal",
    lastCheckDate: "2024-03-11",
    secureToken: "token-cantika-006"
  },
  {
    id: "child-007",
    name: "Farhan Adiputra",
    birthDate: "2021-12-20",
    gender: "L",
    parentName: "Putra Adiputra",
    address: "Jl. Bougenville No. 7",
    village: "Sumber Rejeki",
    phone: "081234567896",
    currentStatus: "berisiko", 
    lastCheckDate: "2024-03-09",
    secureToken: "token-farhan-007"
  },
  {
    id: "child-008",
    name: "Naila Zahra",
    birthDate: "2022-11-12", 
    gender: "P",
    parentName: "Zahra Fitri",
    address: "Jl. Flamboyan No. 25",
    village: "Sumber Rejeki",
    phone: "081234567897",
    currentStatus: "normal",
    lastCheckDate: "2024-03-16",
    secureToken: "token-naila-008"
  },
  {
    id: "child-009",
    name: "Dimas Prasetyo",
    birthDate: "2021-08-14",
    gender: "L",
    parentName: "Eko Prasetyo", 
    address: "Jl. Kamboja No. 11",
    village: "Sumber Rejeki",
    phone: "081234567898",
    currentStatus: "gizi-kurang",
    lastCheckDate: "2024-03-08",
    secureToken: "token-dimas-009"
  },
  {
    id: "child-010",
    name: "Alisha Ramadhani",
    birthDate: "2022-03-25",
    gender: "P",
    parentName: "Sari Ramadhani",
    address: "Jl. Teratai No. 30",
    village: "Sumber Rejeki",
    phone: "081234567899",
    currentStatus: "normal", 
    lastCheckDate: "2024-03-07",
    secureToken: "token-alisha-010"
  }
];

export const seedGrowthRecords: GrowthRecord[] = [
  // Andi Pratama records (normal growth)
  {
    id: "record-001",
    childId: "child-001",
    date: "2024-01-15",
    ageMonths: 24,
    weight: 12.5,
    height: 86.0,
    muac: 15.2,
    zScoreWFA: 0.1,
    zScoreHFA: 0.2,
    zScoreWFH: -0.1,
    status: "normal"
  },
  {
    id: "record-002", 
    childId: "child-001",
    date: "2024-02-15",
    ageMonths: 25,
    weight: 12.8,
    height: 87.2,
    muac: 15.4,
    zScoreWFA: 0.2,
    zScoreHFA: 0.3,
    zScoreWFH: 0.0,
    status: "normal"
  },
  {
    id: "record-003",
    childId: "child-001", 
    date: "2024-03-15",
    ageMonths: 26,
    weight: 13.1,
    height: 88.1,
    muac: 15.5,
    zScoreWFA: 0.3,
    zScoreHFA: 0.4,
    zScoreWFH: 0.1,
    status: "normal"
  },
  
  // Sari Indah records (berisiko)
  {
    id: "record-004",
    childId: "child-002",
    date: "2024-01-22",
    ageMonths: 18,
    weight: 9.2,
    height: 78.5,
    muac: 13.8,
    zScoreWFA: -1.8,
    zScoreHFA: -1.5,
    zScoreWFH: -1.2,
    status: "berisiko",
    notes: "Berat badan kurang dari standar"
  },
  {
    id: "record-005",
    childId: "child-002", 
    date: "2024-02-22",
    ageMonths: 19,
    weight: 9.4,
    height: 79.2,
    muac: 14.0,
    zScoreWFA: -1.7,
    zScoreHFA: -1.4,
    zScoreWFH: -1.1,
    status: "berisiko"
  },
  {
    id: "record-006",
    childId: "child-002",
    date: "2024-03-12", 
    ageMonths: 20,
    weight: 9.5,
    height: 79.8,
    muac: 14.1,
    zScoreWFA: -1.6,
    zScoreHFA: -1.3,
    zScoreWFH: -1.0,
    status: "berisiko"
  },

  // Budi Santoso records (gizi kurang)
  {
    id: "record-007",
    childId: "child-003",
    date: "2024-01-10",
    ageMonths: 35,
    weight: 11.8,
    height: 91.2,
    muac: 13.5,
    zScoreWFA: -2.3,
    zScoreHFA: -2.1,
    zScoreWFH: -2.0,
    status: "gizi-kurang",
    notes: "Perlu intervensi nutrisi segera"
  },
  {
    id: "record-008", 
    childId: "child-003",
    date: "2024-02-10",
    ageMonths: 36,
    weight: 12.0,
    height: 91.8,
    muac: 13.7,
    zScoreWFA: -2.2,
    zScoreHFA: -2.0,
    zScoreWFH: -1.9,
    status: "gizi-kurang"
  },
  {
    id: "record-009",
    childId: "child-003",
    date: "2024-03-10",
    ageMonths: 37,
    weight: 12.2,
    height: 92.3,
    muac: 13.8,
    zScoreWFA: -2.1,
    zScoreHFA: -1.9,
    zScoreWFH: -1.8,
    status: "gizi-kurang"
  },

  // Maya Putri records (normal)
  {
    id: "record-010",
    childId: "child-004",
    date: "2024-01-05",
    ageMonths: 27,
    weight: 13.2,
    height: 88.5,
    muac: 15.8,
    zScoreWFA: 0.5,
    zScoreHFA: 0.3,
    zScoreWFH: 0.4,
    status: "normal"
  },
  {
    id: "record-011",
    childId: "child-004", 
    date: "2024-02-05",
    ageMonths: 28,
    weight: 13.5,
    height: 89.2,
    muac: 16.0,
    zScoreWFA: 0.6,
    zScoreHFA: 0.4,
    zScoreWFH: 0.5,
    status: "normal"
  },
  {
    id: "record-012",
    childId: "child-004",
    date: "2024-03-14",
    ageMonths: 29,
    weight: 13.8,
    height: 89.8,
    muac: 16.2,
    zScoreWFA: 0.7,
    zScoreHFA: 0.5,
    zScoreWFH: 0.6,
    status: "normal"
  },

  // Rizky Maulana records (gizi lebih)
  {
    id: "record-013",
    childId: "child-005",
    date: "2024-01-18",
    ageMonths: 31,
    weight: 16.2,
    height: 90.5,
    muac: 17.8,
    zScoreWFA: 2.1,
    zScoreHFA: 0.8,
    zScoreWFH: 2.3,
    status: "gizi-lebih",
    notes: "Perlu pengaturan pola makan"
  },
  {
    id: "record-014",
    childId: "child-005",
    date: "2024-02-18", 
    ageMonths: 32,
    weight: 16.4,
    height: 91.0,
    muac: 18.0,
    zScoreWFA: 2.2,
    zScoreHFA: 0.9,
    zScoreWFH: 2.4,
    status: "gizi-lebih"
  },
  {
    id: "record-015",
    childId: "child-005",
    date: "2024-03-13",
    ageMonths: 33,
    weight: 16.3,
    height: 91.4,
    muac: 17.9,
    zScoreWFA: 2.1,
    zScoreHFA: 1.0,
    zScoreWFH: 2.2,
    status: "gizi-lebih"
  }
];

export const seedRecommendations: Recommendation[] = [
  {
    id: "rec-001",
    childId: "child-002",
    type: "nutrition",
    title: "Tingkatkan Asupan Protein",
    description: "Berikan makanan tinggi protein seperti telur, ikan, dan daging ayam. Frekuensi makan 6x sehari dengan porsi kecil.",
    priority: "high",
    dateCreated: "2024-03-12",
    completed: false
  },
  {
    id: "rec-002", 
    childId: "child-002",
    type: "medical",
    title: "Kontrol Rutin ke Puskesmas",
    description: "Lakukan pemeriksaan kesehatan rutin setiap 2 minggu untuk monitoring progress pertumbuhan.",
    priority: "high", 
    dateCreated: "2024-03-12",
    completed: false
  },
  {
    id: "rec-003",
    childId: "child-003",
    type: "nutrition", 
    title: "Program Makanan Tambahan",
    description: "Ikuti program PMT (Pemberian Makanan Tambahan) di Posyandu dengan menu khusus gizi kurang.",
    priority: "high",
    dateCreated: "2024-03-10",
    completed: false
  },
  {
    id: "rec-004",
    childId: "child-003",
    type: "medical",
    title: "Skrining Penyakit Penyerta", 
    description: "Lakukan pemeriksaan untuk mendeteksi kemungkinan penyakit yang mempengaruhi pertumbuhan.",
    priority: "high",
    dateCreated: "2024-03-10",
    completed: false
  },
  {
    id: "rec-005",
    childId: "child-005",
    type: "activity",
    title: "Tingkatkan Aktivitas Fisik",
    description: "Ajak anak bermain aktif minimal 60 menit per hari. Kurangi waktu menonton TV/gadget.",
    priority: "medium",
    dateCreated: "2024-03-13", 
    completed: false
  },
  {
    id: "rec-006",
    childId: "child-005",
    type: "nutrition",
    title: "Atur Porsi Makan",
    description: "Kurangi porsi makanan tinggi kalori. Perbanyak sayur dan buah dalam menu harian.",
    priority: "high",
    dateCreated: "2024-03-13",
    completed: false
  },
  {
    id: "rec-007",
    childId: "child-007",
    type: "nutrition",
    title: "Suplementasi Vitamin",
    description: "Berikan vitamin A dan zat besi sesuai anjuran petugas kesehatan untuk meningkatkan daya tahan tubuh.",
    priority: "medium",
    dateCreated: "2024-03-09",
    completed: true
  }
];

// Utility functions for data processing
export const getChildById = (id: string): Child | undefined => {
  return seedChildren.find(child => child.id === id);
};

export const getRecordsByChildId = (childId: string): GrowthRecord[] => {
  return seedGrowthRecords.filter(record => record.childId === childId);
};

export const getRecommendationsByChildId = (childId: string): Recommendation[] => {
  return seedRecommendations.filter(rec => rec.childId === childId);
};

export const getLatestRecordByChildId = (childId: string): GrowthRecord | undefined => {
  const records = getRecordsByChildId(childId);
  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
};

// Statistics helper functions
export const getStatsFromChildren = (children: Child[]) => {
  const total = children.length;
  const normal = children.filter(child => child.currentStatus === "normal").length;
  const berisiko = children.filter(child => child.currentStatus === "berisiko").length;
  const giziKurang = children.filter(child => child.currentStatus === "gizi-kurang").length;
  const giziLebih = children.filter(child => child.currentStatus === "gizi-lebih").length;
  
  const needAttention = berisiko + giziKurang + giziLebih;
  
  return {
    total,
    normal,
    needAttention,
    normalPercentage: Math.round((normal / total) * 100),
    needAttentionPercentage: Math.round((needAttention / total) * 100)
  };
};