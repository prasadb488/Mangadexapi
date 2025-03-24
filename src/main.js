import trim from "./utils/trim";
const app = document.querySelector(".cardscontainer");
//TODO: add titles for undefined
const func = fetch("https://api.mangadex.org/manga?order[followedCount]=desc")
  .then((Message) => {
    return Message.json();
  })
  .then((response) => {
    app.innerHTML = `
${response.data.map((i) => {
  const atb = i.attributes.altTitles.find((val) => val.en);
  const title = trim(i.attributes.title.en, 26);
  const altitle = trim(
    i.attributes.title.en === undefined ? atb.en : i.attributes.title.en,
    26
  );
  const des = trim(i.attributes.description.en, 100);
  //   console.log(atb);

  return `
<div class="card">
      <img id="image" src="./517K-PLywYL.webp" width="250" height="250">
      <div class="matter">
        <h4 id="title">${
          // title
          i.attributes.title.en === undefined ? altitle : title
        }</h4>
        <p id="para">${des}</p>
          <section class="daysz">
            <section id="icons">
              <h5 id="timez">Rating</h5>
            </section>
            <section id="clock">
              <p id="days"> ⭐️⭐️⭐️⭐️⭐️</p>
            </section>
          </section>
          <hr>
      </div>
      <section class="footer">
        <!-- <img id="pic" src="images/image-avatar.png" width="30px" height="30px"> -->
        <p id="foot">Directed by <span id="name">Ryuu Nakayama</span></p>
      </section>
  </div>
  `;
})}
  `;
    return response;
  })
  .then((response) => {
    // console.log(response);
    const lt = response.data.map((i) => {
      const atb = i.relationships.find((val) => {
        return val.type === "author";
      });
      return atb.id;
    });
    lt.forEach((element, i) => {
      const func = fetch(`https://api.mangadex.org/author/${element}`)
        .then((m) => {
          return m.json();
        })
        .then((res) => {
          // console.log(res.data.attributes.name);
          const docs = document.querySelectorAll("#name");
          docs[i].textContent = res.data.attributes.name;
        });
    });
    return response;
  })
  .then((response) => {
    // console.log(response);
    const lt = response.data.map((i) => {
      const atb = i.relationships.find((val) => {
        return val.type === "cover_art";
      });
      return atb.id;
    });
    console.log(response);

    lt.forEach((element, i) => {
      // console.log(element, response);
      const func = fetch(`https://api.mangadex.org/cover/${element}`)
        .then((m) => {
          return m.json();
        })
        .then((res) => {
          // console.log(res.data.attributes.fileName, response.data[i].id);
          fetch(
            `https://uploads.mangadex.org/covers/${response.data[i].id}/${res.data.attributes.fileName}`
          ).then((result) => {
            // console.log(7878, result);
            const img = document.querySelectorAll("#image");
            img[i].src = result.url;
          });
        });
    });
    return response;
  })
  .catch((error) => {
    console.log(error);
  });

// // setInterval(() => {
//   console.log(909090);
// }, 2000);
