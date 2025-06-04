"use client";

import { useState, useRef, useEffect } from "react";
import axiosConfig from "../../../axiosConfig";
import { main } from "framer-motion/client";

// Reusable Input component
const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
    />
  </div>
);

// Reusable Select component
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

type AddAnimalFormProps = {
  type: "add" | "edit";
  id?: number;
};

type AnimalData = {
  id: number;
  name: string;
  description: string;
  age: string;
  type: string;
  sex: string;
  main_image: string;
  images: string[];
};

export default function AddAnimalForm({ type, id }: AddAnimalFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    age: "",
    type: "Pies",
    sex: "Samica",
    main_image: null as File | null,
    galleryImages: [] as File[],
  });

  // Store existing images for edit mode
  const [existingImages, setExistingImages] = useState({
    main_image: "",
    gallery: [] as string[],
  });

  // Track which existing images to remove
  const [imagesToRemove, setImagesToRemove] = useState({
    main_image: false,
    gallery: [] as number[],
  });

  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch animal data for editing
  useEffect(() => {
    if (type === "edit" && id) {
      axiosConfig
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/animals/${id}`)
        .then((response) => {
          const data = response.data as AnimalData;
          console.log(data);
          
          setFormData({
            name: data.name,
            description: data.description,
            age: data.age,
            type: data.type,
            sex: data.sex,
            main_image: null,
            galleryImages: [],
          });

          setExistingImages({
            main_image: data.main_image,
            gallery: data.images || [],
          });
        })
        .catch((error) => {
          console.error("Error fetching animal data:", error);
          alert("Błąd podczas pobierania danych zwierzęcia.");
        });
    }
  }, [id, type]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const removeNewGalleryImage = (index: number) => {
    const updatedImages = formData.galleryImages.filter((_, i) => i !== index);
    setFormData({ ...formData, galleryImages: updatedImages });
  };

  const removeExistingMainImage = () => {
    setImagesToRemove({ ...imagesToRemove, main_image: true });
  };

  const removeExistingGalleryImage = (index: number) => {
    setImagesToRemove({
      ...imagesToRemove,
      gallery: [...imagesToRemove.gallery, index],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("age", formData.age);
    data.append("sex", formData.sex);
    data.append("type", formData.type);

    if (type === "edit") {
      // For edit mode, handle existing and new images
      if (imagesToRemove.main_image) {
        data.append("remove_main_image", "true");
      }
      
      // Add indices of gallery images to remove
      imagesToRemove.gallery.forEach(index => {
        data.append("remove_gallery_images[]", index.toString());
      });

      // Add new main image if provided
      if (formData.galleryImages[0]) {
        data.append("main_image", formData.galleryImages[0]);
      }

      // Add new gallery images
      const galleryImagesToAdd = formData.galleryImages.length > 0 ? 
        formData.galleryImages.slice(1) : formData.galleryImages;
      
      galleryImagesToAdd.forEach((file) => {
        data.append("galleryImages", file);
      });

    } else {
      // For add mode, require at least one image
      if (formData.galleryImages.length === 0) {
        alert("Dodaj przynajmniej jedno zdjęcie.");
        return;
      }

      // Handle main_image
      data.append("main_image", formData.galleryImages[0]);

      // Append the rest as galleryImages
      formData.galleryImages.slice(1).forEach((file) => {
        data.append("galleryImages", file);
      });
    }

    // Debug: Log what we're sending
    console.log("FormData contents:");
    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      let response;
      
      if (type === "edit") {
        response = await axiosConfig.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/animals/${id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Animal updated successfully:", response.data);
        alert("Zwierzę zostało zaktualizowane pomyślnie!");
      } else {
        response = await axiosConfig.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/animals`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Animal added successfully:", response.data);
        alert("Zwierzę zostało dodane pomyślnie!");
      }

      // Reset form only for add mode
      if (type === "add") {
        setFormData({
          name: "",
          description: "",
          age: "",
          type: "Pies",
          sex: "Samica",
          main_image: null,
          galleryImages: [],
        });
      }
    } catch (err: any) {
      console.error(`Error ${type === "edit" ? "updating" : "adding"} animal:`, err);
      console.error("Error response:", err.response?.data);
      alert(`Wystąpił błąd podczas ${type === "edit" ? "aktualizacji" : "dodawania"} zwierzęcia. Spróbuj ponownie.`);
    }
  };

  const getImageUrl = (imagePath: string) => {
    // Adjust this based on your image storage setup
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${imagePath}`;
  };

  return (
    <form className="py-12 max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <FormInput
        label="Imię"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Opis
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
      </div>

      <FormInput
        label="Wiek"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        type="text"
        required
      />

      <FormSelect
        label="Typ"
        name="type"
        value={formData.type}
        onChange={handleInputChange}
        options={[
          { value: "Pies", label: "Pies" },
          { value: "Kot", label: "Kot" },
        ]}
        required
      />

      <FormSelect
        label="Płeć"
        name="sex"
        value={formData.sex}
        onChange={handleInputChange}
        options={[
          { value: "Samica", label: "Samica" },
          { value: "Samiec", label: "Samiec" },
        ]}
        required
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Zdjęcia
        </label>

        {/* Show existing main image for edit mode */}
        {type === "edit" && existingImages.main_image && !imagesToRemove.main_image && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Aktualne zdjęcie główne:</p>
            <div className="relative inline-block">
              <img
                src={getImageUrl(existingImages.main_image)}
                alt="Current main"
                className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded"
                onClick={removeExistingMainImage}
              >
                Usuń
              </button>
            </div>
          </div>
        )}

        {/* Show existing gallery images for edit mode */}
        {type === "edit" && existingImages.gallery.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Aktualne zdjęcia w galerii:</p>
            <div className="flex gap-2 flex-wrap">
              {existingImages.gallery.map((image, index) => (
                !imagesToRemove.gallery.includes(index) && (
                  <div key={index} className="relative">
                    <img
                      src={getImageUrl(image)}
                      alt={`Existing gallery ${index}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                      onClick={() => removeExistingGalleryImage(index)}
                    >
                      X
                    </button>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImagesChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />

        {/* Show new images to be uploaded */}
        {formData.galleryImages.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Nowe zdjęcia do dodania:</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {formData.galleryImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New gallery ${index}`}
                    className={`w-20 h-20 object-cover rounded-lg ${
                      index === 0 ? 'border-2 border-green-500' : ''
                    }`}
                  />
                  {index === 0 && (
                    <span className="absolute bottom-0 left-0 bg-green-500 text-white text-xs px-1 rounded">
                      {type === "edit" && existingImages.main_image && !imagesToRemove.main_image ? "Galeria" : "Główne"}
                    </span>
                  )}
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                    onClick={() => removeNewGalleryImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {type === "edit" ? "Zaktualizuj zwierzę" : "Dodaj zwierzę"}
      </button>
    </form>
  );
}