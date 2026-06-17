import Image from "next/image";
import { clsx } from "clsx";

const logoUrl =
  "https://institucional.seazone.com.br/wp-content/uploads/2023/02/logo-azul-com-laranja.png";

export function SeazoneLogo({ className }: { className?: string }) {
  return (
    <Image
      src={logoUrl}
      alt="Seazone"
      width={168}
      height={44}
      priority
      className={clsx("h-auto w-36 sm:w-40", className)}
    />
  );
}
