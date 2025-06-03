"use client";

import { useState, useRef } from "react";
import useAddAnimal from "@/hooks/useAddAnimal";

const AddAnimal = () => {
  // const { addAnimal, loading, error } = useAddAnimal();
  const { addAnimal } = useAddAnimal();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    age: "",
    sex: "Samica",
    type: "Pies",
    mainImage: null as File | null,
    galleryImages: [] as File[],
  });

  const galleryInputRef = useRef<HTMLInputElement | null>(null); // 🔹 Reference to file input

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, mainImage: e.target.files[0] });
    }
  };

  const handleGalleryImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        galleryImages: [
          ...formData.galleryImages,
          ...Array.from(e.target.files),
        ],
      });

     
      if (galleryInputRef.current) {
        galleryInputRef.current.value = "";
      }
    }
  };

  const removeGalleryImage = (index: number) => {
    const updatedImages = formData.galleryImages.filter((_, i) => i !== index);
    setFormData({ ...formData, galleryImages: updatedImages });

    
    if (updatedImages.length === 0 && galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("age", formData.age);
    data.append("sex", formData.sex);
    data.append("type", formData.type);
    if (formData.mainImage) data.append("main_image", formData.mainImage);

    formData.galleryImages.forEach((image, index) => {
      data.append(`galleryImages[${index}]`, image);
    });

    try {
      const response = await addAnimal(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Dodaj Zwierzę do Adopcji</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Nazwa</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>


        <div>
          <label className="block text-sm font-medium">Opis</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        {/* Age Field */}
        <div>
          <label className="block text-sm font-medium">Wiek</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Sex Field */}
        <div>
          <label className="block text-sm font-medium">Płeć</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Samica">Samica</option>
            <option value="Samiec">Samiec</option>
          </select>
        </div>

        {/* Type Field */}
        <div>
          <label className="block text-sm font-medium">Typ</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Pies">Pies</option>
            <option value="Kot">Kot</option>
          </select>
        </div>

        {/* Main Image Upload */}
        <div>
          <label className="block text-sm font-medium">Zdjęcie główne</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formData.mainImage && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(formData.mainImage)}
                alt="Main Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Gallery Images Upload */}
        <div>
          <label className="block text-sm font-medium">Galeria zdjęć</label>
          <input
            ref={galleryInputRef} // 🔹 Attach reference to input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryImagesChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {formData.galleryImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Gallery ${index}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                  onClick={() => removeGalleryImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Dodaj Zwierzę
        </button>
      </form>
    </div>
  );
};

export default AddAnimal;
