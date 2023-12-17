const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  selectTag = document.querySelectorAll("select"),
  exchangeIcon = document.querySelector(".exchange"),
  translateBtn = document.querySelector("button"),
  icons = document.querySelectorAll(".row span");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    // console.log(countries[country_code]);
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "hi-IN") {
      selected = "selected";
    }
    let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value,
    tempLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
  selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
  console.log(text, translateFrom, translateTo);
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  // let url = "AIzaSyDyDJ4sNuW7pP1IGr2YmK7sggip0tVAAFA";
  // let apiurls = "https://translation.googleapis.com/language/translate/v2";
  // let apiUrl = `${apiurls}?key=${url}&q=${encodeURIComponent(text)}&target=${translateFrom}=${translateTo}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      toText.value = data.responseData.translatedText;
    });
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        console.log("from copy icon click");
        navigator.clipboard.writeText(fromText.value);
      } else {
        console.log("To copy icon clicked");
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      console.log("speech icon clicked");
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
      }
      speechSynthesis.speak(utterance);
    }
  });
});
