const container = document.getElementById("container");

function createHtmlTemplate(strings, ...propsNames) {
  return function (props) {
    const slices = [...strings];
    propsNames.forEach((key, index) => {
      if (key.includes(".")) {
        const [nestedObj, nestedObjKey] = key.split(".");
        slices[index] += props[nestedObj][nestedObjKey];
        return;
      }

      slices[index] += props[key];
    });
    return slices.join("");
  };
}

async function getArticleData() {
  await new Promise((r) => setTimeout(r, 3000));

  return {
    photoUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80",
    title: "Lorem Ipsum Dolor",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur excepturi sapiente iure veniam culpa cupiditate error blanditiis?",
    author: {
      name: "John Doe",
      photoUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    date: "Oct 08, 2020",
  };
}

function createArticleTemplate(props) {
  return createHtmlTemplate`
  <article class="card">
    <div class="card-header">
      <img
      src="${"photoUrl"}"
      />
    </div>
    <div class="card-content">
      <h3 class="card-title">${"title"}</h3>
      <p class="card-description">
        ${"description"}
      </p>
      <div class="card-author">
        <img
          src="${"author.photoUrl"}"
          alt="${"author.photoUrl"}"
          class="card-author-img"
        />
        <h4 class="card-author-name">${"author.name"}</h4>
        <div class="card-article-date">${"date"}</div>
      </div>
    </div>
  </article>
  `(props);
}

const articleSkeletonTemplate = `
<div class="card-skeleton">
<div class="card-header">
  <div style="width: 100%; height: 100%" class="skeleton"></div>
</div>

<div class="card-content">
  <div style="width: 50%; height: 16px" class="skeleton"></div>
  <div style="width: 100%" class="card-description">
    <div style="width: 100%; height: 14px" class="skeleton"></div>
    <div style="width: 100%; height: 14px" class="skeleton"></div>
    <div style="width: 100%; height: 14px" class="skeleton"></div>
    <div style="width: 24%; height: 14px" class="skeleton"></div>
  </div>

  <div class="card-author">
    <div style="width: 40px; height: 40px;" class="skeleton card-author-img"></div>
    <div style="width: 25%; height: 14px" class="skeleton"></div>
    <div style="width: 25%; height: 14px" class="skeleton card-article-date"></div>
  </div>
</div>
</div>
`;

getArticleData().then(function (article) {
  container.innerHTML = createArticleTemplate(article);
});

container.innerHTML = articleSkeletonTemplate;