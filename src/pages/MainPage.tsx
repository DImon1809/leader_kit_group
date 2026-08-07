import { Hero } from "../components/Hero";
import { Catalog } from "../components/Catalog";
import { RareParts } from "../components/RareParts";
import { Advantages } from "../components/Advantages";
import { HowWeWork } from "../components/HowWeWork";
import { ContactForm } from "../components/ContactForm";

export const MainPage = () => {
  return (
    <>
      <Hero />
      <Catalog />
      <RareParts />
      <Advantages />
      <HowWeWork />
      <ContactForm />
    </>
  );
};
