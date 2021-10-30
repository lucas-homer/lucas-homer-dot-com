import Image from "next/image";
import { useTheme } from "next-themes";

interface Props {
  alt?: string;
  light: string;
  dark: string;
}

export default function ImageWithTheme(props: Props) {
  const { theme } = useTheme();

  return (
    <Image
      alt={props.alt}
      src={theme === "light" ? props.light : props.dark}
      {...props}
    />
  );
}
