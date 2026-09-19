export type Language = 'ta' | 'en';

export type UserRole = 'farmer' | 'buyer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  nameTamil: string;
  phone: string;
  role: UserRole;
  location: string;
  locationTamil: string;
  district: string;
  farmSizeAcres: number;
  primaryCrops: string[];
  isVerified: boolean;
  avatarUrl?: string;
  memberSince: string;
  experienceYears?: number;
}

export interface CropPrice {
  id: string;
  cropName: string;
  cropNameTamil: string;
  category: 'vegetable' | 'grain' | 'cash_crop' | 'fruit' | 'spice';
  variety: string;
  currentPrice: number; // per kg or quintal
  unit: string;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  markets: {
    marketName: string;
    marketNameTamil: string;
    district: string;
    price: number;
    distanceKm: number;
    transportCostPerKg: number;
    demandLevel: 'High' | 'Moderate' | 'Low';
    demandLevelTamil: string;
    estimatedNetReturn: number; // price - transport
  }[];
  history7Days: { date: string; price: number }[];
  history30Days: { date: string; price: number }[];
  highestMarket: string;
  lowestMarket: string;
  aiInsight: string;
  aiInsightTamil: string;
}

export interface ProduceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  cropName: string;
  cropNameTamil: string;
  variety: string;
  quantityKg: number;
  grade: 'Grade A (Export/Premium)' | 'Grade B (Standard)' | 'Grade C (Bulk/Processing)';
  expectedPricePerKg: number;
  availableDate: string;
  image: string;
  description: string;
  createdAt: string;
  isVerified: boolean;
}

export interface BuyerRequirement {
  id: string;
  buyerName: string;
  buyerCompany: string;
  buyerLocation: string;
  cropName: string;
  cropNameTamil: string;
  quantityRequiredKg: number;
  grade: string;
  targetPricePerKg: number;
  requiredByDate: string;
  isVerified: boolean;
  notes: string;
  matchingListingsCount: number;
}

export interface SeedProduct {
  id: string;
  crop: string;
  variety: string;
  brand: string;
  sellerName: string;
  sellerLocation: string;
  price: number;
  weightKg: number;
  germinationRate: string;
  maturityDays: string;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  name?: string;
  nameTamil?: string;
  description?: string;
  descriptionTamil?: string;
  unit?: string;
  suitableSoil?: string;
  isCertified?: boolean;
  cropType?: string;
}

export interface FertilizerProduct {
  id: string;
  name: string;
  brand: string;
  type: 'Organic' | 'Bio-Fertilizer' | 'NPK' | 'Micronutrient';
  price: number;
  quantity: string;
  sellerName: string;
  availability: string;
  usageInfo: string;
  usageInfoTamil: string;
  isVerified: boolean;
  image: string;
}

export interface MachineryItem {
  id: string;
  name: string;
  nameTamil: string;
  category: string;
  ownerName: string;
  location: string;
  rentalPricePerHour: number;
  availability: 'Available Today' | 'Booked Today' | 'Available from Tomorrow';
  horsepower?: string;
  image: string;
  contactNumber: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorLocation: string;
  authorBadge?: 'Experienced Farmer' | 'Agri Expert' | 'Progressive Farmer';
  authorBadgeTamil?: string;
  avatar: string;
  timestamp: string;
  cropTag: string;
  title?: string;
  titleTamil?: string;
  content: string;
  contentTamil: string;
  image?: string;
  audioDurationSeconds?: number;
  hasAudioVoice: boolean;
  likes: number;
  timeAgo?: string;
  likesCount?: number;
  commentsCount?: number;
  isVerifiedFarmer?: boolean;
  comments?: any[];
  replies: {
    id: string;
    authorName: string;
    authorBadge?: string;
    content: string;
    timestamp: string;
    isAudio?: boolean;
    audioDuration?: number;
    likes: number;
  }[];
}

export type SeedInputProduct = SeedProduct;

export interface LearningCourse {
  id: string;
  title: string;
  titleTamil: string;
  category: 'Getting Started' | 'Crop Basics' | 'Water Management' | 'Fertilizer Basics' | 'Pest Awareness' | 'Selling & Market' | 'Farm Economics';
  categoryTamil: string;
  level: 'Beginner' | 'Intermediate';
  progressPercent: number;
  durationMinutes: number;
  lessonsCount: number;
  description: string;
  descriptionTamil: string;
  thumbnail: string;
  steps: {
    id: number;
    title: string;
    titleTamil: string;
    duration: string;
    content: string;
    contentTamil: string;
  }[];
  quiz: {
    question: string;
    questionTamil: string;
    options: string[];
    optionsTamil: string[];
    correctIndex: number;
  }[];
}

export interface GovernmentService {
  id: string;
  title: string;
  titleTamil: string;
  category: 'schemes' | 'subsidies' | 'insurance' | 'training' | 'water_reservoir' | 'officers';
  description: string;
  descriptionTamil: string;
  targetBeneficiaries: string;
  targetBeneficiariesTamil: string;
  eligibility: string;
  eligibilityTamil: string;
  actionText: string;
  actionTextTamil: string;
  iconName: string;
  badge?: string;
  extraInfo?: string;
}

export interface WeatherData {
  city: string;
  district: string;
  temperature: number;
  condition: string;
  conditionTamil: string;
  rainProbabilityPercent: number;
  humidityPercent: number;
  windSpeedKmh: number;
  soilMoistureStatus: string;
  soilMoistureStatusTamil: string;
  alerts: {
    type: 'rain' | 'wind' | 'heat' | 'pest';
    title: string;
    titleTamil: string;
    message: string;
    messageTamil: string;
    severity: 'warning' | 'info' | 'critical';
  }[];
  forecast: {
    day: string;
    dayTamil: string;
    tempMax: number;
    tempMin: number;
    condition: string;
    rainProb: number;
  }[];
}

export interface TransportOption {
  id: string;
  driverName: string;
  vehicleType: 'Pickup (Tata Ace)' | 'Mini Truck (Mahindra Bolero)' | 'Heavy Truck (Eicher)';
  capacityKg: number;
  availableCapacityKg: number;
  currentRoute: string;
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  ratePerKg: number;
  isSharedPool: boolean;
  sharedFarmersCount?: number;
  contactNumber: string;
}

export interface NotificationItem {
  id: string;
  type: 'market' | 'weather' | 'seed' | 'buyer' | 'government' | 'pest' | 'transport';
  title: string;
  titleTamil: string;
  message: string;
  messageTamil: string;
  timestamp: string;
  isRead: boolean;
  actionTarget?: string;
}
