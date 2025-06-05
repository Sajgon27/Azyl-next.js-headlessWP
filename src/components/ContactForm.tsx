"use client";

import { useMutation } from "@apollo/client";
import { SEND_CONTACT_EMAIL } from "../graphql/sendEmail";
import client from "../graphql/apollo-client";
import { useState } from "react";

type ContactFormProps = {
  additionalStyles?: string;
};

export default function ContactForm({ additionalStyles }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    terms: false,
  });

  const [status, setStatus] = useState<string | null>(null);

  const [sendContactEmail, { loading }] = useMutation(SEND_CONTACT_EMAIL, {
    client,
    onCompleted: (data) => {
      const { success, message } = data.sendContactEmail;
      if (success) {
        setStatus("✅ Wiadomość została wysłana.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          terms: false,
        });
      } else {
        setStatus(`❌ Błąd: ${message}`);
      }
    },
    onError: (error) => {
      setStatus(`❌ Błąd: ${error.message}`);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.terms) {
      setStatus("Musisz zaakceptować warunki przetwarzania danych.");
      return;
    }

    await sendContactEmail({
      variables: {
        input: {
          name: `${formData.name} (${formData.phone})`,
          email: formData.email,
          message: formData.message,
        },
      },
    });
  };

  return (
    <div
      className={`w-full md:w-1/2 mt-8 md:mt-auto ${additionalStyles ?? ""}`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full md:w-[90%] text-black/70 bg-[#F2F4F7] px-[30px] sm:px-[50px] py-[40px] sm:py-[60px] rounded-2xl shadow-lg gap-6"
      >
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="border-b-1 border-black py-2 outline-none"
          placeholder="Imię i nazwisko"
          required
        />

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="border-b-1 border-black py-2 outline-none"
          placeholder="Adres email"
          required
        />

        <input
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          className="border-b-1 border-black py-2 outline-none"
          placeholder="Nr telefonu"
        />

        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="border-b-1 border-black py-2 outline-none resize-none"
          placeholder="Twoja wiadomość"
          required
        />

        <label className="text-gray-400 text-xs flex gap-2">
          <input
            name="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleChange}
          />
          Akceptuję warunki przetwarzania moich danych osobowych
        </label>

        <button
          type="submit"
          className="text-white mr-auto cursor-pointer text-base leading-[19px] font-semibold rounded-3xl bg-primary mt-3 px-6 py-3 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Wysyłanie..." : "Wyślij wiadomość"}
        </button>

        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}
