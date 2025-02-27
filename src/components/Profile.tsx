// src/components/Profile.tsx
import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const Profile: React.FC = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [address, setAddress] = useState("123 Main St");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    address?: string;
  }>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: { name?: string; email?: string; address?: string } = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!address) newErrors.address = "Address is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    // Implement your profile update logic here.
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleSave} noValidate>
      <Input
        label="Name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Input
        label="Delivery Address"
        type="text"
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        error={errors.address}
      />
      <Button
        type="submit"
        label="Save Changes"
        className="bg-green-600 text-white hover:bg-green-700"
        aria-label="Save Profile Changes"
      />
    </form>
  );
};

export default Profile;
