import zod from "zod";
export const loginSchema = zod.object({
  email: zod.email(),
  password: zod.string().min(8),
});

export const registerSchema = zod.object({
  username: zod.string().min(3),
  email: zod.email(),
  password: zod.string().min(8),
});


export const addServiceSchema = zod.object({
  providerId: zod.string().nonempty(),
  name: zod.string().min(3),
  duration: zod.string().min(1),
  image: zod.any().refine((files) => files?.length > 0, "Image is required"),
  images: zod
    .any()
    .refine((val) => val instanceof FileList, { message: "Invalid type" })
    .transform((val: FileList) => Array.from(val))
    .refine((files) => files.length > 0, {
      message: "Image is required",
    }),
  price: zod.number().min(1),
  offers: zod.string().min(1),
});

export const editServiceSchema = zod.object({
  name: zod.string().min(3).optional(),
  duration: zod.string().optional(),
  price: zod.number().min(1).optional(),
  offers: zod.string().optional(),
  image: zod.any().optional(),
  images: zod.any().optional(),
});



export const addUserSchema = zod.object({
  username: zod.string().min(3),
  email: zod.email(),
  password: zod.string().min(8),
});

export const editUserSchema = zod.object({
  username: zod.string().min(3).optional(),
  email: zod.email().optional(),
});


export const addAvailabilitySchema = zod.object({
  startTime: zod.date(),
  endTime: zod.date(),
  serviceId: zod.string().nonempty(),
  providerId: zod.string().nonempty(),
});

export const editAvailabilitySchema = zod.object({
  startTime: zod.date(),
  endTime: zod.date(),
  serviceId: zod.string().optional(),
  providerId: zod.string().optional(),
  isBooking: zod.boolean().optional(),
});

export const addReviewSchema = zod.object({
  rating: zod.number().min(1).max(5),
  comment: zod.string().min(300)
})