function OnResponse(Response) {
	console.log(Response);
	if (!Response.ok) {
		console.log("Errore nel ottenere i dati");
		return null;
    }
	return Response.json();
}

function OnJsonSpotify(json) {
	const url = json.tracks.items[0].preview_url;
	return url;
}


async function OnJson(json) {
	console.log(json);
	const ItemCount = json.meta.size;
	const ListItem = document.querySelector('#listAnime');
	ListItem.innerHTML = '';
	for (let i = 0; i < ItemCount; i++) {
		const ResultItem = document.createElement('div');
		const images = document.createElement('img');
		const InfoItem = document.createElement('div');
		const Title = document.createElement('h1');
		const Descri = document.createElement('h3');
		const Linkbrano = document.createElement('a');
		const SearchString = json.data[i].title;
		console.log(aceestokens);
		Linkbrano.target = '_blank';
		Linkbrano.href= await fetch('https://api.spotify.com/v1/search?q=' + SearchString + '&type=track&market=IT&limit=1&offset=1', { headers: { 'Authorization': 'Bearer ' + aceestokens }}).then(OnResponse).then(OnJsonSpotify);
		Linkbrano.innerHTML = "Clicca qui per Ascoltare un'anteprima del brano";
		ResultItem.classList.add('Item');
		images.src = json.data[i].image;
		InfoItem.classList.add('Info');
		Title.innerHTML = json.data[i].title;
		Descri.innerHTML = json.data[i].synopsis;
		InfoItem.appendChild(Title);
		InfoItem.appendChild(Descri);
		InfoItem.appendChild(Linkbrano);
		ResultItem.appendChild(images);
		ResultItem.appendChild(InfoItem);
		ListItem.appendChild(ResultItem);
    }
}

const selectElem = document.querySelectorAll('select');

for (const Select of selectElem) {
	Select.addEventListener('change', StartAPISelect);
}

function StartAPISelect(event) {
	event.preventDefault();
	StartAPI();
}

function StartAPI() {

	const NItems = document.querySelector("#N_Items");
	const NitemsValue = NItems.options[NItems.selectedIndex].value;
	const Genere = document.querySelector("#Genere");
	const GenereValue = Genere.options[Genere.selectedIndex].value;

	const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size='+NitemsValue+'&genres='+GenereValue+'&sortBy=ranking&sortOrder=asc';
	const options = {
		method: 'GET',
		headers: {
			'content-type': 'application/octet-stream',
			'X-RapidAPI-Key': 'ce50fc6b9amsh91e511c4e90b4acp16598bjsn64bab0cac52f',
			'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
		}
	};
	const response = fetch(url, options).then(OnResponse).then(OnJson);
}

StartAPI();

	const SpotifyTokenEndPoint = 'https://accounts.spotify.com/api/token'
    const option1 = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	body:'grant_type=client_credentials&client_id=d29b6c8e35df4a8a81200f9af2a21a3f&client_secret=68f135a1a17947b2b319719cd45e4cba'
}

	const access_token_spotify = fetch(SpotifyTokenEndPoint, option1).then(OnTokenResponse).then(onTokenJson);

function OnTokenResponse(rep) {
	return rep.json();
}

let aceestokens;

function onTokenJson(Json) {
	aceestokens = Json.access_token;
	return aceestokens;
}