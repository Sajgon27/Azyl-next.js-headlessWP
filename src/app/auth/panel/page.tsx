"use client";
import Link from "next/link";
import useFetchAnimals from "@/hooks/useFetchAnimals";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import axiosConfig from "../../../../axiosConfig";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";

interface Animal {
  id: number;
  name: string;
  type: string | undefined;
  main_image: string;
}

export default function Dashboard() {
  const { animals: initialAnimals, loading, error } = useFetchAnimals(); // Fetch animals
  const [animals, setAnimals] = useState<Animal[]>([]); // Local state for UI updates
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // **Set animals when data is loaded**
  useEffect(() => {
    if (initialAnimals) {
      setAnimals(
        initialAnimals.map((animal) => ({
          ...animal,
          type: animal.type || "Unknown", // Provide a default string value
        }))
      );
    }
  }, [initialAnimals]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  // **Handle Delete**
  const handleDelete = async (animalId: number) => {
    try {
      await axiosConfig.delete(
        `http://localhost:8000/api/animals/${animalId}`,
        {
          withCredentials: true,
        }
      );

      // **Update state immediately (without refresh)**
      setAnimals((prevAnimals) =>
        prevAnimals.filter((animal) => animal.id !== animalId)
      );
    } catch (error: any) {
      console.error("Error deleting animal:", error);
      alert(error.response?.data?.message || "Failed to delete animal");
    } finally {
      setIsModalOpen(false);
    }
  };

  function openModal(animal: Animal) {
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="min-h-full">
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <ul className="flex flex-col">
              {animals.map((animal) => (
                <li
                  key={animal.id} // Ensure unique key
                  className="flex justify-between rounded-2xl border border-gray-200 my-4 gap-x-6 p-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      alt=""
                      src={
                        process.env.NEXT_PUBLIC_API_IMAGES_URL +
                        animal.main_image
                      }
                      className="size-14 flex-none rounded-full object-cover bg-gray-50"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-900">
                        {animal.name}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {animal.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <Link
                      className="bg-indigo-300 cursor-pointer px-5 py-2 rounded"
                      href="/edit"
                    >
                      Edytuj
                    </Link>
                    <button
                      className="text-white cursor-pointer rounded bg-red-800 px-5 py-2"
                      onClick={() => openModal(animal)}
                    >
                      Usuń
                    </button>
                  </div>
                </li>
              ))}
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Potwierdzenie usunięcia"
                actions={
                  <>
                    <button
                      className="px-4 cursor-pointer py-2 text-gray-700 bg-gray-200 rounded"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Anuluj
                    </button>
                    <button
                      className="px-4 cursor-pointer py-2 text-white bg-red-600 rounded"
                      onClick={() =>
                        selectedAnimal && handleDelete(selectedAnimal.id)
                      }
                    >
                      Usuń
                    </button>
                  </>
                }
              >
                <p>
                  Czy na pewno chcesz usunąć{" "}
                  <strong>{selectedAnimal?.name}</strong>?
                </p>
              </Modal>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
