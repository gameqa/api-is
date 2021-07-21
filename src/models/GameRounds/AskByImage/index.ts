import { ImageInfo } from "../interface";

/**
 * Typescript file imitating a database of possible 'idea images' for
 * ideas that are given to the user
 *
 * Each instance must have an url for the image and a 'subject_tf' which
 * is a noun in 'þágufall'. We write the subject in such a form in order
 * to be able to phrase the prompt as 'ask about ____' in Icelandic.
 */
const images: ImageInfo[] = [
	{
		url:
			"https://m.psecn.photoshelter.com/img-get2/I0000oKx7irZcGXE/sec=/fit=1200x1200/I0000oKx7irZcGXE.jpg",
		subject_tf: "Búsáhaldabyltinguna",
	},

	{
		url:
			"https://upload.wikimedia.org/wikipedia/commons/0/0f/Eyjafjallaj%C3%B6kull_by_Terje_S%C3%B8rgjerd.jpg",
		subject_tf: "Eldgos",
	},
	{
		url:
			"https://i2.wp.com/mishmoments.com/wp-content/uploads/2016/12/Seljalandsfoss-Waterfall-South-Iceland-94A2.jpg?fit=533%2C800&ssl=1",
		subject_tf: "Fossa",
	},
	{
		url:
			"https://cdn.pixabay.com/photo/2015/04/23/16/40/tower-736316_960_720.jpg",
		subject_tf: "Tíma",
	},
	{
		url:
			"https://cdn.pixabay.com/photo/2015/04/23/16/40/tower-736316_960_720.jpg",
		subject_tf: "erlendar borgir",
	},
	{
		url: "https://cdn.mbl.is/frimg/1/13/43/1134361.jpg",
		subject_tf: "íslenskt rapp",
	},
	{
		url: "https://cdn.mbl.is/frimg/1/13/43/1134361.jpg",
		subject_tf: "íslenskan rappara",
	},
	{
		url:
			"https://www.vb.is/media/cache/2b/8a/2b8a50e6338d1143da785f17aebfed0d.jpg",
		subject_tf: "einhverja íslenska byggingu",
	},
	{
		url: "https://www.visitmyvatn.is/static/files/htstor-0131.jpg",
		subject_tf: "Mývatn",
	},
	{
		url: "https://www.visitmyvatn.is/static/files/htstor-0131.jpg",
		subject_tf: "norðurland",
	},
	{
		url:
			"https://www.stjornarradid.is/media/velferdarraduneyti-media/media/myndabanki_VEL/Althingishusid_e.jpg",
		subject_tf: "Alþingi",
	},
	{
		url:
			"https://www.popsci.com/app/uploads/2019/03/18/7WNRRCTHIOTCHSLWMSROL4O2WM.jpg",
		subject_tf: "fugla",
	},
	{
		url:
			"https://upload.wikimedia.org/wikipedia/commons/a/ac/Hands-Fingers-Crossed.jpg",
		subject_tf: "fingur",
	},
	{
		url:
			"https://upload.wikimedia.org/wikipedia/commons/a/ac/Hands-Fingers-Crossed.jpg",
		subject_tf: "hendur",
	},
	{
		url:
			"https://upload.wikimedia.org/wikipedia/commons/a/ac/Hands-Fingers-Crossed.jpg",
		subject_tf: "lygar",
	},
	{
		url:
			"https://cdn.britannica.com/94/133594-050-8F09C2FF/Jon-Sigurdsson-statue-Reykjavik-Ice.jpg",
		subject_tf: "íslensk skáld",
	},
	{
		url:
			"https://post.greatist.com/wp-content/uploads/sites/2/2019/04/rainrun-800x1200.jpg",
		subject_tf: "hreyfingu",
	},
	{
		url:
			"https://img.cpapracticeadvisor.com/files/base/cygnus/cpa/image/2015/11/old_dell_computers_1_.5649f352a97ef.png?auto=format&fit=max&w=1200",
		subject_tf: "tölvur",
	},
	{
		url:
			"https://klaraslife.com/wp-content/uploads/2020/07/Pfirsich-Eistee5G7A8231.jpg",
		subject_tf: "svaladrykk",
	},
	{
		url:
			"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F07%2F28%2Fmeasured-sugar-cups-7e9a97a1.jpg&q=85",
		subject_tf: "sykur",
	},
	{
		url:
			"https://previews.123rf.com/images/dcwcreations/dcwcreations1904/dcwcreations190400026/126228391-several-brands-of-vitamins-on-a-modern-grocery-store-shelf.jpg",
		subject_tf: "vítamín",
	},
	{
		url:
			"https://images.freeimages.com/images/large-previews/204/icelandic-flag-at-thingvellir-1344246.jpg",
		subject_tf: "hátíðarhöld",
	},
	{
		url:
			"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F23%2F2016%2F05%2F12%2Facetaminophen-pills.jpg",
		subject_tf: "lyf",
	},
	{
		url: "https://www.bbl.is/media/1/2020-09-06-12.54.08.jpg",
		subject_tf: "morgunmat",
	},
	{
		url:
			"https://worldmapblank.com/wp-content/uploads/2021/02/Labeled-Asia-Map-with-Capitals-795x1024.jpg",
		subject_tf: "Asíu",
	},
	{
		url:
			"https://d2pn8kiwq2w21t.cloudfront.net/images/jpegPIA03153.width-1024.jpg",
		subject_tf: "reikistjörnur",
	},
	{
		url: "https://www.visindavefur.is/myndir/solmyrkvi_1919_stor_180315.jpg",
		subject_tf: "sólkerfið",
	},
	{
		url:
			"https://www.jacksonsart.com/blog/wp-content/uploads/2020/05/cadmium-yellow-genuine-scaled.jpeg",
		subject_tf: "hvernig eitthvað er á litinn",
	},
	{
		url:
			"https://i.natgeofe.com/n/4a2ee633-8b8c-4397-8ccd-a6e2a3c5490b/world-satellite-clipped_2x3.jpg",
		subject_tf: "landafræði",
	},
	{
		url:
			"https://i.pinimg.com/originals/35/95/ec/3595ec16b25b2003fc3da16e69fa1c72.jpg",
		subject_tf: "dýr",
	},
	{
		url:
			"https://i.pinimg.com/originals/a2/d0/d9/a2d0d9b52aa9adb87f8091842915dd17.jpg",
		subject_tf: "sjávarföll",
	},
	{
		url:
			"https://newsroom.clevelandclinic.org/wp-content/uploads/sites/4/2018/08/zygote-anatomy.jpg",
		subject_tf: "mannslíkamann",
	},
	{
		url:
			"https://img.apmcdn.org/09bbc0a44ee068799233d9f5a8e35e63152d42ab/portrait/39fa5f-20201027-bones.jpg",
		subject_tf: "bein",
	},
	{
		url:
			"https://i.pinimg.com/originals/77/96/13/779613ebf9fe03528fedf5e51e111f11.jpg",
		subject_tf: "það sem þú ert forvitin/n að vita",
	},
	{
		url:
			"https://images.unsplash.com/photo-1515536765-9b2a70c4b333?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGF1Z2hpbmclMjBhbmltYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
		subject_tf: "hlátur",
	},
	{
		url:
			"https://images.saymedia-content.com/.image/t_share/MTc2NDUxNTE5NTY5MjA5MzA2/hiccups-remedy.jpg",
		subject_tf: "hiksta",
	},
	{
		url:
			"https://cdn01.zipify.com/images/000/530/993/original/5780523_20180718T055648.jpeg",
		subject_tf: "gang sólar",
	},
	{
		url:
			"https://www-cdn-int.eumetsat.int/files/styles/3_4_large/s3/2020-06/ASpot_Weather.jpg?h=d1cb525d&itok=pdW0Ox92",
		subject_tf: "um veðurfar",
	},
	{
		url: "https://pbs.twimg.com/media/CrHZQxNWIAQTTa3.jpg",
		subject_tf: "heimsmet",
	},
	{
		url:
			"https://www.vb.is/media/cache/eb/f6/ebf66d41f93986ac7c91a0d6e0d6fc28.jpg",
		subject_tf: "íslandsmet",
	},
	{
		url:
			"https://www.muellerundsohn.com/en/wp-content/uploads/sites/2/2020/05/Ma%C3%9Fband_2m_01.jpg",
		subject_tf: "meðallengd",
	},
	{
		url:
			"https://upload.wikimedia.org/wikipedia/commons/e/ec/Blutkreislauf.png",
		subject_tf: "blóð",
	},
	{
		url:
			"https://www.androidsis.com/wp-content/uploads/2009/06/fondos-de-pantalla-de-animales-18.jpg",
		subject_tf: "dýr",
	},
	{
		url:
			"http://earthporm.com/wp-content/uploads/2015/07/unusual-shape-fruit-vegetables-16__605.jpg",
		subject_tf: "eitthvað sem er óvenjulegt",
	},
	{
		url:
			"https://www.visir.is/i/BA3DA17FEE806A76311A01F6EAB4E9FDA3E3B43EE20029552581903CC78EE623_713x0.jpg",
		subject_tf: "fiska",
	},
	{
		url:
			"https://www.ucdavis.edu/sites/default/files/upload/users/gettyimages-545085862.jpg",
		subject_tf: "fitu",
	},
	{
		url:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Alpinistes_Aiguille_du_Midi_02.JPG/1200px-Alpinistes_Aiguille_du_Midi_02.JPG",
		subject_tf: "fjallgöngur",
	},
	{
		url: "https://icelandictimes.com/wp-content/uploads/2015/03/Teista11.jpg",
		subject_tf: "fuglategundir",
	},
	{
		url:
			"https://expert.is/wp-content/uploads/2020/10/orfeo-coffee-milk-thermometer-with-clip_201808190418331667053892.jpg",
		subject_tf: "hitastig",
	},
	{
		url:
			"https://hjolafrettir.is/wp-content/uploads/2020/06/20200531_163413-768x1024.jpg",
		subject_tf: "hjólreiðar",
	},
	{
		url:
			"https://www.ruv.is/sites/default/files/styles/profill_portrait/public/fr_20160107_029903.jpg?itok=74dzd38D",
		subject_tf: "jarðfræði",
	},
	{
		url: "https://upload.wikimedia.org/wikipedia/commons/8/81/Forsythia2.JPG",
		subject_tf: "jurtir",
	},
	{
		url:
			"https://media.vanityfair.com/photos/5d2f2de1466c6d000868d204/9:16/w_891,h_1584,c_limit/MSDLIKI_EC007.jpg",
		subject_tf: "kattategundir",
	},
	{
		url: "https://static.toiimg.com/photo/83458731/83458731.jpg?v=3",
		subject_tf: "kolvetni",
	},
	{
		url:
			"https://ipt.imgix.net/203147/x/0/the-ultimate-guide-to-climate-and-weather-in-antarctica-8.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883",
		subject_tf: "loftslagsbreytingar",
	},
	{
		url:
			"https://image.isu.pub/190320133718-92922240bc9a76a34e1527be7b302a80/jpg/page_1.jpg",
		subject_tf: "lyfjafræði",
	},
	{
		url:
			"https://images.aha.is/image/upload/e_trim:10/w_900,f_auto,q_auto,fl_progressive,c_fill/products//i/s/islands-og-mannkynssaga_nb_ii.jpg",
		subject_tf: "mannkynssögu",
	},
	{
		url: "https://frettabladid.overcastcdn.com/images/248473.min-800x600.jpg",
		subject_tf: "maraþon",
	},
	{
		url:
			"https://www.norden.org/sites/default/files/styles/content_size_800/public/images/New%2520Nordic%2520Cuisine%2520at%2520Nordi%2520Cool%25202013%2520in%2520Washington991445.jpeg?itok=E_hNS2qq",
		subject_tf: "matarmenningu",
	},
	{
		url:
			"https://guidetoiceland.imgix.net/747425/x/0/6-facts-you-didn-t-know-about-icelandic-water-11.jpg?ixlib=php-3.3.0&w=883",
		subject_tf: "menningu",
	},
	{
		url: "https://raedaogrit.files.wordpress.com/2017/09/img_8840.jpg?w=982",
		subject_tf: "náttúruvísindi",
	},
	{
		url:
			"https://www.ruv.is/sites/default/files/styles/profill_portrait/public/fr_20170815_067131.jpg?itok=_EVoR2hF",
		subject_tf: "plöntur",
	},
	{
		url:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/NIGU_Strain_tower.JPG/1200px-NIGU_Strain_tower.JPG",
		subject_tf: "rafmagn",
	},
	{
		url:
			"https://hreinirgardar.is/wp-content/uploads/2021/02/Gardaudun-gardudun-Hreinir-Gardar.jpg",
		subject_tf: "skordýr",
	},
	{
		url:
			"https://previews.123rf.com/images/sonyakamoz/sonyakamoz1705/sonyakamoz170500211/79348196-ingredients-for-healthy-protein-rich-meat-dinner-fresh-raw-beef-uncooked-t-bone-steak-with-green-veg.jpg",
		subject_tf: "prótein",
	},
	{
		url:
			"https://www.bestron.com/pub/media/catalog/product/cache/2b93511303f1465766420a04250233c0/a/c/accm370_ip_sd_hand_suikerspin_suikerspinstokje_1.jpg",
		subject_tf: "sykur",
	},
	{
		url:
			"https://i2.wp.com/ibn.is/wp-content/uploads/2020/08/Sveppakarfa.jpg?fit=770%2C1027&ssl=1",
		subject_tf: "sveppi",
	},
	{
		url:
			"https://www.visiontechnologies.com/sites/default/files/styles/slide_mobile_768x960/public/images/2020-06/Facial-Scan-1280x604.jpg?h=f55f7b2b&itok=NE5c2qR-",
		subject_tf: "tækni",
	},
	{
		url:
			"https://i.pinimg.com/originals/50/8b/45/508b4516ef2602264fefd6a9a2b37fb9.jpg",
		subject_tf: "teiknimyndapersónur",
	},
	{
		url: "https://pbs.twimg.com/media/E5N6kF-VUAcjOAZ.jpg",
		subject_tf: "teiknimyndir",
	},
	{
		url:
			"https://blekhonnun.is/nyrblekvefur/wp-content/uploads/dagatal-synishorn.jpg",
		subject_tf: "frídaga",
	},
	{
		url:
			"https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/01/327185_2200-800x1200.jpg",
		subject_tf: "vatn",
	},
	{
		url:
			"https://www-cdn-int.eumetsat.int/files/styles/3_4_large/s3/2020-06/ASpot_Weather.jpg?h=d1cb525d&itok=pdW0Ox92",
		subject_tf: "veðurfar",
	},
	{
		url:
			"https://images.unsplash.com/photo-1520031559723-e38a5ab03c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
		subject_tf: "vélar",
	},
	{
		url: "https://www.blog.is/users/a6/ajoh/img/pull-up-7.jpg?img_id=1109670",
		subject_tf: "vöðva",
	},
	{
		url:
			"https://previews.123rf.com/images/memoangeles/memoangeles1904/memoangeles190400015/123687490-cartoon-brain-looking-at-a-piece-of-paper-and-thinking-clip-art-vector-illustration-with-simple-grad.jpg",
		subject_tf: "það sem er skrítið",
	},
	{
		url:
			"https://static01.nyt.com/images/2021/06/24/business/24meetings-spot-02/24meetings-spot-02-mobileMasterAt3x.jpg",
		subject_tf: "það sem þér dettur í hug",
	},
	{
		url:
			"https://www.norden.org/sites/default/files/styles/content_size_800/public/images/Nordiska%2520flaggor907589.jpeg?itok=G139J-2B",
		subject_tf: "þjóðríki",
	},
];

/**
 * Function that returns an ImageInfo obejct
 *
 * by randomly selecting an item from the images array
 * @returns {ImageInfo}
 */
export const getImage = () => images[Math.floor(Math.random() * images.length)];
