"use server"

import db from "../../../../../lib/prisma";


export const registerUser = async (prevState: any, formData: FormData) => {
 
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  // Validate input data
  if (!name || !phone || !password) {
    return { success: false, message: "جميع الحقةل مطلوبة" };
  }
 

  // Check if the user already exists
  const existingUser = await db.user.findUnique({
    where: { phone },
  });
  if (existingUser) {
    return { success: false, message: "مسجل مسبقا" };
  }

  // Hash the password
  // const hashedPassword = await bcrypt.hash(password, 10);
   const hashedPassword =  password

  // Create a new user in the database
  const newUser = await db.user.create({
    data: {
      name,
      phone,
      password: hashedPassword,
       
    },
  });

  return { success: true, message: "تم التسجيل بنجاح" };
}