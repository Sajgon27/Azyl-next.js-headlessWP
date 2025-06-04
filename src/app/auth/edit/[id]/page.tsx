"use client";
import AddAnimalForm from "@/components/admin/AnimalForm";
import { usePathname } from "next/navigation";

export default function EditAnimalPage() {
    const pathname = usePathname();
    const id = Number(pathname.split("/").pop()); 
    console.log("Current Pathname:", pathname);


    return (
        <AddAnimalForm type="edit" id={id} />
    )
}