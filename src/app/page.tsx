import { HomeHub } from "@/components/home/HomeHub";
import { ClientesSection } from "@/components/ClientesSection";
import { getClientLogos } from "@/lib/getClientLogos";

export default function HomePage() {
  const logos = getClientLogos();

  return (
    <main id="contenido" className="bg-white">
      <HomeHub />
      <ClientesSection logos={logos} />
    </main>
  );
}

