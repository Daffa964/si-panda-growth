export interface AdminUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: "kader" | "petugas";
  village: string;
  phone: string;
  email?: string;
}

export interface ParentCredentials {
  childId: string;
  parentName: string;
  username: string;
  password: string;
  accessToken: string;
}

// Seed data untuk admin/kader
export const seedAdminUsers: AdminUser[] = [
  {
    id: "admin-001",
    username: "kader_siti",
    password: "siti123",
    name: "Siti Nurhaliza",
    role: "kader",
    village: "Sumber Rejeki",
    phone: "081234567800",
    email: "siti.kader@gmail.com"
  },
  {
    id: "admin-002", 
    username: "kader_ani",
    password: "ani123",
    name: "Ani Suryani",
    role: "kader",
    village: "Sumber Rejeki",
    phone: "081234567801",
    email: "ani.kader@gmail.com"
  },
  {
    id: "admin-003",
    username: "petugas_dr_budi",
    password: "budi123",
    name: "Dr. Budi Santosa",
    role: "petugas",
    village: "Sumber Rejeki", 
    phone: "081234567802",
    email: "dr.budi@puskesmas.go.id"
  },
  {
    id: "admin-004",
    username: "kader_maya",
    password: "maya123", 
    name: "Maya Sari",
    role: "kader",
    village: "Sumber Rejeki",
    phone: "081234567803",
    email: "maya.kader@gmail.com"
  }
];

// Seed data untuk kredensial orang tua (opsional login untuk tracking pribadi)
export const seedParentCredentials: ParentCredentials[] = [
  {
    childId: "child-001",
    parentName: "Budi Pratama",
    username: "budi_pratama",
    password: "andi2022",
    accessToken: "token-andi-001"
  },
  {
    childId: "child-002",
    parentName: "Siti Permatasari", 
    username: "siti_permata",
    password: "sari2022",
    accessToken: "token-sari-002"
  },
  {
    childId: "child-003",
    parentName: "Agus Santoso",
    username: "agus_santoso", 
    password: "budi2021",
    accessToken: "token-budi-003"
  },
  {
    childId: "child-004",
    parentName: "Rina Salsabila",
    username: "rina_salsabila",
    password: "maya2021", 
    accessToken: "token-maya-004"
  },
  {
    childId: "child-005",
    parentName: "Ahmad Maulana",
    username: "ahmad_maulana",
    password: "rizky2021",
    accessToken: "token-rizky-005"
  },
  {
    childId: "child-006", 
    parentName: "Dewi Lestari",
    username: "dewi_lestari",
    password: "cantika2022",
    accessToken: "token-cantika-006"
  },
  {
    childId: "child-007",
    parentName: "Putra Adiputra",
    username: "putra_adiputra", 
    password: "farhan2021",
    accessToken: "token-farhan-007"
  },
  {
    childId: "child-008",
    parentName: "Zahra Fitri",
    username: "zahra_fitri",
    password: "naila2022",
    accessToken: "token-naila-008"
  },
  {
    childId: "child-009",
    parentName: "Eko Prasetyo",
    username: "eko_prasetyo",
    password: "dimas2021", 
    accessToken: "token-dimas-009"
  },
  {
    childId: "child-010",
    parentName: "Sari Ramadhani",
    username: "sari_ramadhani",
    password: "alisha2022",
    accessToken: "token-alisha-010"
  }
];

// Helper functions untuk autentikasi
export const authenticateAdmin = (username: string, password: string): AdminUser | null => {
  const admin = seedAdminUsers.find(
    user => user.username === username && user.password === password
  );
  return admin || null;
};

export const authenticateParent = (username: string, password: string): ParentCredentials | null => {
  const parent = seedParentCredentials.find(
    cred => cred.username === username && cred.password === password
  );
  return parent || null;
};

export const getAdminById = (id: string): AdminUser | undefined => {
  return seedAdminUsers.find(admin => admin.id === id);
};

export const getParentByToken = (token: string): ParentCredentials | undefined => {
  return seedParentCredentials.find(parent => parent.accessToken === token);
};

// Demo credentials untuk testing
export const demoCredentials = {
  admin: {
    username: "kader_siti",
    password: "siti123"
  },
  parent: {
    username: "budi_pratama", 
    password: "andi2022"
  }
};