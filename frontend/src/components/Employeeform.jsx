import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const departments = ["HR", "Engineering", "Marketing"];

const employeeSchema = z.object({        
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),                          
  employeeId: z.string().regex(/^\d{3}$/,"Invalid format"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^\d{10}$/, "Must be 10 digits"),
  department: z.string().min(1, "Department is required"),
  dateOfJoining: z.string().refine(
    (date) => new Date(date) <= new Date(),
    "Cannot be a future date"
  ),
  role: z.string().min(1, "Role is required"),
  salary:z.string().regex(/^\d{1,10}$/,"Can be 10 digits"),
});

const EmployeeForm = () => {
  const [date, setDate] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(employeeSchema) });

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/employeeadd', formData);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error during API call:', error);

      if (error.response && error.response.data) {
        const errors = error.response.data.errors;
        if (errors) {
          console.log('Errors:', errors);
        } else {
          console.log('No specific errors returned from the server.');
        }
      } else {
        console.error('Error response or error data is not available.');
      }
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
    setValue("dateOfJoining", date.toISOString().split("T")[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
    <div className="mb-4">
        <input
          {...register("firstname")}
          placeholder="First Name"
          className={`border p-2 w-full rounded ${errors.firstname ? 'border-red-500' : ''}`}
        />
        {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
      </div>
      <div className="mb-4">
        <input
          {...register("lastname")}
          placeholder="Last name"
          className={`border p-2 w-full rounded ${errors.lastname ? 'border-red-500' : ''}`}
        />
        {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
      </div>
      <div className="mb-4">
        <input
          {...register("employeeId")}
          placeholder="Employee ID"
          className={`border p-2 w-full rounded ${errors.employeeId ? 'border-red-500' : ''}`}
        />
        {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId.message}</p>}
      </div>

      <div className="mb-4">
        <input
          {...register("email")}
          placeholder="Email"
          className={`border p-2 w-full rounded ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <input
          {...register("phone")}
          placeholder="Phone"
          className={`border p-2 w-full rounded ${errors.phone ? 'border-red-500' : ''}`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div className="mb-4">
        <select
          {...register("department")}
          className={`border p-2 w-full rounded ${errors.department ? 'border-red-500' : ''}`}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
      </div>

      <div className="mb-4">
                <DatePicker
                selected={date}
                onChange={handleDateChange}
                dateFormat="yyyy-mm-dd"
                maxDate={new Date()}
                placeholderText="Select date"
                className={`border p-2 w-full rounded ${errors.employeeId?`border-red-500`: ``}  `}/>
                {errors.dateOfJoining && <p className="text-red-500 text-sm">{errors.dateOfJoining.message}</p>}
            </div>

      <div className="mb-4">
        <input
          {...register("role")}
          placeholder="Role"
          className={`border p-2 w-full rounded ${errors.role ? 'border-red-500' : ''}`}
        />
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>

      <div className="mb-4">
        <input
          {...register("salary")}
          placeholder="Salary"
          className={`border p-2 w-full rounded ${errors.salary ? 'border-red-500' : ''}`}
        />
        {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
      </div>

      <div className="mb-4 flex gap-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
        <button
          type="button"
          onClick={() => {
            reset();
            setDate(null);
          }}
          className="bg-gray-500 text-white p-2 rounded w-full"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
