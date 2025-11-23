export type RegisterType = {
  username: string;
  email: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
};


export type Service = {
  id: number;
  name: string;
  duration: string;
  price: number;
  offers: string[];
  reviews: { comment: string; rating: number }[]
  image: string;
  images: string[];
  providerId: string;
  provider: { username: string };
  availabilities: {
    createdAt: string
    endTime: string
    googleEventId: string
    id: number
    isBooked: boolean
    providerId: number
    serviceId: number
    startTime: string
  }[]
  createdAt: string;
};

export type ServiceResponse = {
  services: Service[],
  totalCount: number;
  page: number;
}


export type User = {
  authProvider?: string
  email: string
  googleId?: string
  googleRefreshToken?: string
  id: number
  isApproved?: boolean
  role: string
  rolePending?: string
  username: string
  password: string
}

export type UserReq = {
  username?: string
  email?: string
}


export type UserResponse = {
  users: User[],
  totalCount: number;
  page: number;
}


export type Availability = {
  id: number;
  startTime: string;
  endTime: string;
  serviceId: number;
  service: { name: string };
  providerId: number;
  provider: { username: string };
}

export type AvailabilityReq = {
  startTime: string;
  endTime: string;
  serviceId: number;
  providerId: number;
}

export type AvailabilityResponse = {
  availabilities: Availability[],
  totalCount: number;
  page: number;
}


export type PendingUsers = {
  pendingUsers: User[],
  totalCount: number;
  page: number;
}


export type Booking = {
  id: number;
  startTime: string;
  endTime: string;
  serviceId: number;
  service: { name: string };
  providerId: number;
  provider: { username: string };
  clientId: number;
  client: { username: string };
  status: string
}

export type BookingResponse = {
  bookings: Booking[],
  totalCount: number;
  page: number;
}


export type Dashboard = {
  bookings: number
  bookingsTrend: { date: string, count: number }[]
  lastMonth: { totalBookings: number, totalRevenue: string, averageBookingValue: string, month: string }[]
  popularServices: Service[]
  role: string
  services: number
  users: {
    role: string;
    count: number;
  }[]
}

export type Review = {
  reviews: {
    id: number;
    rating: number;
    comment: string;
    serviceId: number;
    service: { name: string };
    user: { username: string; createdAt: string }
    createdAt: string
  }[]
}


export type wishlistType = {
  wishlists: {
    id: number;
    serviceId: number;
    service: Service;
    userId: number;
    user: User;
  }[]
}