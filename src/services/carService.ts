
import { Car, CarFilters } from "../types/car";

// Mock car data
const mockCars: Car[] = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 29999,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 14.5,
    seatingCapacity: 5,
    color: "Silver",
    imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1536&auto=format&fit=crop",
    features: ["Cruise Control", "Backup Camera", "Bluetooth", "Lane Assist"],
    description: "The Toyota Camry is a reliable mid-size sedan with excellent fuel efficiency and comfortable seating."
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 25499,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 16.2,
    seatingCapacity: 5,
    color: "Blue",
    imageUrl: "https://images.unsplash.com/photo-1605816988069-b11383b50717?q=80&w=1538&auto=format&fit=crop",
    features: ["Sunroof", "Apple CarPlay", "Android Auto", "Heated Seats"],
    description: "The Honda Civic offers excellent fuel economy, sporty handling, and a spacious interior for its class."
  },
  {
    id: 3,
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 45990,
    fuelType: "Electric",
    transmission: "Automatic",
    mileage: 0, // Electric
    seatingCapacity: 5,
    color: "White",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1471&auto=format&fit=crop",
    features: ["Autopilot", "Smart Summon", "Sentry Mode", "Glass Roof"],
    description: "The Tesla Model 3 is an all-electric sedan with impressive range, performance, and cutting-edge technology."
  },
  {
    id: 4,
    brand: "BMW",
    model: "X5",
    year: 2022,
    price: 62500,
    fuelType: "Diesel",
    transmission: "Automatic",
    mileage: 10.8,
    seatingCapacity: 7,
    color: "Black",
    imageUrl: "https://images.unsplash.com/photo-1615908397724-6dc711db34a7?q=80&w=1532&auto=format&fit=crop",
    features: ["Leather Seats", "Panoramic Sunroof", "360 Camera", "Wireless Charging"],
    description: "The BMW X5 is a luxury SUV with powerful performance, advanced technology, and premium materials throughout."
  },
  {
    id: 5,
    brand: "Ford",
    model: "Mustang",
    year: 2023,
    price: 38999,
    fuelType: "Petrol",
    transmission: "Manual",
    mileage: 8.5,
    seatingCapacity: 4,
    color: "Red",
    imageUrl: "https://images.unsplash.com/photo-1547744152-14d985cb937f?q=80&w=1470&auto=format&fit=crop",
    features: ["Leather Seats", "SYNC 4", "Track Apps", "Active Exhaust"],
    description: "The Ford Mustang is an iconic American sports car with powerful engines and distinctive styling."
  },
  {
    id: 6,
    brand: "Toyota",
    model: "Prius",
    year: 2023,
    price: 32000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    mileage: 22.5,
    seatingCapacity: 5,
    color: "Green",
    imageUrl: "https://www.motortrend.com/files/6736958c3f9abd0008bdef3c/015-2025-toyota-prius-limited-fwd-front-view.jpg",
    features: ["Toyota Safety Sense", "Smart Key System", "Wireless Charging", "JBL Audio"],
    description: "The Toyota Prius is a pioneering hybrid vehicle that delivers exceptional fuel economy and eco-friendly performance."
  },
  {
    id: 7,
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2023,
    price: 65000,
    fuelType: "Diesel",
    transmission: "Automatic",
    mileage: 11.8,
    seatingCapacity: 5,
    color: "Silver",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format&fit=crop",
    features: ["MBUX", "Burmester Sound System", "Air Suspension", "Driver Assistance"],
    description: "The Mercedes-Benz E-Class exemplifies luxury with its refined ride, elegant interior, and advanced safety features."
  },
  {
    id: 8,
    brand: "Audi",
    model: "Q7",
    year: 2022,
    price: 59500,
    fuelType: "Diesel",
    transmission: "Automatic",
    mileage: 9.8,
    seatingCapacity: 7,
    color: "Blue",
    imageUrl: "https://images.unsplash.com/photo-1614026480418-bd11fdb9fa06?q=80&w=1470&auto=format&fit=crop",
    features: ["Virtual Cockpit", "Bang & Olufsen Sound", "Adaptive Cruise", "Quattro AWD"],
    description: "The Audi Q7 is a premium three-row SUV with cutting-edge technology and sophisticated styling."
  },
  {
    id: 9,
    brand: "Hyundai",
    model: "Kona Electric",
    year: 2023,
    price: 37500,
    fuelType: "Electric",
    transmission: "Automatic",
    mileage: 0, // Electric
    seatingCapacity: 5,
    color: "Orange",
    imageUrl: "https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?q=80&w=1742&auto=format&fit=crop",
    features: ["64 kWh Battery", "Regenerative Braking", "Heated Seats", "Lane Following"],
    description: "The Hyundai Kona Electric offers impressive range in a compact SUV format with zero emissions."
  },
  {
    id: 10,
    brand: "Volvo",
    model: "XC60",
    year: 2023,
    price: 52800,
    fuelType: "Hybrid",
    transmission: "Automatic",
    mileage: 15.6,
    seatingCapacity: 5,
    color: "White",
    imageUrl: "https://images.unsplash.com/photo-1629897046038-371765238f26?q=80&w=1470&auto=format&fit=crop",
    features: ["Pilot Assist", "Bowers & Wilkins Audio", "Air Purifier", "Massaging Seats"],
    description: "The Volvo XC60 combines Scandinavian design with advanced safety features and hybrid efficiency."
  },
  {
    id: 11,
    brand: "Chevrolet",
    model: "Corvette",
    year: 2023,
    price: 64995,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 8.3,
    seatingCapacity: 2,
    color: "Yellow",
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1470&auto=format&fit=crop",
    features: ["Mid-Engine Design", "Performance Data Recorder", "Head-Up Display", "Z51 Package"],
    description: "The Chevrolet Corvette is an American icon with supercar performance at a more accessible price point."
  },
  {
    id: 12,
    brand: "Subaru",
    model: "Outback",
    year: 2022,
    price: 36995,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 12.7,
    seatingCapacity: 5,
    color: "Green",
    imageUrl: "https://images.unsplash.com/photo-1609772168759-418d69e4b5a2?q=80&w=1374&auto=format&fit=crop",
    features: ["Symmetrical AWD", "X-MODE", "Starlink", "EyeSight Driver Assist"],
    description: "The Subaru Outback is a versatile wagon with SUV capabilities, perfect for outdoor adventures."
  },
  {
    id: 13,
    brand: "Lexus",
    model: "RX 450h",
    year: 2023,
    price: 58700,
    fuelType: "Hybrid",
    transmission: "Automatic",
    mileage: 16.8,
    seatingCapacity: 5,
    color: "Silver",
    imageUrl: "https://www.indiacarnews.com/wp-content/uploads/2016/10/Lexus-RX-450h-India-1.jpg",
    features: ["Mark Levinson Audio", "Panoramic View Monitor", "Adaptive Suspension", "Semi-Aniline Leather"],
    description: "The Lexus RX 450h combines luxury with efficiency in a refined hybrid SUV package."
  },
  {
    id: 14,
    brand: "Volkswagen",
    model: "ID.4",
    year: 2023,
    price: 39995,
    fuelType: "Electric",
    transmission: "Automatic",
    mileage: 0, // Electric
    seatingCapacity: 5,
    color: "Blue",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/02/2020_Volkswagen_ID.4_Pro_%28Netherlands%29_front_view.jpg",
    features: ["ID. Light", "Massage Seats", "Augmented Reality HUD", "Travel Assist"],
    description: "The Volkswagen ID.4 is an all-electric SUV with a spacious interior and impressive driving range."
  },
  {
    id: 15,
    brand: "Kia",
    model: "Telluride",
    year: 2023,
    price: 45600,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 11.2,
    seatingCapacity: 8,
    color: "Black",
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1470&auto=format&fit=crop",
    features: ["Harman Kardon Audio", "Blind-Spot View Monitor", "Highway Driving Assist", "Captain's Chairs"],
    description: "The Kia Telluride offers premium features and comfortable three-row seating in a stylish package."
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get all cars with pagination and filters
export const getCars = async (
  page: number = 1,
  limit: number = 10,
  filters: CarFilters = {},
  sortBy: string = ""
): Promise<{
  cars: Car[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}> => {
  await delay(800); // Simulate network delay
  
  let filteredCars = [...mockCars];
  
  // Apply filters
  if (filters.brand) {
    filteredCars = filteredCars.filter(car => 
      car.brand.toLowerCase() === filters.brand?.toLowerCase()
    );
  }
  
  if (filters.fuelType) {
    filteredCars = filteredCars.filter(car => 
      car.fuelType.toLowerCase() === filters.fuelType?.toLowerCase()
    );
  }
  
  if (filters.minPrice !== undefined) {
    filteredCars = filteredCars.filter(car => car.price >= filters.minPrice!);
  }
  
  if (filters.maxPrice !== undefined) {
    filteredCars = filteredCars.filter(car => car.price <= filters.maxPrice!);
  }
  
  if (filters.seatingCapacity) {
    filteredCars = filteredCars.filter(car => 
      car.seatingCapacity >= filters.seatingCapacity!
    );
  }
  
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredCars = filteredCars.filter(car => 
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.description.toLowerCase().includes(query)
    );
  }
  
  // Apply sorting
  if (sortBy === "price-low-high") {
    filteredCars.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high-low") {
    filteredCars.sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    filteredCars.sort((a, b) => b.year - a.year);
  }
  
  // Calculate pagination
  const totalCount = filteredCars.length;
  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalCount);
  
  return {
    cars: filteredCars.slice(startIndex, endIndex),
    totalCount,
    currentPage,
    totalPages
  };
};

// Get car by ID
export const getCarById = async (id: number): Promise<Car | null> => {
  await delay(500); // Simulate network delay
  return mockCars.find(car => car.id === id) || null;
};

// Get filter options based on available cars
export const getFilterOptions = async (): Promise<{
  brands: string[];
  fuelTypes: string[];
  seatingCapacities: number[];
  minPrice: number;
  maxPrice: number;
}> => {
  await delay(300); // Simulate network delay
  
  const brands = Array.from(new Set(mockCars.map(car => car.brand)));
  const fuelTypes = Array.from(new Set(mockCars.map(car => car.fuelType)));
  const seatingCapacities = Array.from(new Set(mockCars.map(car => car.seatingCapacity)));
  const prices = mockCars.map(car => car.price);
  
  return {
    brands: brands.sort(),
    fuelTypes: fuelTypes.sort(),
    seatingCapacities: [...new Set(seatingCapacities)].sort((a, b) => a - b),
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices)
  };
};
