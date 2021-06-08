import { ImageInfo } from "../interface";


const images: ImageInfo[] = [
	{
		url: "https://m.psecn.photoshelter.com/img-get2/I0000oKx7irZcGXE/sec=/fit=1200x1200/I0000oKx7irZcGXE.jpg",
		subject_tf: "Búsáhaldabyltinguna",
    },
    {
		url: "https://www.thesun.co.uk/wp-content/uploads/2019/11/NINTCHDBPICT000537721299-1.jpg",
		subject_tf: "Berlínarmúrinn",
    },
    {
		url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Jacques-Louis_David_017.jpg/1200px-Jacques-Louis_David_017.jpg",
		subject_tf: "Napóleon",
    },
    {
		url: "https://i0.wp.com/grapevine.is/wp-content/uploads/Owning-It-Emmsje-Gauti-by-Axel-Sigurearson.jpg?quality=99",
		subject_tf: "Emmsjé Gauta",
    },
    {
		url: "https://cdn.mbl.is/frimg/1/13/80/1138015.jpg",
		subject_tf: "Apann í Eden",
    },
    {
		url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Eyjafjallaj%C3%B6kull_by_Terje_S%C3%B8rgjerd.jpg",
		subject_tf: "Eldgos",
    },
    {
		url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Eyjafjallaj%C3%B6kull_by_Terje_S%C3%B8rgjerd.jpg",
		subject_tf: "Eyjafjallajökul",
	},
    {
		url: "https://m.media-amazon.com/images/M/MV5BOWIzMWYwODItNjRjNC00N2VhLWI2NGItMzM0YTU1ZTY3NTBlXkEyXkFqcGdeQXVyNDE1MjQ4MTk@._V1_.jpg",
		subject_tf: "Michael Jackson",
	},
    {
		url: "https://live.staticflickr.com/65535/49937327958_aa0b3c0a44_b.jpg",
		subject_tf: "Gísla Martein",
	},
    {
		url: "https://upload.wikimedia.org/wikipedia/is/5/59/Sodoma_reykjavik_vhs.jpg",
		subject_tf: "Sódóma Reykjavík",
	},
    {
		url: "https://www.ml.is/wp-content/uploads/2020/12/Modruvallabok-Medium.jpg",
		subject_tf: "Njálssögu",
	},
    {
		url: "https://www.forseti.is/media/6349/04-forseti-%C3%ADslands.jpg",
		subject_tf: "Vigísi Finnbogadóttur",
	},
    {
		url: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Katr%C3%ADn_Jakobsd%C3%B3ttir_%28cropped%29.jpg",
		subject_tf: "Katrín Jakobsdóttur",
	},
    {
		url: "https://cdn.britannica.com/18/193318-050-BA5E2B8A/Melania-Trump-2016.jpg",
		subject_tf: "Melaniu Trump",
	},
    {
		url: "https://i2.wp.com/mishmoments.com/wp-content/uploads/2016/12/Seljalandsfoss-Waterfall-South-Iceland-94A2.jpg?fit=533%2C800&ssl=1",
		subject_tf: "Seljalandsfoss",
	},
    {
		url: "https://experiencenature.com.au/wp-content/uploads/2021/01/AJM3098.jpg",
		subject_tf: "Trufflur",
	},
];

export const getImage = () => 
    images[Math.floor(Math.random() * images.length)];

