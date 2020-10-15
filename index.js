var robot = document.querySelector(".robot");
var eyeBallLeft = document.querySelector(".eye-ball-left");
var eyeBallRight = document.querySelector(".eye-ball-right");



/* Handwriting animation */
delayedText("Hei#i#i#i#i#!##### Eg heite Geir. ####### Eg kan hjelpe deg med finne jobb!. ######### | Finne jobb kan vera vanskeleg med eigenhand,##### og eg trur ##vi skal ha det mykje kjekt # ilag!#!######## | OI! ##### .###.#..## Hoyra du det ?#####, eg trur NAV KJEM. ####Dei skal sjekke om du vore ferie..############# |Nei men la oss sjekke stillingane. Her e dei!:",
    document.querySelector(".robot-chat-bubble")
);

function delayedText(text, domElement, config) {
  const baseDelay = 50; // Milliseconds
  const delayCharDelay = 0;
  const pauseChar = "#"
  const clearChar = "|"
  let timeoutObjects = [];
  let totalDelay = 0;

  text.split('').forEach((char,index) => {

    let delay =  baseDelay + (char === pauseChar ? delayCharDelay : 0);
    totalDelay+= delay;

  

    timeoutObjects.push(window.setTimeout(() => {

        if (char == clearChar) {
          domElement.textContent = "";
        }
        else if (char != pauseChar) {
          domElement.textContent += char;
        }

     
        


    }, delay + totalDelay))

  })

  

  
}


/*
delayedText(
  "he#h#heh nei trokJ##E ##D#######U## klar#A#A#a fe j#o#bb#e ej. Er#lend# du # errrrr###land ####perlerr. DOM DOM DOM #### |DO#OO#M ##### D #### O ###M###################. Men gi aldri opp! ############################# Bare heile tida ###",
  document.querySelector(".robot-chat-bubble")
);

*/


window.setTimeout(()=>{

  console.log("something")
  const ads = document.querySelector("body > main > div.ads > div")
  ads.classList.add("fade-in");
  ads.style.display = "flex";
},18000)


window.setTimeout(()=>{
  const body = document.querySelector("body");
  body.classList.add("quadrat")
},10000)

/* Move robot eyes when mouse moves */

document.addEventListener("mousemove", (e) => {
  updateEyeBallPos(eyeBallLeft);
  updateEyeBallPos(eyeBallRight);

  function updateEyeBallPos(eyeBall) {
    const eyePos = eyeBall.getBoundingClientRect();
    // Find mouse x,y relative to eye position.
    const x = e.clientX - eyePos.x - eyePos.width / 2;
    const y = e.clientY - eyePos.y - eyePos.height / 2;

    // Scale factor screensize to eye size. Basicly making a mini coordinate system for the eye
    const scaleFactorX = eyePos.width / window.innerWidth;
    const scaleFactorY = eyePos.height / window.innerHeight;

    let eyeX = x * scaleFactorX + eyePos.width / 2;
    let eyeY = y * scaleFactorY + eyePos.width / 2;

    eyeBall.style.marginLeft = eyeX + "px";
    eyeBall.style.marginTop = eyeY + "px";
  }
});

/* Get some data from Finn.no, and render it on the page */
/*
fetch(
  "https://www.finn.no/job/fulltime/search.html?location=1.20001.22046&location=2.20001.22046.20220&q=front+end"
)
  .then(function (response) {
    return response.text();
  })
  .then(function (html) {
    // This is the HTML from our response as a text string
    const domData = new DOMParser().parseFromString(html, "text/html");
    const annonser = document.querySelector(".ads");
    const stillinger = document.querySelector(".stillinger");
    const ads = domData.querySelector("#page-results");
    console.log(ads);
    annonser.innerHTML = ads.innerHTML;
    stillinger.classList.add("fade-in")
    stillinger.style.display = "inline-block";
    stillinger.textContent =
      "Front-end stillinger @ Vestland: " +
      domData.querySelectorAll(".panel .u-strong")[0].textContent;
  })
  .catch(function (err) {
    // There was an error
    console.warn("Something went wrong.", err);
  });
*/

  const getJobData = async () => {

    const response = await fetch("https://www.finn.no/job/fulltime/search.html?location=1.20001.22046&location=2.20001.22046.20220&q=front+end")
    const HTML_Data = await response.text()

    const DOM_Object = new DOMParser().parseFromString(HTML_Data, "text/html")

    
    // Use query selectors to find the specific places we want to take data from
    const ads = DOM_Object.querySelector("#page-results");
    const ledige_stillinger = DOM_Object.querySelectorAll(".panel .u-strong")[0].textContent;
    const nye_idag = DOM_Object.querySelector("#__next > main > div.grid > section > ul:nth-child(2) > li > div > label > span").textContent;

    // Page elements were we wanna render the data
    const document_annonser = document.querySelector(".ads");
    const document_stillinger = document.querySelector(".stillinger");
    const document_nye_idag = document.querySelector(".nye-idag");

    // Render the data in said places
    document_annonser.innerHTML = ads.innerHTML;
    document_stillinger.classList.add("fade-in")
    document_stillinger.style.display = "inline-block";
    document_stillinger.textContent = "Front-end stillinger @ Vestland: " + ledige_stillinger;


    document_nye_idag.classList.add("fade-in")
    document_nye_idag.style.display = "inline-block";
    document_nye_idag.textContent = "Nye idag: " + nye_idag ;


  }

  getJobData();