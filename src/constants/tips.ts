import { arraiaBeauty } from "./arraia-beauty";
import { beautyDay } from "./beauty-day";
import { blondInSeven } from "./blond-in-seven";
import { camouflage } from "./camouflage";
import { clienteOuro } from "./cliente-ouro";
import { cloroOff } from "./cloro-off";
import { corteTerapeutico } from "./corte-terapeutico";
import { cronogramaCapilar } from "./cronograma-capilar";
import { diaDasMaes } from "./dia-das-maes";
import { flashBlond } from "./flash-blond";
import { flashGold } from "./flash-gold";
import { mesDosNamorados } from "./mes-dos-namorados";
import { rifaDaBeleza } from "./rifa-da-beleza";
import { whatsappDeOuro } from "./whatsapp-de-ouro";

export interface Tip {
  title: string;
  thumbnail: string;
  thumbnailSpanish?: string;
  videoId: string;
    videoIdSpanish?: string;
  stepByStepVideoId?: string;
  stepByStepVideoIdSpanish?: string;
  links: {
    name: string;
    url: string;
    isVideo?: boolean;
  }[];
    linksSpanish: {
        name: string;
        url: string;
        isVideo?: boolean;
    }[];
}

export const TIPS: Tip[] = [
  {
    ...arraiaBeauty,
  },
  {
    ...cloroOff,
  },
  {
    ...beautyDay,
  },
  {
    ...camouflage,
  },
  {
    ...clienteOuro,
  },
  {
    ...corteTerapeutico,
  },
  {
    ...cronogramaCapilar,
  },
  {
    ...diaDasMaes,
  },
  {
    ...flashBlond,
  },
  {
    ...flashGold,
  },
  {
    ...mesDosNamorados,
  },
  {
    ...rifaDaBeleza,
  },
  {
    ...whatsappDeOuro,
  },
  {
    ...blondInSeven,
  },
  {
    title: "Iluminus in 7",
    thumbnail: "https://i.ytimg.com/vi/VGMyq-V7CP8/hqdefault.jpg",
    thumbnailSpanish: "https://i.ytimg.com/vi/wfTOCb-Kiss/hqdefault.jpg",
    videoId: "VGMyq-V7CP8",
    videoIdSpanish: "wfTOCb-Kiss",
    links: [
      {
        name: "iluminus-in-7-feed.png",
        url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/iluminus-in-seven%2Filuminus-in-7-1-feed.png?alt=media&token=f0e2c556-cb92-4fc3-ab99-858f045d14f2",
      },
      {
        name: "iluminus-in-7-story.png",
        url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/iluminus-in-seven%2Filuminus-in-7-1-story.png?alt=media&token=2f6d4c5d-6d8f-4f8e-9b1b-0a5a6d4a0c7b",
      },
      {
        name: "iluminus-in-7-1.mp4",
        url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/iluminus-in-seven%2Filuminus-in-7-2.mp4?alt=media&token=8f7f1e7b-5b7e-4d3b-8b7b-6f7e4b6e5d0a",
        isVideo: true,
      },
      {
        name: "iluminus-in-7-2.mp4",
        url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/iluminus-in-seven%2Filuminus-in-7-3.mp4?alt=media&token=5b0f9e9b-4f2b-4c1a-8b7c-4e7b6e5d0a",
        isVideo: true,
      },
      {
        name: "iluminus-in-7-carrossel-1.jpg",
        url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/iluminus-in-seven%2Fcarrossel%2F1.jpg?alt=media&token=4d6dd93b-3e02-4549-8226-0edc095da058",
      },
      {
        name: "iluminus-in-7-carrossel-2.jpg",
        url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/iluminus-in-seven%2Fcarrossel%2F2.jpg?alt=media&token=4d6dd93b-3e02-4549-8226-0edc095da058",
      },
      {
        name: "iluminus-in-7-carrossel-3.jpg",
        url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/iluminus-in-seven%2Fcarrossel%2F3.jpg?alt=media&token=4d6dd93b-3e02-4549-8226-0edc095da058",
      },
      {
        name: "iluminus-in-7-carrossel-4.jpg",
        url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/iluminus-in-seven%2Fcarrossel%2F4.jpg?alt=media&token=4d6dd93b-3e02-4549-8226-0edc095da058",
      },
      {
        name: "iluminus-in-7-carrossel-5.jpg",
        url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/iluminus-in-seven%2Fcarrossel%2F5.jpg?alt=media&token=4d6dd93b-3e02-4549-8226-0edc095da058",
      },
    ],
    linksSpanish: [
        {
            name: "iluminus-in-7-feed.png",
            url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/espanhol%2Filuminus-in-seven%2Fspanish%2Ffeed.png?alt=media&token=f0e2c556-cb92-4fc3-ab99-858f045d14f2",
        },
        {
            name: "iluminus-in-7-story.png",
            url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/espanhol%2Filuminus-in-seven%2Fspanish%2Fstory.png?alt=media&token=2f6d4c5d-6d8f-4f8e-9b1b-0a5a6d4a0c7b",
        },
        {
            name: "iluminus-in-7-1.mp4",
            url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/espanhol%2Filuminus-in-seven%2Fvideo-1.mp4?alt=media&token=43df0a5d-d5b0-490c-8f1b-4e210b4e578f",
            isVideo: true,
        },
        {
            name: "iluminus-in-7-2.mp4",
            url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/espanhol%2Filuminus-in-seven%2Fvideo-2.mp4?alt=media&token=43df0a5d-d5b0-490c-8f1b-4e210b4e578f",
            isVideo: true,
        },
        {
            name: "iluminus-in-7-carrusel-1.png",
            url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/espanhol%2Filuminus-in-seven%2Fcarrossel%2F1.png?alt=media&token=fce36fd9-4fca-41dc-8926-cbf0bb2ac952",
        },
        {
            name: "iluminus-in-7-carrusel-2.png",
            url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/espanhol%2Filuminus-in-seven%2Fcarrossel%2F2.png?alt=media&token=fce36fd9-4fca-41dc-8926-cbf0bb2ac952",
        },
        {
            name: "iluminus-in-7-carrusel-3.png",
            url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/espanhol%2Filuminus-in-seven%2Fcarrossel%2F3.png?alt=media&token=fce36fd9-4fca-41dc-8926-cbf0bb2ac952",
        },
        {
            name: "iluminus-in-7-carrusel-4.png",
            url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/espanhol%2Filuminus-in-seven%2Fcarrossel%2F4.png?alt=media&token=fce36fd9-4fca-41dc-8926-cbf0bb2ac952",
        },
        {
            name: "iluminus-in-7-carrusel-5.png",
            url: "https://firebasestorage.googleapis.com/v0/b/planner-mecha-turbo.firebasestorage.app/o/espanhol%2Filuminus-in-seven%2Fcarrossel%2F5.png?alt=media&token=fce36fd9-4fca-41dc-8926-cbf0bb2ac",
        }
    ],
  },
];
