import { ClientLanding } from "@/components/home/ClientLanding";
import { getClientLogos } from "@/lib/getClientLogos";

export default function HomePage() {
  const logos = getClientLogos();

  return (
    <main id="contenido" className="bg-white">
      <ClientLanding logos={logos} />
    </main>
  );
}

