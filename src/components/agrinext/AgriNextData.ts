export interface AgriCropTrend {
  id: string;
  name: string;
  nameTamil: string;
  category: 'vegetables' | 'fruits' | 'grains';
  price: number;
  unit: string;
  changePercent: number;
  isPositive: boolean;
  image: string;
  sparkline: number[];
  predictionInsight: string;
  predictionInsightTamil: string;
  chartData: {
    '7days': { label: string; price: number }[];
    '1month': { label: string; price: number }[];
    '3months': { label: string; price: number }[];
  };
}

export const agriCropsList: AgriCropTrend[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    nameTamil: 'தக்காளி',
    category: 'vegetables',
    price: 28,
    unit: 'kg',
    changePercent: 12,
    isPositive: true,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80',
    sparkline: [21, 23, 22, 25, 24, 27, 28],
    predictionInsight: 'Price is expected to rise by 12–15% in the next 2 weeks based on current market trends and lower mandi arrivals.',
    predictionInsightTamil: 'தற்போதைய சந்தை போக்கு மற்றும் குறைந்த வரத்து அடிப்படையில் அடுத்த 2 வாரங்களில் விலை 12–15% உயரும் என எதிர்பார்க்கப்படுகிறது.',
    chartData: {
      '7days': [
        { label: '06 Sep', price: 23 },
        { label: '08 Sep', price: 24 },
        { label: '10 Sep', price: 25 },
        { label: '12 Sep', price: 28 },
      ],
      '1month': [
        { label: '10 Sep', price: 20 },
        { label: '17 Sep', price: 24 },
        { label: '24 Sep', price: 26 },
        { label: '01 Oct', price: 28 },
      ],
      '3months': [
        { label: 'Jul', price: 18 },
        { label: 'Aug', price: 22 },
        { label: 'Sep', price: 25 },
        { label: 'Oct', price: 28 },
      ],
    },
  },
  {
    id: 'onion',
    name: 'Onion',
    nameTamil: 'வெங்காயம்',
    category: 'vegetables',
    price: 22,
    unit: 'kg',
    changePercent: 8,
    isPositive: true,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200&auto=format&fit=crop&q=80',
    sparkline: [18, 19, 20, 20, 21, 22, 22],
    predictionInsight: 'Onion supply steady from Nashik; moderate upward demand predicted during upcoming festival weeks.',
    predictionInsightTamil: 'நாசிக் வரத்து சீராக உள்ளது; பண்டிகை நாட்கள் காரணமாக மிதமான விலை உயர்வு இருக்கும்.',
    chartData: {
      '7days': [
        { label: '06 Sep', price: 20 },
        { label: '08 Sep', price: 21 },
        { label: '10 Sep', price: 21 },
        { label: '12 Sep', price: 22 },
      ],
      '1month': [
        { label: '10 Sep', price: 18 },
        { label: '17 Sep', price: 19 },
        { label: '24 Sep', price: 21 },
        { label: '01 Oct', price: 22 },
      ],
      '3months': [
        { label: 'Jul', price: 16 },
        { label: 'Aug', price: 18 },
        { label: 'Sep', price: 20 },
        { label: 'Oct', price: 22 },
      ],
    },
  },
  {
    id: 'potato',
    name: 'Potato',
    nameTamil: 'உருளைக்கிழங்கு',
    category: 'vegetables',
    price: 18,
    unit: 'kg',
    changePercent: 5,
    isPositive: true,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&auto=format&fit=crop&q=80',
    sparkline: [16, 16, 17, 17, 18, 18, 18],
    predictionInsight: 'Cold storage stock dispatch active; prices expected to remain stable with slight upward traction.',
    predictionInsightTamil: 'குளிர்சாதன கிடங்கு இருப்பு சீராக வெளியேறுகிறது; விலை நிலையாக இருக்கும்.',
    chartData: {
      '7days': [
        { label: '06 Sep', price: 17 },
        { label: '08 Sep', price: 17 },
        { label: '10 Sep', price: 18 },
        { label: '12 Sep', price: 18 },
      ],
      '1month': [
        { label: '10 Sep', price: 15 },
        { label: '17 Sep', price: 16 },
        { label: '24 Sep', price: 17 },
        { label: '01 Oct', price: 18 },
      ],
      '3months': [
        { label: 'Jul', price: 14 },
        { label: 'Aug', price: 15 },
        { label: 'Sep', price: 17 },
        { label: 'Oct', price: 18 },
      ],
    },
  },
  {
    id: 'paddy',
    name: 'Paddy',
    nameTamil: 'நெல்',
    category: 'grains',
    price: 16,
    unit: 'kg',
    changePercent: 3,
    isPositive: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=80',
    sparkline: [15, 15, 15.5, 15.5, 16, 16, 16],
    predictionInsight: 'Government procurement MSP support anchoring floor price at DPC mandis across Tamil Nadu.',
    predictionInsightTamil: 'அரசு நேரடி நெல் கொள்முதல் மையங்கள் மூலம் குறைந்தபட்ச ஆதரவு விலை உறுதி செய்யப்படுகிறது.',
    chartData: {
      '7days': [
        { label: '06 Sep', price: 15 },
        { label: '08 Sep', price: 15.5 },
        { label: '10 Sep', price: 15.8 },
        { label: '12 Sep', price: 16 },
      ],
      '1month': [
        { label: '10 Sep', price: 14.5 },
        { label: '17 Sep', price: 15 },
        { label: '24 Sep', price: 15.5 },
        { label: '01 Oct', price: 16 },
      ],
      '3months': [
        { label: 'Jul', price: 14 },
        { label: 'Aug', price: 14.5 },
        { label: 'Sep', price: 15 },
        { label: 'Oct', price: 16 },
      ],
    },
  },
  {
    id: 'chilli',
    name: 'Chilli',
    nameTamil: 'மிளகாய்',
    category: 'vegetables',
    price: 40,
    unit: 'kg',
    changePercent: 2,
    isPositive: false,
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=200&auto=format&fit=crop&q=80',
    sparkline: [44, 43, 42, 42, 41, 40, 40],
    predictionInsight: 'High fresh harvest arrivals from Guntur and Ramanathapuram exerting mild downward pressure on prices.',
    predictionInsightTamil: 'குண்டூர் மற்றும் ராமநாதபுரம் புதிய அறுவடை வரத்து அதிகரித்துள்ளதால் விலை சற்று சரிந்துள்ளது.',
    chartData: {
      '7days': [
        { label: '06 Sep', price: 42 },
        { label: '08 Sep', price: 41 },
        { label: '10 Sep', price: 40.5 },
        { label: '12 Sep', price: 40 },
      ],
      '1month': [
        { label: '10 Sep', price: 43 },
        { label: '17 Sep', price: 42 },
        { label: '24 Sep', price: 41 },
        { label: '01 Oct', price: 40 },
      ],
      '3months': [
        { label: 'Jul', price: 48 },
        { label: 'Aug', price: 45 },
        { label: 'Sep', price: 42 },
        { label: 'Oct', price: 40 },
      ],
    },
  },
];

export interface PriceAlertConfig {
  id: string;
  cropId: string;
  cropName: string;
  condition: 'rises_above' | 'falls_below' | 'any_change';
  targetValue: number;
  unit: string;
  createdAt: string;
  isActive: boolean;
}

export const initialAlerts: PriceAlertConfig[] = [
  {
    id: 'alert-1',
    cropId: 'tomato',
    cropName: 'Tomato',
    condition: 'rises_above',
    targetValue: 30,
    unit: '₹ /kg',
    createdAt: '12 Sep',
    isActive: true,
  },
  {
    id: 'alert-2',
    cropId: 'onion',
    cropName: 'Onion',
    condition: 'falls_below',
    targetValue: 20,
    unit: '₹ /kg',
    createdAt: '10 Sep',
    isActive: true,
  },
];
