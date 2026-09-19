import {
  CropPrice,
  ProduceListing,
  BuyerRequirement,
  SeedProduct,
  FertilizerProduct,
  MachineryItem,
  CommunityPost,
  LearningCourse,
  GovernmentService,
  WeatherData,
  TransportOption,
  NotificationItem,
  UserProfile
} from '../types';

export const initialUser: UserProfile = {
  id: 'farmer_01',
  name: 'Ramesh Sundaram',
  nameTamil: 'ரமேஷ் சுந்தரம்',
  phone: '+91 98421 76540',
  role: 'farmer',
  location: 'Vadipatti, Madurai',
  locationTamil: 'வாடிப்பட்டி, மதுரை',
  district: 'Madurai',
  farmSizeAcres: 3.5,
  primaryCrops: ['Tomato (தக்காளி)', 'Chilli (மிளகாய்)', 'Paddy (நெல்)'],
  isVerified: true,
  memberSince: '2023',
  experienceYears: 12,
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
};

export const mockCropsData: CropPrice[] = [
  {
    id: 'crop_tomato',
    cropName: 'Tomato',
    cropNameTamil: 'தக்காளி',
    category: 'vegetable',
    variety: 'Shivam / Hybrid',
    currentPrice: 28,
    unit: 'kg',
    changePercent: 6.2,
    trend: 'up',
    highestMarket: 'Chennai Koyambedu',
    lowestMarket: 'Dindigul Market',
    aiInsight: 'Tomato prices increased 6% this week due to lower supply arrivals from Hosur and Karnataka.',
    aiInsightTamil: 'ஒசூர் மற்றும் கர்நாடக வரத்து குறைவு காரணமாக இந்த வாரம் தக்காளி விலை 6% உயர்ந்துள்ளது.',
    markets: [
      {
        marketName: 'Madurai Paravai Market',
        marketNameTamil: 'மதுரை பரவை சந்தை',
        district: 'Madurai',
        price: 28,
        distanceKm: 14,
        transportCostPerKg: 0.8,
        demandLevel: 'High',
        demandLevelTamil: 'அதிக தேவை',
        estimatedNetReturn: 27.2,
      },
      {
        marketName: 'Chennai Koyambedu Market',
        marketNameTamil: 'சென்னை கோயம்பேடு சந்தை',
        district: 'Chennai',
        price: 33,
        distanceKm: 450,
        transportCostPerKg: 2.2,
        demandLevel: 'High',
        demandLevelTamil: 'மிக அதிக தேவை',
        estimatedNetReturn: 30.8,
      },
      {
        marketName: 'Coimbatore Gandhi Market',
        marketNameTamil: 'கோவை காந்தி சந்தை',
        district: 'Coimbatore',
        price: 30,
        distanceKm: 210,
        transportCostPerKg: 1.5,
        demandLevel: 'Moderate',
        demandLevelTamil: 'நடுத்தர தேவை',
        estimatedNetReturn: 28.5,
      },
      {
        marketName: 'Dindigul Ottanchathiram Market',
        marketNameTamil: 'ஒட்டன்சத்திரம் சந்தை',
        district: 'Dindigul',
        price: 26,
        distanceKm: 55,
        transportCostPerKg: 1.1,
        demandLevel: 'Moderate',
        demandLevelTamil: 'நடுத்தர தேவை',
        estimatedNetReturn: 24.9,
      }
    ],
    history7Days: [
      { date: 'Mon', price: 25 },
      { date: 'Tue', price: 26 },
      { date: 'Wed', price: 25.5 },
      { date: 'Thu', price: 27 },
      { date: 'Fri', price: 27.5 },
      { date: 'Sat', price: 28 },
      { date: 'Today', price: 28 },
    ],
    history30Days: [
      { date: 'Week 1', price: 22 },
      { date: 'Week 2', price: 24 },
      { date: 'Week 3', price: 26 },
      { date: 'Week 4', price: 28 },
    ]
  },
  {
    id: 'crop_paddy',
    cropName: 'Paddy (Rice)',
    cropNameTamil: 'நெல் (பொன்னி)',
    category: 'grain',
    variety: 'BPT 5204 (Deluxe Ponni)',
    currentPrice: 42,
    unit: 'kg',
    changePercent: 1.5,
    trend: 'up',
    highestMarket: 'Thanjavur Regulated Market',
    lowestMarket: 'Madurai Mandi',
    aiInsight: 'Rice procurement steady with state minimum support price assuring baseline value.',
    aiInsightTamil: 'அரசு நேரடி நெல் கொள்முதல் நிலையங்கள் மூலம் நிலையான விலை நிலவுகிறது.',
    markets: [
      {
        marketName: 'Thanjavur Direct Procurement',
        marketNameTamil: 'தஞ்சாவூர் நேரடி கொள்முதல் மையம்',
        district: 'Thanjavur',
        price: 43.5,
        distanceKm: 180,
        transportCostPerKg: 1.2,
        demandLevel: 'High',
        demandLevelTamil: 'அதிக தேவை',
        estimatedNetReturn: 42.3,
      },
      {
        marketName: 'Madurai Regulated Market',
        marketNameTamil: 'மதுரை ஒழுங்குமுறை விற்பனைக்கூடம்',
        district: 'Madurai',
        price: 42,
        distanceKm: 12,
        transportCostPerKg: 0.5,
        demandLevel: 'Moderate',
        demandLevelTamil: 'நடுத்தர தேவை',
        estimatedNetReturn: 41.5,
      },
      {
        marketName: 'Tiruchirappalli Mandi',
        marketNameTamil: 'திருச்சி மண்டி',
        district: 'Tiruchirappalli',
        price: 42.8,
        distanceKm: 130,
        transportCostPerKg: 1.0,
        demandLevel: 'Moderate',
        demandLevelTamil: 'நடுத்தர தேவை',
        estimatedNetReturn: 41.8,
      }
    ],
    history7Days: [
      { date: 'Mon', price: 41 },
      { date: 'Tue', price: 41.5 },
      { date: 'Wed', price: 41.5 },
      { date: 'Thu', price: 42 },
      { date: 'Fri', price: 42 },
      { date: 'Sat', price: 42 },
      { date: 'Today', price: 42 },
    ],
    history30Days: [
      { date: 'Week 1', price: 40 },
      { date: 'Week 2', price: 40.5 },
      { date: 'Week 3', price: 41.5 },
      { date: 'Week 4', price: 42 },
    ]
  },
  {
    id: 'crop_onion',
    cropName: 'Small Onion (Shallot)',
    cropNameTamil: 'சின்ன வெங்காயம்',
    category: 'vegetable',
    variety: 'CO(On) 5 / Bellary',
    currentPrice: 36,
    unit: 'kg',
    changePercent: -2.3,
    trend: 'down',
    highestMarket: 'Coimbatore Market',
    lowestMarket: 'Perambalur Wholesale',
    aiInsight: 'Fresh harvest arrivals from Perambalur and Dindigul leading to slight price cooling.',
    aiInsightTamil: 'பெரம்பலூர் மற்றும் திண்டுக்கல்லில் அறுவடை துவங்கியுள்ளதால் விலை சற்று குறைந்துள்ளது.',
    markets: [
      {
        marketName: 'Coimbatore Market',
        marketNameTamil: 'கோவை சந்தை',
        district: 'Coimbatore',
        price: 38,
        distanceKm: 210,
        transportCostPerKg: 1.6,
        demandLevel: 'High',
        demandLevelTamil: 'அதிக தேவை',
        estimatedNetReturn: 36.4,
      },
      {
        marketName: 'Madurai Market',
        marketNameTamil: 'மதுரை சந்தை',
        district: 'Madurai',
        price: 36,
        distanceKm: 15,
        transportCostPerKg: 0.6,
        demandLevel: 'Moderate',
        demandLevelTamil: 'நடுத்தர தேவை',
        estimatedNetReturn: 35.4,
      },
      {
        marketName: 'Dindigul Mandi',
        marketNameTamil: 'திண்டுக்கல் மண்டி',
        district: 'Dindigul',
        price: 33,
        distanceKm: 60,
        transportCostPerKg: 1.0,
        demandLevel: 'Low',
        demandLevelTamil: 'குறைந்த தேவை',
        estimatedNetReturn: 32.0,
      }
    ],
    history7Days: [
      { date: 'Mon', price: 39 },
      { date: 'Tue', price: 38.5 },
      { date: 'Wed', price: 37 },
      { date: 'Thu', price: 37 },
      { date: 'Fri', price: 36.5 },
      { date: 'Sat', price: 36 },
      { date: 'Today', price: 36 },
    ],
    history30Days: [
      { date: 'Week 1', price: 44 },
      { date: 'Week 2', price: 41 },
      { date: 'Week 3', price: 38 },
      { date: 'Week 4', price: 36 },
    ]
  },
  {
    id: 'crop_chilli',
    cropName: 'Green Chilli',
    cropNameTamil: 'பச்சை மிளகாய்',
    category: 'vegetable',
    variety: 'G-4 / Teja',
    currentPrice: 62,
    unit: 'kg',
    changePercent: 4.8,
    trend: 'up',
    highestMarket: 'Madurai Central Market',
    lowestMarket: 'Theni Wholesale',
    aiInsight: 'Festival demand increasing with limited pickings after recent showers.',
    aiInsightTamil: 'விழாக்கால தேவை அதிகரிப்பால் மிளகாய்க்கு நல்ல விலை வாய்ப்பு உள்ளது.',
    markets: [
      {
        marketName: 'Madurai Central Market',
        marketNameTamil: 'மதுரை மத்திய சந்தை',
        district: 'Madurai',
        price: 64,
        distanceKm: 18,
        transportCostPerKg: 0.9,
        demandLevel: 'High',
        demandLevelTamil: 'அதிக தேவை',
        estimatedNetReturn: 63.1,
      },
      {
        marketName: 'Chennai Koyambedu',
        marketNameTamil: 'சென்னை கோயம்பேடு',
        district: 'Chennai',
        price: 68,
        distanceKm: 450,
        transportCostPerKg: 2.5,
        demandLevel: 'High',
        demandLevelTamil: 'அதிக தேவை',
        estimatedNetReturn: 65.5,
      }
    ],
    history7Days: [
      { date: 'Mon', price: 58 },
      { date: 'Tue', price: 59 },
      { date: 'Wed', price: 60 },
      { date: 'Thu', price: 60.5 },
      { date: 'Fri', price: 61 },
      { date: 'Sat', price: 62 },
      { date: 'Today', price: 62 },
    ],
    history30Days: [
      { date: 'Week 1', price: 52 },
      { date: 'Week 2', price: 55 },
      { date: 'Week 3', price: 58 },
      { date: 'Week 4', price: 62 },
    ]
  },
  {
    id: 'crop_cotton',
    cropName: 'Cotton',
    cropNameTamil: 'பருத்தி',
    category: 'cash_crop',
    variety: 'BT Cotton / DCH 32',
    currentPrice: 72,
    unit: 'kg',
    changePercent: 0.5,
    trend: 'stable',
    highestMarket: 'Rajapalayam Cotton Market',
    lowestMarket: 'Aruppukottai Mandi',
    aiInsight: 'Spinning mill procurement active with stable export quality grades.',
    aiInsightTamil: 'பஞ்சு ஆலைகளின் நேரடி கொள்முதல் சீராக நடைபெறுகிறது.',
    markets: [
      {
        marketName: 'Rajapalayam Market',
        marketNameTamil: 'ராஜபாளையம் சந்தை',
        district: 'Virudhunagar',
        price: 74,
        distanceKm: 85,
        transportCostPerKg: 1.5,
        demandLevel: 'Moderate',
        demandLevelTamil: 'நடுத்தர தேவை',
        estimatedNetReturn: 72.5,
      },
      {
        marketName: 'Madurai Regulated Market',
        marketNameTamil: 'மதுரை ஒழுங்குமுறை கூடம்',
        district: 'Madurai',
        price: 72,
        distanceKm: 20,
        transportCostPerKg: 0.7,
        demandLevel: 'Moderate',
        demandLevelTamil: 'நடுத்தர தேவை',
        estimatedNetReturn: 71.3,
      }
    ],
    history7Days: [
      { date: 'Mon', price: 71 },
      { date: 'Tue', price: 71.5 },
      { date: 'Wed', price: 71.5 },
      { date: 'Thu', price: 72 },
      { date: 'Fri', price: 72 },
      { date: 'Sat', price: 72 },
      { date: 'Today', price: 72 },
    ],
    history30Days: [
      { date: 'Week 1', price: 70 },
      { date: 'Week 2', price: 70.5 },
      { date: 'Week 3', price: 71 },
      { date: 'Week 4', price: 72 },
    ]
  }
];

export const mockProduceListings: ProduceListing[] = [
  {
    id: 'listing_01',
    farmerId: 'farmer_01',
    farmerName: 'Ramesh Sundaram',
    farmerPhone: '+91 98421 76540',
    farmerLocation: 'Vadipatti, Madurai',
    cropName: 'Tomato',
    cropNameTamil: 'தக்காளி',
    variety: 'Shivam Hybrid',
    quantityKg: 1800,
    grade: 'Grade A (Export/Premium)',
    expectedPricePerKg: 30,
    availableDate: 'Ready in 2 Days (Friday)',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    description: 'Crisp, organically fed vine-ripened tomatoes. Plucked fresh with zero chemical sprays in last 3 weeks.',
    createdAt: '2 hours ago',
    isVerified: true
  },
  {
    id: 'listing_02',
    farmerId: 'farmer_02',
    farmerName: 'Murugan Thangaraj',
    farmerPhone: '+91 94432 18902',
    farmerLocation: 'Melur, Madurai',
    cropName: 'Green Chilli',
    cropNameTamil: 'பச்சை மிளகாய்',
    variety: 'G-4 Hot',
    quantityKg: 600,
    grade: 'Grade A (Export/Premium)',
    expectedPricePerKg: 63,
    availableDate: 'Ready Today',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80',
    description: 'Fresh shiny deep-green chillies. Hand-picked uniform length.',
    createdAt: '5 hours ago',
    isVerified: true
  },
  {
    id: 'listing_03',
    farmerId: 'farmer_03',
    farmerName: 'Kannan Palanichamy',
    farmerPhone: '+91 97890 43211',
    farmerLocation: 'Usilampatti, Madurai',
    cropName: 'Paddy (Rice)',
    cropNameTamil: 'நெல்',
    variety: 'BPT 5204 Ponni',
    quantityKg: 5000,
    grade: 'Grade A (Export/Premium)',
    expectedPricePerKg: 43,
    availableDate: 'Ready Next Monday',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=500&auto=format&fit=crop&q=80',
    description: 'Well-dried moisture tested under 12%. Single origin farm lot.',
    createdAt: '1 day ago',
    isVerified: true
  }
];

export const mockBuyerRequirements: BuyerRequirement[] = [
  {
    id: 'req_01',
    buyerName: 'Selvakumar (Procurement Head)',
    buyerCompany: 'Madurai Fresh Wholesale & Exports',
    buyerLocation: 'Paravai, Madurai',
    cropName: 'Tomato',
    cropNameTamil: 'தக்காளி',
    quantityRequiredKg: 2000,
    grade: 'Grade A',
    targetPricePerKg: 30,
    requiredByDate: 'Friday 6:00 AM',
    isVerified: true,
    notes: 'Direct farm gate pickup available if above 1,500 kg. Immediate bank settlement upon weighing.',
    matchingListingsCount: 3
  },
  {
    id: 'req_02',
    buyerName: 'Karthik Raja',
    buyerCompany: 'Kovai Fresh Retail Chains',
    buyerLocation: 'Gandhipuram, Coimbatore',
    cropName: 'Small Onion',
    cropNameTamil: 'சின்ன வெங்காயம்',
    quantityRequiredKg: 3500,
    grade: 'Medium to Big Bulbs',
    targetPricePerKg: 37,
    requiredByDate: 'Saturday',
    isVerified: true,
    notes: 'Looking for continuous supply. Payment within 24 hours guaranteed.',
    matchingListingsCount: 2
  },
  {
    id: 'req_03',
    buyerName: 'Anandhi Mills & Foods',
    buyerCompany: 'Trichy Agro Processors',
    buyerLocation: 'Thuvakudi, Trichy',
    cropName: 'Paddy (Rice)',
    cropNameTamil: 'நெல்',
    quantityRequiredKg: 10000,
    grade: 'Moisture < 12%',
    targetPricePerKg: 43.5,
    requiredByDate: 'Within 5 Days',
    isVerified: true,
    notes: 'Weighbridge on site, transparent testing, spot digital payment.',
    matchingListingsCount: 4
  }
];

export const mockSeedProducts: SeedProduct[] = [
  {
    id: 'seed_01',
    crop: 'Tomato',
    variety: 'Shivam Super F1 Hybrid',
    brand: 'Syngenta Seeds',
    sellerName: 'Annai Agro Seeds (Govt Certified)',
    sellerLocation: 'Madurai North',
    price: 480,
    weightKg: 0.05, // 50 grams
    germinationRate: '95%+',
    maturityDays: '65-70 days',
    stockStatus: 'In Stock',
    isVerified: true,
    rating: 4.8,
    reviewsCount: 142,
    category: 'Vegetable',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'seed_02',
    crop: 'Paddy',
    variety: 'CR 1009 Sub-1 (Water Logging Resistant)',
    brand: 'TNAU Certified Seed Center',
    sellerName: 'Madurai Agri Producers FPO',
    sellerLocation: 'Melur, Madurai',
    price: 950,
    weightKg: 30, // 30 kg bag
    germinationRate: '92%+',
    maturityDays: '150-155 days',
    stockStatus: 'In Stock',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 310,
    category: 'Grain',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'seed_03',
    crop: 'Chilli',
    variety: 'Armour Hot F1',
    brand: 'Seminis Agri',
    sellerName: 'Vivasayam Kendra',
    sellerLocation: 'Dindigul',
    price: 620,
    weightKg: 0.1,
    germinationRate: '90%',
    maturityDays: '75-80 days',
    stockStatus: 'Limited Stock',
    isVerified: true,
    rating: 4.7,
    reviewsCount: 88,
    category: 'Vegetable',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'seed_04',
    crop: 'Onion',
    variety: 'Coimbatore 5 High Pungency',
    brand: 'Tamil Nadu Agri Seed Agency',
    sellerName: 'Uzhavar Seed Hub',
    sellerLocation: 'Vadipatti',
    price: 340,
    weightKg: 0.5,
    germinationRate: '88%',
    maturityDays: '90 days',
    stockStatus: 'In Stock',
    isVerified: true,
    rating: 4.6,
    reviewsCount: 94,
    category: 'Vegetable',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop&q=80'
  }
];

export const mockFertilizers: FertilizerProduct[] = [
  {
    id: 'fert_01',
    name: 'Jeevamrutham Organic Bio-Enricher',
    brand: 'Uzhavar Organics',
    type: 'Organic',
    price: 260,
    quantity: '5 Litres',
    sellerName: 'Namma Gramam Organic FPO',
    availability: 'Available',
    usageInfo: 'Mix 1 litre with 100 litres water for soil drenching. Boosts root microbes and plant vigor.',
    usageInfoTamil: '1 லிட்டருக்கு 100 லிட்டர் தண்ணீர் கலந்து பாசன நீரில் விடவும். மண் நுண்ணுயிர்களை பெருக்கும்.',
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'fert_02',
    name: 'Neem Cake (வேப்பம் புண்ணாக்கு) Natural Repellent',
    brand: 'Kaveri Agri Organics',
    type: 'Bio-Fertilizer',
    price: 550,
    quantity: '25 kg Bag',
    sellerName: 'Madurai Agro Inputs Center',
    availability: 'In Stock',
    usageInfo: 'Apply 100 kg per acre before sowing. Prevents root nematodes and white grub attack.',
    usageInfoTamil: 'ஏக்கருக்கு 100 கிலோ விதைப்புக்கு முன் இடவும். வேர்ப்புழுக்களை தடுக்கும்.',
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1599818968018-378e82a7410d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'fert_03',
    name: '19:19:19 Water Soluble Drip Grade NPK',
    brand: 'IFFCO Certified',
    type: 'NPK',
    price: 850,
    quantity: '10 kg Pack',
    sellerName: 'Primary Agri Cooperative Bank',
    availability: 'In Stock',
    usageInfo: 'Apply 3-4 kg per acre through fertigation once every 10 days during vegetative growth.',
    usageInfoTamil: 'சொட்டு நீர் மூலம் 10 நாட்களுக்கு ஒருமுறை ஏக்கருக்கு 3-4 கிலோ வழங்கவும்.',
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&auto=format&fit=crop&q=80'
  }
];

export const mockMachinery: MachineryItem[] = [
  {
    id: 'mach_01',
    name: 'Mahindra 475 DI Tractor with Rotavator',
    nameTamil: 'மஹிந்திரா 475 டிராக்டர் + ரோட்டவேட்டர்',
    category: 'Tractor & Tillage',
    ownerName: 'Vetrivel Farmer Services',
    location: 'Alanganallur, Madurai (6 km away)',
    rentalPricePerHour: 850,
    availability: 'Available Today',
    horsepower: '42 HP',
    contactNumber: '+91 98430 11223',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'mach_02',
    name: 'Kubota Paddy Combine Harvester',
    nameTamil: 'குபோடா நெல் அறுவடை இயந்திரம்',
    category: 'Harvester',
    ownerName: 'Muthu Agri Machinery Hub',
    location: 'Sholavandan, Madurai (12 km away)',
    rentalPricePerHour: 2200,
    availability: 'Available from Tomorrow',
    horsepower: '68 HP Rubber Track',
    contactNumber: '+91 97881 99001',
    image: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'mach_03',
    name: 'STIHL Battery & Petrol Power Sprayer 20L',
    nameTamil: 'பவர் ஸ்ப்ரேயர் (தெளிப்பான்)',
    category: 'Sprayer',
    ownerName: 'Vadipatti Custom Hiring Center',
    location: 'Vadipatti Bus Stand (2 km away)',
    rentalPricePerHour: 120,
    availability: 'Available Today',
    horsepower: '2 Stroke Engine',
    contactNumber: '+91 94441 55667',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=500&auto=format&fit=crop&q=80'
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post_01',
    authorName: 'Murugan Karuppiah',
    authorLocation: 'Melur, Madurai',
    authorBadge: 'Experienced Farmer',
    authorBadgeTamil: 'அனுபவ உழவர்',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    timestamp: '3 hours ago',
    cropTag: 'Tomato / தக்காளி',
    content: 'Leaves are turning yellow with curling on the edges in my 40-day tomato field. What organic solution works best?',
    contentTamil: 'என் 40 நாள் தக்காளி பயிரில் இலைகள் மஞ்சள் நிறமாகி நுனி சுருளுகிறது. இதற்கு சிறந்த இயற்கை தீர்வு என்ன?',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    hasAudioVoice: true,
    audioDurationSeconds: 18,
    likes: 24,
    replies: [
      {
        id: 'rep_01',
        authorName: 'Dr. Selvi Soundararajan',
        authorBadge: 'Agri Expert',
        content: 'Spray 5% Neem seed kernel extract (NSKE) mixed with sour buttermilk early morning. This suppresses whiteflies transmitting leaf curl virus.',
        timestamp: '2 hours ago',
        likes: 19
      },
      {
        id: 'rep_02',
        authorName: 'Palanivel K',
        authorBadge: 'Experienced Farmer',
        content: 'Yellow sticky traps (10 traps per acre) also work wonders to catch sucking pests.',
        timestamp: '1 hour ago',
        isAudio: true,
        audioDuration: 14,
        likes: 8
      }
    ]
  },
  {
    id: 'post_02',
    authorName: 'Kavitha R',
    authorLocation: 'Usilampatti',
    authorBadge: 'Progressive Farmer',
    authorBadgeTamil: 'முன்னோடி உழவர்',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    timestamp: '6 hours ago',
    cropTag: 'Paddy / நெல்',
    content: 'Successfully tried Alternate Wetting & Drying (AWD) method this season. Saved 30% borewell electricity and water!',
    contentTamil: 'இந்த பருவத்தில் மாற்று நனைத்தல் மற்றும் உலர்த்தல் (AWD) முறையில் 30% மின்சாரம் மற்றும் பாசன நீர் மிச்சமானது!',
    hasAudioVoice: false,
    likes: 42,
    replies: [
      {
        id: 'rep_03',
        authorName: 'Ramesh Sundaram',
        content: 'Vera level effort! Did you use a perforated PVC field tube for measuring water level?',
        timestamp: '4 hours ago',
        likes: 5
      }
    ]
  }
];

export const mockCourses: LearningCourse[] = [
  {
    id: 'course_tomato',
    title: 'Tomato Farming – Beginner to Profit',
    titleTamil: 'தக்காளி சாகுபடி – ஆரம்பநிலை வழிகாட்டி',
    category: 'Crop Basics',
    categoryTamil: 'பயிர் அடிப்படைகள்',
    level: 'Beginner',
    progressPercent: 40,
    durationMinutes: 45,
    lessonsCount: 6,
    description: 'Complete guide from nursery tray preparation, transplanting, staking, nutrient scheduling to pest control and market timing.',
    descriptionTamil: 'நாற்று தயாரிப்பு முதல் கவாத்து, சொட்டுநீர் உரம், நோய் கட்டுப்பாடு மற்றும் சந்தைப்படுத்துதல் வரை முழுமையான பயிற்சி.',
    thumbnail: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    steps: [
      {
        id: 1,
        title: 'Nursery & Soil Preparation',
        titleTamil: 'நாற்றங்கால் & நிலம் தயாரிப்பு',
        duration: '7 mins',
        content: 'Use pro-trays with coco-peat and vermicompost (3:1). Sow 1 seed per hole. Water gently with fine rose can.',
        contentTamil: 'குழித்தட்டுக்களில் தேங்காய் நார் கழிவு மற்றும் மண்புழு உரம் இட்டு ஒரு குழிக்கு ஒரு விதை வீதம் ஊன்றவும்.'
      },
      {
        id: 2,
        title: 'Transplanting & Spacing',
        titleTamil: 'நடவு & இடைவெளி',
        duration: '8 mins',
        content: 'Transplant 25-day seedlings at 90cm row-to-row and 60cm plant-to-plant distance in raised beds with silver mulch.',
        contentTamil: '25 நாள் நாற்றுகளை 90 செ.மீ வரிசைக்கு வரிசை, 60 செ.மீ செடிக்கு செடி இடைவெளியில் நடவு செய்யவும்.'
      },
      {
        id: 3,
        title: 'Drip Irrigation & Fertigation Schedule',
        titleTamil: 'சொட்டுநீர் உர மேலாண்மை',
        duration: '10 mins',
        content: 'Daily 1.5 - 2 litres water per plant. Apply 19-19-19 up to 40 days, then 13-0-45 during flowering and fruit setting.',
        contentTamil: 'செடிக்கு தினமும் 1.5 - 2 லிட்டர் நீர். 40 நாள் வரை 19-19-19, பூக்கும் பருவத்தில் 13-0-45 உரம் வழங்கவும்.'
      }
    ],
    quiz: [
      {
        question: 'What is the optimal age of tomato seedlings for transplanting?',
        questionTamil: 'தக்காளி நாற்றுகளை நடவு செய்ய உகந்த வயது என்ன?',
        options: ['10-12 Days', '21-25 Days', '45-50 Days', '60 Days'],
        optionsTamil: ['10-12 நாட்கள்', '21-25 நாட்கள்', '45-50 நாட்கள்', '60 நாட்கள்'],
        correctIndex: 1
      },
      {
        question: 'Which pest is the primary vector for tomato leaf curl virus?',
        questionTamil: 'தக்காளி இலை சுருள் நச்சுயிரியை பரப்பும் முக்கிய பூச்சி எது?',
        options: ['Whitefly (வெள்ளை ஈ)', 'Fruit Borer', 'Termites', 'Grasshopper'],
        optionsTamil: ['வெள்ளை ஈ', 'காய்ப்புழு', 'கரையான்', 'வெட்டுக்கிளி'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'course_water',
    title: 'Smart Water Management & Drip Irrigation',
    titleTamil: 'நுண்ணீர் பாசனம் & நீர் சேமிப்பு நுட்பங்கள்',
    category: 'Water Management',
    categoryTamil: 'நீர் மேலாண்மை',
    level: 'Beginner',
    progressPercent: 100,
    durationMinutes: 30,
    lessonsCount: 4,
    description: 'Learn how to maximize water use efficiency by 60% using mulching, venturi fertilizer injectors, and moisture sensors.',
    descriptionTamil: 'சொட்டுநீர், நிலப்போர்வை (Mulching) மூலம் 60% பாசன நீரை மிச்சப்படுத்தும் நடைமுறை பயிற்சிகள்.',
    thumbnail: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&auto=format&fit=crop&q=80',
    steps: [
      {
        id: 1,
        title: 'Subsidies for Drip Systems',
        titleTamil: 'சொட்டுநீர் பாசன மானியம்',
        duration: '6 mins',
        content: 'Tamil Nadu govt provides 100% subsidy for small/marginal farmers and 75% for other farmers through PMKSY.',
        contentTamil: 'சிறு, குறு விவசாயிகளுக்கு 100% மானியமும், மற்ற விவசாயிகளுக்கு 75% மானியமும் வழங்கப்படுகிறது.'
      }
    ],
    quiz: [
      {
        question: 'What percentage subsidy is offered to small & marginal farmers for drip irrigation in Tamil Nadu?',
        questionTamil: 'தமிழகத்தில் சிறு, குறு விவசாயிகளுக்கு சொட்டுநீர் பாசனத்திற்கு எத்தனை சதவீதம் மானியம்?',
        options: ['50%', '75%', '100%', '30%'],
        optionsTamil: ['50%', '75%', '100%', '30%'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'course_market',
    title: 'Selling Produce & Market Intelligence',
    titleTamil: 'விளைபொருட்கள் விற்பனை & சந்தை விலை யுக்திகள்',
    category: 'Selling & Market',
    categoryTamil: 'விற்பனை & சந்தை',
    level: 'Beginner',
    progressPercent: 0,
    durationMinutes: 35,
    lessonsCount: 5,
    description: 'Avoid middlemen, understand grading (Grade A vs B), transport economics, and direct selling to wholesale buyers.',
    descriptionTamil: 'தரகர்கள் இன்றி நேரடி விற்பனை, தரம் பிரித்தல் மற்றும் போக்குவரத்து செலவுகளை கணக்கிடும் எளிய யுக்திகள்.',
    thumbnail: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&auto=format&fit=crop&q=80',
    steps: [
      {
        id: 1,
        title: 'Grading and Sorting',
        titleTamil: 'தரம் பிரித்தல்',
        duration: '7 mins',
        content: 'Grading uniform size and color fetches up to ₹4-6 extra per kg in Koyambedu and export markets.',
        contentTamil: 'ஒரே அளவிலான தக்காளி அல்லது மிளகாயை தரம் பிரித்தால் கிலோவுக்கு ₹4-6 கூடுதல் விலை கிடைக்கும்.'
      }
    ],
    quiz: [
      {
        question: 'What factor most directly affects your net farm gate profit?',
        questionTamil: 'நிகர லாபத்தை நேரடியாக நிர்ணயிக்கும் முக்கிய காரணி எது?',
        options: ['Market Price minus Transport & Commission', 'Crop color alone', 'Day of the week only', 'Distance to bus stand'],
        optionsTamil: ['சந்தை விலை கழித்தல் போக்குவரத்து & கமிஷன்', 'நிறம் மட்டுமே', 'கிழமை மட்டுமே', 'பேருந்து நிறுத்த தூரம்'],
        correctIndex: 0
      }
    ]
  }
];

export const mockGovernmentServices: GovernmentService[] = [
  {
    id: 'gov_01',
    title: 'Tamil Nadu Farmer Registry (GRAINS / உழவன் செயலி பதிவு)',
    titleTamil: 'தமிழ்நாடு உழவர் பதிவு & அடையாள அட்டை',
    category: 'schemes',
    description: 'Digital unified portal linking land ownership, Aadhaar, and Aadhaar-seeded bank accounts for direct benefit transfers.',
    descriptionTamil: 'அரசு நலத்திட்டங்கள், இடுபொருள் மானியங்கள் நேரடியாக வங்கிக் கணக்கில் வரவு வைக்க உழவர் அடையாள எண்.',
    targetBeneficiaries: 'All Tamil Nadu Landowners and Tenant Cultivators',
    targetBeneficiariesTamil: 'அனைத்து நில உரிமையாளர்கள் & குத்தகை உழவர்கள்',
    eligibility: 'Patta/Chitta copy, Aadhaar card, Bank passbook',
    eligibilityTamil: 'பட்டா/சிட்டா நகல், ஆதார் அட்டை, வங்கி கணக்கு புத்தகம்',
    actionText: 'Register / Check Status',
    actionTextTamil: 'பதிவு / நிலை அறிய',
    iconName: 'Building2',
    badge: 'Essential',
    extraInfo: '9.4 Lakh farmers registered in 2024-25'
  },
  {
    id: 'gov_02',
    title: 'Kalaignarin All Village Integrated Agriculture Development',
    titleTamil: 'கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சித் திட்டம்',
    category: 'schemes',
    description: 'Comprehensive village development: fallow land reclamation, free mini-kits, farm ponds, and community borewells.',
    descriptionTamil: 'தரிசு நிலங்களை விளைநிலமாக மாற்றுதல், இலவச விதை மினிகிட், பண்ணைக் குட்டைகள் மற்றும் பாசன வசதிகள்.',
    targetBeneficiaries: 'Village Panchayat farmers identified for current year cycle',
    targetBeneficiariesTamil: 'தேர்ந்தெடுக்கப்பட்ட ஊராட்சி கிராம உழவர்கள்',
    eligibility: 'Resident of the designated Gram Panchayat',
    eligibilityTamil: 'திட்ட ஊராட்சியில் வசிக்கும் விவசாயிகள்',
    actionText: 'Apply in Village Camp',
    actionTextTamil: 'முகாமில் விண்ணப்பிக்க',
    iconName: 'Wheat',
    badge: 'Popular'
  },
  {
    id: 'gov_03',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY Crop Insurance)',
    titleTamil: 'பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)',
    category: 'insurance',
    description: 'Financial compensation for crop loss due to non-preventable natural risks (drought, unseasonal rain, pest outbreaks).',
    descriptionTamil: 'வறட்சி, புயல், வெள்ளம் அல்லது பூச்சித் தாக்குதலால் ஏற்படும் பயிர் சேதத்திற்கு இழப்பீடு.',
    targetBeneficiaries: 'Cultivators of notified crops in notified insurance units',
    targetBeneficiariesTamil: 'அறிவிக்கப்பட்ட பயிர்களை சாகுபடி செய்யும் உழவர்கள்',
    eligibility: 'Adangal from VAO, Sowing certificate before cut-off date',
    eligibilityTamil: 'வி ஏ ஓ அடங்கல் சான்றிதழ், விதைப்பு சான்று',
    actionText: 'Calculate Premium & Apply',
    actionTextTamil: 'காப்பீடு பதிவு செய்க',
    iconName: 'ShieldCheck',
    badge: 'Active Window'
  },
  {
    id: 'gov_04',
    title: 'Micro Irrigation Subsidy Scheme (Drip & Sprinkler)',
    titleTamil: 'சொட்டுநீர் & தெளிப்புநீர் பாசன மானியம்',
    category: 'subsidies',
    description: '100% subsidy for Small & Marginal farmers (up to 5 acres) and 75% subsidy for other category farmers.',
    descriptionTamil: 'சிறு குறு விவசாயிகளுக்கு 100% மானியத்திலும், பிறருக்கு 75% மானியத்திலும் சொட்டுநீர் அமைப்பு.',
    targetBeneficiaries: 'Farmers having assured water source (Well/Borewell)',
    targetBeneficiariesTamil: 'கிணறு/ஆழ்துளை கிணறு பாசன வசதி கொண்ட விவசாயிகள்',
    eligibility: 'Patta, Chitta, FMB sketch, Water test report',
    eligibilityTamil: 'பட்டா, சிட்டா, வரைபடம், நீர் மாதிரி சோதனை அறிக்கை',
    actionText: 'Check Subsidy Eligibility',
    actionTextTamil: 'மானியம் பெற தகுதி சரிபார்க்க',
    iconName: 'Droplets',
    badge: '100% Subsidy'
  },
  {
    id: 'gov_05',
    title: 'Agricultural Engineering Machinery Subsidy (SMAM)',
    titleTamil: 'வேளாண் இயந்திரங்கள் வாங்குவதற்கான மானியம்',
    category: 'subsidies',
    description: '40% to 50% capital subsidy on tractors, power tillers, rotavators, weeders, and laser land levelers.',
    descriptionTamil: 'டிராக்டர், பவர் டில்லர், ரோட்டவேட்டர் வாங்குவதற்கு 40% முதல் 50% வரை அரசு மானியம்.',
    targetBeneficiaries: 'Individual farmers, FPOs, Custom Hiring Centers',
    targetBeneficiariesTamil: 'தனிநபர் உழவர்கள், உழவர் உற்பத்தியாளர் நிறுவனங்கள்',
    eligibility: 'First-time applicants prioritized on seniority queue',
    eligibilityTamil: 'முதுநிலை அடிப்படையில் முன்னுரிமை',
    actionText: 'View Approved Dealers',
    actionTextTamil: 'அங்கீகரிக்கப்பட்ட விற்பனையாளர்கள்',
    iconName: 'Tractor'
  },
  {
    id: 'gov_06',
    title: 'Tamil Mannvalam (Soil Health Card Portal)',
    titleTamil: 'தமிழ் மண்வளம் – மண் பரிசோதனை அட்டை',
    category: 'schemes',
    description: 'Location-specific nutrient analysis (N, P, K, pH, EC, Zinc, Boron) and customized fertilizer recommendations.',
    descriptionTamil: 'உங்கள் நிலத்தின் மண் கார-அமில நிலை மற்றும் சத்துக்களுக்கு ஏற்ப பரிந்துரை.',
    targetBeneficiaries: 'All farmers desiring fertilizer cost optimization',
    targetBeneficiariesTamil: 'அனைத்து விவசாய பெருமக்கள்',
    eligibility: 'Survey number and geo-tagged soil sample',
    eligibilityTamil: 'நிலத்தின் சர்வே எண்',
    actionText: 'View Soil Card / Book Sample',
    actionTextTamil: 'மண் அட்டை பார்க்க / பரிசோதனை',
    iconName: 'FlaskConical'
  },
  {
    id: 'gov_07',
    title: 'Live Reservoir Water Levels & Canal Release',
    titleTamil: 'தமிழக அணைகளின் நீர்மட்டம் & பாசன நீர் திறப்பு',
    category: 'water_reservoir',
    description: 'Real-time inflow, storage capacity, and water release data for Mettur, Vaigai, Bhavanisagar, and Periyar dams.',
    descriptionTamil: 'மேட்டூர், வைகை, பவானிசாகர் உள்ளிட்ட முக்கிய அணைகளின் நீர் இருப்பு மற்றும் திறப்பு நிலவரம்.',
    targetBeneficiaries: 'Canal and river basin irrigation farmers',
    targetBeneficiariesTamil: 'பாசன ஆற்றுப்படுகை விவசாயிகள்',
    eligibility: 'Public agricultural information',
    eligibilityTamil: 'அனைவருக்கும் வெளிப்படையான தகவல்',
    actionText: 'View Dam Storage Charts',
    actionTextTamil: 'அணை நீர்மட்டம் பார்க்க',
    iconName: 'Waves',
    extraInfo: 'Mettur: 98.4 ft | Vaigai: 56.8 ft'
  },
  {
    id: 'gov_08',
    title: 'Local Agricultural Officer (ADA / AO) Contact Directory',
    titleTamil: 'வட்டார வேளாண்மை உதவி இயக்குநர் & அலுவலர் தொடர்பு',
    category: 'officers',
    description: 'Direct phone numbers and office addresses of your block Agricultural Officer, Horticulture Officer, and ATMA facilitators.',
    descriptionTamil: 'உங்கள் பகுதி வேளாண் அலுவலர், தோட்டக்கலை அலுவலர் மற்றும் அட்மா ஒருங்கிணைப்பாளர் நேரடி எண்கள்.',
    targetBeneficiaries: 'All farmers needing on-field advice or inspection',
    targetBeneficiariesTamil: 'கள ஆலோசனை தேவைப்படும் விவசாயிகள்',
    eligibility: 'Open to your block jurisdiction',
    eligibilityTamil: 'உங்கள் வட்டார வரம்பு',
    actionText: 'Find Officer in Madurai',
    actionTextTamil: 'உங்கள் பகுதி அலுவலரை அழைக்க',
    iconName: 'PhoneCall',
    badge: 'Direct Help'
  },
  {
    id: 'gov_09',
    title: 'ATMA Farmer Training & Exposure Visits',
    titleTamil: 'அட்மா உழவர் பயிற்சி & பண்ணை சுற்றுலா',
    category: 'training',
    description: 'Free weekly technical field demonstrations, progressive farmer exposure tours, and stipend-supported workshops.',
    descriptionTamil: 'இலவச பண்ணை பயிற்சி, நவீன தொழில்நுட்ப செயல்விளக்கம் மற்றும் வேளாண் கண்காட்சி சுற்றுலா.',
    targetBeneficiaries: 'Registered farm interest groups (FIG) and women farmers',
    targetBeneficiariesTamil: 'விவசாய குழுக்கள் மற்றும் மகளிர் உழவர்கள்',
    eligibility: 'Resident farmer of registered block',
    eligibilityTamil: 'வட்டாரத்தில் வசிக்கும் உழவர்',
    actionText: 'Upcoming Training Schedule',
    actionTextTamil: 'பயிற்சி அட்டவணை பார்க்க',
    iconName: 'GraduationCap'
  },
  {
    id: 'gov_10',
    title: 'Department of Sericulture (பட்டு வளர்ச்சித் துறை)',
    titleTamil: 'பட்டுப்புழு வளர்ப்பு & மல்பெரி நடவு மானியம்',
    category: 'schemes',
    description: 'Subsidies for mulberry plantation, rearing shed construction, and silkworm egg distribution.',
    descriptionTamil: 'மல்பெரி செடி நடவு, புழு வளர்ப்பு மனை அமைத்தல் மற்றும் அரசு கொக்கூன் விற்பனை சந்தை.',
    targetBeneficiaries: 'Diversified livestock & sericulture farmers',
    targetBeneficiariesTamil: 'துணைத் தொழில் செய்யும் விவசாயிகள்',
    eligibility: 'Minimum 0.5 acre irrigation land for mulberry',
    eligibilityTamil: 'குறைந்தது 50 சென்ட் பாசன நிலம்',
    actionText: 'Apply for Rearing Shed Subsidy',
    actionTextTamil: 'விண்ணப்பிக்க',
    iconName: 'Sprout'
  }
];

export const mockWeatherData: WeatherData = {
  city: 'Madurai (Vadipatti Area)',
  district: 'Madurai',
  temperature: 28,
  condition: 'Partly Cloudy with Scattered Showers',
  conditionTamil: 'பகுதி மேகமூட்டம் & லேசான மழை வாய்ப்பு',
  rainProbabilityPercent: 45,
  humidityPercent: 68,
  windSpeedKmh: 12,
  soilMoistureStatus: 'Adequate (62%)',
  soilMoistureStatusTamil: 'போதுமான ஈரப்பதம் (62%)',
  alerts: [
    {
      type: 'rain',
      title: 'Rain Expected in Evening',
      titleTamil: 'மாலையில் லேசான மழை வாய்ப்பு',
      message: 'Postpone chemical foliar spraying of insecticides for tomato and chilli until tomorrow morning to avoid pesticide wash-off.',
      messageTamil: 'மருந்து தெளிப்பதை தவிர்க்கவும்; மழை பெய்தால் மருந்து வீணாகும்.',
      severity: 'warning'
    },
    {
      type: 'pest',
      title: 'High Humidity Pest Advisory',
      titleTamil: 'பூச்சித் தாக்குதல் எச்சரிக்கை',
      message: 'Persistent humidity above 65% favors fungal damping-off in nurseries. Ensure soil drainage channels are cleared.',
      messageTamil: 'நாற்றங்காலில் வேரழுகல் நோய் ஏற்பட வாய்ப்புள்ளது. வடிகால் அமைப்பை சரிபார்க்கவும்.',
      severity: 'info'
    }
  ],
  forecast: [
    { day: 'Today', dayTamil: 'இன்று', tempMax: 31, tempMin: 23, condition: 'Scattered Rain', rainProb: 45 },
    { day: 'Thu', dayTamil: 'வியாழன்', tempMax: 32, tempMin: 24, condition: 'Partly Cloudy', rainProb: 20 },
    { day: 'Fri', dayTamil: 'வெள்ளி', tempMax: 33, tempMin: 24, condition: 'Sunny', rainProb: 10 },
    { day: 'Sat', dayTamil: 'சனி', tempMax: 34, tempMin: 25, condition: 'Sunny & Dry', rainProb: 5 },
    { day: 'Sun', dayTamil: 'ஞாயிறு', tempMax: 33, tempMin: 24, condition: 'Cloudy', rainProb: 30 },
    { day: 'Mon', dayTamil: 'திங்கள்', tempMax: 31, tempMin: 23, condition: 'Showers', rainProb: 60 },
    { day: 'Tue', dayTamil: 'செவ்வாய்', tempMax: 30, tempMin: 22, condition: 'Heavy Rain', rainProb: 75 }
  ]
};

export const mockTransportOptions: TransportOption[] = [
  {
    id: 'trans_01',
    driverName: 'Karthik Logi (Tata Ace Gold)',
    vehicleType: 'Pickup (Tata Ace)',
    capacityKg: 1000,
    availableCapacityKg: 400,
    currentRoute: 'Vadipatti -> Madurai Paravai Market',
    fromLocation: 'Vadipatti',
    toLocation: 'Madurai',
    departureDate: 'Tonight 11:30 PM',
    ratePerKg: 0.8,
    isSharedPool: true,
    sharedFarmersCount: 2,
    contactNumber: '+91 94455 12345'
  },
  {
    id: 'trans_02',
    driverName: 'Senthil Express (Eicher 14ft)',
    vehicleType: 'Heavy Truck (Eicher)',
    capacityKg: 4500,
    availableCapacityKg: 2000,
    currentRoute: 'Madurai -> Chennai Koyambedu Direct',
    fromLocation: 'Madurai',
    toLocation: 'Chennai Koyambedu',
    departureDate: 'Tomorrow 4:00 PM',
    ratePerKg: 2.2,
    isSharedPool: true,
    sharedFarmersCount: 3,
    contactNumber: '+91 98420 88990'
  },
  {
    id: 'trans_03',
    driverName: 'Velu Transport (Bolero Maxi Truck)',
    vehicleType: 'Mini Truck (Mahindra Bolero)',
    capacityKg: 1800,
    availableCapacityKg: 1800,
    currentRoute: 'Madurai -> Coimbatore Gandhi Market',
    fromLocation: 'Madurai',
    toLocation: 'Coimbatore',
    departureDate: 'Friday Morning 5:00 AM',
    ratePerKg: 1.5,
    isSharedPool: false,
    contactNumber: '+91 97890 12121'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif_01',
    type: 'market',
    title: 'Tomato Prices Jumped +6%',
    titleTamil: 'தக்காளி விலை +6% உயர்வு',
    message: 'Chennai Koyambedu market is paying ₹33/kg. Net return estimated at ₹30.8/kg after transport.',
    messageTamil: 'சென்னை கோயம்பேட்டில் ₹33/கிலோ விலை நிலவுகிறது. போக்குவரத்து கழித்து ₹30.8 கிடைக்கும்.',
    timestamp: '15 mins ago',
    isRead: false,
    actionTarget: 'market'
  },
  {
    id: 'notif_02',
    type: 'buyer',
    title: 'New Buyer Requirement: 2,000 kg Tomato',
    titleTamil: 'புதிய கொள்முதல் தேவை: 2,000 கிலோ தக்காளி',
    message: 'Madurai Fresh Wholesale posted a requirement for Grade A Shivam tomatoes at ₹30/kg.',
    messageTamil: 'மதுரை பிரெஷ் நிறுவனம் ₹30 விலையில் கொள்முதல் செய்ய விருப்பம் தெரிவித்துள்ளது.',
    timestamp: '1 hour ago',
    isRead: false,
    actionTarget: 'marketplace'
  },
  {
    id: 'notif_03',
    type: 'weather',
    title: 'Evening Showers Expected in Madurai',
    titleTamil: 'மாலையில் மழை வாய்ப்பு',
    message: '45% probability of scattered showers between 4 PM - 7 PM. Postpone pesticide sprays.',
    messageTamil: 'மாலை 4 - 7 மணிக்குள் மழை வாய்ப்புள்ளது. பூச்சிக்கொல்லி தெளிப்பதை தள்ளிப்போடவும்.',
    timestamp: '3 hours ago',
    isRead: true,
    actionTarget: 'weather'
  },
  {
    id: 'notif_04',
    type: 'government',
    title: 'Crop Insurance (PMFBY) Last Date Approaching',
    titleTamil: 'பயிர் காப்பீட்டு கடைசி தேதி',
    message: 'Register your Rabi crop insurance before month end to protect against unseasonal rains.',
    messageTamil: 'பயிர் காப்பீடு செய்ய இன்னும் 10 நாட்களே உள்ளன. உடனே பதிவு செய்யவும்.',
    timestamp: '1 day ago',
    isRead: true,
    actionTarget: 'government'
  }
];

export const sampleVoiceQueries = [
  {
    phrase: 'இன்னைக்கு தக்காளி விலை என்ன?',
    phraseEn: "What is today's tomato price?",
    responseTa: 'இன்று உங்கள் பகுதியில் தக்காளியின் சராசரி விலை ₹28/kg. சென்னை கோயம்பேட்டில் அதிகபட்சமாக ₹33/kg வரை விற்கப்படுகிறது.',
    responseEn: "Today the average price for tomato in your area is ₹28/kg. In Chennai Koyambedu, it is fetching up to ₹33/kg.",
    suggestedActions: [
      { labelTa: 'சந்தைகளை ஒப்பிடுக', labelEn: 'Compare Markets', targetTab: 'market' },
      { labelTa: 'விலை போக்கு பார்க்க', labelEn: 'View Price Trend', targetTab: 'market' },
      { labelTa: 'வியாபாரிகளை காண்க', labelEn: 'Find Buyers', targetTab: 'marketplace' }
    ]
  },
  {
    phrase: 'எங்கே விற்றா நல்ல விலை கிடைக்கும்?',
    phraseEn: 'Where can I sell for the best price?',
    responseTa: 'போக்குவரத்து செலவு ₹2.2/kg கழித்த பிறகும், சென்னை சந்தையில் விற்றால் உங்களுக்கு நிகரமாக ₹30.8/kg கிடைக்கும். இது மதுரை சந்தையை விட ₹3.6 கூடுதல் லாபம் தரும்.',
    responseEn: 'Even after ₹2.2/kg transport cost, selling at Chennai gives you an estimated net return of ₹30.8/kg, which is ₹3.6 higher than Madurai local mandi.',
    suggestedActions: [
      { labelTa: 'லாப கால்குலேட்டர்', labelEn: 'Profit Calculator', targetTab: 'profit_calc' },
      { labelTa: 'பகிர்வு லாரி தேடு', labelEn: 'Find Shared Transport', targetTab: 'transport' },
      { labelTa: 'விற்பனை பதிவு செய்ய', labelEn: 'List Produce', targetTab: 'marketplace' }
    ]
  },
  {
    phrase: 'எனக்கு விதை வேண்டும்',
    phraseEn: 'I need seeds',
    responseTa: 'உங்கள் நிலத்திற்கு சான்றளிக்கப்பட்ட சிவம் F1 தக்காளி விதைகள் மற்றும் CR 1009 நெல் விதைகள் அரசு அங்கீகரித்த விற்பனையாளர்களிடம் கையிருப்பில் உள்ளன.',
    responseEn: 'Certified Shivam F1 tomato seeds and CR 1009 paddy seeds from verified sellers are available in your nearest agri center.',
    suggestedActions: [
      { labelTa: 'சான்றளிக்கப்பட்ட விதைகள்', labelEn: 'Verified Seeds', targetTab: 'seeds' },
      { labelTa: 'உரங்கள் பார்க்க', labelEn: 'View Fertilizers', targetTab: 'farm_services' }
    ]
  },
  {
    phrase: 'என் பயிருக்கு என்ன பிரச்சனை?',
    phraseEn: 'What is wrong with my crop?',
    responseTa: 'உங்கள் பயிரின் இலையை புகைப்படம் எடுத்து பதிவேற்றுங்கள். எங்கள் AI உடனடியாக பூச்சி அல்லது ஊட்டச்சத்து குறைபாட்டை ஆய்வு செய்து வழிகாட்டும்.',
    responseEn: 'Upload or snap a photo of the affected crop leaf. Our AI assistant will analyze potential pest or nutrient issues.',
    suggestedActions: [
      { labelTa: 'புகைப்படத்துடன் கேட்க', labelEn: 'Ask with Photo', targetTab: 'crop_photo' },
      { labelTa: 'வேளாண் அலுவலர் தொடர்பு', labelEn: 'Contact Agri Officer', targetTab: 'government' }
    ]
  },
  {
    phrase: 'எனக்கு விவசாயம் கத்துக்கணும்',
    phraseEn: 'I want to learn farming',
    responseTa: 'வணக்கம்! புதிய விவசாயிகளுக்கு தக்காளி சாகுபடி, சொட்டுநீர் பாசனம் மற்றும் இயற்கை உர தயாரிப்பு போன்ற எளிய பாடநெறிகள் உள்ளன. ஒரு பாடத்தை இப்போதே தொடங்கலாம்.',
    responseEn: 'Welcome! For beginners we have step-by-step visual courses on Tomato farming, Drip irrigation, and Organic inputs with quizzes.',
    suggestedActions: [
      { labelTa: 'விவசாயம் கற்க', labelEn: 'Start Learning', targetTab: 'learning' },
      { labelTa: 'விவசாயிகள் குழுவில் சேர', labelEn: 'Join Community', targetTab: 'community' }
    ]
  },
  {
    phrase: 'Buyer தேவை',
    phraseEn: 'Need buyers',
    responseTa: 'மதுரை மற்றும் சென்னை பகுதியில் உங்கள் தக்காளி மற்றும் மிளகாயை வாங்க 3 சரிபார்க்கப்பட்ட மொத்த வியாபாரிகள் தயாராக உள்ளனர்.',
    responseEn: 'There are 3 verified wholesale buyers in Madurai and Chennai actively seeking tomatoes and chillies right now.',
    suggestedActions: [
      { labelTa: 'வியாபாரிகளை பார்க்க', labelEn: 'View Buyers', targetTab: 'marketplace' },
      { labelTa: 'என் பயிரை பதிவிட', labelEn: 'Post Produce', targetTab: 'marketplace' }
    ]
  },
  {
    phrase: 'என் report காட்டு',
    phraseEn: 'Show my report',
    responseTa: 'உங்கள் பண்ணை அறிக்கை தயார்: 3.5 ஏக்கர் நிலம், 1 செயலில் உள்ள தக்காளி விற்பனை பதிவு, 40% கற்றல் முன்னேற்றம் மற்றும் சேமிக்கப்பட்ட சந்தை அறிக்கைகள் உள்ளன.',
    responseEn: 'Your Farmer Report is ready: 3.5 acres mapped, 1 active produce listing, 40% learning progress, and saved price calculations.',
    suggestedActions: [
      { labelTa: 'பண்ணை அறிக்கை திறக்க', labelEn: 'Open Farmer Report', targetTab: 'reports' }
    ]
  }
];
