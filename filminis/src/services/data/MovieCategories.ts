import Jason from '../../assets/images/Jason.png'
import Bourne from '../../assets/images/Bourne.png'
import Forest from '../../assets/images/ForrestGump.png'
import Interestelar from '../../assets/images/Interestelar.png'
import Drama from '../../assets/images/O-PIANISTA.png'
import seven from '../../assets/images/S7VEN.png'

export type Category = {
  title: string;
  imageLink: string;
};


export const categories: Category[] = [
  {
    title: "HORROR",
    imageLink: Jason
  },
  {
    title: "COMÉDIA",
    imageLink: Forest
  },
  {
    title: "AÇÃO",
    imageLink: Bourne
  },
  {
    title: "SCI-FI",
    imageLink: Interestelar
  },
  {
    title: "DRAMA",
    imageLink: Drama
  },
  {
    title: "SUSPENSE",
    imageLink: seven
  },
];