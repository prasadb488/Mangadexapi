import { trim, trimfollowers } from "./utils/trim";
const app = document.querySelector(".cardscontainer");

async function dataretrieve() {
  try {
    const response = await fetch("/api/manga?order[followedCount]=desc");
    const resjson = await response.json();
    app.innerHTML = `${resjson.data.map((i) => {
      const atb = i.attributes.altTitles.find((val) => val.en);
      const title = trim(i.attributes.title.en, 26);
      const altitle = trim(
        i.attributes.title.en === undefined ? atb.en : i.attributes.title.en,
        26
      );
      const des = trim(i.attributes.description.en, 100);
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
              <h5 id="timez">Followers</h5>
            </section>
            <section id="clock">
              <p id="days"> pppp</p>
            </section>
          </section>
          <hr>
      </div>
      <section class="footer">
        <!-- <img id="pic" src="images/image-avatar.png" width="30px" height="30px"> -->
        <p id="foot">Author: <span id="name">Ryuu Nakayama</span></p>
      </section>
  </div>`;
    })}`;
    const lt = resjson.data.map((i) => {
      const atb = i.relationships.find((val) => {
        return val.type === "author";
      });
      return atb.id;
    });
    lt.forEach((element, i) => {
      author(element, i);
    });
    const lt1 = resjson.data.map((i) => {
      const atb = i.relationships.find((val) => {
        return val.type === "cover_art";
      });
      return atb.id;
    });
    lt1.forEach((element, i) => {
      statistics(resjson.data[i].id, i);
      coverid(resjson, element, i);
    });
  } catch (err) {
    console.log(err);
  }
}

dataretrieve();

async function author(ele, i) {
  try {
    const auth = await fetch(`/api/author/${ele}`);
    const authjson = await auth.json();
    // return authjson;
    const docs = document.querySelectorAll("#name");
    docs[i].textContent = authjson.data.attributes.name;
  } catch (err) {
    console.log(err);
  }
}

async function statistics(ele, i) {
  try {
    const rating = await fetch(`/api/statistics/manga/${ele}`);
    const rtjson = await rating.json();
    // return rtjson;
    const id = ele;
    const rt = document.querySelectorAll("#days");
    rt[i].textContent = trimfollowers(rtjson.statistics[id].follows);
  } catch (err) {
    console.log(err);
  }
}

async function coverid(resjson, ele, i) {
  try {
    const func = await fetch(`/api/cover/${ele}`);
    const funcjson = await func.json();
    // return funcjson;
    const result = await coverpic(
      resjson.data[i].id,
      funcjson.data.attributes.fileName,
      i
    );
    const img = document.querySelectorAll("#image");
    const imageUrl = `/covers/${resjson.data[i].id}/${funcjson.data.attributes.fileName}`;

    img[i].src = imageUrl;
  } catch (err) {
    console.log(err);
  }
}

async function coverpic(id, filename, i) {
  try {
    const pic = await fetch(`/uploads/covers/${id}/${filename}`);

    return pic;
  } catch (err) {
    console.log(err);
  }
}

// // // setInterval(() => {
// //   console.log(909090);
// // }, 2000);
