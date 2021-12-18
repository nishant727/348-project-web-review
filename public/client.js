// client-side js


const ratingsForm = document.forms[0];
const descInput = ratingsForm.elements["description"];
const ratingInput = ratingsForm.elements["rating"];


const websiteStatsForm = document.forms[1];
const tbWebsiteStats = document.getElementById("website_stats");


//updates the user table on the page
const appendNewItem = item => {
  const newTrItem = document.createElement("tr");
  const descTdItem = document.createElement("td");
  descTdItem.innerHTML = item.description;
  const ratingTdItem = document.createElement("td");
  ratingTdItem.innerHTML = item.rating;

  newTrItem.appendChild(descTdItem);
  newTrItem.appendChild(ratingTdItem);

  const tbItem = document.getElementById("rating_table");
  tbItem.appendChild(newTrItem);
};
/////
const createWebsiteStats = stats => {
  const newTrItem = document.createElement("tr");
  const descTdItem = document.createElement("td");
  descTdItem.innerHTML = stats.count;
  const ratingTdItem = document.createElement("td");
  ratingTdItem.innerHTML = stats.rating;
  
  newTrItem.appendChild(descTdItem);
  newTrItem.appendChild(ratingTdItem);

  tbWebsiteStats.appendChild(newTrItem);
};


//add a new user to the list when submitted
ratingsForm.onsubmit = event => {
  //stop the form submission from refreshing the page
  event.preventDefault();
  const date = new Date().toLocaleDateString();
  const data = {
    description: descInput.value,
    rating: ratingInput.value,
  };

  fetch("/addRating", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
    });

  fetch("/getRatings", {})
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        appendNewItem({
          description: row.description,
          rating: row.rating,
        });
      });
    });

  
  //reset form
  
  descInput.value = "";
  ratingInput.value = 0;
};

websiteStatsForm.onsubmit = event => {
  event.preventDefault();
  while (tbWebsiteStats.firstChild) {
    tbWebsiteStats.removeChild(tbWebsiteStats.firstChild);
  }

  fetch("/getStats", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        createWebsiteStats({
          count: row.Count,
          rating: row.Avg,
        });
      });
    });
};



