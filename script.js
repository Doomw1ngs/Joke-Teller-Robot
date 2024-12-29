// Selectors
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

const apiKey = 'a45bee6d85e74154a1dc43b869d08f33';
const apiUrl = `http://api.voicerss.org/?key=${apiKey}&hl=en-us&src=Hello, world!`;

// Disable/Enable button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

//Passing joke to VoiceRSS API
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: apiKey,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
};

// Get jokes from joke API
const getJokes = async () => {
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  let joke = '';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}...${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-To-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log('fetch has failed', error);
  }
};

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
