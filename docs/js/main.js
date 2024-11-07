const o=document.querySelector(".js-input"),u=document.querySelector(".js-searchButton"),r=document.querySelector(".js-searchList");document.querySelector(".js-image");document.querySelector(".js-serieTitle");const d=document.querySelector(".js-favouritesList");let c=[];function m(s){s.preventDefault(),fetch(`https://api.jikan.moe/v4/anime?q=${o.value}`).then(t=>t.json()).then(t=>{const i=t.data;r.innerHTML="";for(const e of i){let n=e.images.jpg.image_url;n==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"&&(n="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"),r.innerHTML+=`
            <li class="js-li" id=${e.mal_id}>
            <img class="js-image" src="${n}" alt="${e.title}">
            <h5 class="js-serieTitle">${e.title}</h5>
            </li>
            `,c.push(e);const a=document.querySelectorAll(".js-li");for(const l of a)l.addEventListener("click",f)}})}u.addEventListener("click",m);function f(s){const t=s.currentTarget.id,i=c.find(e=>e.mal_id===parseInt(t));d.innerHTML+=`
        <li>
        <img class="js-fav-image" src="${i.images.jpg.image_url}" alt="${i.title}">
        <h5 class="js-fav-serieTitle">${i.title}</h5>
        </li>
        `}
//# sourceMappingURL=main.js.map
