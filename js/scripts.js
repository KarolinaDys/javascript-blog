'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author',
  optCloudClassCount = '5',
  optCloudClassPrefix = '.tag-size-';
function generateTitleLinks(costumSelector = '') {
  /* [DONE]remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /*[DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + costumSelector);
  let html = '';
  for (let article of articles) {
    /*[DONE] get the article id */
    const articleId = article.getAttribute('id');
    /* [DONE]find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /*[DONE]get the title from the title element */
    /*[DONE] create on HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    titleList.insertAdjacentElement = (titleList.innerHTML, linkHTML);
    /*[DONE] insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}
generateTitleLinks();
const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /*[DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelecor = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelecor);
  /*[DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelecor);
  console.log(targetArticle);
  /*[DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};
const links = document.querySelectorAll('.titles a');
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
function calculateTagsParams(){
  const params = {max: 0, min: 999999};
  for(let tag in tags ){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    console.log(tag + 'is used'+ tags[tag]+ 'times');
  }
  return params;
}
function calculateTagClass( count , params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}
function generateTags() {
  /*[NEW] create a new variable allTags with empty object*/
  let allTags = {};
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);
  /*[DONE]find all articles*/
  const articles = document.querySelectorAll(optArticleSelector);
  /*[DONE]START LOOP: for every article:*/
  for (let article of articles) {
    /*[DONE]find tags wrapper*/
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /*[DONE] make html variable with empty string*/
    let html = '';
    /*[DONE]get  tags from data-tags attribute*/
    const articleTags = article.getAttribute('data-tags');
    /*[DONE]split tags into array */
    const articleTagsArray = articleTags.split('');
    /*[DONE]START LOOP: for each tag*/
    for (let tag of articleTagsArray) {
      /*[DONE] generate HTML of the link*/
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);
      /*[DONE] add generated code to html variable*/
      html = html + linkHTML;
      /*[NEW] check if this link is not already in allTags*/
      /* Why -1?*/
      /* if (allTags.indexOf(linkHTML) == -1) {
        /*[NEW] add generated code to allTags array
        allTags.push(linkHTML);*/
      /*[NEW]checkmif this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /*[NEW] add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      
      /* [DONE]END LOOP: for each tag*/
    }
    /*[DONE]insert HTML of all the links into the tags wrapper*/
    tagsWrapper.innerHTML = html;
    /*[DONE]END LOO: for every article */
  }
  /*[NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /*[NEW] create variable for all links HTML code*/
  let allTagsHTML = '';
  /*[NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /*[NEW]generate code of a link and add it to allTagHTML*/
    allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    /*[NEW]END LOOP: for each tag in allTags: */
  }
  /*[NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}
generateTags();
function tagClickHandler(event) {
  /*[DONE]prevent default for this event*/
  event.preventDefault();
  /*[DONE]make new constant named "clickedElement and give it the value of"this"*/
  const clickedElement = this;
  /*[DONE]make a new constant "href" and read the attribute "href" of the clicked element*/
  const href = clickedElement.getAttribute('href');
  /*[DONE]make a new constant "tag"and extract tag and extract tag from the "herf" constant*/
  const tag = href.replace('#tag-', '');
  /*[DONE]find all tag links with class active*/
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /*[DONE]START LOOP: for each active tag links*/
  for (let activeTagLink of activeTagLinks) {
    /*[DONE]remove class active*/
    activeTagLink.classList.remove('active');
    /*[DONE]END LOOP: for each active tag link*/
  }
  /*[DONE]find all tag with "herf" attribute to the "herf" constatnt*/
  /*!!!Could you explain why this code looks that?!!!*/
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /*[DONE]START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /*[DONE]add class active*/
    tagLink.classList.add('active');
    /*[DONE]END LOOP: for each found tag link*/
  }
  /*[DONE]execute function "generateTitleLinks"with article selector as argument*/
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags() {
  /*[DONE]find all links to tags*/
  const links = document.querySelectorAll('.post-tags a, .tags a');
  /*[DONE]START LOOP: for each link*/
  for (let link of links) {
    /*[DONE]add tagClickHandler as event listener for that link*/
    link.addEventListener('click', tagClickHandler);
    /*[DONE] END LOOP: for each link */
  }
}
addClickListenersToTags();
function generateAuthors() {
  /*[DONE]Find all articles*/
  const articlesAuthor = document.querySelector(optArticleSelector);
  /*[DONE]start loop for every article*/
  for (let article of articlesAuthor){
  /*[DONE]find authors wrappers*/
    const authorsWrapper = article.querySelector(optArticleAuthorsSelector);
    /*[DONE]make html variable with empty string*/
    let html = '';
    /*[DONE]get authors from data-authors attribute*/
    const articleAuthor = article.getAttribute('data-author');
    /*[DONE]generate HTML of the link*/
    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);
  }
  /*[DONE]add generated code to html variable*/
  html = html + linkHTML;
  /*[DONE]insert HTMLof all the links into authors wrapper*/
  authorsWrapper.innerHTML = html;
}
function authorClickHandler(event) {
  /*[DONE]prevent default for this event*/
  event.preventDefault();
  /*[DONE]make new constant named "clickedElement and give it the value of"this"*/
  const clickedElement = this;
  /*[DONE]make a new constant "href" and read the attribute "href" of the clicked element*/
  const href = clickedElement.getAttribute('href');
  /*[DONE]make a new constant "tag"and extract tag and extract tag from the "herf" constant*/
  const author = href.replace('#author-', '');
  /*[DONE]find all tag links with class active*/
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /*[DONE]START LOOP: for each active tag links*/
  for (let activeAuthorLink of activeAuthorLinks) {
    /*[DONE]remove class active*/
    activeAuthorLink.classList.remove('active');
    /*[DONE]END LOOP: for each active tag link*/
  }
  /*[DONE]find all tag with "herf" attribute to the "herf" constatnt*/
  /*!!!Could you explain why this code looks that?!!!*/
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /*[DONE]START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    /*[DONE]add class active*/
    authorLink.classList.add('active');
    /*[DONE]END LOOP: for each found tag link*/
  }
  /*[DONE]execute function "generateTitleLinks"with article selector as argument*/
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  /*[DONE]find all links to tags*/
  const links = document.querySelectorAll('.post-author a, .author a');
  /*[DONE]START LOOP: for each link*/
  for (let link of links) {
    /*add tagClickHandler as event listener for that link*/
    link.addEventListener('click', authorClickHandler);
    /*[DONE] END LOOP: for each link */
  }
}
addClickListenersToAuthors();
