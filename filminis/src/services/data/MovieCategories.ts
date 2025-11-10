import Jason from '../../assets/images/Jason.png'
import Bourne from '../../assets/images/Bourne.png'
import Forest from '../../assets/images/ForrestGump.png'
import Interestelar from '../../assets/images/Interestelar.png'

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
    imageLink: "URL_DA_IMAGEM_DRAMA"
  },
  {
    title: "SUSPENSE",
    imageLink: "URL_DA_IMAGEM_SUSPENSE"
  },
];