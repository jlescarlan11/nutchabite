// src/components/CustomerInformation.tsx
import React, { useState } from "react";

interface CustomerInformationProps {
  orderData: any;
  updateOrderData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({
  orderData,
  updateOrderData,
  nextStep,
  prevStep,
}) => {
  const [form, setForm] = useState({
    name: orderData.name || "",
    email: orderData.email || "",
    phone: orderData.phone || "",
    address: orderData.address || "",
    city: orderData.city || "",
    zip: orderData.zip || "",
  });

  // Update form state on input change.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrderData(form);
    nextStep();
  };

  return (
    <section aria-labelledby="customer-info">
      <h2 id="customer-info" className="text-2xl font-semibold mb-4">
        Your Information
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        aria-live="polite"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Street address"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium">
            Zip Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            placeholder="Zip Code"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="md:col-span-2 flex justify-between mt-4">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            Next
          </button>
        </div>
      </form>
    </section>
  );
};

export default CustomerInformation;
