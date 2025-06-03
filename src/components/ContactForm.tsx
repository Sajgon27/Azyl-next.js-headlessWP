type ContactFormProps = {
  additionalStyles?: string;
};

export default function ContactForm({ additionalStyles }: ContactFormProps) {
  return (
    <div className={`w-full md:w-1/2 mt-8 md:mt-auto ${additionalStyles ? additionalStyles : ''}`}>
      <form className="flex flex-col w-full md:w-[90%] text-black/70  bg-[#F2F4F7] px-[30px] sm:px-[50px] py-[40px] sm:py-[60px] rounded-2xl shadow-lg gap-6">
        <input
          name="name"
          type="text"
          className="border-b-1 border-black py-2 outline-none"
          placeholder="Imię i nazwisko"
        />

        <input
          name="email"
          type="email"
          className="border-b-1 border-black py-2 outline-none"
          placeholder="Adres email"
        />
        <input
          name="name"
          type="phone"
          className="border-b-1 border-black py-2 outline-none"
          placeholder="Nr telefonu"
        />
                <textarea
          name="message"
          rows={3}
          className="border-b-1 border-black py-2 outline-none resize-none"
          placeholder="Twoja wiadomość"
        />
        <label className="text-gray-400 text-xs flex gap-2">
          <input name="terms" type="checkbox" /> Akceptuję warunki przetwarzania
          moich danych osobowych
        </label>

        <button
          className="text-white mr-auto cursor-pointer text-base leading-[19px] font-semibold rounded-3xl bg-primary mt-3 px-6 py-3"
          type="submit"
        >
          Wyślij wiadomość
        </button>
      </form>
    </div>
  );
}
