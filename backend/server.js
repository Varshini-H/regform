const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const { z } = require("zod");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();
app.use(cors(/*{
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}*/));

app.use(express.json());

const employeeSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),  
  employeeId: z.string().regex(/^\d{3}$/, "Invalid format"),
  email: z.string().email("Invalid format"),
  phone: z.string().regex(/^\d{10}$/, "Must be 10 digits"),
  department: z.string().min(1, "Department is required"),
  dateOfJoining: z.string().refine(
    (date) => new Date(date) <= new Date(),
    "Cannot be a future date"
  ),
  role: z.string().min(1, "Role is required"),
  salary:z.string().regex(/^\d{1,10}$/,"Can be 10 digits"),
});

app.post("/api/employeeadd", async (req, res) => {
  try {
    const validatedData = employeeSchema.parse(req.body);
    const dateOfJoining = new Date(validatedData.dateOfJoining);
    const newEmployee = await prisma.employee.create({
      data: {
        firstname:validatedData.firstname,
        lastname:validatedData.lastname,
        employeeId: validatedData.employeeId,
        email: validatedData.email,
        phone: validatedData.phone,
        department: validatedData.department,
        dateOfJoining: dateOfJoining,
        role: validatedData.role,
        salary:validatedData.salary,
      },
    });

    res.status(201).json({ message: "Employee added successfully", newEmployee });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Error adding employee:", error);
      return res.status(400).json({ errors: error.errors });
    }

    console.error("Error adding employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
