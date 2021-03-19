export interface SearchItem {
	title: string;
	link: string;
	snippet: string;
}

export interface SearchResponse {
	items: SearchItem[];
}

// example of a res.data.items item
// { kind: 'customsearch#result',
// title:
//  'One small car for man - one giant field of lava - Iceland Monitor',
// htmlTitle:
//  'One small <b>car</b> for man - one giant field of lava - Iceland Monitor',
// link:
//  'https://www.mbl.is/english/news/2014/10/27/lava_field_vs_land_rover/',
// displayLink: 'www.mbl.is',
// snippet:
//  'Oct 27, 2014 ... No, this is not a toy car or tilt-shift photography. This is how big the lava-field is, \nnext to what seems to be a tiny Land Rover. Facebook. Twitter.',
// htmlSnippet:
//  'Oct 27, 2014 <b>...</b> No, this is not a toy <b>car</b> or tilt-shift photography. This is how big the lava-field is, <br>\nnext to what seems to be a tiny Land Rover. Facebook. Twitter.',
// cacheId: '61rgXwc0QugJ',
// formattedUrl:
//  'https://www.mbl.is/english/news/2014/10/27/lava_field_vs_land_rover/',
// htmlFormattedUrl:
//  'https://www.mbl.is/english/news/2014/10/27/lava_field_vs_land_rover/',
// pagemap:
//  { cse_thumbnail: [Array],
//    metatags: [Array],
//    cse_image: [Array],
//    newsarticle: [Array] }{ kind: 'customsearch#result',
//    title:
// 	'One small car for man - one giant field of lava - Iceland Monitor',
//    htmlTitle:
// 	'One small <b>car</b> for man - one giant field of lava - Iceland Monitor',
//    link:
// 	'https://www.mbl.is/english/news/2014/10/27/lava_field_vs_land_rover/',
//    displayLink: 'www.mbl.is',
//    snippet:
// 	'Oct 27, 2014 ... No, this is not a toy car or tilt-shift photography. This is how big the lava-field is, \nnext to what seems to be a tiny Land Rover. Facebook. Twitter.',
//    htmlSnippet:
// 	'Oct 27, 2014 <b>...</b> No, this is not a toy <b>car</b> or tilt-shift photography. This is how big the lava-field is, <br>\nnext to what seems to be a tiny Land Rover. Facebook. Twitter.',
//    cacheId: '61rgXwc0QugJ',
//    formattedUrl:
// 	'https://www.mbl.is/english/news/2014/10/27/lava_field_vs_land_rover/',
//    htmlFormattedUrl:
// 	'https://www.mbl.is/english/news/2014/10/27/lava_field_vs_land_rover/',
//    pagemap:
// 	{ cse_thumbnail: [Array],
// 	  metatags: [Array],
// 	  cse_image: [Array],
// 	  newsarticle: [Array] }
